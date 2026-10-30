import { PrismaClient } from '../generated/prisma-client'

// This singleton pattern prevents creating too many instances of PrismaClient
// in a serverless environment, which would exhaust the database connection pool.

const prismaClientSingleton = () => {
  const databaseUrl = new URL(process.env.DATABASE_URL);
  // pgbouncer=true disables prepared statements. That is required in the
  // pooler's TRANSACTION mode (:6543) but costs a re-plan on every query, so
  // only apply it when we are actually talking to that port.
  if (databaseUrl.port === "6543") {
    databaseUrl.searchParams.set("pgbouncer", "true");
  }
  databaseUrl.searchParams.set("connect_timeout", "15");

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });
};

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
