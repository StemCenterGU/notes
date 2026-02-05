
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Professor
 * 
 */
export type Professor = $Result.DefaultSelection<Prisma.$ProfessorPayload>
/**
 * Model Semester
 * 
 */
export type Semester = $Result.DefaultSelection<Prisma.$SemesterPayload>
/**
 * Model Note
 * 
 */
export type Note = $Result.DefaultSelection<Prisma.$NotePayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Raffle
 * 
 */
export type Raffle = $Result.DefaultSelection<Prisma.$RafflePayload>
/**
 * Model RafflePrize
 * 
 */
export type RafflePrize = $Result.DefaultSelection<Prisma.$RafflePrizePayload>
/**
 * Model RaffleEntry
 * 
 */
export type RaffleEntry = $Result.DefaultSelection<Prisma.$RaffleEntryPayload>
/**
 * Model UserCourses
 * 
 */
export type UserCourses = $Result.DefaultSelection<Prisma.$UserCoursesPayload>
/**
 * Model AccessCode
 * 
 */
export type AccessCode = $Result.DefaultSelection<Prisma.$AccessCodePayload>
/**
 * Model AccessCodeNote
 * 
 */
export type AccessCodeNote = $Result.DefaultSelection<Prisma.$AccessCodeNotePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STUDENT: 'STUDENT',
  PROFESSOR: 'PROFESSOR',
  ADMIN: 'ADMIN',
  TUTOR: 'TUTOR'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professor`: Exposes CRUD operations for the **Professor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Professors
    * const professors = await prisma.professor.findMany()
    * ```
    */
  get professor(): Prisma.ProfessorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.semester`: Exposes CRUD operations for the **Semester** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Semesters
    * const semesters = await prisma.semester.findMany()
    * ```
    */
  get semester(): Prisma.SemesterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.note.findMany()
    * ```
    */
  get note(): Prisma.NoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.raffle`: Exposes CRUD operations for the **Raffle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Raffles
    * const raffles = await prisma.raffle.findMany()
    * ```
    */
  get raffle(): Prisma.RaffleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rafflePrize`: Exposes CRUD operations for the **RafflePrize** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RafflePrizes
    * const rafflePrizes = await prisma.rafflePrize.findMany()
    * ```
    */
  get rafflePrize(): Prisma.RafflePrizeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.raffleEntry`: Exposes CRUD operations for the **RaffleEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RaffleEntries
    * const raffleEntries = await prisma.raffleEntry.findMany()
    * ```
    */
  get raffleEntry(): Prisma.RaffleEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCourses`: Exposes CRUD operations for the **UserCourses** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCourses
    * const userCourses = await prisma.userCourses.findMany()
    * ```
    */
  get userCourses(): Prisma.UserCoursesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessCode`: Exposes CRUD operations for the **AccessCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccessCodes
    * const accessCodes = await prisma.accessCode.findMany()
    * ```
    */
  get accessCode(): Prisma.AccessCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessCodeNote`: Exposes CRUD operations for the **AccessCodeNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccessCodeNotes
    * const accessCodeNotes = await prisma.accessCodeNote.findMany()
    * ```
    */
  get accessCodeNote(): Prisma.AccessCodeNoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Course: 'Course',
    Professor: 'Professor',
    Semester: 'Semester',
    Note: 'Note',
    Review: 'Review',
    Raffle: 'Raffle',
    RafflePrize: 'RafflePrize',
    RaffleEntry: 'RaffleEntry',
    UserCourses: 'UserCourses',
    AccessCode: 'AccessCode',
    AccessCodeNote: 'AccessCodeNote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "course" | "professor" | "semester" | "note" | "review" | "raffle" | "rafflePrize" | "raffleEntry" | "userCourses" | "accessCode" | "accessCodeNote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Professor: {
        payload: Prisma.$ProfessorPayload<ExtArgs>
        fields: Prisma.ProfessorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          findFirst: {
            args: Prisma.ProfessorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          findMany: {
            args: Prisma.ProfessorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          create: {
            args: Prisma.ProfessorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          createMany: {
            args: Prisma.ProfessorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          delete: {
            args: Prisma.ProfessorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          update: {
            args: Prisma.ProfessorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          deleteMany: {
            args: Prisma.ProfessorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          upsert: {
            args: Prisma.ProfessorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          aggregate: {
            args: Prisma.ProfessorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessor>
          }
          groupBy: {
            args: Prisma.ProfessorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessorCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessorCountAggregateOutputType> | number
          }
        }
      }
      Semester: {
        payload: Prisma.$SemesterPayload<ExtArgs>
        fields: Prisma.SemesterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SemesterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SemesterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          findFirst: {
            args: Prisma.SemesterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SemesterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          findMany: {
            args: Prisma.SemesterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>[]
          }
          create: {
            args: Prisma.SemesterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          createMany: {
            args: Prisma.SemesterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SemesterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>[]
          }
          delete: {
            args: Prisma.SemesterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          update: {
            args: Prisma.SemesterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          deleteMany: {
            args: Prisma.SemesterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SemesterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SemesterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>[]
          }
          upsert: {
            args: Prisma.SemesterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemesterPayload>
          }
          aggregate: {
            args: Prisma.SemesterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSemester>
          }
          groupBy: {
            args: Prisma.SemesterGroupByArgs<ExtArgs>
            result: $Utils.Optional<SemesterGroupByOutputType>[]
          }
          count: {
            args: Prisma.SemesterCountArgs<ExtArgs>
            result: $Utils.Optional<SemesterCountAggregateOutputType> | number
          }
        }
      }
      Note: {
        payload: Prisma.$NotePayload<ExtArgs>
        fields: Prisma.NoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findFirst: {
            args: Prisma.NoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findMany: {
            args: Prisma.NoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          create: {
            args: Prisma.NoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          createMany: {
            args: Prisma.NoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          delete: {
            args: Prisma.NoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          update: {
            args: Prisma.NoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          deleteMany: {
            args: Prisma.NoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          upsert: {
            args: Prisma.NoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          aggregate: {
            args: Prisma.NoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote>
          }
          groupBy: {
            args: Prisma.NoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteCountArgs<ExtArgs>
            result: $Utils.Optional<NoteCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Raffle: {
        payload: Prisma.$RafflePayload<ExtArgs>
        fields: Prisma.RaffleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RaffleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RaffleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>
          }
          findFirst: {
            args: Prisma.RaffleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RaffleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>
          }
          findMany: {
            args: Prisma.RaffleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>[]
          }
          create: {
            args: Prisma.RaffleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>
          }
          createMany: {
            args: Prisma.RaffleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RaffleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>[]
          }
          delete: {
            args: Prisma.RaffleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>
          }
          update: {
            args: Prisma.RaffleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>
          }
          deleteMany: {
            args: Prisma.RaffleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RaffleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RaffleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>[]
          }
          upsert: {
            args: Prisma.RaffleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePayload>
          }
          aggregate: {
            args: Prisma.RaffleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRaffle>
          }
          groupBy: {
            args: Prisma.RaffleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RaffleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RaffleCountArgs<ExtArgs>
            result: $Utils.Optional<RaffleCountAggregateOutputType> | number
          }
        }
      }
      RafflePrize: {
        payload: Prisma.$RafflePrizePayload<ExtArgs>
        fields: Prisma.RafflePrizeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RafflePrizeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RafflePrizeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>
          }
          findFirst: {
            args: Prisma.RafflePrizeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RafflePrizeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>
          }
          findMany: {
            args: Prisma.RafflePrizeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>[]
          }
          create: {
            args: Prisma.RafflePrizeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>
          }
          createMany: {
            args: Prisma.RafflePrizeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RafflePrizeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>[]
          }
          delete: {
            args: Prisma.RafflePrizeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>
          }
          update: {
            args: Prisma.RafflePrizeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>
          }
          deleteMany: {
            args: Prisma.RafflePrizeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RafflePrizeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RafflePrizeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>[]
          }
          upsert: {
            args: Prisma.RafflePrizeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RafflePrizePayload>
          }
          aggregate: {
            args: Prisma.RafflePrizeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRafflePrize>
          }
          groupBy: {
            args: Prisma.RafflePrizeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RafflePrizeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RafflePrizeCountArgs<ExtArgs>
            result: $Utils.Optional<RafflePrizeCountAggregateOutputType> | number
          }
        }
      }
      RaffleEntry: {
        payload: Prisma.$RaffleEntryPayload<ExtArgs>
        fields: Prisma.RaffleEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RaffleEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RaffleEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>
          }
          findFirst: {
            args: Prisma.RaffleEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RaffleEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>
          }
          findMany: {
            args: Prisma.RaffleEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>[]
          }
          create: {
            args: Prisma.RaffleEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>
          }
          createMany: {
            args: Prisma.RaffleEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RaffleEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>[]
          }
          delete: {
            args: Prisma.RaffleEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>
          }
          update: {
            args: Prisma.RaffleEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>
          }
          deleteMany: {
            args: Prisma.RaffleEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RaffleEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RaffleEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>[]
          }
          upsert: {
            args: Prisma.RaffleEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaffleEntryPayload>
          }
          aggregate: {
            args: Prisma.RaffleEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRaffleEntry>
          }
          groupBy: {
            args: Prisma.RaffleEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RaffleEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RaffleEntryCountArgs<ExtArgs>
            result: $Utils.Optional<RaffleEntryCountAggregateOutputType> | number
          }
        }
      }
      UserCourses: {
        payload: Prisma.$UserCoursesPayload<ExtArgs>
        fields: Prisma.UserCoursesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCoursesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCoursesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>
          }
          findFirst: {
            args: Prisma.UserCoursesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCoursesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>
          }
          findMany: {
            args: Prisma.UserCoursesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>[]
          }
          create: {
            args: Prisma.UserCoursesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>
          }
          createMany: {
            args: Prisma.UserCoursesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCoursesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>[]
          }
          delete: {
            args: Prisma.UserCoursesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>
          }
          update: {
            args: Prisma.UserCoursesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>
          }
          deleteMany: {
            args: Prisma.UserCoursesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCoursesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserCoursesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>[]
          }
          upsert: {
            args: Prisma.UserCoursesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCoursesPayload>
          }
          aggregate: {
            args: Prisma.UserCoursesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCourses>
          }
          groupBy: {
            args: Prisma.UserCoursesGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCoursesGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCoursesCountArgs<ExtArgs>
            result: $Utils.Optional<UserCoursesCountAggregateOutputType> | number
          }
        }
      }
      AccessCode: {
        payload: Prisma.$AccessCodePayload<ExtArgs>
        fields: Prisma.AccessCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>
          }
          findFirst: {
            args: Prisma.AccessCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>
          }
          findMany: {
            args: Prisma.AccessCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>[]
          }
          create: {
            args: Prisma.AccessCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>
          }
          createMany: {
            args: Prisma.AccessCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>[]
          }
          delete: {
            args: Prisma.AccessCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>
          }
          update: {
            args: Prisma.AccessCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>
          }
          deleteMany: {
            args: Prisma.AccessCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccessCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>[]
          }
          upsert: {
            args: Prisma.AccessCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodePayload>
          }
          aggregate: {
            args: Prisma.AccessCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessCode>
          }
          groupBy: {
            args: Prisma.AccessCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessCodeCountArgs<ExtArgs>
            result: $Utils.Optional<AccessCodeCountAggregateOutputType> | number
          }
        }
      }
      AccessCodeNote: {
        payload: Prisma.$AccessCodeNotePayload<ExtArgs>
        fields: Prisma.AccessCodeNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessCodeNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessCodeNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>
          }
          findFirst: {
            args: Prisma.AccessCodeNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessCodeNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>
          }
          findMany: {
            args: Prisma.AccessCodeNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>[]
          }
          create: {
            args: Prisma.AccessCodeNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>
          }
          createMany: {
            args: Prisma.AccessCodeNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessCodeNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>[]
          }
          delete: {
            args: Prisma.AccessCodeNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>
          }
          update: {
            args: Prisma.AccessCodeNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>
          }
          deleteMany: {
            args: Prisma.AccessCodeNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessCodeNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccessCodeNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>[]
          }
          upsert: {
            args: Prisma.AccessCodeNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessCodeNotePayload>
          }
          aggregate: {
            args: Prisma.AccessCodeNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessCodeNote>
          }
          groupBy: {
            args: Prisma.AccessCodeNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessCodeNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessCodeNoteCountArgs<ExtArgs>
            result: $Utils.Optional<AccessCodeNoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    course?: CourseOmit
    professor?: ProfessorOmit
    semester?: SemesterOmit
    note?: NoteOmit
    review?: ReviewOmit
    raffle?: RaffleOmit
    rafflePrize?: RafflePrizeOmit
    raffleEntry?: RaffleEntryOmit
    userCourses?: UserCoursesOmit
    accessCode?: AccessCodeOmit
    accessCodeNote?: AccessCodeNoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    notes: number
    reviews: number
    raffleEntries: number
    UserCourses: number
    createdCourses: number
    createdProfessors: number
    createdSemesters: number
    createdAccessCodes: number
    verifiedNotes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | UserCountOutputTypeCountNotesArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
    raffleEntries?: boolean | UserCountOutputTypeCountRaffleEntriesArgs
    UserCourses?: boolean | UserCountOutputTypeCountUserCoursesArgs
    createdCourses?: boolean | UserCountOutputTypeCountCreatedCoursesArgs
    createdProfessors?: boolean | UserCountOutputTypeCountCreatedProfessorsArgs
    createdSemesters?: boolean | UserCountOutputTypeCountCreatedSemestersArgs
    createdAccessCodes?: boolean | UserCountOutputTypeCountCreatedAccessCodesArgs
    verifiedNotes?: boolean | UserCountOutputTypeCountVerifiedNotesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRaffleEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaffleEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCoursesWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedProfessorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedSemestersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SemesterWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedAccessCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVerifiedNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    notes: number
    UserCourses: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | CourseCountOutputTypeCountNotesArgs
    UserCourses?: boolean | CourseCountOutputTypeCountUserCoursesArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountUserCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCoursesWhereInput
  }


  /**
   * Count Type ProfessorCountOutputType
   */

  export type ProfessorCountOutputType = {
    courses: number
  }

  export type ProfessorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | ProfessorCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * ProfessorCountOutputType without action
   */
  export type ProfessorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessorCountOutputType
     */
    select?: ProfessorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfessorCountOutputType without action
   */
  export type ProfessorCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type SemesterCountOutputType
   */

  export type SemesterCountOutputType = {
    notes: number
  }

  export type SemesterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | SemesterCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * SemesterCountOutputType without action
   */
  export type SemesterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemesterCountOutputType
     */
    select?: SemesterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SemesterCountOutputType without action
   */
  export type SemesterCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }


  /**
   * Count Type NoteCountOutputType
   */

  export type NoteCountOutputType = {
    reviews: number
    raffleEntries: number
    accessCodes: number
  }

  export type NoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | NoteCountOutputTypeCountReviewsArgs
    raffleEntries?: boolean | NoteCountOutputTypeCountRaffleEntriesArgs
    accessCodes?: boolean | NoteCountOutputTypeCountAccessCodesArgs
  }

  // Custom InputTypes
  /**
   * NoteCountOutputType without action
   */
  export type NoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteCountOutputType
     */
    select?: NoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NoteCountOutputType without action
   */
  export type NoteCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * NoteCountOutputType without action
   */
  export type NoteCountOutputTypeCountRaffleEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaffleEntryWhereInput
  }

  /**
   * NoteCountOutputType without action
   */
  export type NoteCountOutputTypeCountAccessCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessCodeNoteWhereInput
  }


  /**
   * Count Type RaffleCountOutputType
   */

  export type RaffleCountOutputType = {
    raffle_prizes: number
    entries: number
  }

  export type RaffleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raffle_prizes?: boolean | RaffleCountOutputTypeCountRaffle_prizesArgs
    entries?: boolean | RaffleCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * RaffleCountOutputType without action
   */
  export type RaffleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleCountOutputType
     */
    select?: RaffleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RaffleCountOutputType without action
   */
  export type RaffleCountOutputTypeCountRaffle_prizesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RafflePrizeWhereInput
  }

  /**
   * RaffleCountOutputType without action
   */
  export type RaffleCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaffleEntryWhereInput
  }


  /**
   * Count Type AccessCodeCountOutputType
   */

  export type AccessCodeCountOutputType = {
    notes: number
  }

  export type AccessCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | AccessCodeCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * AccessCodeCountOutputType without action
   */
  export type AccessCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeCountOutputType
     */
    select?: AccessCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccessCodeCountOutputType without action
   */
  export type AccessCodeCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessCodeNoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    kudosPoints: number | null
  }

  export type UserSumAggregateOutputType = {
    kudosPoints: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.Role | null
    supabaseId: string | null
    kudosPoints: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.Role | null
    supabaseId: string | null
    kudosPoints: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    supabaseId: number
    kudosPoints: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    kudosPoints?: true
  }

  export type UserSumAggregateInputType = {
    kudosPoints?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    supabaseId?: true
    kudosPoints?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    supabaseId?: true
    kudosPoints?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    supabaseId?: true
    kudosPoints?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    role: $Enums.Role
    supabaseId: string
    kudosPoints: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    supabaseId?: boolean
    kudosPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    notes?: boolean | User$notesArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    raffleEntries?: boolean | User$raffleEntriesArgs<ExtArgs>
    UserCourses?: boolean | User$UserCoursesArgs<ExtArgs>
    createdCourses?: boolean | User$createdCoursesArgs<ExtArgs>
    createdProfessors?: boolean | User$createdProfessorsArgs<ExtArgs>
    createdSemesters?: boolean | User$createdSemestersArgs<ExtArgs>
    createdAccessCodes?: boolean | User$createdAccessCodesArgs<ExtArgs>
    verifiedNotes?: boolean | User$verifiedNotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    supabaseId?: boolean
    kudosPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    supabaseId?: boolean
    kudosPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    supabaseId?: boolean
    kudosPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "role" | "supabaseId" | "kudosPoints" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | User$notesArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    raffleEntries?: boolean | User$raffleEntriesArgs<ExtArgs>
    UserCourses?: boolean | User$UserCoursesArgs<ExtArgs>
    createdCourses?: boolean | User$createdCoursesArgs<ExtArgs>
    createdProfessors?: boolean | User$createdProfessorsArgs<ExtArgs>
    createdSemesters?: boolean | User$createdSemestersArgs<ExtArgs>
    createdAccessCodes?: boolean | User$createdAccessCodesArgs<ExtArgs>
    verifiedNotes?: boolean | User$verifiedNotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      notes: Prisma.$NotePayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      raffleEntries: Prisma.$RaffleEntryPayload<ExtArgs>[]
      UserCourses: Prisma.$UserCoursesPayload<ExtArgs>[]
      createdCourses: Prisma.$CoursePayload<ExtArgs>[]
      createdProfessors: Prisma.$ProfessorPayload<ExtArgs>[]
      createdSemesters: Prisma.$SemesterPayload<ExtArgs>[]
      createdAccessCodes: Prisma.$AccessCodePayload<ExtArgs>[]
      verifiedNotes: Prisma.$NotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      role: $Enums.Role
      supabaseId: string
      kudosPoints: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends User$notesArgs<ExtArgs> = {}>(args?: Subset<T, User$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    raffleEntries<T extends User$raffleEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$raffleEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    UserCourses<T extends User$UserCoursesArgs<ExtArgs> = {}>(args?: Subset<T, User$UserCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdCourses<T extends User$createdCoursesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdProfessors<T extends User$createdProfessorsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdProfessorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdSemesters<T extends User$createdSemestersArgs<ExtArgs> = {}>(args?: Subset<T, User$createdSemestersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdAccessCodes<T extends User$createdAccessCodesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdAccessCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    verifiedNotes<T extends User$verifiedNotesArgs<ExtArgs> = {}>(args?: Subset<T, User$verifiedNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly supabaseId: FieldRef<"User", 'String'>
    readonly kudosPoints: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.notes
   */
  export type User$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.raffleEntries
   */
  export type User$raffleEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    where?: RaffleEntryWhereInput
    orderBy?: RaffleEntryOrderByWithRelationInput | RaffleEntryOrderByWithRelationInput[]
    cursor?: RaffleEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RaffleEntryScalarFieldEnum | RaffleEntryScalarFieldEnum[]
  }

  /**
   * User.UserCourses
   */
  export type User$UserCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    where?: UserCoursesWhereInput
    orderBy?: UserCoursesOrderByWithRelationInput | UserCoursesOrderByWithRelationInput[]
    cursor?: UserCoursesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCoursesScalarFieldEnum | UserCoursesScalarFieldEnum[]
  }

  /**
   * User.createdCourses
   */
  export type User$createdCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * User.createdProfessors
   */
  export type User$createdProfessorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    where?: ProfessorWhereInput
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    cursor?: ProfessorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * User.createdSemesters
   */
  export type User$createdSemestersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    where?: SemesterWhereInput
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    cursor?: SemesterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SemesterScalarFieldEnum | SemesterScalarFieldEnum[]
  }

  /**
   * User.createdAccessCodes
   */
  export type User$createdAccessCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    where?: AccessCodeWhereInput
    orderBy?: AccessCodeOrderByWithRelationInput | AccessCodeOrderByWithRelationInput[]
    cursor?: AccessCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccessCodeScalarFieldEnum | AccessCodeScalarFieldEnum[]
  }

  /**
   * User.verifiedNotes
   */
  export type User$verifiedNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    professorId: string | null
    createdAt: Date | null
    createdById: string | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    professorId: string | null
    createdAt: Date | null
    createdById: string | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    name: number
    code: number
    professorId: number
    createdAt: number
    createdById: number
    _all: number
  }


  export type CourseMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    professorId?: true
    createdAt?: true
    createdById?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    professorId?: true
    createdAt?: true
    createdById?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    professorId?: true
    createdAt?: true
    createdById?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    name: string
    code: string
    professorId: string | null
    createdAt: Date
    createdById: string
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    professorId?: boolean
    createdAt?: boolean
    createdById?: boolean
    professor?: boolean | Course$professorArgs<ExtArgs>
    notes?: boolean | Course$notesArgs<ExtArgs>
    UserCourses?: boolean | Course$UserCoursesArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    professorId?: boolean
    createdAt?: boolean
    createdById?: boolean
    professor?: boolean | Course$professorArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    professorId?: boolean
    createdAt?: boolean
    createdById?: boolean
    professor?: boolean | Course$professorArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    professorId?: boolean
    createdAt?: boolean
    createdById?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "professorId" | "createdAt" | "createdById", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professor?: boolean | Course$professorArgs<ExtArgs>
    notes?: boolean | Course$notesArgs<ExtArgs>
    UserCourses?: boolean | Course$UserCoursesArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professor?: boolean | Course$professorArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professor?: boolean | Course$professorArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      professor: Prisma.$ProfessorPayload<ExtArgs> | null
      notes: Prisma.$NotePayload<ExtArgs>[]
      UserCourses: Prisma.$UserCoursesPayload<ExtArgs>[]
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      professorId: string | null
      createdAt: Date
      createdById: string
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professor<T extends Course$professorArgs<ExtArgs> = {}>(args?: Subset<T, Course$professorArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    notes<T extends Course$notesArgs<ExtArgs> = {}>(args?: Subset<T, Course$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    UserCourses<T extends Course$UserCoursesArgs<ExtArgs> = {}>(args?: Subset<T, Course$UserCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly name: FieldRef<"Course", 'String'>
    readonly code: FieldRef<"Course", 'String'>
    readonly professorId: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly createdById: FieldRef<"Course", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.professor
   */
  export type Course$professorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    where?: ProfessorWhereInput
  }

  /**
   * Course.notes
   */
  export type Course$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Course.UserCourses
   */
  export type Course$UserCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    where?: UserCoursesWhereInput
    orderBy?: UserCoursesOrderByWithRelationInput | UserCoursesOrderByWithRelationInput[]
    cursor?: UserCoursesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCoursesScalarFieldEnum | UserCoursesScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Professor
   */

  export type AggregateProfessor = {
    _count: ProfessorCountAggregateOutputType | null
    _min: ProfessorMinAggregateOutputType | null
    _max: ProfessorMaxAggregateOutputType | null
  }

  export type ProfessorMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    createdById: string | null
  }

  export type ProfessorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    createdById: string | null
  }

  export type ProfessorCountAggregateOutputType = {
    id: number
    name: number
    email: number
    createdById: number
    _all: number
  }


  export type ProfessorMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdById?: true
  }

  export type ProfessorMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdById?: true
  }

  export type ProfessorCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdById?: true
    _all?: true
  }

  export type ProfessorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professor to aggregate.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Professors
    **/
    _count?: true | ProfessorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessorMaxAggregateInputType
  }

  export type GetProfessorAggregateType<T extends ProfessorAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessor[P]>
      : GetScalarType<T[P], AggregateProfessor[P]>
  }




  export type ProfessorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessorWhereInput
    orderBy?: ProfessorOrderByWithAggregationInput | ProfessorOrderByWithAggregationInput[]
    by: ProfessorScalarFieldEnum[] | ProfessorScalarFieldEnum
    having?: ProfessorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessorCountAggregateInputType | true
    _min?: ProfessorMinAggregateInputType
    _max?: ProfessorMaxAggregateInputType
  }

  export type ProfessorGroupByOutputType = {
    id: string
    name: string
    email: string | null
    createdById: string
    _count: ProfessorCountAggregateOutputType | null
    _min: ProfessorMinAggregateOutputType | null
    _max: ProfessorMaxAggregateOutputType | null
  }

  type GetProfessorGroupByPayload<T extends ProfessorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessorGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessorGroupByOutputType[P]>
        }
      >
    >


  export type ProfessorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    createdById?: boolean
    courses?: boolean | Professor$coursesArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProfessorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    createdById?: boolean
  }

  export type ProfessorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "createdById", ExtArgs["result"]["professor"]>
  export type ProfessorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Professor$coursesArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProfessorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfessorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfessorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfessorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Professor"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      createdById: string
    }, ExtArgs["result"]["professor"]>
    composites: {}
  }

  type ProfessorGetPayload<S extends boolean | null | undefined | ProfessorDefaultArgs> = $Result.GetResult<Prisma.$ProfessorPayload, S>

  type ProfessorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessorCountAggregateInputType | true
    }

  export interface ProfessorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Professor'], meta: { name: 'Professor' } }
    /**
     * Find zero or one Professor that matches the filter.
     * @param {ProfessorFindUniqueArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessorFindUniqueArgs>(args: SelectSubset<T, ProfessorFindUniqueArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Professor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessorFindUniqueOrThrowArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessorFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindFirstArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessorFindFirstArgs>(args?: SelectSubset<T, ProfessorFindFirstArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindFirstOrThrowArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessorFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Professors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Professors
     * const professors = await prisma.professor.findMany()
     * 
     * // Get first 10 Professors
     * const professors = await prisma.professor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professorWithIdOnly = await prisma.professor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessorFindManyArgs>(args?: SelectSubset<T, ProfessorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Professor.
     * @param {ProfessorCreateArgs} args - Arguments to create a Professor.
     * @example
     * // Create one Professor
     * const Professor = await prisma.professor.create({
     *   data: {
     *     // ... data to create a Professor
     *   }
     * })
     * 
     */
    create<T extends ProfessorCreateArgs>(args: SelectSubset<T, ProfessorCreateArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Professors.
     * @param {ProfessorCreateManyArgs} args - Arguments to create many Professors.
     * @example
     * // Create many Professors
     * const professor = await prisma.professor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessorCreateManyArgs>(args?: SelectSubset<T, ProfessorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Professors and returns the data saved in the database.
     * @param {ProfessorCreateManyAndReturnArgs} args - Arguments to create many Professors.
     * @example
     * // Create many Professors
     * const professor = await prisma.professor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Professors and only return the `id`
     * const professorWithIdOnly = await prisma.professor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessorCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Professor.
     * @param {ProfessorDeleteArgs} args - Arguments to delete one Professor.
     * @example
     * // Delete one Professor
     * const Professor = await prisma.professor.delete({
     *   where: {
     *     // ... filter to delete one Professor
     *   }
     * })
     * 
     */
    delete<T extends ProfessorDeleteArgs>(args: SelectSubset<T, ProfessorDeleteArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Professor.
     * @param {ProfessorUpdateArgs} args - Arguments to update one Professor.
     * @example
     * // Update one Professor
     * const professor = await prisma.professor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessorUpdateArgs>(args: SelectSubset<T, ProfessorUpdateArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Professors.
     * @param {ProfessorDeleteManyArgs} args - Arguments to filter Professors to delete.
     * @example
     * // Delete a few Professors
     * const { count } = await prisma.professor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessorDeleteManyArgs>(args?: SelectSubset<T, ProfessorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Professors
     * const professor = await prisma.professor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessorUpdateManyArgs>(args: SelectSubset<T, ProfessorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professors and returns the data updated in the database.
     * @param {ProfessorUpdateManyAndReturnArgs} args - Arguments to update many Professors.
     * @example
     * // Update many Professors
     * const professor = await prisma.professor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Professors and only return the `id`
     * const professorWithIdOnly = await prisma.professor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessorUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Professor.
     * @param {ProfessorUpsertArgs} args - Arguments to update or create a Professor.
     * @example
     * // Update or create a Professor
     * const professor = await prisma.professor.upsert({
     *   create: {
     *     // ... data to create a Professor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Professor we want to update
     *   }
     * })
     */
    upsert<T extends ProfessorUpsertArgs>(args: SelectSubset<T, ProfessorUpsertArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Professors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorCountArgs} args - Arguments to filter Professors to count.
     * @example
     * // Count the number of Professors
     * const count = await prisma.professor.count({
     *   where: {
     *     // ... the filter for the Professors we want to count
     *   }
     * })
    **/
    count<T extends ProfessorCountArgs>(
      args?: Subset<T, ProfessorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Professor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessorAggregateArgs>(args: Subset<T, ProfessorAggregateArgs>): Prisma.PrismaPromise<GetProfessorAggregateType<T>>

    /**
     * Group by Professor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessorGroupByArgs['orderBy'] }
        : { orderBy?: ProfessorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Professor model
   */
  readonly fields: ProfessorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Professor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Professor$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Professor$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Professor model
   */
  interface ProfessorFieldRefs {
    readonly id: FieldRef<"Professor", 'String'>
    readonly name: FieldRef<"Professor", 'String'>
    readonly email: FieldRef<"Professor", 'String'>
    readonly createdById: FieldRef<"Professor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Professor findUnique
   */
  export type ProfessorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor findUniqueOrThrow
   */
  export type ProfessorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor findFirst
   */
  export type ProfessorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor findFirstOrThrow
   */
  export type ProfessorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor findMany
   */
  export type ProfessorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professors to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor create
   */
  export type ProfessorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The data needed to create a Professor.
     */
    data: XOR<ProfessorCreateInput, ProfessorUncheckedCreateInput>
  }

  /**
   * Professor createMany
   */
  export type ProfessorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Professors.
     */
    data: ProfessorCreateManyInput | ProfessorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Professor createManyAndReturn
   */
  export type ProfessorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * The data used to create many Professors.
     */
    data: ProfessorCreateManyInput | ProfessorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Professor update
   */
  export type ProfessorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The data needed to update a Professor.
     */
    data: XOR<ProfessorUpdateInput, ProfessorUncheckedUpdateInput>
    /**
     * Choose, which Professor to update.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor updateMany
   */
  export type ProfessorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Professors.
     */
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyInput>
    /**
     * Filter which Professors to update
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to update.
     */
    limit?: number
  }

  /**
   * Professor updateManyAndReturn
   */
  export type ProfessorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * The data used to update Professors.
     */
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyInput>
    /**
     * Filter which Professors to update
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Professor upsert
   */
  export type ProfessorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The filter to search for the Professor to update in case it exists.
     */
    where: ProfessorWhereUniqueInput
    /**
     * In case the Professor found by the `where` argument doesn't exist, create a new Professor with this data.
     */
    create: XOR<ProfessorCreateInput, ProfessorUncheckedCreateInput>
    /**
     * In case the Professor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessorUpdateInput, ProfessorUncheckedUpdateInput>
  }

  /**
   * Professor delete
   */
  export type ProfessorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter which Professor to delete.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor deleteMany
   */
  export type ProfessorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professors to delete
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to delete.
     */
    limit?: number
  }

  /**
   * Professor.courses
   */
  export type Professor$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Professor without action
   */
  export type ProfessorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
  }


  /**
   * Model Semester
   */

  export type AggregateSemester = {
    _count: SemesterCountAggregateOutputType | null
    _avg: SemesterAvgAggregateOutputType | null
    _sum: SemesterSumAggregateOutputType | null
    _min: SemesterMinAggregateOutputType | null
    _max: SemesterMaxAggregateOutputType | null
  }

  export type SemesterAvgAggregateOutputType = {
    year: number | null
  }

  export type SemesterSumAggregateOutputType = {
    year: number | null
  }

  export type SemesterMinAggregateOutputType = {
    id: string | null
    name: string | null
    year: number | null
    createdById: string | null
  }

  export type SemesterMaxAggregateOutputType = {
    id: string | null
    name: string | null
    year: number | null
    createdById: string | null
  }

  export type SemesterCountAggregateOutputType = {
    id: number
    name: number
    year: number
    createdById: number
    _all: number
  }


  export type SemesterAvgAggregateInputType = {
    year?: true
  }

  export type SemesterSumAggregateInputType = {
    year?: true
  }

  export type SemesterMinAggregateInputType = {
    id?: true
    name?: true
    year?: true
    createdById?: true
  }

  export type SemesterMaxAggregateInputType = {
    id?: true
    name?: true
    year?: true
    createdById?: true
  }

  export type SemesterCountAggregateInputType = {
    id?: true
    name?: true
    year?: true
    createdById?: true
    _all?: true
  }

  export type SemesterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Semester to aggregate.
     */
    where?: SemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Semesters to fetch.
     */
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Semesters
    **/
    _count?: true | SemesterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SemesterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SemesterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SemesterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SemesterMaxAggregateInputType
  }

  export type GetSemesterAggregateType<T extends SemesterAggregateArgs> = {
        [P in keyof T & keyof AggregateSemester]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSemester[P]>
      : GetScalarType<T[P], AggregateSemester[P]>
  }




  export type SemesterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SemesterWhereInput
    orderBy?: SemesterOrderByWithAggregationInput | SemesterOrderByWithAggregationInput[]
    by: SemesterScalarFieldEnum[] | SemesterScalarFieldEnum
    having?: SemesterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SemesterCountAggregateInputType | true
    _avg?: SemesterAvgAggregateInputType
    _sum?: SemesterSumAggregateInputType
    _min?: SemesterMinAggregateInputType
    _max?: SemesterMaxAggregateInputType
  }

  export type SemesterGroupByOutputType = {
    id: string
    name: string
    year: number
    createdById: string
    _count: SemesterCountAggregateOutputType | null
    _avg: SemesterAvgAggregateOutputType | null
    _sum: SemesterSumAggregateOutputType | null
    _min: SemesterMinAggregateOutputType | null
    _max: SemesterMaxAggregateOutputType | null
  }

  type GetSemesterGroupByPayload<T extends SemesterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SemesterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SemesterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SemesterGroupByOutputType[P]>
            : GetScalarType<T[P], SemesterGroupByOutputType[P]>
        }
      >
    >


  export type SemesterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    year?: boolean
    createdById?: boolean
    notes?: boolean | Semester$notesArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | SemesterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["semester"]>

  export type SemesterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    year?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["semester"]>

  export type SemesterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    year?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["semester"]>

  export type SemesterSelectScalar = {
    id?: boolean
    name?: boolean
    year?: boolean
    createdById?: boolean
  }

  export type SemesterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "year" | "createdById", ExtArgs["result"]["semester"]>
  export type SemesterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | Semester$notesArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | SemesterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SemesterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SemesterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SemesterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Semester"
    objects: {
      notes: Prisma.$NotePayload<ExtArgs>[]
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      year: number
      createdById: string
    }, ExtArgs["result"]["semester"]>
    composites: {}
  }

  type SemesterGetPayload<S extends boolean | null | undefined | SemesterDefaultArgs> = $Result.GetResult<Prisma.$SemesterPayload, S>

  type SemesterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SemesterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SemesterCountAggregateInputType | true
    }

  export interface SemesterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Semester'], meta: { name: 'Semester' } }
    /**
     * Find zero or one Semester that matches the filter.
     * @param {SemesterFindUniqueArgs} args - Arguments to find a Semester
     * @example
     * // Get one Semester
     * const semester = await prisma.semester.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SemesterFindUniqueArgs>(args: SelectSubset<T, SemesterFindUniqueArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Semester that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SemesterFindUniqueOrThrowArgs} args - Arguments to find a Semester
     * @example
     * // Get one Semester
     * const semester = await prisma.semester.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SemesterFindUniqueOrThrowArgs>(args: SelectSubset<T, SemesterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Semester that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterFindFirstArgs} args - Arguments to find a Semester
     * @example
     * // Get one Semester
     * const semester = await prisma.semester.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SemesterFindFirstArgs>(args?: SelectSubset<T, SemesterFindFirstArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Semester that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterFindFirstOrThrowArgs} args - Arguments to find a Semester
     * @example
     * // Get one Semester
     * const semester = await prisma.semester.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SemesterFindFirstOrThrowArgs>(args?: SelectSubset<T, SemesterFindFirstOrThrowArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Semesters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Semesters
     * const semesters = await prisma.semester.findMany()
     * 
     * // Get first 10 Semesters
     * const semesters = await prisma.semester.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const semesterWithIdOnly = await prisma.semester.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SemesterFindManyArgs>(args?: SelectSubset<T, SemesterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Semester.
     * @param {SemesterCreateArgs} args - Arguments to create a Semester.
     * @example
     * // Create one Semester
     * const Semester = await prisma.semester.create({
     *   data: {
     *     // ... data to create a Semester
     *   }
     * })
     * 
     */
    create<T extends SemesterCreateArgs>(args: SelectSubset<T, SemesterCreateArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Semesters.
     * @param {SemesterCreateManyArgs} args - Arguments to create many Semesters.
     * @example
     * // Create many Semesters
     * const semester = await prisma.semester.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SemesterCreateManyArgs>(args?: SelectSubset<T, SemesterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Semesters and returns the data saved in the database.
     * @param {SemesterCreateManyAndReturnArgs} args - Arguments to create many Semesters.
     * @example
     * // Create many Semesters
     * const semester = await prisma.semester.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Semesters and only return the `id`
     * const semesterWithIdOnly = await prisma.semester.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SemesterCreateManyAndReturnArgs>(args?: SelectSubset<T, SemesterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Semester.
     * @param {SemesterDeleteArgs} args - Arguments to delete one Semester.
     * @example
     * // Delete one Semester
     * const Semester = await prisma.semester.delete({
     *   where: {
     *     // ... filter to delete one Semester
     *   }
     * })
     * 
     */
    delete<T extends SemesterDeleteArgs>(args: SelectSubset<T, SemesterDeleteArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Semester.
     * @param {SemesterUpdateArgs} args - Arguments to update one Semester.
     * @example
     * // Update one Semester
     * const semester = await prisma.semester.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SemesterUpdateArgs>(args: SelectSubset<T, SemesterUpdateArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Semesters.
     * @param {SemesterDeleteManyArgs} args - Arguments to filter Semesters to delete.
     * @example
     * // Delete a few Semesters
     * const { count } = await prisma.semester.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SemesterDeleteManyArgs>(args?: SelectSubset<T, SemesterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Semesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Semesters
     * const semester = await prisma.semester.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SemesterUpdateManyArgs>(args: SelectSubset<T, SemesterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Semesters and returns the data updated in the database.
     * @param {SemesterUpdateManyAndReturnArgs} args - Arguments to update many Semesters.
     * @example
     * // Update many Semesters
     * const semester = await prisma.semester.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Semesters and only return the `id`
     * const semesterWithIdOnly = await prisma.semester.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SemesterUpdateManyAndReturnArgs>(args: SelectSubset<T, SemesterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Semester.
     * @param {SemesterUpsertArgs} args - Arguments to update or create a Semester.
     * @example
     * // Update or create a Semester
     * const semester = await prisma.semester.upsert({
     *   create: {
     *     // ... data to create a Semester
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Semester we want to update
     *   }
     * })
     */
    upsert<T extends SemesterUpsertArgs>(args: SelectSubset<T, SemesterUpsertArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Semesters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterCountArgs} args - Arguments to filter Semesters to count.
     * @example
     * // Count the number of Semesters
     * const count = await prisma.semester.count({
     *   where: {
     *     // ... the filter for the Semesters we want to count
     *   }
     * })
    **/
    count<T extends SemesterCountArgs>(
      args?: Subset<T, SemesterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SemesterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Semester.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SemesterAggregateArgs>(args: Subset<T, SemesterAggregateArgs>): Prisma.PrismaPromise<GetSemesterAggregateType<T>>

    /**
     * Group by Semester.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemesterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SemesterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SemesterGroupByArgs['orderBy'] }
        : { orderBy?: SemesterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SemesterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSemesterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Semester model
   */
  readonly fields: SemesterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Semester.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SemesterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends Semester$notesArgs<ExtArgs> = {}>(args?: Subset<T, Semester$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Semester model
   */
  interface SemesterFieldRefs {
    readonly id: FieldRef<"Semester", 'String'>
    readonly name: FieldRef<"Semester", 'String'>
    readonly year: FieldRef<"Semester", 'Int'>
    readonly createdById: FieldRef<"Semester", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Semester findUnique
   */
  export type SemesterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semester to fetch.
     */
    where: SemesterWhereUniqueInput
  }

  /**
   * Semester findUniqueOrThrow
   */
  export type SemesterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semester to fetch.
     */
    where: SemesterWhereUniqueInput
  }

  /**
   * Semester findFirst
   */
  export type SemesterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semester to fetch.
     */
    where?: SemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Semesters to fetch.
     */
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Semesters.
     */
    cursor?: SemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Semesters.
     */
    distinct?: SemesterScalarFieldEnum | SemesterScalarFieldEnum[]
  }

  /**
   * Semester findFirstOrThrow
   */
  export type SemesterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semester to fetch.
     */
    where?: SemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Semesters to fetch.
     */
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Semesters.
     */
    cursor?: SemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Semesters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Semesters.
     */
    distinct?: SemesterScalarFieldEnum | SemesterScalarFieldEnum[]
  }

  /**
   * Semester findMany
   */
  export type SemesterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter, which Semesters to fetch.
     */
    where?: SemesterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Semesters to fetch.
     */
    orderBy?: SemesterOrderByWithRelationInput | SemesterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Semesters.
     */
    cursor?: SemesterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Semesters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Semesters.
     */
    skip?: number
    distinct?: SemesterScalarFieldEnum | SemesterScalarFieldEnum[]
  }

  /**
   * Semester create
   */
  export type SemesterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * The data needed to create a Semester.
     */
    data: XOR<SemesterCreateInput, SemesterUncheckedCreateInput>
  }

  /**
   * Semester createMany
   */
  export type SemesterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Semesters.
     */
    data: SemesterCreateManyInput | SemesterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Semester createManyAndReturn
   */
  export type SemesterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * The data used to create many Semesters.
     */
    data: SemesterCreateManyInput | SemesterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Semester update
   */
  export type SemesterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * The data needed to update a Semester.
     */
    data: XOR<SemesterUpdateInput, SemesterUncheckedUpdateInput>
    /**
     * Choose, which Semester to update.
     */
    where: SemesterWhereUniqueInput
  }

  /**
   * Semester updateMany
   */
  export type SemesterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Semesters.
     */
    data: XOR<SemesterUpdateManyMutationInput, SemesterUncheckedUpdateManyInput>
    /**
     * Filter which Semesters to update
     */
    where?: SemesterWhereInput
    /**
     * Limit how many Semesters to update.
     */
    limit?: number
  }

  /**
   * Semester updateManyAndReturn
   */
  export type SemesterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * The data used to update Semesters.
     */
    data: XOR<SemesterUpdateManyMutationInput, SemesterUncheckedUpdateManyInput>
    /**
     * Filter which Semesters to update
     */
    where?: SemesterWhereInput
    /**
     * Limit how many Semesters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Semester upsert
   */
  export type SemesterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * The filter to search for the Semester to update in case it exists.
     */
    where: SemesterWhereUniqueInput
    /**
     * In case the Semester found by the `where` argument doesn't exist, create a new Semester with this data.
     */
    create: XOR<SemesterCreateInput, SemesterUncheckedCreateInput>
    /**
     * In case the Semester was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SemesterUpdateInput, SemesterUncheckedUpdateInput>
  }

  /**
   * Semester delete
   */
  export type SemesterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    /**
     * Filter which Semester to delete.
     */
    where: SemesterWhereUniqueInput
  }

  /**
   * Semester deleteMany
   */
  export type SemesterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Semesters to delete
     */
    where?: SemesterWhereInput
    /**
     * Limit how many Semesters to delete.
     */
    limit?: number
  }

  /**
   * Semester.notes
   */
  export type Semester$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Semester without action
   */
  export type SemesterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
  }


  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  export type NoteMinAggregateOutputType = {
    id: string | null
    title: string | null
    createdAt: Date | null
    filePath: string | null
    fileType: string | null
    fileUrl: string | null
    uploaderId: string | null
    courseId: string | null
    description: string | null
    updatedAt: Date | null
    semesterId: string | null
    isVerified: boolean | null
    verifiedAt: Date | null
    verifiedById: string | null
  }

  export type NoteMaxAggregateOutputType = {
    id: string | null
    title: string | null
    createdAt: Date | null
    filePath: string | null
    fileType: string | null
    fileUrl: string | null
    uploaderId: string | null
    courseId: string | null
    description: string | null
    updatedAt: Date | null
    semesterId: string | null
    isVerified: boolean | null
    verifiedAt: Date | null
    verifiedById: string | null
  }

  export type NoteCountAggregateOutputType = {
    id: number
    title: number
    createdAt: number
    filePath: number
    fileType: number
    fileUrl: number
    uploaderId: number
    courseId: number
    description: number
    updatedAt: number
    semesterId: number
    isVerified: number
    verifiedAt: number
    verifiedById: number
    _all: number
  }


  export type NoteMinAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    filePath?: true
    fileType?: true
    fileUrl?: true
    uploaderId?: true
    courseId?: true
    description?: true
    updatedAt?: true
    semesterId?: true
    isVerified?: true
    verifiedAt?: true
    verifiedById?: true
  }

  export type NoteMaxAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    filePath?: true
    fileType?: true
    fileUrl?: true
    uploaderId?: true
    courseId?: true
    description?: true
    updatedAt?: true
    semesterId?: true
    isVerified?: true
    verifiedAt?: true
    verifiedById?: true
  }

  export type NoteCountAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    filePath?: true
    fileType?: true
    fileUrl?: true
    uploaderId?: true
    courseId?: true
    description?: true
    updatedAt?: true
    semesterId?: true
    isVerified?: true
    verifiedAt?: true
    verifiedById?: true
    _all?: true
  }

  export type NoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Note to aggregate.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notes
    **/
    _count?: true | NoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteMaxAggregateInputType
  }

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
        [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>
  }




  export type NoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithAggregationInput | NoteOrderByWithAggregationInput[]
    by: NoteScalarFieldEnum[] | NoteScalarFieldEnum
    having?: NoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteCountAggregateInputType | true
    _min?: NoteMinAggregateInputType
    _max?: NoteMaxAggregateInputType
  }

  export type NoteGroupByOutputType = {
    id: string
    title: string
    createdAt: Date
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description: string | null
    updatedAt: Date
    semesterId: string | null
    isVerified: boolean
    verifiedAt: Date | null
    verifiedById: string | null
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteGroupByOutputType[P]>
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
        }
      >
    >


  export type NoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    createdAt?: boolean
    filePath?: boolean
    fileType?: boolean
    fileUrl?: boolean
    uploaderId?: boolean
    courseId?: boolean
    description?: boolean
    updatedAt?: boolean
    semesterId?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedById?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    semester?: boolean | Note$semesterArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    verifiedBy?: boolean | Note$verifiedByArgs<ExtArgs>
    reviews?: boolean | Note$reviewsArgs<ExtArgs>
    raffleEntries?: boolean | Note$raffleEntriesArgs<ExtArgs>
    accessCodes?: boolean | Note$accessCodesArgs<ExtArgs>
    _count?: boolean | NoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    createdAt?: boolean
    filePath?: boolean
    fileType?: boolean
    fileUrl?: boolean
    uploaderId?: boolean
    courseId?: boolean
    description?: boolean
    updatedAt?: boolean
    semesterId?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedById?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    semester?: boolean | Note$semesterArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    verifiedBy?: boolean | Note$verifiedByArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    createdAt?: boolean
    filePath?: boolean
    fileType?: boolean
    fileUrl?: boolean
    uploaderId?: boolean
    courseId?: boolean
    description?: boolean
    updatedAt?: boolean
    semesterId?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedById?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    semester?: boolean | Note$semesterArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    verifiedBy?: boolean | Note$verifiedByArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectScalar = {
    id?: boolean
    title?: boolean
    createdAt?: boolean
    filePath?: boolean
    fileType?: boolean
    fileUrl?: boolean
    uploaderId?: boolean
    courseId?: boolean
    description?: boolean
    updatedAt?: boolean
    semesterId?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedById?: boolean
  }

  export type NoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "createdAt" | "filePath" | "fileType" | "fileUrl" | "uploaderId" | "courseId" | "description" | "updatedAt" | "semesterId" | "isVerified" | "verifiedAt" | "verifiedById", ExtArgs["result"]["note"]>
  export type NoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    semester?: boolean | Note$semesterArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    verifiedBy?: boolean | Note$verifiedByArgs<ExtArgs>
    reviews?: boolean | Note$reviewsArgs<ExtArgs>
    raffleEntries?: boolean | Note$raffleEntriesArgs<ExtArgs>
    accessCodes?: boolean | Note$accessCodesArgs<ExtArgs>
    _count?: boolean | NoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    semester?: boolean | Note$semesterArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    verifiedBy?: boolean | Note$verifiedByArgs<ExtArgs>
  }
  export type NoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    semester?: boolean | Note$semesterArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    verifiedBy?: boolean | Note$verifiedByArgs<ExtArgs>
  }

  export type $NotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Note"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      semester: Prisma.$SemesterPayload<ExtArgs> | null
      uploader: Prisma.$UserPayload<ExtArgs>
      verifiedBy: Prisma.$UserPayload<ExtArgs> | null
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      raffleEntries: Prisma.$RaffleEntryPayload<ExtArgs>[]
      accessCodes: Prisma.$AccessCodeNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      createdAt: Date
      filePath: string
      fileType: string
      fileUrl: string
      uploaderId: string
      courseId: string
      description: string | null
      updatedAt: Date
      semesterId: string | null
      isVerified: boolean
      verifiedAt: Date | null
      verifiedById: string | null
    }, ExtArgs["result"]["note"]>
    composites: {}
  }

  type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = $Result.GetResult<Prisma.$NotePayload, S>

  type NoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoteCountAggregateInputType | true
    }

  export interface NoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Note'], meta: { name: 'Note' } }
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteFindUniqueArgs>(args: SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Note that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteFindUniqueOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteFindFirstArgs>(args?: SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteFindManyArgs>(args?: SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     * 
     */
    create<T extends NoteCreateArgs>(args: SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notes.
     * @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteCreateManyArgs>(args?: SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notes and returns the data saved in the database.
     * @param {NoteCreateManyAndReturnArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     * 
     */
    delete<T extends NoteDeleteArgs>(args: SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteUpdateArgs>(args: SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteDeleteManyArgs>(args?: SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteUpdateManyArgs>(args: SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes and returns the data updated in the database.
     * @param {NoteUpdateManyAndReturnArgs} args - Arguments to update many Notes.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NoteUpdateManyAndReturnArgs>(args: SelectSubset<T, NoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     */
    upsert<T extends NoteUpsertArgs>(args: SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoteAggregateArgs>(args: Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs['orderBy'] }
        : { orderBy?: NoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Note model
   */
  readonly fields: NoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    semester<T extends Note$semesterArgs<ExtArgs> = {}>(args?: Subset<T, Note$semesterArgs<ExtArgs>>): Prisma__SemesterClient<$Result.GetResult<Prisma.$SemesterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    uploader<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    verifiedBy<T extends Note$verifiedByArgs<ExtArgs> = {}>(args?: Subset<T, Note$verifiedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reviews<T extends Note$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Note$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    raffleEntries<T extends Note$raffleEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Note$raffleEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accessCodes<T extends Note$accessCodesArgs<ExtArgs> = {}>(args?: Subset<T, Note$accessCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Note model
   */
  interface NoteFieldRefs {
    readonly id: FieldRef<"Note", 'String'>
    readonly title: FieldRef<"Note", 'String'>
    readonly createdAt: FieldRef<"Note", 'DateTime'>
    readonly filePath: FieldRef<"Note", 'String'>
    readonly fileType: FieldRef<"Note", 'String'>
    readonly fileUrl: FieldRef<"Note", 'String'>
    readonly uploaderId: FieldRef<"Note", 'String'>
    readonly courseId: FieldRef<"Note", 'String'>
    readonly description: FieldRef<"Note", 'String'>
    readonly updatedAt: FieldRef<"Note", 'DateTime'>
    readonly semesterId: FieldRef<"Note", 'String'>
    readonly isVerified: FieldRef<"Note", 'Boolean'>
    readonly verifiedAt: FieldRef<"Note", 'DateTime'>
    readonly verifiedById: FieldRef<"Note", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findUniqueOrThrow
   */
  export type NoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findFirstOrThrow
   */
  export type NoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findMany
   */
  export type NoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Notes to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note create
   */
  export type NoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Note.
     */
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>
  }

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Note createManyAndReturn
   */
  export type NoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note update
   */
  export type NoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Note.
     */
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
    /**
     * Choose, which Note to update.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
  }

  /**
   * Note updateManyAndReturn
   */
  export type NoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note upsert
   */
  export type NoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Note to update in case it exists.
     */
    where: NoteWhereUniqueInput
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     */
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
  }

  /**
   * Note delete
   */
  export type NoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter which Note to delete.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notes to delete
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to delete.
     */
    limit?: number
  }

  /**
   * Note.semester
   */
  export type Note$semesterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Semester
     */
    select?: SemesterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Semester
     */
    omit?: SemesterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SemesterInclude<ExtArgs> | null
    where?: SemesterWhereInput
  }

  /**
   * Note.verifiedBy
   */
  export type Note$verifiedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Note.reviews
   */
  export type Note$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Note.raffleEntries
   */
  export type Note$raffleEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    where?: RaffleEntryWhereInput
    orderBy?: RaffleEntryOrderByWithRelationInput | RaffleEntryOrderByWithRelationInput[]
    cursor?: RaffleEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RaffleEntryScalarFieldEnum | RaffleEntryScalarFieldEnum[]
  }

  /**
   * Note.accessCodes
   */
  export type Note$accessCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    where?: AccessCodeNoteWhereInput
    orderBy?: AccessCodeNoteOrderByWithRelationInput | AccessCodeNoteOrderByWithRelationInput[]
    cursor?: AccessCodeNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccessCodeNoteScalarFieldEnum | AccessCodeNoteScalarFieldEnum[]
  }

  /**
   * Note without action
   */
  export type NoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    noteId: string | null
    userId: string | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    noteId: string | null
    userId: string | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    rating: number
    comment: number
    createdAt: number
    noteId: number
    userId: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    noteId?: true
    userId?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    noteId?: true
    userId?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    noteId?: true
    userId?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    rating: number
    comment: string | null
    createdAt: Date
    noteId: string
    userId: string
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    noteId?: boolean
    userId?: boolean
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    noteId?: boolean
    userId?: boolean
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    noteId?: boolean
    userId?: boolean
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    noteId?: boolean
    userId?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rating" | "comment" | "createdAt" | "noteId" | "userId", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      note: Prisma.$NotePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rating: number
      comment: string | null
      createdAt: Date
      noteId: string
      userId: string
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    note<T extends NoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NoteDefaultArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly noteId: FieldRef<"Review", 'String'>
    readonly userId: FieldRef<"Review", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model Raffle
   */

  export type AggregateRaffle = {
    _count: RaffleCountAggregateOutputType | null
    _min: RaffleMinAggregateOutputType | null
    _max: RaffleMaxAggregateOutputType | null
  }

  export type RaffleMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
  }

  export type RaffleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
  }

  export type RaffleCountAggregateOutputType = {
    id: number
    title: number
    description: number
    startTime: number
    endTime: number
    createdAt: number
    _all: number
  }


  export type RaffleMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    createdAt?: true
  }

  export type RaffleMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    createdAt?: true
  }

  export type RaffleCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    _all?: true
  }

  export type RaffleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Raffle to aggregate.
     */
    where?: RaffleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Raffles to fetch.
     */
    orderBy?: RaffleOrderByWithRelationInput | RaffleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RaffleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Raffles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Raffles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Raffles
    **/
    _count?: true | RaffleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RaffleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RaffleMaxAggregateInputType
  }

  export type GetRaffleAggregateType<T extends RaffleAggregateArgs> = {
        [P in keyof T & keyof AggregateRaffle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRaffle[P]>
      : GetScalarType<T[P], AggregateRaffle[P]>
  }




  export type RaffleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaffleWhereInput
    orderBy?: RaffleOrderByWithAggregationInput | RaffleOrderByWithAggregationInput[]
    by: RaffleScalarFieldEnum[] | RaffleScalarFieldEnum
    having?: RaffleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RaffleCountAggregateInputType | true
    _min?: RaffleMinAggregateInputType
    _max?: RaffleMaxAggregateInputType
  }

  export type RaffleGroupByOutputType = {
    id: string
    title: string
    description: string | null
    startTime: Date
    endTime: Date
    createdAt: Date
    _count: RaffleCountAggregateOutputType | null
    _min: RaffleMinAggregateOutputType | null
    _max: RaffleMaxAggregateOutputType | null
  }

  type GetRaffleGroupByPayload<T extends RaffleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RaffleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RaffleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RaffleGroupByOutputType[P]>
            : GetScalarType<T[P], RaffleGroupByOutputType[P]>
        }
      >
    >


  export type RaffleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    raffle_prizes?: boolean | Raffle$raffle_prizesArgs<ExtArgs>
    entries?: boolean | Raffle$entriesArgs<ExtArgs>
    _count?: boolean | RaffleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["raffle"]>

  export type RaffleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["raffle"]>

  export type RaffleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["raffle"]>

  export type RaffleSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
  }

  export type RaffleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "startTime" | "endTime" | "createdAt", ExtArgs["result"]["raffle"]>
  export type RaffleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raffle_prizes?: boolean | Raffle$raffle_prizesArgs<ExtArgs>
    entries?: boolean | Raffle$entriesArgs<ExtArgs>
    _count?: boolean | RaffleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RaffleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RaffleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RafflePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Raffle"
    objects: {
      raffle_prizes: Prisma.$RafflePrizePayload<ExtArgs>[]
      entries: Prisma.$RaffleEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      startTime: Date
      endTime: Date
      createdAt: Date
    }, ExtArgs["result"]["raffle"]>
    composites: {}
  }

  type RaffleGetPayload<S extends boolean | null | undefined | RaffleDefaultArgs> = $Result.GetResult<Prisma.$RafflePayload, S>

  type RaffleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RaffleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RaffleCountAggregateInputType | true
    }

  export interface RaffleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Raffle'], meta: { name: 'Raffle' } }
    /**
     * Find zero or one Raffle that matches the filter.
     * @param {RaffleFindUniqueArgs} args - Arguments to find a Raffle
     * @example
     * // Get one Raffle
     * const raffle = await prisma.raffle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RaffleFindUniqueArgs>(args: SelectSubset<T, RaffleFindUniqueArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Raffle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RaffleFindUniqueOrThrowArgs} args - Arguments to find a Raffle
     * @example
     * // Get one Raffle
     * const raffle = await prisma.raffle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RaffleFindUniqueOrThrowArgs>(args: SelectSubset<T, RaffleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Raffle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleFindFirstArgs} args - Arguments to find a Raffle
     * @example
     * // Get one Raffle
     * const raffle = await prisma.raffle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RaffleFindFirstArgs>(args?: SelectSubset<T, RaffleFindFirstArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Raffle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleFindFirstOrThrowArgs} args - Arguments to find a Raffle
     * @example
     * // Get one Raffle
     * const raffle = await prisma.raffle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RaffleFindFirstOrThrowArgs>(args?: SelectSubset<T, RaffleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Raffles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Raffles
     * const raffles = await prisma.raffle.findMany()
     * 
     * // Get first 10 Raffles
     * const raffles = await prisma.raffle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const raffleWithIdOnly = await prisma.raffle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RaffleFindManyArgs>(args?: SelectSubset<T, RaffleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Raffle.
     * @param {RaffleCreateArgs} args - Arguments to create a Raffle.
     * @example
     * // Create one Raffle
     * const Raffle = await prisma.raffle.create({
     *   data: {
     *     // ... data to create a Raffle
     *   }
     * })
     * 
     */
    create<T extends RaffleCreateArgs>(args: SelectSubset<T, RaffleCreateArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Raffles.
     * @param {RaffleCreateManyArgs} args - Arguments to create many Raffles.
     * @example
     * // Create many Raffles
     * const raffle = await prisma.raffle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RaffleCreateManyArgs>(args?: SelectSubset<T, RaffleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Raffles and returns the data saved in the database.
     * @param {RaffleCreateManyAndReturnArgs} args - Arguments to create many Raffles.
     * @example
     * // Create many Raffles
     * const raffle = await prisma.raffle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Raffles and only return the `id`
     * const raffleWithIdOnly = await prisma.raffle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RaffleCreateManyAndReturnArgs>(args?: SelectSubset<T, RaffleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Raffle.
     * @param {RaffleDeleteArgs} args - Arguments to delete one Raffle.
     * @example
     * // Delete one Raffle
     * const Raffle = await prisma.raffle.delete({
     *   where: {
     *     // ... filter to delete one Raffle
     *   }
     * })
     * 
     */
    delete<T extends RaffleDeleteArgs>(args: SelectSubset<T, RaffleDeleteArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Raffle.
     * @param {RaffleUpdateArgs} args - Arguments to update one Raffle.
     * @example
     * // Update one Raffle
     * const raffle = await prisma.raffle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RaffleUpdateArgs>(args: SelectSubset<T, RaffleUpdateArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Raffles.
     * @param {RaffleDeleteManyArgs} args - Arguments to filter Raffles to delete.
     * @example
     * // Delete a few Raffles
     * const { count } = await prisma.raffle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RaffleDeleteManyArgs>(args?: SelectSubset<T, RaffleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Raffles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Raffles
     * const raffle = await prisma.raffle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RaffleUpdateManyArgs>(args: SelectSubset<T, RaffleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Raffles and returns the data updated in the database.
     * @param {RaffleUpdateManyAndReturnArgs} args - Arguments to update many Raffles.
     * @example
     * // Update many Raffles
     * const raffle = await prisma.raffle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Raffles and only return the `id`
     * const raffleWithIdOnly = await prisma.raffle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RaffleUpdateManyAndReturnArgs>(args: SelectSubset<T, RaffleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Raffle.
     * @param {RaffleUpsertArgs} args - Arguments to update or create a Raffle.
     * @example
     * // Update or create a Raffle
     * const raffle = await prisma.raffle.upsert({
     *   create: {
     *     // ... data to create a Raffle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Raffle we want to update
     *   }
     * })
     */
    upsert<T extends RaffleUpsertArgs>(args: SelectSubset<T, RaffleUpsertArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Raffles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleCountArgs} args - Arguments to filter Raffles to count.
     * @example
     * // Count the number of Raffles
     * const count = await prisma.raffle.count({
     *   where: {
     *     // ... the filter for the Raffles we want to count
     *   }
     * })
    **/
    count<T extends RaffleCountArgs>(
      args?: Subset<T, RaffleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RaffleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Raffle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RaffleAggregateArgs>(args: Subset<T, RaffleAggregateArgs>): Prisma.PrismaPromise<GetRaffleAggregateType<T>>

    /**
     * Group by Raffle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RaffleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RaffleGroupByArgs['orderBy'] }
        : { orderBy?: RaffleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RaffleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRaffleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Raffle model
   */
  readonly fields: RaffleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Raffle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RaffleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    raffle_prizes<T extends Raffle$raffle_prizesArgs<ExtArgs> = {}>(args?: Subset<T, Raffle$raffle_prizesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entries<T extends Raffle$entriesArgs<ExtArgs> = {}>(args?: Subset<T, Raffle$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Raffle model
   */
  interface RaffleFieldRefs {
    readonly id: FieldRef<"Raffle", 'String'>
    readonly title: FieldRef<"Raffle", 'String'>
    readonly description: FieldRef<"Raffle", 'String'>
    readonly startTime: FieldRef<"Raffle", 'DateTime'>
    readonly endTime: FieldRef<"Raffle", 'DateTime'>
    readonly createdAt: FieldRef<"Raffle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Raffle findUnique
   */
  export type RaffleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * Filter, which Raffle to fetch.
     */
    where: RaffleWhereUniqueInput
  }

  /**
   * Raffle findUniqueOrThrow
   */
  export type RaffleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * Filter, which Raffle to fetch.
     */
    where: RaffleWhereUniqueInput
  }

  /**
   * Raffle findFirst
   */
  export type RaffleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * Filter, which Raffle to fetch.
     */
    where?: RaffleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Raffles to fetch.
     */
    orderBy?: RaffleOrderByWithRelationInput | RaffleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Raffles.
     */
    cursor?: RaffleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Raffles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Raffles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Raffles.
     */
    distinct?: RaffleScalarFieldEnum | RaffleScalarFieldEnum[]
  }

  /**
   * Raffle findFirstOrThrow
   */
  export type RaffleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * Filter, which Raffle to fetch.
     */
    where?: RaffleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Raffles to fetch.
     */
    orderBy?: RaffleOrderByWithRelationInput | RaffleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Raffles.
     */
    cursor?: RaffleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Raffles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Raffles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Raffles.
     */
    distinct?: RaffleScalarFieldEnum | RaffleScalarFieldEnum[]
  }

  /**
   * Raffle findMany
   */
  export type RaffleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * Filter, which Raffles to fetch.
     */
    where?: RaffleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Raffles to fetch.
     */
    orderBy?: RaffleOrderByWithRelationInput | RaffleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Raffles.
     */
    cursor?: RaffleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Raffles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Raffles.
     */
    skip?: number
    distinct?: RaffleScalarFieldEnum | RaffleScalarFieldEnum[]
  }

  /**
   * Raffle create
   */
  export type RaffleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * The data needed to create a Raffle.
     */
    data: XOR<RaffleCreateInput, RaffleUncheckedCreateInput>
  }

  /**
   * Raffle createMany
   */
  export type RaffleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Raffles.
     */
    data: RaffleCreateManyInput | RaffleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Raffle createManyAndReturn
   */
  export type RaffleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * The data used to create many Raffles.
     */
    data: RaffleCreateManyInput | RaffleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Raffle update
   */
  export type RaffleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * The data needed to update a Raffle.
     */
    data: XOR<RaffleUpdateInput, RaffleUncheckedUpdateInput>
    /**
     * Choose, which Raffle to update.
     */
    where: RaffleWhereUniqueInput
  }

  /**
   * Raffle updateMany
   */
  export type RaffleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Raffles.
     */
    data: XOR<RaffleUpdateManyMutationInput, RaffleUncheckedUpdateManyInput>
    /**
     * Filter which Raffles to update
     */
    where?: RaffleWhereInput
    /**
     * Limit how many Raffles to update.
     */
    limit?: number
  }

  /**
   * Raffle updateManyAndReturn
   */
  export type RaffleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * The data used to update Raffles.
     */
    data: XOR<RaffleUpdateManyMutationInput, RaffleUncheckedUpdateManyInput>
    /**
     * Filter which Raffles to update
     */
    where?: RaffleWhereInput
    /**
     * Limit how many Raffles to update.
     */
    limit?: number
  }

  /**
   * Raffle upsert
   */
  export type RaffleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * The filter to search for the Raffle to update in case it exists.
     */
    where: RaffleWhereUniqueInput
    /**
     * In case the Raffle found by the `where` argument doesn't exist, create a new Raffle with this data.
     */
    create: XOR<RaffleCreateInput, RaffleUncheckedCreateInput>
    /**
     * In case the Raffle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RaffleUpdateInput, RaffleUncheckedUpdateInput>
  }

  /**
   * Raffle delete
   */
  export type RaffleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
    /**
     * Filter which Raffle to delete.
     */
    where: RaffleWhereUniqueInput
  }

  /**
   * Raffle deleteMany
   */
  export type RaffleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Raffles to delete
     */
    where?: RaffleWhereInput
    /**
     * Limit how many Raffles to delete.
     */
    limit?: number
  }

  /**
   * Raffle.raffle_prizes
   */
  export type Raffle$raffle_prizesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    where?: RafflePrizeWhereInput
    orderBy?: RafflePrizeOrderByWithRelationInput | RafflePrizeOrderByWithRelationInput[]
    cursor?: RafflePrizeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RafflePrizeScalarFieldEnum | RafflePrizeScalarFieldEnum[]
  }

  /**
   * Raffle.entries
   */
  export type Raffle$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    where?: RaffleEntryWhereInput
    orderBy?: RaffleEntryOrderByWithRelationInput | RaffleEntryOrderByWithRelationInput[]
    cursor?: RaffleEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RaffleEntryScalarFieldEnum | RaffleEntryScalarFieldEnum[]
  }

  /**
   * Raffle without action
   */
  export type RaffleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Raffle
     */
    select?: RaffleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Raffle
     */
    omit?: RaffleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleInclude<ExtArgs> | null
  }


  /**
   * Model RafflePrize
   */

  export type AggregateRafflePrize = {
    _count: RafflePrizeCountAggregateOutputType | null
    _avg: RafflePrizeAvgAggregateOutputType | null
    _sum: RafflePrizeSumAggregateOutputType | null
    _min: RafflePrizeMinAggregateOutputType | null
    _max: RafflePrizeMaxAggregateOutputType | null
  }

  export type RafflePrizeAvgAggregateOutputType = {
    quantity: number | null
  }

  export type RafflePrizeSumAggregateOutputType = {
    quantity: number | null
  }

  export type RafflePrizeMinAggregateOutputType = {
    id: string | null
    raffleId: string | null
    name: string | null
    description: string | null
    imageUrl: string | null
    quantity: number | null
    size: string | null
    color: string | null
  }

  export type RafflePrizeMaxAggregateOutputType = {
    id: string | null
    raffleId: string | null
    name: string | null
    description: string | null
    imageUrl: string | null
    quantity: number | null
    size: string | null
    color: string | null
  }

  export type RafflePrizeCountAggregateOutputType = {
    id: number
    raffleId: number
    name: number
    description: number
    imageUrl: number
    quantity: number
    size: number
    color: number
    metadata: number
    _all: number
  }


  export type RafflePrizeAvgAggregateInputType = {
    quantity?: true
  }

  export type RafflePrizeSumAggregateInputType = {
    quantity?: true
  }

  export type RafflePrizeMinAggregateInputType = {
    id?: true
    raffleId?: true
    name?: true
    description?: true
    imageUrl?: true
    quantity?: true
    size?: true
    color?: true
  }

  export type RafflePrizeMaxAggregateInputType = {
    id?: true
    raffleId?: true
    name?: true
    description?: true
    imageUrl?: true
    quantity?: true
    size?: true
    color?: true
  }

  export type RafflePrizeCountAggregateInputType = {
    id?: true
    raffleId?: true
    name?: true
    description?: true
    imageUrl?: true
    quantity?: true
    size?: true
    color?: true
    metadata?: true
    _all?: true
  }

  export type RafflePrizeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RafflePrize to aggregate.
     */
    where?: RafflePrizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RafflePrizes to fetch.
     */
    orderBy?: RafflePrizeOrderByWithRelationInput | RafflePrizeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RafflePrizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RafflePrizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RafflePrizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RafflePrizes
    **/
    _count?: true | RafflePrizeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RafflePrizeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RafflePrizeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RafflePrizeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RafflePrizeMaxAggregateInputType
  }

  export type GetRafflePrizeAggregateType<T extends RafflePrizeAggregateArgs> = {
        [P in keyof T & keyof AggregateRafflePrize]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRafflePrize[P]>
      : GetScalarType<T[P], AggregateRafflePrize[P]>
  }




  export type RafflePrizeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RafflePrizeWhereInput
    orderBy?: RafflePrizeOrderByWithAggregationInput | RafflePrizeOrderByWithAggregationInput[]
    by: RafflePrizeScalarFieldEnum[] | RafflePrizeScalarFieldEnum
    having?: RafflePrizeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RafflePrizeCountAggregateInputType | true
    _avg?: RafflePrizeAvgAggregateInputType
    _sum?: RafflePrizeSumAggregateInputType
    _min?: RafflePrizeMinAggregateInputType
    _max?: RafflePrizeMaxAggregateInputType
  }

  export type RafflePrizeGroupByOutputType = {
    id: string
    raffleId: string
    name: string
    description: string | null
    imageUrl: string | null
    quantity: number
    size: string | null
    color: string | null
    metadata: JsonValue | null
    _count: RafflePrizeCountAggregateOutputType | null
    _avg: RafflePrizeAvgAggregateOutputType | null
    _sum: RafflePrizeSumAggregateOutputType | null
    _min: RafflePrizeMinAggregateOutputType | null
    _max: RafflePrizeMaxAggregateOutputType | null
  }

  type GetRafflePrizeGroupByPayload<T extends RafflePrizeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RafflePrizeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RafflePrizeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RafflePrizeGroupByOutputType[P]>
            : GetScalarType<T[P], RafflePrizeGroupByOutputType[P]>
        }
      >
    >


  export type RafflePrizeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    raffleId?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    quantity?: boolean
    size?: boolean
    color?: boolean
    metadata?: boolean
    raffles?: boolean | RaffleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rafflePrize"]>

  export type RafflePrizeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    raffleId?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    quantity?: boolean
    size?: boolean
    color?: boolean
    metadata?: boolean
    raffles?: boolean | RaffleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rafflePrize"]>

  export type RafflePrizeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    raffleId?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    quantity?: boolean
    size?: boolean
    color?: boolean
    metadata?: boolean
    raffles?: boolean | RaffleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rafflePrize"]>

  export type RafflePrizeSelectScalar = {
    id?: boolean
    raffleId?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    quantity?: boolean
    size?: boolean
    color?: boolean
    metadata?: boolean
  }

  export type RafflePrizeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "raffleId" | "name" | "description" | "imageUrl" | "quantity" | "size" | "color" | "metadata", ExtArgs["result"]["rafflePrize"]>
  export type RafflePrizeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raffles?: boolean | RaffleDefaultArgs<ExtArgs>
  }
  export type RafflePrizeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raffles?: boolean | RaffleDefaultArgs<ExtArgs>
  }
  export type RafflePrizeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raffles?: boolean | RaffleDefaultArgs<ExtArgs>
  }

  export type $RafflePrizePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RafflePrize"
    objects: {
      raffles: Prisma.$RafflePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      raffleId: string
      name: string
      description: string | null
      imageUrl: string | null
      quantity: number
      size: string | null
      color: string | null
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["rafflePrize"]>
    composites: {}
  }

  type RafflePrizeGetPayload<S extends boolean | null | undefined | RafflePrizeDefaultArgs> = $Result.GetResult<Prisma.$RafflePrizePayload, S>

  type RafflePrizeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RafflePrizeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RafflePrizeCountAggregateInputType | true
    }

  export interface RafflePrizeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RafflePrize'], meta: { name: 'RafflePrize' } }
    /**
     * Find zero or one RafflePrize that matches the filter.
     * @param {RafflePrizeFindUniqueArgs} args - Arguments to find a RafflePrize
     * @example
     * // Get one RafflePrize
     * const rafflePrize = await prisma.rafflePrize.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RafflePrizeFindUniqueArgs>(args: SelectSubset<T, RafflePrizeFindUniqueArgs<ExtArgs>>): Prisma__RafflePrizeClient<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RafflePrize that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RafflePrizeFindUniqueOrThrowArgs} args - Arguments to find a RafflePrize
     * @example
     * // Get one RafflePrize
     * const rafflePrize = await prisma.rafflePrize.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RafflePrizeFindUniqueOrThrowArgs>(args: SelectSubset<T, RafflePrizeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RafflePrizeClient<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RafflePrize that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RafflePrizeFindFirstArgs} args - Arguments to find a RafflePrize
     * @example
     * // Get one RafflePrize
     * const rafflePrize = await prisma.rafflePrize.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RafflePrizeFindFirstArgs>(args?: SelectSubset<T, RafflePrizeFindFirstArgs<ExtArgs>>): Prisma__RafflePrizeClient<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RafflePrize that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RafflePrizeFindFirstOrThrowArgs} args - Arguments to find a RafflePrize
     * @example
     * // Get one RafflePrize
     * const rafflePrize = await prisma.rafflePrize.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RafflePrizeFindFirstOrThrowArgs>(args?: SelectSubset<T, RafflePrizeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RafflePrizeClient<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RafflePrizes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RafflePrizeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RafflePrizes
     * const rafflePrizes = await prisma.rafflePrize.findMany()
     * 
     * // Get first 10 RafflePrizes
     * const rafflePrizes = await prisma.rafflePrize.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rafflePrizeWithIdOnly = await prisma.rafflePrize.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RafflePrizeFindManyArgs>(args?: SelectSubset<T, RafflePrizeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RafflePrize.
     * @param {RafflePrizeCreateArgs} args - Arguments to create a RafflePrize.
     * @example
     * // Create one RafflePrize
     * const RafflePrize = await prisma.rafflePrize.create({
     *   data: {
     *     // ... data to create a RafflePrize
     *   }
     * })
     * 
     */
    create<T extends RafflePrizeCreateArgs>(args: SelectSubset<T, RafflePrizeCreateArgs<ExtArgs>>): Prisma__RafflePrizeClient<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RafflePrizes.
     * @param {RafflePrizeCreateManyArgs} args - Arguments to create many RafflePrizes.
     * @example
     * // Create many RafflePrizes
     * const rafflePrize = await prisma.rafflePrize.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RafflePrizeCreateManyArgs>(args?: SelectSubset<T, RafflePrizeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RafflePrizes and returns the data saved in the database.
     * @param {RafflePrizeCreateManyAndReturnArgs} args - Arguments to create many RafflePrizes.
     * @example
     * // Create many RafflePrizes
     * const rafflePrize = await prisma.rafflePrize.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RafflePrizes and only return the `id`
     * const rafflePrizeWithIdOnly = await prisma.rafflePrize.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RafflePrizeCreateManyAndReturnArgs>(args?: SelectSubset<T, RafflePrizeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RafflePrize.
     * @param {RafflePrizeDeleteArgs} args - Arguments to delete one RafflePrize.
     * @example
     * // Delete one RafflePrize
     * const RafflePrize = await prisma.rafflePrize.delete({
     *   where: {
     *     // ... filter to delete one RafflePrize
     *   }
     * })
     * 
     */
    delete<T extends RafflePrizeDeleteArgs>(args: SelectSubset<T, RafflePrizeDeleteArgs<ExtArgs>>): Prisma__RafflePrizeClient<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RafflePrize.
     * @param {RafflePrizeUpdateArgs} args - Arguments to update one RafflePrize.
     * @example
     * // Update one RafflePrize
     * const rafflePrize = await prisma.rafflePrize.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RafflePrizeUpdateArgs>(args: SelectSubset<T, RafflePrizeUpdateArgs<ExtArgs>>): Prisma__RafflePrizeClient<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RafflePrizes.
     * @param {RafflePrizeDeleteManyArgs} args - Arguments to filter RafflePrizes to delete.
     * @example
     * // Delete a few RafflePrizes
     * const { count } = await prisma.rafflePrize.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RafflePrizeDeleteManyArgs>(args?: SelectSubset<T, RafflePrizeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RafflePrizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RafflePrizeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RafflePrizes
     * const rafflePrize = await prisma.rafflePrize.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RafflePrizeUpdateManyArgs>(args: SelectSubset<T, RafflePrizeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RafflePrizes and returns the data updated in the database.
     * @param {RafflePrizeUpdateManyAndReturnArgs} args - Arguments to update many RafflePrizes.
     * @example
     * // Update many RafflePrizes
     * const rafflePrize = await prisma.rafflePrize.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RafflePrizes and only return the `id`
     * const rafflePrizeWithIdOnly = await prisma.rafflePrize.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RafflePrizeUpdateManyAndReturnArgs>(args: SelectSubset<T, RafflePrizeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RafflePrize.
     * @param {RafflePrizeUpsertArgs} args - Arguments to update or create a RafflePrize.
     * @example
     * // Update or create a RafflePrize
     * const rafflePrize = await prisma.rafflePrize.upsert({
     *   create: {
     *     // ... data to create a RafflePrize
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RafflePrize we want to update
     *   }
     * })
     */
    upsert<T extends RafflePrizeUpsertArgs>(args: SelectSubset<T, RafflePrizeUpsertArgs<ExtArgs>>): Prisma__RafflePrizeClient<$Result.GetResult<Prisma.$RafflePrizePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RafflePrizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RafflePrizeCountArgs} args - Arguments to filter RafflePrizes to count.
     * @example
     * // Count the number of RafflePrizes
     * const count = await prisma.rafflePrize.count({
     *   where: {
     *     // ... the filter for the RafflePrizes we want to count
     *   }
     * })
    **/
    count<T extends RafflePrizeCountArgs>(
      args?: Subset<T, RafflePrizeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RafflePrizeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RafflePrize.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RafflePrizeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RafflePrizeAggregateArgs>(args: Subset<T, RafflePrizeAggregateArgs>): Prisma.PrismaPromise<GetRafflePrizeAggregateType<T>>

    /**
     * Group by RafflePrize.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RafflePrizeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RafflePrizeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RafflePrizeGroupByArgs['orderBy'] }
        : { orderBy?: RafflePrizeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RafflePrizeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRafflePrizeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RafflePrize model
   */
  readonly fields: RafflePrizeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RafflePrize.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RafflePrizeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    raffles<T extends RaffleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RaffleDefaultArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RafflePrize model
   */
  interface RafflePrizeFieldRefs {
    readonly id: FieldRef<"RafflePrize", 'String'>
    readonly raffleId: FieldRef<"RafflePrize", 'String'>
    readonly name: FieldRef<"RafflePrize", 'String'>
    readonly description: FieldRef<"RafflePrize", 'String'>
    readonly imageUrl: FieldRef<"RafflePrize", 'String'>
    readonly quantity: FieldRef<"RafflePrize", 'Int'>
    readonly size: FieldRef<"RafflePrize", 'String'>
    readonly color: FieldRef<"RafflePrize", 'String'>
    readonly metadata: FieldRef<"RafflePrize", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * RafflePrize findUnique
   */
  export type RafflePrizeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * Filter, which RafflePrize to fetch.
     */
    where: RafflePrizeWhereUniqueInput
  }

  /**
   * RafflePrize findUniqueOrThrow
   */
  export type RafflePrizeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * Filter, which RafflePrize to fetch.
     */
    where: RafflePrizeWhereUniqueInput
  }

  /**
   * RafflePrize findFirst
   */
  export type RafflePrizeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * Filter, which RafflePrize to fetch.
     */
    where?: RafflePrizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RafflePrizes to fetch.
     */
    orderBy?: RafflePrizeOrderByWithRelationInput | RafflePrizeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RafflePrizes.
     */
    cursor?: RafflePrizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RafflePrizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RafflePrizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RafflePrizes.
     */
    distinct?: RafflePrizeScalarFieldEnum | RafflePrizeScalarFieldEnum[]
  }

  /**
   * RafflePrize findFirstOrThrow
   */
  export type RafflePrizeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * Filter, which RafflePrize to fetch.
     */
    where?: RafflePrizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RafflePrizes to fetch.
     */
    orderBy?: RafflePrizeOrderByWithRelationInput | RafflePrizeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RafflePrizes.
     */
    cursor?: RafflePrizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RafflePrizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RafflePrizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RafflePrizes.
     */
    distinct?: RafflePrizeScalarFieldEnum | RafflePrizeScalarFieldEnum[]
  }

  /**
   * RafflePrize findMany
   */
  export type RafflePrizeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * Filter, which RafflePrizes to fetch.
     */
    where?: RafflePrizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RafflePrizes to fetch.
     */
    orderBy?: RafflePrizeOrderByWithRelationInput | RafflePrizeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RafflePrizes.
     */
    cursor?: RafflePrizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RafflePrizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RafflePrizes.
     */
    skip?: number
    distinct?: RafflePrizeScalarFieldEnum | RafflePrizeScalarFieldEnum[]
  }

  /**
   * RafflePrize create
   */
  export type RafflePrizeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * The data needed to create a RafflePrize.
     */
    data: XOR<RafflePrizeCreateInput, RafflePrizeUncheckedCreateInput>
  }

  /**
   * RafflePrize createMany
   */
  export type RafflePrizeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RafflePrizes.
     */
    data: RafflePrizeCreateManyInput | RafflePrizeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RafflePrize createManyAndReturn
   */
  export type RafflePrizeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * The data used to create many RafflePrizes.
     */
    data: RafflePrizeCreateManyInput | RafflePrizeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RafflePrize update
   */
  export type RafflePrizeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * The data needed to update a RafflePrize.
     */
    data: XOR<RafflePrizeUpdateInput, RafflePrizeUncheckedUpdateInput>
    /**
     * Choose, which RafflePrize to update.
     */
    where: RafflePrizeWhereUniqueInput
  }

  /**
   * RafflePrize updateMany
   */
  export type RafflePrizeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RafflePrizes.
     */
    data: XOR<RafflePrizeUpdateManyMutationInput, RafflePrizeUncheckedUpdateManyInput>
    /**
     * Filter which RafflePrizes to update
     */
    where?: RafflePrizeWhereInput
    /**
     * Limit how many RafflePrizes to update.
     */
    limit?: number
  }

  /**
   * RafflePrize updateManyAndReturn
   */
  export type RafflePrizeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * The data used to update RafflePrizes.
     */
    data: XOR<RafflePrizeUpdateManyMutationInput, RafflePrizeUncheckedUpdateManyInput>
    /**
     * Filter which RafflePrizes to update
     */
    where?: RafflePrizeWhereInput
    /**
     * Limit how many RafflePrizes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RafflePrize upsert
   */
  export type RafflePrizeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * The filter to search for the RafflePrize to update in case it exists.
     */
    where: RafflePrizeWhereUniqueInput
    /**
     * In case the RafflePrize found by the `where` argument doesn't exist, create a new RafflePrize with this data.
     */
    create: XOR<RafflePrizeCreateInput, RafflePrizeUncheckedCreateInput>
    /**
     * In case the RafflePrize was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RafflePrizeUpdateInput, RafflePrizeUncheckedUpdateInput>
  }

  /**
   * RafflePrize delete
   */
  export type RafflePrizeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
    /**
     * Filter which RafflePrize to delete.
     */
    where: RafflePrizeWhereUniqueInput
  }

  /**
   * RafflePrize deleteMany
   */
  export type RafflePrizeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RafflePrizes to delete
     */
    where?: RafflePrizeWhereInput
    /**
     * Limit how many RafflePrizes to delete.
     */
    limit?: number
  }

  /**
   * RafflePrize without action
   */
  export type RafflePrizeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RafflePrize
     */
    select?: RafflePrizeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RafflePrize
     */
    omit?: RafflePrizeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RafflePrizeInclude<ExtArgs> | null
  }


  /**
   * Model RaffleEntry
   */

  export type AggregateRaffleEntry = {
    _count: RaffleEntryCountAggregateOutputType | null
    _min: RaffleEntryMinAggregateOutputType | null
    _max: RaffleEntryMaxAggregateOutputType | null
  }

  export type RaffleEntryMinAggregateOutputType = {
    id: string | null
    raffleId: string | null
    userId: string | null
    noteId: string | null
    isWinner: boolean | null
    createdAt: Date | null
  }

  export type RaffleEntryMaxAggregateOutputType = {
    id: string | null
    raffleId: string | null
    userId: string | null
    noteId: string | null
    isWinner: boolean | null
    createdAt: Date | null
  }

  export type RaffleEntryCountAggregateOutputType = {
    id: number
    raffleId: number
    userId: number
    noteId: number
    isWinner: number
    createdAt: number
    _all: number
  }


  export type RaffleEntryMinAggregateInputType = {
    id?: true
    raffleId?: true
    userId?: true
    noteId?: true
    isWinner?: true
    createdAt?: true
  }

  export type RaffleEntryMaxAggregateInputType = {
    id?: true
    raffleId?: true
    userId?: true
    noteId?: true
    isWinner?: true
    createdAt?: true
  }

  export type RaffleEntryCountAggregateInputType = {
    id?: true
    raffleId?: true
    userId?: true
    noteId?: true
    isWinner?: true
    createdAt?: true
    _all?: true
  }

  export type RaffleEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RaffleEntry to aggregate.
     */
    where?: RaffleEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RaffleEntries to fetch.
     */
    orderBy?: RaffleEntryOrderByWithRelationInput | RaffleEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RaffleEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RaffleEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RaffleEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RaffleEntries
    **/
    _count?: true | RaffleEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RaffleEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RaffleEntryMaxAggregateInputType
  }

  export type GetRaffleEntryAggregateType<T extends RaffleEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateRaffleEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRaffleEntry[P]>
      : GetScalarType<T[P], AggregateRaffleEntry[P]>
  }




  export type RaffleEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaffleEntryWhereInput
    orderBy?: RaffleEntryOrderByWithAggregationInput | RaffleEntryOrderByWithAggregationInput[]
    by: RaffleEntryScalarFieldEnum[] | RaffleEntryScalarFieldEnum
    having?: RaffleEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RaffleEntryCountAggregateInputType | true
    _min?: RaffleEntryMinAggregateInputType
    _max?: RaffleEntryMaxAggregateInputType
  }

  export type RaffleEntryGroupByOutputType = {
    id: string
    raffleId: string
    userId: string
    noteId: string
    isWinner: boolean
    createdAt: Date
    _count: RaffleEntryCountAggregateOutputType | null
    _min: RaffleEntryMinAggregateOutputType | null
    _max: RaffleEntryMaxAggregateOutputType | null
  }

  type GetRaffleEntryGroupByPayload<T extends RaffleEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RaffleEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RaffleEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RaffleEntryGroupByOutputType[P]>
            : GetScalarType<T[P], RaffleEntryGroupByOutputType[P]>
        }
      >
    >


  export type RaffleEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    raffleId?: boolean
    userId?: boolean
    noteId?: boolean
    isWinner?: boolean
    createdAt?: boolean
    raffle?: boolean | RaffleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["raffleEntry"]>

  export type RaffleEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    raffleId?: boolean
    userId?: boolean
    noteId?: boolean
    isWinner?: boolean
    createdAt?: boolean
    raffle?: boolean | RaffleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["raffleEntry"]>

  export type RaffleEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    raffleId?: boolean
    userId?: boolean
    noteId?: boolean
    isWinner?: boolean
    createdAt?: boolean
    raffle?: boolean | RaffleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["raffleEntry"]>

  export type RaffleEntrySelectScalar = {
    id?: boolean
    raffleId?: boolean
    userId?: boolean
    noteId?: boolean
    isWinner?: boolean
    createdAt?: boolean
  }

  export type RaffleEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "raffleId" | "userId" | "noteId" | "isWinner" | "createdAt", ExtArgs["result"]["raffleEntry"]>
  export type RaffleEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raffle?: boolean | RaffleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }
  export type RaffleEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raffle?: boolean | RaffleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }
  export type RaffleEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raffle?: boolean | RaffleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }

  export type $RaffleEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RaffleEntry"
    objects: {
      raffle: Prisma.$RafflePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      note: Prisma.$NotePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      raffleId: string
      userId: string
      noteId: string
      isWinner: boolean
      createdAt: Date
    }, ExtArgs["result"]["raffleEntry"]>
    composites: {}
  }

  type RaffleEntryGetPayload<S extends boolean | null | undefined | RaffleEntryDefaultArgs> = $Result.GetResult<Prisma.$RaffleEntryPayload, S>

  type RaffleEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RaffleEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RaffleEntryCountAggregateInputType | true
    }

  export interface RaffleEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RaffleEntry'], meta: { name: 'RaffleEntry' } }
    /**
     * Find zero or one RaffleEntry that matches the filter.
     * @param {RaffleEntryFindUniqueArgs} args - Arguments to find a RaffleEntry
     * @example
     * // Get one RaffleEntry
     * const raffleEntry = await prisma.raffleEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RaffleEntryFindUniqueArgs>(args: SelectSubset<T, RaffleEntryFindUniqueArgs<ExtArgs>>): Prisma__RaffleEntryClient<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RaffleEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RaffleEntryFindUniqueOrThrowArgs} args - Arguments to find a RaffleEntry
     * @example
     * // Get one RaffleEntry
     * const raffleEntry = await prisma.raffleEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RaffleEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, RaffleEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RaffleEntryClient<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RaffleEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleEntryFindFirstArgs} args - Arguments to find a RaffleEntry
     * @example
     * // Get one RaffleEntry
     * const raffleEntry = await prisma.raffleEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RaffleEntryFindFirstArgs>(args?: SelectSubset<T, RaffleEntryFindFirstArgs<ExtArgs>>): Prisma__RaffleEntryClient<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RaffleEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleEntryFindFirstOrThrowArgs} args - Arguments to find a RaffleEntry
     * @example
     * // Get one RaffleEntry
     * const raffleEntry = await prisma.raffleEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RaffleEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, RaffleEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RaffleEntryClient<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RaffleEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RaffleEntries
     * const raffleEntries = await prisma.raffleEntry.findMany()
     * 
     * // Get first 10 RaffleEntries
     * const raffleEntries = await prisma.raffleEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const raffleEntryWithIdOnly = await prisma.raffleEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RaffleEntryFindManyArgs>(args?: SelectSubset<T, RaffleEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RaffleEntry.
     * @param {RaffleEntryCreateArgs} args - Arguments to create a RaffleEntry.
     * @example
     * // Create one RaffleEntry
     * const RaffleEntry = await prisma.raffleEntry.create({
     *   data: {
     *     // ... data to create a RaffleEntry
     *   }
     * })
     * 
     */
    create<T extends RaffleEntryCreateArgs>(args: SelectSubset<T, RaffleEntryCreateArgs<ExtArgs>>): Prisma__RaffleEntryClient<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RaffleEntries.
     * @param {RaffleEntryCreateManyArgs} args - Arguments to create many RaffleEntries.
     * @example
     * // Create many RaffleEntries
     * const raffleEntry = await prisma.raffleEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RaffleEntryCreateManyArgs>(args?: SelectSubset<T, RaffleEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RaffleEntries and returns the data saved in the database.
     * @param {RaffleEntryCreateManyAndReturnArgs} args - Arguments to create many RaffleEntries.
     * @example
     * // Create many RaffleEntries
     * const raffleEntry = await prisma.raffleEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RaffleEntries and only return the `id`
     * const raffleEntryWithIdOnly = await prisma.raffleEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RaffleEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, RaffleEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RaffleEntry.
     * @param {RaffleEntryDeleteArgs} args - Arguments to delete one RaffleEntry.
     * @example
     * // Delete one RaffleEntry
     * const RaffleEntry = await prisma.raffleEntry.delete({
     *   where: {
     *     // ... filter to delete one RaffleEntry
     *   }
     * })
     * 
     */
    delete<T extends RaffleEntryDeleteArgs>(args: SelectSubset<T, RaffleEntryDeleteArgs<ExtArgs>>): Prisma__RaffleEntryClient<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RaffleEntry.
     * @param {RaffleEntryUpdateArgs} args - Arguments to update one RaffleEntry.
     * @example
     * // Update one RaffleEntry
     * const raffleEntry = await prisma.raffleEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RaffleEntryUpdateArgs>(args: SelectSubset<T, RaffleEntryUpdateArgs<ExtArgs>>): Prisma__RaffleEntryClient<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RaffleEntries.
     * @param {RaffleEntryDeleteManyArgs} args - Arguments to filter RaffleEntries to delete.
     * @example
     * // Delete a few RaffleEntries
     * const { count } = await prisma.raffleEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RaffleEntryDeleteManyArgs>(args?: SelectSubset<T, RaffleEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RaffleEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RaffleEntries
     * const raffleEntry = await prisma.raffleEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RaffleEntryUpdateManyArgs>(args: SelectSubset<T, RaffleEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RaffleEntries and returns the data updated in the database.
     * @param {RaffleEntryUpdateManyAndReturnArgs} args - Arguments to update many RaffleEntries.
     * @example
     * // Update many RaffleEntries
     * const raffleEntry = await prisma.raffleEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RaffleEntries and only return the `id`
     * const raffleEntryWithIdOnly = await prisma.raffleEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RaffleEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, RaffleEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RaffleEntry.
     * @param {RaffleEntryUpsertArgs} args - Arguments to update or create a RaffleEntry.
     * @example
     * // Update or create a RaffleEntry
     * const raffleEntry = await prisma.raffleEntry.upsert({
     *   create: {
     *     // ... data to create a RaffleEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RaffleEntry we want to update
     *   }
     * })
     */
    upsert<T extends RaffleEntryUpsertArgs>(args: SelectSubset<T, RaffleEntryUpsertArgs<ExtArgs>>): Prisma__RaffleEntryClient<$Result.GetResult<Prisma.$RaffleEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RaffleEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleEntryCountArgs} args - Arguments to filter RaffleEntries to count.
     * @example
     * // Count the number of RaffleEntries
     * const count = await prisma.raffleEntry.count({
     *   where: {
     *     // ... the filter for the RaffleEntries we want to count
     *   }
     * })
    **/
    count<T extends RaffleEntryCountArgs>(
      args?: Subset<T, RaffleEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RaffleEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RaffleEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RaffleEntryAggregateArgs>(args: Subset<T, RaffleEntryAggregateArgs>): Prisma.PrismaPromise<GetRaffleEntryAggregateType<T>>

    /**
     * Group by RaffleEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaffleEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RaffleEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RaffleEntryGroupByArgs['orderBy'] }
        : { orderBy?: RaffleEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RaffleEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRaffleEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RaffleEntry model
   */
  readonly fields: RaffleEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RaffleEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RaffleEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    raffle<T extends RaffleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RaffleDefaultArgs<ExtArgs>>): Prisma__RaffleClient<$Result.GetResult<Prisma.$RafflePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    note<T extends NoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NoteDefaultArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RaffleEntry model
   */
  interface RaffleEntryFieldRefs {
    readonly id: FieldRef<"RaffleEntry", 'String'>
    readonly raffleId: FieldRef<"RaffleEntry", 'String'>
    readonly userId: FieldRef<"RaffleEntry", 'String'>
    readonly noteId: FieldRef<"RaffleEntry", 'String'>
    readonly isWinner: FieldRef<"RaffleEntry", 'Boolean'>
    readonly createdAt: FieldRef<"RaffleEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RaffleEntry findUnique
   */
  export type RaffleEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * Filter, which RaffleEntry to fetch.
     */
    where: RaffleEntryWhereUniqueInput
  }

  /**
   * RaffleEntry findUniqueOrThrow
   */
  export type RaffleEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * Filter, which RaffleEntry to fetch.
     */
    where: RaffleEntryWhereUniqueInput
  }

  /**
   * RaffleEntry findFirst
   */
  export type RaffleEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * Filter, which RaffleEntry to fetch.
     */
    where?: RaffleEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RaffleEntries to fetch.
     */
    orderBy?: RaffleEntryOrderByWithRelationInput | RaffleEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RaffleEntries.
     */
    cursor?: RaffleEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RaffleEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RaffleEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RaffleEntries.
     */
    distinct?: RaffleEntryScalarFieldEnum | RaffleEntryScalarFieldEnum[]
  }

  /**
   * RaffleEntry findFirstOrThrow
   */
  export type RaffleEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * Filter, which RaffleEntry to fetch.
     */
    where?: RaffleEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RaffleEntries to fetch.
     */
    orderBy?: RaffleEntryOrderByWithRelationInput | RaffleEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RaffleEntries.
     */
    cursor?: RaffleEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RaffleEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RaffleEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RaffleEntries.
     */
    distinct?: RaffleEntryScalarFieldEnum | RaffleEntryScalarFieldEnum[]
  }

  /**
   * RaffleEntry findMany
   */
  export type RaffleEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * Filter, which RaffleEntries to fetch.
     */
    where?: RaffleEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RaffleEntries to fetch.
     */
    orderBy?: RaffleEntryOrderByWithRelationInput | RaffleEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RaffleEntries.
     */
    cursor?: RaffleEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RaffleEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RaffleEntries.
     */
    skip?: number
    distinct?: RaffleEntryScalarFieldEnum | RaffleEntryScalarFieldEnum[]
  }

  /**
   * RaffleEntry create
   */
  export type RaffleEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a RaffleEntry.
     */
    data: XOR<RaffleEntryCreateInput, RaffleEntryUncheckedCreateInput>
  }

  /**
   * RaffleEntry createMany
   */
  export type RaffleEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RaffleEntries.
     */
    data: RaffleEntryCreateManyInput | RaffleEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RaffleEntry createManyAndReturn
   */
  export type RaffleEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * The data used to create many RaffleEntries.
     */
    data: RaffleEntryCreateManyInput | RaffleEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RaffleEntry update
   */
  export type RaffleEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a RaffleEntry.
     */
    data: XOR<RaffleEntryUpdateInput, RaffleEntryUncheckedUpdateInput>
    /**
     * Choose, which RaffleEntry to update.
     */
    where: RaffleEntryWhereUniqueInput
  }

  /**
   * RaffleEntry updateMany
   */
  export type RaffleEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RaffleEntries.
     */
    data: XOR<RaffleEntryUpdateManyMutationInput, RaffleEntryUncheckedUpdateManyInput>
    /**
     * Filter which RaffleEntries to update
     */
    where?: RaffleEntryWhereInput
    /**
     * Limit how many RaffleEntries to update.
     */
    limit?: number
  }

  /**
   * RaffleEntry updateManyAndReturn
   */
  export type RaffleEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * The data used to update RaffleEntries.
     */
    data: XOR<RaffleEntryUpdateManyMutationInput, RaffleEntryUncheckedUpdateManyInput>
    /**
     * Filter which RaffleEntries to update
     */
    where?: RaffleEntryWhereInput
    /**
     * Limit how many RaffleEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RaffleEntry upsert
   */
  export type RaffleEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the RaffleEntry to update in case it exists.
     */
    where: RaffleEntryWhereUniqueInput
    /**
     * In case the RaffleEntry found by the `where` argument doesn't exist, create a new RaffleEntry with this data.
     */
    create: XOR<RaffleEntryCreateInput, RaffleEntryUncheckedCreateInput>
    /**
     * In case the RaffleEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RaffleEntryUpdateInput, RaffleEntryUncheckedUpdateInput>
  }

  /**
   * RaffleEntry delete
   */
  export type RaffleEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
    /**
     * Filter which RaffleEntry to delete.
     */
    where: RaffleEntryWhereUniqueInput
  }

  /**
   * RaffleEntry deleteMany
   */
  export type RaffleEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RaffleEntries to delete
     */
    where?: RaffleEntryWhereInput
    /**
     * Limit how many RaffleEntries to delete.
     */
    limit?: number
  }

  /**
   * RaffleEntry without action
   */
  export type RaffleEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaffleEntry
     */
    select?: RaffleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaffleEntry
     */
    omit?: RaffleEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaffleEntryInclude<ExtArgs> | null
  }


  /**
   * Model UserCourses
   */

  export type AggregateUserCourses = {
    _count: UserCoursesCountAggregateOutputType | null
    _min: UserCoursesMinAggregateOutputType | null
    _max: UserCoursesMaxAggregateOutputType | null
  }

  export type UserCoursesMinAggregateOutputType = {
    A: string | null
    B: string | null
  }

  export type UserCoursesMaxAggregateOutputType = {
    A: string | null
    B: string | null
  }

  export type UserCoursesCountAggregateOutputType = {
    A: number
    B: number
    _all: number
  }


  export type UserCoursesMinAggregateInputType = {
    A?: true
    B?: true
  }

  export type UserCoursesMaxAggregateInputType = {
    A?: true
    B?: true
  }

  export type UserCoursesCountAggregateInputType = {
    A?: true
    B?: true
    _all?: true
  }

  export type UserCoursesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCourses to aggregate.
     */
    where?: UserCoursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCourses to fetch.
     */
    orderBy?: UserCoursesOrderByWithRelationInput | UserCoursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCoursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCourses
    **/
    _count?: true | UserCoursesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCoursesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCoursesMaxAggregateInputType
  }

  export type GetUserCoursesAggregateType<T extends UserCoursesAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCourses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCourses[P]>
      : GetScalarType<T[P], AggregateUserCourses[P]>
  }




  export type UserCoursesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCoursesWhereInput
    orderBy?: UserCoursesOrderByWithAggregationInput | UserCoursesOrderByWithAggregationInput[]
    by: UserCoursesScalarFieldEnum[] | UserCoursesScalarFieldEnum
    having?: UserCoursesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCoursesCountAggregateInputType | true
    _min?: UserCoursesMinAggregateInputType
    _max?: UserCoursesMaxAggregateInputType
  }

  export type UserCoursesGroupByOutputType = {
    A: string
    B: string
    _count: UserCoursesCountAggregateOutputType | null
    _min: UserCoursesMinAggregateOutputType | null
    _max: UserCoursesMaxAggregateOutputType | null
  }

  type GetUserCoursesGroupByPayload<T extends UserCoursesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCoursesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCoursesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCoursesGroupByOutputType[P]>
            : GetScalarType<T[P], UserCoursesGroupByOutputType[P]>
        }
      >
    >


  export type UserCoursesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    A?: boolean
    B?: boolean
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    user_roles?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCourses"]>

  export type UserCoursesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    A?: boolean
    B?: boolean
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    user_roles?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCourses"]>

  export type UserCoursesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    A?: boolean
    B?: boolean
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    user_roles?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCourses"]>

  export type UserCoursesSelectScalar = {
    A?: boolean
    B?: boolean
  }

  export type UserCoursesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"A" | "B", ExtArgs["result"]["userCourses"]>
  export type UserCoursesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    user_roles?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserCoursesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    user_roles?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserCoursesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Course?: boolean | CourseDefaultArgs<ExtArgs>
    user_roles?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserCoursesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCourses"
    objects: {
      Course: Prisma.$CoursePayload<ExtArgs>
      user_roles: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      A: string
      B: string
    }, ExtArgs["result"]["userCourses"]>
    composites: {}
  }

  type UserCoursesGetPayload<S extends boolean | null | undefined | UserCoursesDefaultArgs> = $Result.GetResult<Prisma.$UserCoursesPayload, S>

  type UserCoursesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCoursesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCoursesCountAggregateInputType | true
    }

  export interface UserCoursesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCourses'], meta: { name: 'UserCourses' } }
    /**
     * Find zero or one UserCourses that matches the filter.
     * @param {UserCoursesFindUniqueArgs} args - Arguments to find a UserCourses
     * @example
     * // Get one UserCourses
     * const userCourses = await prisma.userCourses.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCoursesFindUniqueArgs>(args: SelectSubset<T, UserCoursesFindUniqueArgs<ExtArgs>>): Prisma__UserCoursesClient<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCourses that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCoursesFindUniqueOrThrowArgs} args - Arguments to find a UserCourses
     * @example
     * // Get one UserCourses
     * const userCourses = await prisma.userCourses.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCoursesFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCoursesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCoursesClient<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCoursesFindFirstArgs} args - Arguments to find a UserCourses
     * @example
     * // Get one UserCourses
     * const userCourses = await prisma.userCourses.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCoursesFindFirstArgs>(args?: SelectSubset<T, UserCoursesFindFirstArgs<ExtArgs>>): Prisma__UserCoursesClient<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCourses that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCoursesFindFirstOrThrowArgs} args - Arguments to find a UserCourses
     * @example
     * // Get one UserCourses
     * const userCourses = await prisma.userCourses.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCoursesFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCoursesFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCoursesClient<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCoursesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCourses
     * const userCourses = await prisma.userCourses.findMany()
     * 
     * // Get first 10 UserCourses
     * const userCourses = await prisma.userCourses.findMany({ take: 10 })
     * 
     * // Only select the `A`
     * const userCoursesWithAOnly = await prisma.userCourses.findMany({ select: { A: true } })
     * 
     */
    findMany<T extends UserCoursesFindManyArgs>(args?: SelectSubset<T, UserCoursesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCourses.
     * @param {UserCoursesCreateArgs} args - Arguments to create a UserCourses.
     * @example
     * // Create one UserCourses
     * const UserCourses = await prisma.userCourses.create({
     *   data: {
     *     // ... data to create a UserCourses
     *   }
     * })
     * 
     */
    create<T extends UserCoursesCreateArgs>(args: SelectSubset<T, UserCoursesCreateArgs<ExtArgs>>): Prisma__UserCoursesClient<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCourses.
     * @param {UserCoursesCreateManyArgs} args - Arguments to create many UserCourses.
     * @example
     * // Create many UserCourses
     * const userCourses = await prisma.userCourses.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCoursesCreateManyArgs>(args?: SelectSubset<T, UserCoursesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserCourses and returns the data saved in the database.
     * @param {UserCoursesCreateManyAndReturnArgs} args - Arguments to create many UserCourses.
     * @example
     * // Create many UserCourses
     * const userCourses = await prisma.userCourses.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserCourses and only return the `A`
     * const userCoursesWithAOnly = await prisma.userCourses.createManyAndReturn({
     *   select: { A: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCoursesCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCoursesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserCourses.
     * @param {UserCoursesDeleteArgs} args - Arguments to delete one UserCourses.
     * @example
     * // Delete one UserCourses
     * const UserCourses = await prisma.userCourses.delete({
     *   where: {
     *     // ... filter to delete one UserCourses
     *   }
     * })
     * 
     */
    delete<T extends UserCoursesDeleteArgs>(args: SelectSubset<T, UserCoursesDeleteArgs<ExtArgs>>): Prisma__UserCoursesClient<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCourses.
     * @param {UserCoursesUpdateArgs} args - Arguments to update one UserCourses.
     * @example
     * // Update one UserCourses
     * const userCourses = await prisma.userCourses.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCoursesUpdateArgs>(args: SelectSubset<T, UserCoursesUpdateArgs<ExtArgs>>): Prisma__UserCoursesClient<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCourses.
     * @param {UserCoursesDeleteManyArgs} args - Arguments to filter UserCourses to delete.
     * @example
     * // Delete a few UserCourses
     * const { count } = await prisma.userCourses.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCoursesDeleteManyArgs>(args?: SelectSubset<T, UserCoursesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCoursesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCourses
     * const userCourses = await prisma.userCourses.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCoursesUpdateManyArgs>(args: SelectSubset<T, UserCoursesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCourses and returns the data updated in the database.
     * @param {UserCoursesUpdateManyAndReturnArgs} args - Arguments to update many UserCourses.
     * @example
     * // Update many UserCourses
     * const userCourses = await prisma.userCourses.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserCourses and only return the `A`
     * const userCoursesWithAOnly = await prisma.userCourses.updateManyAndReturn({
     *   select: { A: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserCoursesUpdateManyAndReturnArgs>(args: SelectSubset<T, UserCoursesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserCourses.
     * @param {UserCoursesUpsertArgs} args - Arguments to update or create a UserCourses.
     * @example
     * // Update or create a UserCourses
     * const userCourses = await prisma.userCourses.upsert({
     *   create: {
     *     // ... data to create a UserCourses
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCourses we want to update
     *   }
     * })
     */
    upsert<T extends UserCoursesUpsertArgs>(args: SelectSubset<T, UserCoursesUpsertArgs<ExtArgs>>): Prisma__UserCoursesClient<$Result.GetResult<Prisma.$UserCoursesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCoursesCountArgs} args - Arguments to filter UserCourses to count.
     * @example
     * // Count the number of UserCourses
     * const count = await prisma.userCourses.count({
     *   where: {
     *     // ... the filter for the UserCourses we want to count
     *   }
     * })
    **/
    count<T extends UserCoursesCountArgs>(
      args?: Subset<T, UserCoursesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCoursesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCoursesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCoursesAggregateArgs>(args: Subset<T, UserCoursesAggregateArgs>): Prisma.PrismaPromise<GetUserCoursesAggregateType<T>>

    /**
     * Group by UserCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCoursesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCoursesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCoursesGroupByArgs['orderBy'] }
        : { orderBy?: UserCoursesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCoursesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCoursesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCourses model
   */
  readonly fields: UserCoursesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCourses.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCoursesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user_roles<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserCourses model
   */
  interface UserCoursesFieldRefs {
    readonly A: FieldRef<"UserCourses", 'String'>
    readonly B: FieldRef<"UserCourses", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserCourses findUnique
   */
  export type UserCoursesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * Filter, which UserCourses to fetch.
     */
    where: UserCoursesWhereUniqueInput
  }

  /**
   * UserCourses findUniqueOrThrow
   */
  export type UserCoursesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * Filter, which UserCourses to fetch.
     */
    where: UserCoursesWhereUniqueInput
  }

  /**
   * UserCourses findFirst
   */
  export type UserCoursesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * Filter, which UserCourses to fetch.
     */
    where?: UserCoursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCourses to fetch.
     */
    orderBy?: UserCoursesOrderByWithRelationInput | UserCoursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCourses.
     */
    cursor?: UserCoursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCourses.
     */
    distinct?: UserCoursesScalarFieldEnum | UserCoursesScalarFieldEnum[]
  }

  /**
   * UserCourses findFirstOrThrow
   */
  export type UserCoursesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * Filter, which UserCourses to fetch.
     */
    where?: UserCoursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCourses to fetch.
     */
    orderBy?: UserCoursesOrderByWithRelationInput | UserCoursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCourses.
     */
    cursor?: UserCoursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCourses.
     */
    distinct?: UserCoursesScalarFieldEnum | UserCoursesScalarFieldEnum[]
  }

  /**
   * UserCourses findMany
   */
  export type UserCoursesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * Filter, which UserCourses to fetch.
     */
    where?: UserCoursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCourses to fetch.
     */
    orderBy?: UserCoursesOrderByWithRelationInput | UserCoursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCourses.
     */
    cursor?: UserCoursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCourses.
     */
    skip?: number
    distinct?: UserCoursesScalarFieldEnum | UserCoursesScalarFieldEnum[]
  }

  /**
   * UserCourses create
   */
  export type UserCoursesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCourses.
     */
    data: XOR<UserCoursesCreateInput, UserCoursesUncheckedCreateInput>
  }

  /**
   * UserCourses createMany
   */
  export type UserCoursesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCourses.
     */
    data: UserCoursesCreateManyInput | UserCoursesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserCourses createManyAndReturn
   */
  export type UserCoursesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * The data used to create many UserCourses.
     */
    data: UserCoursesCreateManyInput | UserCoursesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCourses update
   */
  export type UserCoursesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCourses.
     */
    data: XOR<UserCoursesUpdateInput, UserCoursesUncheckedUpdateInput>
    /**
     * Choose, which UserCourses to update.
     */
    where: UserCoursesWhereUniqueInput
  }

  /**
   * UserCourses updateMany
   */
  export type UserCoursesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCourses.
     */
    data: XOR<UserCoursesUpdateManyMutationInput, UserCoursesUncheckedUpdateManyInput>
    /**
     * Filter which UserCourses to update
     */
    where?: UserCoursesWhereInput
    /**
     * Limit how many UserCourses to update.
     */
    limit?: number
  }

  /**
   * UserCourses updateManyAndReturn
   */
  export type UserCoursesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * The data used to update UserCourses.
     */
    data: XOR<UserCoursesUpdateManyMutationInput, UserCoursesUncheckedUpdateManyInput>
    /**
     * Filter which UserCourses to update
     */
    where?: UserCoursesWhereInput
    /**
     * Limit how many UserCourses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCourses upsert
   */
  export type UserCoursesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCourses to update in case it exists.
     */
    where: UserCoursesWhereUniqueInput
    /**
     * In case the UserCourses found by the `where` argument doesn't exist, create a new UserCourses with this data.
     */
    create: XOR<UserCoursesCreateInput, UserCoursesUncheckedCreateInput>
    /**
     * In case the UserCourses was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCoursesUpdateInput, UserCoursesUncheckedUpdateInput>
  }

  /**
   * UserCourses delete
   */
  export type UserCoursesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
    /**
     * Filter which UserCourses to delete.
     */
    where: UserCoursesWhereUniqueInput
  }

  /**
   * UserCourses deleteMany
   */
  export type UserCoursesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCourses to delete
     */
    where?: UserCoursesWhereInput
    /**
     * Limit how many UserCourses to delete.
     */
    limit?: number
  }

  /**
   * UserCourses without action
   */
  export type UserCoursesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourses
     */
    select?: UserCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCourses
     */
    omit?: UserCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCoursesInclude<ExtArgs> | null
  }


  /**
   * Model AccessCode
   */

  export type AggregateAccessCode = {
    _count: AccessCodeCountAggregateOutputType | null
    _avg: AccessCodeAvgAggregateOutputType | null
    _sum: AccessCodeSumAggregateOutputType | null
    _min: AccessCodeMinAggregateOutputType | null
    _max: AccessCodeMaxAggregateOutputType | null
  }

  export type AccessCodeAvgAggregateOutputType = {
    duration: number | null
  }

  export type AccessCodeSumAggregateOutputType = {
    duration: number | null
  }

  export type AccessCodeMinAggregateOutputType = {
    id: string | null
    code: string | null
    createdById: string | null
    duration: number | null
    expiresAt: Date | null
    activatedAt: Date | null
    deviceId: string | null
    studentEmail: string | null
    lastHeartbeat: Date | null
    isUsed: boolean | null
    isRevoked: boolean | null
    createdAt: Date | null
  }

  export type AccessCodeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    createdById: string | null
    duration: number | null
    expiresAt: Date | null
    activatedAt: Date | null
    deviceId: string | null
    studentEmail: string | null
    lastHeartbeat: Date | null
    isUsed: boolean | null
    isRevoked: boolean | null
    createdAt: Date | null
  }

  export type AccessCodeCountAggregateOutputType = {
    id: number
    code: number
    createdById: number
    duration: number
    expiresAt: number
    activatedAt: number
    deviceId: number
    studentEmail: number
    lastHeartbeat: number
    isUsed: number
    isRevoked: number
    createdAt: number
    _all: number
  }


  export type AccessCodeAvgAggregateInputType = {
    duration?: true
  }

  export type AccessCodeSumAggregateInputType = {
    duration?: true
  }

  export type AccessCodeMinAggregateInputType = {
    id?: true
    code?: true
    createdById?: true
    duration?: true
    expiresAt?: true
    activatedAt?: true
    deviceId?: true
    studentEmail?: true
    lastHeartbeat?: true
    isUsed?: true
    isRevoked?: true
    createdAt?: true
  }

  export type AccessCodeMaxAggregateInputType = {
    id?: true
    code?: true
    createdById?: true
    duration?: true
    expiresAt?: true
    activatedAt?: true
    deviceId?: true
    studentEmail?: true
    lastHeartbeat?: true
    isUsed?: true
    isRevoked?: true
    createdAt?: true
  }

  export type AccessCodeCountAggregateInputType = {
    id?: true
    code?: true
    createdById?: true
    duration?: true
    expiresAt?: true
    activatedAt?: true
    deviceId?: true
    studentEmail?: true
    lastHeartbeat?: true
    isUsed?: true
    isRevoked?: true
    createdAt?: true
    _all?: true
  }

  export type AccessCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessCode to aggregate.
     */
    where?: AccessCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessCodes to fetch.
     */
    orderBy?: AccessCodeOrderByWithRelationInput | AccessCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccessCodes
    **/
    _count?: true | AccessCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccessCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccessCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessCodeMaxAggregateInputType
  }

  export type GetAccessCodeAggregateType<T extends AccessCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessCode[P]>
      : GetScalarType<T[P], AggregateAccessCode[P]>
  }




  export type AccessCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessCodeWhereInput
    orderBy?: AccessCodeOrderByWithAggregationInput | AccessCodeOrderByWithAggregationInput[]
    by: AccessCodeScalarFieldEnum[] | AccessCodeScalarFieldEnum
    having?: AccessCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessCodeCountAggregateInputType | true
    _avg?: AccessCodeAvgAggregateInputType
    _sum?: AccessCodeSumAggregateInputType
    _min?: AccessCodeMinAggregateInputType
    _max?: AccessCodeMaxAggregateInputType
  }

  export type AccessCodeGroupByOutputType = {
    id: string
    code: string
    createdById: string
    duration: number | null
    expiresAt: Date
    activatedAt: Date | null
    deviceId: string | null
    studentEmail: string | null
    lastHeartbeat: Date | null
    isUsed: boolean
    isRevoked: boolean
    createdAt: Date
    _count: AccessCodeCountAggregateOutputType | null
    _avg: AccessCodeAvgAggregateOutputType | null
    _sum: AccessCodeSumAggregateOutputType | null
    _min: AccessCodeMinAggregateOutputType | null
    _max: AccessCodeMaxAggregateOutputType | null
  }

  type GetAccessCodeGroupByPayload<T extends AccessCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessCodeGroupByOutputType[P]>
            : GetScalarType<T[P], AccessCodeGroupByOutputType[P]>
        }
      >
    >


  export type AccessCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdById?: boolean
    duration?: boolean
    expiresAt?: boolean
    activatedAt?: boolean
    deviceId?: boolean
    studentEmail?: boolean
    lastHeartbeat?: boolean
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    notes?: boolean | AccessCode$notesArgs<ExtArgs>
    _count?: boolean | AccessCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessCode"]>

  export type AccessCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdById?: boolean
    duration?: boolean
    expiresAt?: boolean
    activatedAt?: boolean
    deviceId?: boolean
    studentEmail?: boolean
    lastHeartbeat?: boolean
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessCode"]>

  export type AccessCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdById?: boolean
    duration?: boolean
    expiresAt?: boolean
    activatedAt?: boolean
    deviceId?: boolean
    studentEmail?: boolean
    lastHeartbeat?: boolean
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessCode"]>

  export type AccessCodeSelectScalar = {
    id?: boolean
    code?: boolean
    createdById?: boolean
    duration?: boolean
    expiresAt?: boolean
    activatedAt?: boolean
    deviceId?: boolean
    studentEmail?: boolean
    lastHeartbeat?: boolean
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: boolean
  }

  export type AccessCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "createdById" | "duration" | "expiresAt" | "activatedAt" | "deviceId" | "studentEmail" | "lastHeartbeat" | "isUsed" | "isRevoked" | "createdAt", ExtArgs["result"]["accessCode"]>
  export type AccessCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    notes?: boolean | AccessCode$notesArgs<ExtArgs>
    _count?: boolean | AccessCodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccessCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccessCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccessCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccessCode"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      notes: Prisma.$AccessCodeNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      createdById: string
      duration: number | null
      expiresAt: Date
      activatedAt: Date | null
      deviceId: string | null
      studentEmail: string | null
      lastHeartbeat: Date | null
      isUsed: boolean
      isRevoked: boolean
      createdAt: Date
    }, ExtArgs["result"]["accessCode"]>
    composites: {}
  }

  type AccessCodeGetPayload<S extends boolean | null | undefined | AccessCodeDefaultArgs> = $Result.GetResult<Prisma.$AccessCodePayload, S>

  type AccessCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessCodeCountAggregateInputType | true
    }

  export interface AccessCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccessCode'], meta: { name: 'AccessCode' } }
    /**
     * Find zero or one AccessCode that matches the filter.
     * @param {AccessCodeFindUniqueArgs} args - Arguments to find a AccessCode
     * @example
     * // Get one AccessCode
     * const accessCode = await prisma.accessCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessCodeFindUniqueArgs>(args: SelectSubset<T, AccessCodeFindUniqueArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccessCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessCodeFindUniqueOrThrowArgs} args - Arguments to find a AccessCode
     * @example
     * // Get one AccessCode
     * const accessCode = await prisma.accessCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeFindFirstArgs} args - Arguments to find a AccessCode
     * @example
     * // Get one AccessCode
     * const accessCode = await prisma.accessCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessCodeFindFirstArgs>(args?: SelectSubset<T, AccessCodeFindFirstArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeFindFirstOrThrowArgs} args - Arguments to find a AccessCode
     * @example
     * // Get one AccessCode
     * const accessCode = await prisma.accessCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccessCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccessCodes
     * const accessCodes = await prisma.accessCode.findMany()
     * 
     * // Get first 10 AccessCodes
     * const accessCodes = await prisma.accessCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessCodeWithIdOnly = await prisma.accessCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessCodeFindManyArgs>(args?: SelectSubset<T, AccessCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccessCode.
     * @param {AccessCodeCreateArgs} args - Arguments to create a AccessCode.
     * @example
     * // Create one AccessCode
     * const AccessCode = await prisma.accessCode.create({
     *   data: {
     *     // ... data to create a AccessCode
     *   }
     * })
     * 
     */
    create<T extends AccessCodeCreateArgs>(args: SelectSubset<T, AccessCodeCreateArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccessCodes.
     * @param {AccessCodeCreateManyArgs} args - Arguments to create many AccessCodes.
     * @example
     * // Create many AccessCodes
     * const accessCode = await prisma.accessCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessCodeCreateManyArgs>(args?: SelectSubset<T, AccessCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccessCodes and returns the data saved in the database.
     * @param {AccessCodeCreateManyAndReturnArgs} args - Arguments to create many AccessCodes.
     * @example
     * // Create many AccessCodes
     * const accessCode = await prisma.accessCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccessCodes and only return the `id`
     * const accessCodeWithIdOnly = await prisma.accessCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AccessCode.
     * @param {AccessCodeDeleteArgs} args - Arguments to delete one AccessCode.
     * @example
     * // Delete one AccessCode
     * const AccessCode = await prisma.accessCode.delete({
     *   where: {
     *     // ... filter to delete one AccessCode
     *   }
     * })
     * 
     */
    delete<T extends AccessCodeDeleteArgs>(args: SelectSubset<T, AccessCodeDeleteArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccessCode.
     * @param {AccessCodeUpdateArgs} args - Arguments to update one AccessCode.
     * @example
     * // Update one AccessCode
     * const accessCode = await prisma.accessCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessCodeUpdateArgs>(args: SelectSubset<T, AccessCodeUpdateArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccessCodes.
     * @param {AccessCodeDeleteManyArgs} args - Arguments to filter AccessCodes to delete.
     * @example
     * // Delete a few AccessCodes
     * const { count } = await prisma.accessCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessCodeDeleteManyArgs>(args?: SelectSubset<T, AccessCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccessCodes
     * const accessCode = await prisma.accessCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessCodeUpdateManyArgs>(args: SelectSubset<T, AccessCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessCodes and returns the data updated in the database.
     * @param {AccessCodeUpdateManyAndReturnArgs} args - Arguments to update many AccessCodes.
     * @example
     * // Update many AccessCodes
     * const accessCode = await prisma.accessCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccessCodes and only return the `id`
     * const accessCodeWithIdOnly = await prisma.accessCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccessCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, AccessCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AccessCode.
     * @param {AccessCodeUpsertArgs} args - Arguments to update or create a AccessCode.
     * @example
     * // Update or create a AccessCode
     * const accessCode = await prisma.accessCode.upsert({
     *   create: {
     *     // ... data to create a AccessCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccessCode we want to update
     *   }
     * })
     */
    upsert<T extends AccessCodeUpsertArgs>(args: SelectSubset<T, AccessCodeUpsertArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccessCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeCountArgs} args - Arguments to filter AccessCodes to count.
     * @example
     * // Count the number of AccessCodes
     * const count = await prisma.accessCode.count({
     *   where: {
     *     // ... the filter for the AccessCodes we want to count
     *   }
     * })
    **/
    count<T extends AccessCodeCountArgs>(
      args?: Subset<T, AccessCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccessCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessCodeAggregateArgs>(args: Subset<T, AccessCodeAggregateArgs>): Prisma.PrismaPromise<GetAccessCodeAggregateType<T>>

    /**
     * Group by AccessCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessCodeGroupByArgs['orderBy'] }
        : { orderBy?: AccessCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccessCode model
   */
  readonly fields: AccessCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccessCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    notes<T extends AccessCode$notesArgs<ExtArgs> = {}>(args?: Subset<T, AccessCode$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccessCode model
   */
  interface AccessCodeFieldRefs {
    readonly id: FieldRef<"AccessCode", 'String'>
    readonly code: FieldRef<"AccessCode", 'String'>
    readonly createdById: FieldRef<"AccessCode", 'String'>
    readonly duration: FieldRef<"AccessCode", 'Int'>
    readonly expiresAt: FieldRef<"AccessCode", 'DateTime'>
    readonly activatedAt: FieldRef<"AccessCode", 'DateTime'>
    readonly deviceId: FieldRef<"AccessCode", 'String'>
    readonly studentEmail: FieldRef<"AccessCode", 'String'>
    readonly lastHeartbeat: FieldRef<"AccessCode", 'DateTime'>
    readonly isUsed: FieldRef<"AccessCode", 'Boolean'>
    readonly isRevoked: FieldRef<"AccessCode", 'Boolean'>
    readonly createdAt: FieldRef<"AccessCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AccessCode findUnique
   */
  export type AccessCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * Filter, which AccessCode to fetch.
     */
    where: AccessCodeWhereUniqueInput
  }

  /**
   * AccessCode findUniqueOrThrow
   */
  export type AccessCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * Filter, which AccessCode to fetch.
     */
    where: AccessCodeWhereUniqueInput
  }

  /**
   * AccessCode findFirst
   */
  export type AccessCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * Filter, which AccessCode to fetch.
     */
    where?: AccessCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessCodes to fetch.
     */
    orderBy?: AccessCodeOrderByWithRelationInput | AccessCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessCodes.
     */
    cursor?: AccessCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessCodes.
     */
    distinct?: AccessCodeScalarFieldEnum | AccessCodeScalarFieldEnum[]
  }

  /**
   * AccessCode findFirstOrThrow
   */
  export type AccessCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * Filter, which AccessCode to fetch.
     */
    where?: AccessCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessCodes to fetch.
     */
    orderBy?: AccessCodeOrderByWithRelationInput | AccessCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessCodes.
     */
    cursor?: AccessCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessCodes.
     */
    distinct?: AccessCodeScalarFieldEnum | AccessCodeScalarFieldEnum[]
  }

  /**
   * AccessCode findMany
   */
  export type AccessCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * Filter, which AccessCodes to fetch.
     */
    where?: AccessCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessCodes to fetch.
     */
    orderBy?: AccessCodeOrderByWithRelationInput | AccessCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccessCodes.
     */
    cursor?: AccessCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessCodes.
     */
    skip?: number
    distinct?: AccessCodeScalarFieldEnum | AccessCodeScalarFieldEnum[]
  }

  /**
   * AccessCode create
   */
  export type AccessCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a AccessCode.
     */
    data: XOR<AccessCodeCreateInput, AccessCodeUncheckedCreateInput>
  }

  /**
   * AccessCode createMany
   */
  export type AccessCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccessCodes.
     */
    data: AccessCodeCreateManyInput | AccessCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccessCode createManyAndReturn
   */
  export type AccessCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * The data used to create many AccessCodes.
     */
    data: AccessCodeCreateManyInput | AccessCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessCode update
   */
  export type AccessCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a AccessCode.
     */
    data: XOR<AccessCodeUpdateInput, AccessCodeUncheckedUpdateInput>
    /**
     * Choose, which AccessCode to update.
     */
    where: AccessCodeWhereUniqueInput
  }

  /**
   * AccessCode updateMany
   */
  export type AccessCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccessCodes.
     */
    data: XOR<AccessCodeUpdateManyMutationInput, AccessCodeUncheckedUpdateManyInput>
    /**
     * Filter which AccessCodes to update
     */
    where?: AccessCodeWhereInput
    /**
     * Limit how many AccessCodes to update.
     */
    limit?: number
  }

  /**
   * AccessCode updateManyAndReturn
   */
  export type AccessCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * The data used to update AccessCodes.
     */
    data: XOR<AccessCodeUpdateManyMutationInput, AccessCodeUncheckedUpdateManyInput>
    /**
     * Filter which AccessCodes to update
     */
    where?: AccessCodeWhereInput
    /**
     * Limit how many AccessCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessCode upsert
   */
  export type AccessCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the AccessCode to update in case it exists.
     */
    where: AccessCodeWhereUniqueInput
    /**
     * In case the AccessCode found by the `where` argument doesn't exist, create a new AccessCode with this data.
     */
    create: XOR<AccessCodeCreateInput, AccessCodeUncheckedCreateInput>
    /**
     * In case the AccessCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessCodeUpdateInput, AccessCodeUncheckedUpdateInput>
  }

  /**
   * AccessCode delete
   */
  export type AccessCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
    /**
     * Filter which AccessCode to delete.
     */
    where: AccessCodeWhereUniqueInput
  }

  /**
   * AccessCode deleteMany
   */
  export type AccessCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessCodes to delete
     */
    where?: AccessCodeWhereInput
    /**
     * Limit how many AccessCodes to delete.
     */
    limit?: number
  }

  /**
   * AccessCode.notes
   */
  export type AccessCode$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    where?: AccessCodeNoteWhereInput
    orderBy?: AccessCodeNoteOrderByWithRelationInput | AccessCodeNoteOrderByWithRelationInput[]
    cursor?: AccessCodeNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccessCodeNoteScalarFieldEnum | AccessCodeNoteScalarFieldEnum[]
  }

  /**
   * AccessCode without action
   */
  export type AccessCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCode
     */
    select?: AccessCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCode
     */
    omit?: AccessCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeInclude<ExtArgs> | null
  }


  /**
   * Model AccessCodeNote
   */

  export type AggregateAccessCodeNote = {
    _count: AccessCodeNoteCountAggregateOutputType | null
    _min: AccessCodeNoteMinAggregateOutputType | null
    _max: AccessCodeNoteMaxAggregateOutputType | null
  }

  export type AccessCodeNoteMinAggregateOutputType = {
    id: string | null
    accessCodeId: string | null
    noteId: string | null
  }

  export type AccessCodeNoteMaxAggregateOutputType = {
    id: string | null
    accessCodeId: string | null
    noteId: string | null
  }

  export type AccessCodeNoteCountAggregateOutputType = {
    id: number
    accessCodeId: number
    noteId: number
    _all: number
  }


  export type AccessCodeNoteMinAggregateInputType = {
    id?: true
    accessCodeId?: true
    noteId?: true
  }

  export type AccessCodeNoteMaxAggregateInputType = {
    id?: true
    accessCodeId?: true
    noteId?: true
  }

  export type AccessCodeNoteCountAggregateInputType = {
    id?: true
    accessCodeId?: true
    noteId?: true
    _all?: true
  }

  export type AccessCodeNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessCodeNote to aggregate.
     */
    where?: AccessCodeNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessCodeNotes to fetch.
     */
    orderBy?: AccessCodeNoteOrderByWithRelationInput | AccessCodeNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessCodeNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessCodeNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessCodeNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccessCodeNotes
    **/
    _count?: true | AccessCodeNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessCodeNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessCodeNoteMaxAggregateInputType
  }

  export type GetAccessCodeNoteAggregateType<T extends AccessCodeNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessCodeNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessCodeNote[P]>
      : GetScalarType<T[P], AggregateAccessCodeNote[P]>
  }




  export type AccessCodeNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessCodeNoteWhereInput
    orderBy?: AccessCodeNoteOrderByWithAggregationInput | AccessCodeNoteOrderByWithAggregationInput[]
    by: AccessCodeNoteScalarFieldEnum[] | AccessCodeNoteScalarFieldEnum
    having?: AccessCodeNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessCodeNoteCountAggregateInputType | true
    _min?: AccessCodeNoteMinAggregateInputType
    _max?: AccessCodeNoteMaxAggregateInputType
  }

  export type AccessCodeNoteGroupByOutputType = {
    id: string
    accessCodeId: string
    noteId: string
    _count: AccessCodeNoteCountAggregateOutputType | null
    _min: AccessCodeNoteMinAggregateOutputType | null
    _max: AccessCodeNoteMaxAggregateOutputType | null
  }

  type GetAccessCodeNoteGroupByPayload<T extends AccessCodeNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessCodeNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessCodeNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessCodeNoteGroupByOutputType[P]>
            : GetScalarType<T[P], AccessCodeNoteGroupByOutputType[P]>
        }
      >
    >


  export type AccessCodeNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessCodeId?: boolean
    noteId?: boolean
    accessCode?: boolean | AccessCodeDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessCodeNote"]>

  export type AccessCodeNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessCodeId?: boolean
    noteId?: boolean
    accessCode?: boolean | AccessCodeDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessCodeNote"]>

  export type AccessCodeNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessCodeId?: boolean
    noteId?: boolean
    accessCode?: boolean | AccessCodeDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessCodeNote"]>

  export type AccessCodeNoteSelectScalar = {
    id?: boolean
    accessCodeId?: boolean
    noteId?: boolean
  }

  export type AccessCodeNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accessCodeId" | "noteId", ExtArgs["result"]["accessCodeNote"]>
  export type AccessCodeNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessCode?: boolean | AccessCodeDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }
  export type AccessCodeNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessCode?: boolean | AccessCodeDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }
  export type AccessCodeNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessCode?: boolean | AccessCodeDefaultArgs<ExtArgs>
    note?: boolean | NoteDefaultArgs<ExtArgs>
  }

  export type $AccessCodeNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccessCodeNote"
    objects: {
      accessCode: Prisma.$AccessCodePayload<ExtArgs>
      note: Prisma.$NotePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accessCodeId: string
      noteId: string
    }, ExtArgs["result"]["accessCodeNote"]>
    composites: {}
  }

  type AccessCodeNoteGetPayload<S extends boolean | null | undefined | AccessCodeNoteDefaultArgs> = $Result.GetResult<Prisma.$AccessCodeNotePayload, S>

  type AccessCodeNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessCodeNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessCodeNoteCountAggregateInputType | true
    }

  export interface AccessCodeNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccessCodeNote'], meta: { name: 'AccessCodeNote' } }
    /**
     * Find zero or one AccessCodeNote that matches the filter.
     * @param {AccessCodeNoteFindUniqueArgs} args - Arguments to find a AccessCodeNote
     * @example
     * // Get one AccessCodeNote
     * const accessCodeNote = await prisma.accessCodeNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessCodeNoteFindUniqueArgs>(args: SelectSubset<T, AccessCodeNoteFindUniqueArgs<ExtArgs>>): Prisma__AccessCodeNoteClient<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccessCodeNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessCodeNoteFindUniqueOrThrowArgs} args - Arguments to find a AccessCodeNote
     * @example
     * // Get one AccessCodeNote
     * const accessCodeNote = await prisma.accessCodeNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessCodeNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessCodeNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessCodeNoteClient<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessCodeNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeNoteFindFirstArgs} args - Arguments to find a AccessCodeNote
     * @example
     * // Get one AccessCodeNote
     * const accessCodeNote = await prisma.accessCodeNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessCodeNoteFindFirstArgs>(args?: SelectSubset<T, AccessCodeNoteFindFirstArgs<ExtArgs>>): Prisma__AccessCodeNoteClient<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessCodeNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeNoteFindFirstOrThrowArgs} args - Arguments to find a AccessCodeNote
     * @example
     * // Get one AccessCodeNote
     * const accessCodeNote = await prisma.accessCodeNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessCodeNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessCodeNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessCodeNoteClient<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccessCodeNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccessCodeNotes
     * const accessCodeNotes = await prisma.accessCodeNote.findMany()
     * 
     * // Get first 10 AccessCodeNotes
     * const accessCodeNotes = await prisma.accessCodeNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessCodeNoteWithIdOnly = await prisma.accessCodeNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessCodeNoteFindManyArgs>(args?: SelectSubset<T, AccessCodeNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccessCodeNote.
     * @param {AccessCodeNoteCreateArgs} args - Arguments to create a AccessCodeNote.
     * @example
     * // Create one AccessCodeNote
     * const AccessCodeNote = await prisma.accessCodeNote.create({
     *   data: {
     *     // ... data to create a AccessCodeNote
     *   }
     * })
     * 
     */
    create<T extends AccessCodeNoteCreateArgs>(args: SelectSubset<T, AccessCodeNoteCreateArgs<ExtArgs>>): Prisma__AccessCodeNoteClient<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccessCodeNotes.
     * @param {AccessCodeNoteCreateManyArgs} args - Arguments to create many AccessCodeNotes.
     * @example
     * // Create many AccessCodeNotes
     * const accessCodeNote = await prisma.accessCodeNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessCodeNoteCreateManyArgs>(args?: SelectSubset<T, AccessCodeNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccessCodeNotes and returns the data saved in the database.
     * @param {AccessCodeNoteCreateManyAndReturnArgs} args - Arguments to create many AccessCodeNotes.
     * @example
     * // Create many AccessCodeNotes
     * const accessCodeNote = await prisma.accessCodeNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccessCodeNotes and only return the `id`
     * const accessCodeNoteWithIdOnly = await prisma.accessCodeNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessCodeNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessCodeNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AccessCodeNote.
     * @param {AccessCodeNoteDeleteArgs} args - Arguments to delete one AccessCodeNote.
     * @example
     * // Delete one AccessCodeNote
     * const AccessCodeNote = await prisma.accessCodeNote.delete({
     *   where: {
     *     // ... filter to delete one AccessCodeNote
     *   }
     * })
     * 
     */
    delete<T extends AccessCodeNoteDeleteArgs>(args: SelectSubset<T, AccessCodeNoteDeleteArgs<ExtArgs>>): Prisma__AccessCodeNoteClient<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccessCodeNote.
     * @param {AccessCodeNoteUpdateArgs} args - Arguments to update one AccessCodeNote.
     * @example
     * // Update one AccessCodeNote
     * const accessCodeNote = await prisma.accessCodeNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessCodeNoteUpdateArgs>(args: SelectSubset<T, AccessCodeNoteUpdateArgs<ExtArgs>>): Prisma__AccessCodeNoteClient<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccessCodeNotes.
     * @param {AccessCodeNoteDeleteManyArgs} args - Arguments to filter AccessCodeNotes to delete.
     * @example
     * // Delete a few AccessCodeNotes
     * const { count } = await prisma.accessCodeNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessCodeNoteDeleteManyArgs>(args?: SelectSubset<T, AccessCodeNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessCodeNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccessCodeNotes
     * const accessCodeNote = await prisma.accessCodeNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessCodeNoteUpdateManyArgs>(args: SelectSubset<T, AccessCodeNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessCodeNotes and returns the data updated in the database.
     * @param {AccessCodeNoteUpdateManyAndReturnArgs} args - Arguments to update many AccessCodeNotes.
     * @example
     * // Update many AccessCodeNotes
     * const accessCodeNote = await prisma.accessCodeNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccessCodeNotes and only return the `id`
     * const accessCodeNoteWithIdOnly = await prisma.accessCodeNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccessCodeNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, AccessCodeNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AccessCodeNote.
     * @param {AccessCodeNoteUpsertArgs} args - Arguments to update or create a AccessCodeNote.
     * @example
     * // Update or create a AccessCodeNote
     * const accessCodeNote = await prisma.accessCodeNote.upsert({
     *   create: {
     *     // ... data to create a AccessCodeNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccessCodeNote we want to update
     *   }
     * })
     */
    upsert<T extends AccessCodeNoteUpsertArgs>(args: SelectSubset<T, AccessCodeNoteUpsertArgs<ExtArgs>>): Prisma__AccessCodeNoteClient<$Result.GetResult<Prisma.$AccessCodeNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccessCodeNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeNoteCountArgs} args - Arguments to filter AccessCodeNotes to count.
     * @example
     * // Count the number of AccessCodeNotes
     * const count = await prisma.accessCodeNote.count({
     *   where: {
     *     // ... the filter for the AccessCodeNotes we want to count
     *   }
     * })
    **/
    count<T extends AccessCodeNoteCountArgs>(
      args?: Subset<T, AccessCodeNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessCodeNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccessCodeNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessCodeNoteAggregateArgs>(args: Subset<T, AccessCodeNoteAggregateArgs>): Prisma.PrismaPromise<GetAccessCodeNoteAggregateType<T>>

    /**
     * Group by AccessCodeNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessCodeNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessCodeNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessCodeNoteGroupByArgs['orderBy'] }
        : { orderBy?: AccessCodeNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessCodeNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessCodeNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccessCodeNote model
   */
  readonly fields: AccessCodeNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccessCodeNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessCodeNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accessCode<T extends AccessCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccessCodeDefaultArgs<ExtArgs>>): Prisma__AccessCodeClient<$Result.GetResult<Prisma.$AccessCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    note<T extends NoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NoteDefaultArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccessCodeNote model
   */
  interface AccessCodeNoteFieldRefs {
    readonly id: FieldRef<"AccessCodeNote", 'String'>
    readonly accessCodeId: FieldRef<"AccessCodeNote", 'String'>
    readonly noteId: FieldRef<"AccessCodeNote", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AccessCodeNote findUnique
   */
  export type AccessCodeNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * Filter, which AccessCodeNote to fetch.
     */
    where: AccessCodeNoteWhereUniqueInput
  }

  /**
   * AccessCodeNote findUniqueOrThrow
   */
  export type AccessCodeNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * Filter, which AccessCodeNote to fetch.
     */
    where: AccessCodeNoteWhereUniqueInput
  }

  /**
   * AccessCodeNote findFirst
   */
  export type AccessCodeNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * Filter, which AccessCodeNote to fetch.
     */
    where?: AccessCodeNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessCodeNotes to fetch.
     */
    orderBy?: AccessCodeNoteOrderByWithRelationInput | AccessCodeNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessCodeNotes.
     */
    cursor?: AccessCodeNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessCodeNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessCodeNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessCodeNotes.
     */
    distinct?: AccessCodeNoteScalarFieldEnum | AccessCodeNoteScalarFieldEnum[]
  }

  /**
   * AccessCodeNote findFirstOrThrow
   */
  export type AccessCodeNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * Filter, which AccessCodeNote to fetch.
     */
    where?: AccessCodeNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessCodeNotes to fetch.
     */
    orderBy?: AccessCodeNoteOrderByWithRelationInput | AccessCodeNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessCodeNotes.
     */
    cursor?: AccessCodeNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessCodeNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessCodeNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessCodeNotes.
     */
    distinct?: AccessCodeNoteScalarFieldEnum | AccessCodeNoteScalarFieldEnum[]
  }

  /**
   * AccessCodeNote findMany
   */
  export type AccessCodeNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * Filter, which AccessCodeNotes to fetch.
     */
    where?: AccessCodeNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessCodeNotes to fetch.
     */
    orderBy?: AccessCodeNoteOrderByWithRelationInput | AccessCodeNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccessCodeNotes.
     */
    cursor?: AccessCodeNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessCodeNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessCodeNotes.
     */
    skip?: number
    distinct?: AccessCodeNoteScalarFieldEnum | AccessCodeNoteScalarFieldEnum[]
  }

  /**
   * AccessCodeNote create
   */
  export type AccessCodeNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a AccessCodeNote.
     */
    data: XOR<AccessCodeNoteCreateInput, AccessCodeNoteUncheckedCreateInput>
  }

  /**
   * AccessCodeNote createMany
   */
  export type AccessCodeNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccessCodeNotes.
     */
    data: AccessCodeNoteCreateManyInput | AccessCodeNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccessCodeNote createManyAndReturn
   */
  export type AccessCodeNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * The data used to create many AccessCodeNotes.
     */
    data: AccessCodeNoteCreateManyInput | AccessCodeNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessCodeNote update
   */
  export type AccessCodeNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a AccessCodeNote.
     */
    data: XOR<AccessCodeNoteUpdateInput, AccessCodeNoteUncheckedUpdateInput>
    /**
     * Choose, which AccessCodeNote to update.
     */
    where: AccessCodeNoteWhereUniqueInput
  }

  /**
   * AccessCodeNote updateMany
   */
  export type AccessCodeNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccessCodeNotes.
     */
    data: XOR<AccessCodeNoteUpdateManyMutationInput, AccessCodeNoteUncheckedUpdateManyInput>
    /**
     * Filter which AccessCodeNotes to update
     */
    where?: AccessCodeNoteWhereInput
    /**
     * Limit how many AccessCodeNotes to update.
     */
    limit?: number
  }

  /**
   * AccessCodeNote updateManyAndReturn
   */
  export type AccessCodeNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * The data used to update AccessCodeNotes.
     */
    data: XOR<AccessCodeNoteUpdateManyMutationInput, AccessCodeNoteUncheckedUpdateManyInput>
    /**
     * Filter which AccessCodeNotes to update
     */
    where?: AccessCodeNoteWhereInput
    /**
     * Limit how many AccessCodeNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessCodeNote upsert
   */
  export type AccessCodeNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the AccessCodeNote to update in case it exists.
     */
    where: AccessCodeNoteWhereUniqueInput
    /**
     * In case the AccessCodeNote found by the `where` argument doesn't exist, create a new AccessCodeNote with this data.
     */
    create: XOR<AccessCodeNoteCreateInput, AccessCodeNoteUncheckedCreateInput>
    /**
     * In case the AccessCodeNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessCodeNoteUpdateInput, AccessCodeNoteUncheckedUpdateInput>
  }

  /**
   * AccessCodeNote delete
   */
  export type AccessCodeNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
    /**
     * Filter which AccessCodeNote to delete.
     */
    where: AccessCodeNoteWhereUniqueInput
  }

  /**
   * AccessCodeNote deleteMany
   */
  export type AccessCodeNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessCodeNotes to delete
     */
    where?: AccessCodeNoteWhereInput
    /**
     * Limit how many AccessCodeNotes to delete.
     */
    limit?: number
  }

  /**
   * AccessCodeNote without action
   */
  export type AccessCodeNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessCodeNote
     */
    select?: AccessCodeNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessCodeNote
     */
    omit?: AccessCodeNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessCodeNoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    supabaseId: 'supabaseId',
    kudosPoints: 'kudosPoints',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    professorId: 'professorId',
    createdAt: 'createdAt',
    createdById: 'createdById'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const ProfessorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    createdById: 'createdById'
  };

  export type ProfessorScalarFieldEnum = (typeof ProfessorScalarFieldEnum)[keyof typeof ProfessorScalarFieldEnum]


  export const SemesterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    year: 'year',
    createdById: 'createdById'
  };

  export type SemesterScalarFieldEnum = (typeof SemesterScalarFieldEnum)[keyof typeof SemesterScalarFieldEnum]


  export const NoteScalarFieldEnum: {
    id: 'id',
    title: 'title',
    createdAt: 'createdAt',
    filePath: 'filePath',
    fileType: 'fileType',
    fileUrl: 'fileUrl',
    uploaderId: 'uploaderId',
    courseId: 'courseId',
    description: 'description',
    updatedAt: 'updatedAt',
    semesterId: 'semesterId',
    isVerified: 'isVerified',
    verifiedAt: 'verifiedAt',
    verifiedById: 'verifiedById'
  };

  export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    noteId: 'noteId',
    userId: 'userId'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const RaffleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt'
  };

  export type RaffleScalarFieldEnum = (typeof RaffleScalarFieldEnum)[keyof typeof RaffleScalarFieldEnum]


  export const RafflePrizeScalarFieldEnum: {
    id: 'id',
    raffleId: 'raffleId',
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
    quantity: 'quantity',
    size: 'size',
    color: 'color',
    metadata: 'metadata'
  };

  export type RafflePrizeScalarFieldEnum = (typeof RafflePrizeScalarFieldEnum)[keyof typeof RafflePrizeScalarFieldEnum]


  export const RaffleEntryScalarFieldEnum: {
    id: 'id',
    raffleId: 'raffleId',
    userId: 'userId',
    noteId: 'noteId',
    isWinner: 'isWinner',
    createdAt: 'createdAt'
  };

  export type RaffleEntryScalarFieldEnum = (typeof RaffleEntryScalarFieldEnum)[keyof typeof RaffleEntryScalarFieldEnum]


  export const UserCoursesScalarFieldEnum: {
    A: 'A',
    B: 'B'
  };

  export type UserCoursesScalarFieldEnum = (typeof UserCoursesScalarFieldEnum)[keyof typeof UserCoursesScalarFieldEnum]


  export const AccessCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    createdById: 'createdById',
    duration: 'duration',
    expiresAt: 'expiresAt',
    activatedAt: 'activatedAt',
    deviceId: 'deviceId',
    studentEmail: 'studentEmail',
    lastHeartbeat: 'lastHeartbeat',
    isUsed: 'isUsed',
    isRevoked: 'isRevoked',
    createdAt: 'createdAt'
  };

  export type AccessCodeScalarFieldEnum = (typeof AccessCodeScalarFieldEnum)[keyof typeof AccessCodeScalarFieldEnum]


  export const AccessCodeNoteScalarFieldEnum: {
    id: 'id',
    accessCodeId: 'accessCodeId',
    noteId: 'noteId'
  };

  export type AccessCodeNoteScalarFieldEnum = (typeof AccessCodeNoteScalarFieldEnum)[keyof typeof AccessCodeNoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    supabaseId?: StringFilter<"User"> | string
    kudosPoints?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    notes?: NoteListRelationFilter
    reviews?: ReviewListRelationFilter
    raffleEntries?: RaffleEntryListRelationFilter
    UserCourses?: UserCoursesListRelationFilter
    createdCourses?: CourseListRelationFilter
    createdProfessors?: ProfessorListRelationFilter
    createdSemesters?: SemesterListRelationFilter
    createdAccessCodes?: AccessCodeListRelationFilter
    verifiedNotes?: NoteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    supabaseId?: SortOrder
    kudosPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    notes?: NoteOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    raffleEntries?: RaffleEntryOrderByRelationAggregateInput
    UserCourses?: UserCoursesOrderByRelationAggregateInput
    createdCourses?: CourseOrderByRelationAggregateInput
    createdProfessors?: ProfessorOrderByRelationAggregateInput
    createdSemesters?: SemesterOrderByRelationAggregateInput
    createdAccessCodes?: AccessCodeOrderByRelationAggregateInput
    verifiedNotes?: NoteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    supabaseId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    kudosPoints?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    notes?: NoteListRelationFilter
    reviews?: ReviewListRelationFilter
    raffleEntries?: RaffleEntryListRelationFilter
    UserCourses?: UserCoursesListRelationFilter
    createdCourses?: CourseListRelationFilter
    createdProfessors?: ProfessorListRelationFilter
    createdSemesters?: SemesterListRelationFilter
    createdAccessCodes?: AccessCodeListRelationFilter
    verifiedNotes?: NoteListRelationFilter
  }, "id" | "email" | "supabaseId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    supabaseId?: SortOrder
    kudosPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    supabaseId?: StringWithAggregatesFilter<"User"> | string
    kudosPoints?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    code?: StringFilter<"Course"> | string
    professorId?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    createdById?: StringFilter<"Course"> | string
    professor?: XOR<ProfessorNullableScalarRelationFilter, ProfessorWhereInput> | null
    notes?: NoteListRelationFilter
    UserCourses?: UserCoursesListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    professorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
    professor?: ProfessorOrderByWithRelationInput
    notes?: NoteOrderByRelationAggregateInput
    UserCourses?: UserCoursesOrderByRelationAggregateInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    name?: StringFilter<"Course"> | string
    code?: StringFilter<"Course"> | string
    professorId?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    createdById?: StringFilter<"Course"> | string
    professor?: XOR<ProfessorNullableScalarRelationFilter, ProfessorWhereInput> | null
    notes?: NoteListRelationFilter
    UserCourses?: UserCoursesListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    professorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    name?: StringWithAggregatesFilter<"Course"> | string
    code?: StringWithAggregatesFilter<"Course"> | string
    professorId?: StringNullableWithAggregatesFilter<"Course"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    createdById?: StringWithAggregatesFilter<"Course"> | string
  }

  export type ProfessorWhereInput = {
    AND?: ProfessorWhereInput | ProfessorWhereInput[]
    OR?: ProfessorWhereInput[]
    NOT?: ProfessorWhereInput | ProfessorWhereInput[]
    id?: StringFilter<"Professor"> | string
    name?: StringFilter<"Professor"> | string
    email?: StringNullableFilter<"Professor"> | string | null
    createdById?: StringFilter<"Professor"> | string
    courses?: CourseListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfessorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    createdById?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type ProfessorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessorWhereInput | ProfessorWhereInput[]
    OR?: ProfessorWhereInput[]
    NOT?: ProfessorWhereInput | ProfessorWhereInput[]
    name?: StringFilter<"Professor"> | string
    email?: StringNullableFilter<"Professor"> | string | null
    createdById?: StringFilter<"Professor"> | string
    courses?: CourseListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProfessorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    createdById?: SortOrder
    _count?: ProfessorCountOrderByAggregateInput
    _max?: ProfessorMaxOrderByAggregateInput
    _min?: ProfessorMinOrderByAggregateInput
  }

  export type ProfessorScalarWhereWithAggregatesInput = {
    AND?: ProfessorScalarWhereWithAggregatesInput | ProfessorScalarWhereWithAggregatesInput[]
    OR?: ProfessorScalarWhereWithAggregatesInput[]
    NOT?: ProfessorScalarWhereWithAggregatesInput | ProfessorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Professor"> | string
    name?: StringWithAggregatesFilter<"Professor"> | string
    email?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    createdById?: StringWithAggregatesFilter<"Professor"> | string
  }

  export type SemesterWhereInput = {
    AND?: SemesterWhereInput | SemesterWhereInput[]
    OR?: SemesterWhereInput[]
    NOT?: SemesterWhereInput | SemesterWhereInput[]
    id?: StringFilter<"Semester"> | string
    name?: StringFilter<"Semester"> | string
    year?: IntFilter<"Semester"> | number
    createdById?: StringFilter<"Semester"> | string
    notes?: NoteListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SemesterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    year?: SortOrder
    createdById?: SortOrder
    notes?: NoteOrderByRelationAggregateInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type SemesterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SemesterWhereInput | SemesterWhereInput[]
    OR?: SemesterWhereInput[]
    NOT?: SemesterWhereInput | SemesterWhereInput[]
    name?: StringFilter<"Semester"> | string
    year?: IntFilter<"Semester"> | number
    createdById?: StringFilter<"Semester"> | string
    notes?: NoteListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SemesterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    year?: SortOrder
    createdById?: SortOrder
    _count?: SemesterCountOrderByAggregateInput
    _avg?: SemesterAvgOrderByAggregateInput
    _max?: SemesterMaxOrderByAggregateInput
    _min?: SemesterMinOrderByAggregateInput
    _sum?: SemesterSumOrderByAggregateInput
  }

  export type SemesterScalarWhereWithAggregatesInput = {
    AND?: SemesterScalarWhereWithAggregatesInput | SemesterScalarWhereWithAggregatesInput[]
    OR?: SemesterScalarWhereWithAggregatesInput[]
    NOT?: SemesterScalarWhereWithAggregatesInput | SemesterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Semester"> | string
    name?: StringWithAggregatesFilter<"Semester"> | string
    year?: IntWithAggregatesFilter<"Semester"> | number
    createdById?: StringWithAggregatesFilter<"Semester"> | string
  }

  export type NoteWhereInput = {
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    id?: StringFilter<"Note"> | string
    title?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    filePath?: StringFilter<"Note"> | string
    fileType?: StringFilter<"Note"> | string
    fileUrl?: StringFilter<"Note"> | string
    uploaderId?: StringFilter<"Note"> | string
    courseId?: StringFilter<"Note"> | string
    description?: StringNullableFilter<"Note"> | string | null
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    semesterId?: StringNullableFilter<"Note"> | string | null
    isVerified?: BoolFilter<"Note"> | boolean
    verifiedAt?: DateTimeNullableFilter<"Note"> | Date | string | null
    verifiedById?: StringNullableFilter<"Note"> | string | null
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    semester?: XOR<SemesterNullableScalarRelationFilter, SemesterWhereInput> | null
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
    verifiedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    reviews?: ReviewListRelationFilter
    raffleEntries?: RaffleEntryListRelationFilter
    accessCodes?: AccessCodeNoteListRelationFilter
  }

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploaderId?: SortOrder
    courseId?: SortOrder
    description?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    semesterId?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedById?: SortOrderInput | SortOrder
    course?: CourseOrderByWithRelationInput
    semester?: SemesterOrderByWithRelationInput
    uploader?: UserOrderByWithRelationInput
    verifiedBy?: UserOrderByWithRelationInput
    reviews?: ReviewOrderByRelationAggregateInput
    raffleEntries?: RaffleEntryOrderByRelationAggregateInput
    accessCodes?: AccessCodeNoteOrderByRelationAggregateInput
  }

  export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    title?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    filePath?: StringFilter<"Note"> | string
    fileType?: StringFilter<"Note"> | string
    fileUrl?: StringFilter<"Note"> | string
    uploaderId?: StringFilter<"Note"> | string
    courseId?: StringFilter<"Note"> | string
    description?: StringNullableFilter<"Note"> | string | null
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    semesterId?: StringNullableFilter<"Note"> | string | null
    isVerified?: BoolFilter<"Note"> | boolean
    verifiedAt?: DateTimeNullableFilter<"Note"> | Date | string | null
    verifiedById?: StringNullableFilter<"Note"> | string | null
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    semester?: XOR<SemesterNullableScalarRelationFilter, SemesterWhereInput> | null
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
    verifiedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    reviews?: ReviewListRelationFilter
    raffleEntries?: RaffleEntryListRelationFilter
    accessCodes?: AccessCodeNoteListRelationFilter
  }, "id">

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploaderId?: SortOrder
    courseId?: SortOrder
    description?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    semesterId?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedById?: SortOrderInput | SortOrder
    _count?: NoteCountOrderByAggregateInput
    _max?: NoteMaxOrderByAggregateInput
    _min?: NoteMinOrderByAggregateInput
  }

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    OR?: NoteScalarWhereWithAggregatesInput[]
    NOT?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Note"> | string
    title?: StringWithAggregatesFilter<"Note"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
    filePath?: StringWithAggregatesFilter<"Note"> | string
    fileType?: StringWithAggregatesFilter<"Note"> | string
    fileUrl?: StringWithAggregatesFilter<"Note"> | string
    uploaderId?: StringWithAggregatesFilter<"Note"> | string
    courseId?: StringWithAggregatesFilter<"Note"> | string
    description?: StringNullableWithAggregatesFilter<"Note"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
    semesterId?: StringNullableWithAggregatesFilter<"Note"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Note"> | boolean
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"Note"> | Date | string | null
    verifiedById?: StringNullableWithAggregatesFilter<"Note"> | string | null
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    noteId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    note?: XOR<NoteScalarRelationFilter, NoteWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
    note?: NoteOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    noteId_userId?: ReviewNoteIdUserIdCompoundUniqueInput
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    noteId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    note?: XOR<NoteScalarRelationFilter, NoteWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "noteId_userId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    noteId?: StringWithAggregatesFilter<"Review"> | string
    userId?: StringWithAggregatesFilter<"Review"> | string
  }

  export type RaffleWhereInput = {
    AND?: RaffleWhereInput | RaffleWhereInput[]
    OR?: RaffleWhereInput[]
    NOT?: RaffleWhereInput | RaffleWhereInput[]
    id?: StringFilter<"Raffle"> | string
    title?: StringFilter<"Raffle"> | string
    description?: StringNullableFilter<"Raffle"> | string | null
    startTime?: DateTimeFilter<"Raffle"> | Date | string
    endTime?: DateTimeFilter<"Raffle"> | Date | string
    createdAt?: DateTimeFilter<"Raffle"> | Date | string
    raffle_prizes?: RafflePrizeListRelationFilter
    entries?: RaffleEntryListRelationFilter
  }

  export type RaffleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    raffle_prizes?: RafflePrizeOrderByRelationAggregateInput
    entries?: RaffleEntryOrderByRelationAggregateInput
  }

  export type RaffleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RaffleWhereInput | RaffleWhereInput[]
    OR?: RaffleWhereInput[]
    NOT?: RaffleWhereInput | RaffleWhereInput[]
    title?: StringFilter<"Raffle"> | string
    description?: StringNullableFilter<"Raffle"> | string | null
    startTime?: DateTimeFilter<"Raffle"> | Date | string
    endTime?: DateTimeFilter<"Raffle"> | Date | string
    createdAt?: DateTimeFilter<"Raffle"> | Date | string
    raffle_prizes?: RafflePrizeListRelationFilter
    entries?: RaffleEntryListRelationFilter
  }, "id">

  export type RaffleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    _count?: RaffleCountOrderByAggregateInput
    _max?: RaffleMaxOrderByAggregateInput
    _min?: RaffleMinOrderByAggregateInput
  }

  export type RaffleScalarWhereWithAggregatesInput = {
    AND?: RaffleScalarWhereWithAggregatesInput | RaffleScalarWhereWithAggregatesInput[]
    OR?: RaffleScalarWhereWithAggregatesInput[]
    NOT?: RaffleScalarWhereWithAggregatesInput | RaffleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Raffle"> | string
    title?: StringWithAggregatesFilter<"Raffle"> | string
    description?: StringNullableWithAggregatesFilter<"Raffle"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"Raffle"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Raffle"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Raffle"> | Date | string
  }

  export type RafflePrizeWhereInput = {
    AND?: RafflePrizeWhereInput | RafflePrizeWhereInput[]
    OR?: RafflePrizeWhereInput[]
    NOT?: RafflePrizeWhereInput | RafflePrizeWhereInput[]
    id?: StringFilter<"RafflePrize"> | string
    raffleId?: StringFilter<"RafflePrize"> | string
    name?: StringFilter<"RafflePrize"> | string
    description?: StringNullableFilter<"RafflePrize"> | string | null
    imageUrl?: StringNullableFilter<"RafflePrize"> | string | null
    quantity?: IntFilter<"RafflePrize"> | number
    size?: StringNullableFilter<"RafflePrize"> | string | null
    color?: StringNullableFilter<"RafflePrize"> | string | null
    metadata?: JsonNullableFilter<"RafflePrize">
    raffles?: XOR<RaffleScalarRelationFilter, RaffleWhereInput>
  }

  export type RafflePrizeOrderByWithRelationInput = {
    id?: SortOrder
    raffleId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    quantity?: SortOrder
    size?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    raffles?: RaffleOrderByWithRelationInput
  }

  export type RafflePrizeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RafflePrizeWhereInput | RafflePrizeWhereInput[]
    OR?: RafflePrizeWhereInput[]
    NOT?: RafflePrizeWhereInput | RafflePrizeWhereInput[]
    raffleId?: StringFilter<"RafflePrize"> | string
    name?: StringFilter<"RafflePrize"> | string
    description?: StringNullableFilter<"RafflePrize"> | string | null
    imageUrl?: StringNullableFilter<"RafflePrize"> | string | null
    quantity?: IntFilter<"RafflePrize"> | number
    size?: StringNullableFilter<"RafflePrize"> | string | null
    color?: StringNullableFilter<"RafflePrize"> | string | null
    metadata?: JsonNullableFilter<"RafflePrize">
    raffles?: XOR<RaffleScalarRelationFilter, RaffleWhereInput>
  }, "id">

  export type RafflePrizeOrderByWithAggregationInput = {
    id?: SortOrder
    raffleId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    quantity?: SortOrder
    size?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: RafflePrizeCountOrderByAggregateInput
    _avg?: RafflePrizeAvgOrderByAggregateInput
    _max?: RafflePrizeMaxOrderByAggregateInput
    _min?: RafflePrizeMinOrderByAggregateInput
    _sum?: RafflePrizeSumOrderByAggregateInput
  }

  export type RafflePrizeScalarWhereWithAggregatesInput = {
    AND?: RafflePrizeScalarWhereWithAggregatesInput | RafflePrizeScalarWhereWithAggregatesInput[]
    OR?: RafflePrizeScalarWhereWithAggregatesInput[]
    NOT?: RafflePrizeScalarWhereWithAggregatesInput | RafflePrizeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RafflePrize"> | string
    raffleId?: StringWithAggregatesFilter<"RafflePrize"> | string
    name?: StringWithAggregatesFilter<"RafflePrize"> | string
    description?: StringNullableWithAggregatesFilter<"RafflePrize"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"RafflePrize"> | string | null
    quantity?: IntWithAggregatesFilter<"RafflePrize"> | number
    size?: StringNullableWithAggregatesFilter<"RafflePrize"> | string | null
    color?: StringNullableWithAggregatesFilter<"RafflePrize"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"RafflePrize">
  }

  export type RaffleEntryWhereInput = {
    AND?: RaffleEntryWhereInput | RaffleEntryWhereInput[]
    OR?: RaffleEntryWhereInput[]
    NOT?: RaffleEntryWhereInput | RaffleEntryWhereInput[]
    id?: StringFilter<"RaffleEntry"> | string
    raffleId?: StringFilter<"RaffleEntry"> | string
    userId?: StringFilter<"RaffleEntry"> | string
    noteId?: StringFilter<"RaffleEntry"> | string
    isWinner?: BoolFilter<"RaffleEntry"> | boolean
    createdAt?: DateTimeFilter<"RaffleEntry"> | Date | string
    raffle?: XOR<RaffleScalarRelationFilter, RaffleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    note?: XOR<NoteScalarRelationFilter, NoteWhereInput>
  }

  export type RaffleEntryOrderByWithRelationInput = {
    id?: SortOrder
    raffleId?: SortOrder
    userId?: SortOrder
    noteId?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
    raffle?: RaffleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    note?: NoteOrderByWithRelationInput
  }

  export type RaffleEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RaffleEntryWhereInput | RaffleEntryWhereInput[]
    OR?: RaffleEntryWhereInput[]
    NOT?: RaffleEntryWhereInput | RaffleEntryWhereInput[]
    raffleId?: StringFilter<"RaffleEntry"> | string
    userId?: StringFilter<"RaffleEntry"> | string
    noteId?: StringFilter<"RaffleEntry"> | string
    isWinner?: BoolFilter<"RaffleEntry"> | boolean
    createdAt?: DateTimeFilter<"RaffleEntry"> | Date | string
    raffle?: XOR<RaffleScalarRelationFilter, RaffleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    note?: XOR<NoteScalarRelationFilter, NoteWhereInput>
  }, "id">

  export type RaffleEntryOrderByWithAggregationInput = {
    id?: SortOrder
    raffleId?: SortOrder
    userId?: SortOrder
    noteId?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
    _count?: RaffleEntryCountOrderByAggregateInput
    _max?: RaffleEntryMaxOrderByAggregateInput
    _min?: RaffleEntryMinOrderByAggregateInput
  }

  export type RaffleEntryScalarWhereWithAggregatesInput = {
    AND?: RaffleEntryScalarWhereWithAggregatesInput | RaffleEntryScalarWhereWithAggregatesInput[]
    OR?: RaffleEntryScalarWhereWithAggregatesInput[]
    NOT?: RaffleEntryScalarWhereWithAggregatesInput | RaffleEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RaffleEntry"> | string
    raffleId?: StringWithAggregatesFilter<"RaffleEntry"> | string
    userId?: StringWithAggregatesFilter<"RaffleEntry"> | string
    noteId?: StringWithAggregatesFilter<"RaffleEntry"> | string
    isWinner?: BoolWithAggregatesFilter<"RaffleEntry"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"RaffleEntry"> | Date | string
  }

  export type UserCoursesWhereInput = {
    AND?: UserCoursesWhereInput | UserCoursesWhereInput[]
    OR?: UserCoursesWhereInput[]
    NOT?: UserCoursesWhereInput | UserCoursesWhereInput[]
    A?: StringFilter<"UserCourses"> | string
    B?: StringFilter<"UserCourses"> | string
    Course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    user_roles?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserCoursesOrderByWithRelationInput = {
    A?: SortOrder
    B?: SortOrder
    Course?: CourseOrderByWithRelationInput
    user_roles?: UserOrderByWithRelationInput
  }

  export type UserCoursesWhereUniqueInput = Prisma.AtLeast<{
    A_B?: UserCoursesABCompoundUniqueInput
    AND?: UserCoursesWhereInput | UserCoursesWhereInput[]
    OR?: UserCoursesWhereInput[]
    NOT?: UserCoursesWhereInput | UserCoursesWhereInput[]
    A?: StringFilter<"UserCourses"> | string
    B?: StringFilter<"UserCourses"> | string
    Course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    user_roles?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "A_B">

  export type UserCoursesOrderByWithAggregationInput = {
    A?: SortOrder
    B?: SortOrder
    _count?: UserCoursesCountOrderByAggregateInput
    _max?: UserCoursesMaxOrderByAggregateInput
    _min?: UserCoursesMinOrderByAggregateInput
  }

  export type UserCoursesScalarWhereWithAggregatesInput = {
    AND?: UserCoursesScalarWhereWithAggregatesInput | UserCoursesScalarWhereWithAggregatesInput[]
    OR?: UserCoursesScalarWhereWithAggregatesInput[]
    NOT?: UserCoursesScalarWhereWithAggregatesInput | UserCoursesScalarWhereWithAggregatesInput[]
    A?: StringWithAggregatesFilter<"UserCourses"> | string
    B?: StringWithAggregatesFilter<"UserCourses"> | string
  }

  export type AccessCodeWhereInput = {
    AND?: AccessCodeWhereInput | AccessCodeWhereInput[]
    OR?: AccessCodeWhereInput[]
    NOT?: AccessCodeWhereInput | AccessCodeWhereInput[]
    id?: StringFilter<"AccessCode"> | string
    code?: StringFilter<"AccessCode"> | string
    createdById?: StringFilter<"AccessCode"> | string
    duration?: IntNullableFilter<"AccessCode"> | number | null
    expiresAt?: DateTimeFilter<"AccessCode"> | Date | string
    activatedAt?: DateTimeNullableFilter<"AccessCode"> | Date | string | null
    deviceId?: StringNullableFilter<"AccessCode"> | string | null
    studentEmail?: StringNullableFilter<"AccessCode"> | string | null
    lastHeartbeat?: DateTimeNullableFilter<"AccessCode"> | Date | string | null
    isUsed?: BoolFilter<"AccessCode"> | boolean
    isRevoked?: BoolFilter<"AccessCode"> | boolean
    createdAt?: DateTimeFilter<"AccessCode"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    notes?: AccessCodeNoteListRelationFilter
  }

  export type AccessCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    createdById?: SortOrder
    duration?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    activatedAt?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    studentEmail?: SortOrderInput | SortOrder
    lastHeartbeat?: SortOrderInput | SortOrder
    isUsed?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    notes?: AccessCodeNoteOrderByRelationAggregateInput
  }

  export type AccessCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: AccessCodeWhereInput | AccessCodeWhereInput[]
    OR?: AccessCodeWhereInput[]
    NOT?: AccessCodeWhereInput | AccessCodeWhereInput[]
    createdById?: StringFilter<"AccessCode"> | string
    duration?: IntNullableFilter<"AccessCode"> | number | null
    expiresAt?: DateTimeFilter<"AccessCode"> | Date | string
    activatedAt?: DateTimeNullableFilter<"AccessCode"> | Date | string | null
    deviceId?: StringNullableFilter<"AccessCode"> | string | null
    studentEmail?: StringNullableFilter<"AccessCode"> | string | null
    lastHeartbeat?: DateTimeNullableFilter<"AccessCode"> | Date | string | null
    isUsed?: BoolFilter<"AccessCode"> | boolean
    isRevoked?: BoolFilter<"AccessCode"> | boolean
    createdAt?: DateTimeFilter<"AccessCode"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    notes?: AccessCodeNoteListRelationFilter
  }, "id" | "code">

  export type AccessCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    createdById?: SortOrder
    duration?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    activatedAt?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    studentEmail?: SortOrderInput | SortOrder
    lastHeartbeat?: SortOrderInput | SortOrder
    isUsed?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    _count?: AccessCodeCountOrderByAggregateInput
    _avg?: AccessCodeAvgOrderByAggregateInput
    _max?: AccessCodeMaxOrderByAggregateInput
    _min?: AccessCodeMinOrderByAggregateInput
    _sum?: AccessCodeSumOrderByAggregateInput
  }

  export type AccessCodeScalarWhereWithAggregatesInput = {
    AND?: AccessCodeScalarWhereWithAggregatesInput | AccessCodeScalarWhereWithAggregatesInput[]
    OR?: AccessCodeScalarWhereWithAggregatesInput[]
    NOT?: AccessCodeScalarWhereWithAggregatesInput | AccessCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AccessCode"> | string
    code?: StringWithAggregatesFilter<"AccessCode"> | string
    createdById?: StringWithAggregatesFilter<"AccessCode"> | string
    duration?: IntNullableWithAggregatesFilter<"AccessCode"> | number | null
    expiresAt?: DateTimeWithAggregatesFilter<"AccessCode"> | Date | string
    activatedAt?: DateTimeNullableWithAggregatesFilter<"AccessCode"> | Date | string | null
    deviceId?: StringNullableWithAggregatesFilter<"AccessCode"> | string | null
    studentEmail?: StringNullableWithAggregatesFilter<"AccessCode"> | string | null
    lastHeartbeat?: DateTimeNullableWithAggregatesFilter<"AccessCode"> | Date | string | null
    isUsed?: BoolWithAggregatesFilter<"AccessCode"> | boolean
    isRevoked?: BoolWithAggregatesFilter<"AccessCode"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AccessCode"> | Date | string
  }

  export type AccessCodeNoteWhereInput = {
    AND?: AccessCodeNoteWhereInput | AccessCodeNoteWhereInput[]
    OR?: AccessCodeNoteWhereInput[]
    NOT?: AccessCodeNoteWhereInput | AccessCodeNoteWhereInput[]
    id?: StringFilter<"AccessCodeNote"> | string
    accessCodeId?: StringFilter<"AccessCodeNote"> | string
    noteId?: StringFilter<"AccessCodeNote"> | string
    accessCode?: XOR<AccessCodeScalarRelationFilter, AccessCodeWhereInput>
    note?: XOR<NoteScalarRelationFilter, NoteWhereInput>
  }

  export type AccessCodeNoteOrderByWithRelationInput = {
    id?: SortOrder
    accessCodeId?: SortOrder
    noteId?: SortOrder
    accessCode?: AccessCodeOrderByWithRelationInput
    note?: NoteOrderByWithRelationInput
  }

  export type AccessCodeNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    accessCodeId_noteId?: AccessCodeNoteAccessCodeIdNoteIdCompoundUniqueInput
    AND?: AccessCodeNoteWhereInput | AccessCodeNoteWhereInput[]
    OR?: AccessCodeNoteWhereInput[]
    NOT?: AccessCodeNoteWhereInput | AccessCodeNoteWhereInput[]
    accessCodeId?: StringFilter<"AccessCodeNote"> | string
    noteId?: StringFilter<"AccessCodeNote"> | string
    accessCode?: XOR<AccessCodeScalarRelationFilter, AccessCodeWhereInput>
    note?: XOR<NoteScalarRelationFilter, NoteWhereInput>
  }, "id" | "accessCodeId_noteId">

  export type AccessCodeNoteOrderByWithAggregationInput = {
    id?: SortOrder
    accessCodeId?: SortOrder
    noteId?: SortOrder
    _count?: AccessCodeNoteCountOrderByAggregateInput
    _max?: AccessCodeNoteMaxOrderByAggregateInput
    _min?: AccessCodeNoteMinOrderByAggregateInput
  }

  export type AccessCodeNoteScalarWhereWithAggregatesInput = {
    AND?: AccessCodeNoteScalarWhereWithAggregatesInput | AccessCodeNoteScalarWhereWithAggregatesInput[]
    OR?: AccessCodeNoteScalarWhereWithAggregatesInput[]
    NOT?: AccessCodeNoteScalarWhereWithAggregatesInput | AccessCodeNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AccessCodeNote"> | string
    accessCodeId?: StringWithAggregatesFilter<"AccessCodeNote"> | string
    noteId?: StringWithAggregatesFilter<"AccessCodeNote"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    professor?: ProfessorCreateNestedOneWithoutCoursesInput
    notes?: NoteCreateNestedManyWithoutCourseInput
    UserCourses?: UserCoursesCreateNestedManyWithoutCourseInput
    createdBy: UserCreateNestedOneWithoutCreatedCoursesInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    professorId?: string | null
    createdAt?: Date | string
    createdById: string
    notes?: NoteUncheckedCreateNestedManyWithoutCourseInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: ProfessorUpdateOneWithoutCoursesNestedInput
    notes?: NoteUpdateManyWithoutCourseNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutCourseNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCoursesNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    notes?: NoteUncheckedUpdateManyWithoutCourseNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    name: string
    code: string
    professorId?: string | null
    createdAt?: Date | string
    createdById: string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessorCreateInput = {
    id?: string
    name: string
    email?: string | null
    courses?: CourseCreateNestedManyWithoutProfessorInput
    createdBy: UserCreateNestedOneWithoutCreatedProfessorsInput
  }

  export type ProfessorUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    createdById: string
    courses?: CourseUncheckedCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUpdateManyWithoutProfessorNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedProfessorsNestedInput
  }

  export type ProfessorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    createdById: string
  }

  export type ProfessorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type SemesterCreateInput = {
    id?: string
    name: string
    year: number
    notes?: NoteCreateNestedManyWithoutSemesterInput
    createdBy: UserCreateNestedOneWithoutCreatedSemestersInput
  }

  export type SemesterUncheckedCreateInput = {
    id?: string
    name: string
    year: number
    createdById: string
    notes?: NoteUncheckedCreateNestedManyWithoutSemesterInput
  }

  export type SemesterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    notes?: NoteUpdateManyWithoutSemesterNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedSemestersNestedInput
  }

  export type SemesterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    notes?: NoteUncheckedUpdateManyWithoutSemesterNestedInput
  }

  export type SemesterCreateManyInput = {
    id?: string
    name: string
    year: number
    createdById: string
  }

  export type SemesterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
  }

  export type SemesterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type NoteCreateInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    course: CourseCreateNestedOneWithoutNotesInput
    semester?: SemesterCreateNestedOneWithoutNotesInput
    uploader: UserCreateNestedOneWithoutNotesInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedNotesInput
    reviews?: ReviewCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    course?: CourseUpdateOneRequiredWithoutNotesNestedInput
    semester?: SemesterUpdateOneWithoutNotesNestedInput
    uploader?: UserUpdateOneRequiredWithoutNotesNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedNotesNestedInput
    reviews?: ReviewUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteCreateManyInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
  }

  export type NoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    note: NoteCreateNestedOneWithoutReviewsInput
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    noteId: string
    userId: string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NoteUpdateOneRequiredWithoutReviewsNestedInput
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    noteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    noteId: string
    userId: string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    noteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RaffleCreateInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    raffle_prizes?: RafflePrizeCreateNestedManyWithoutRafflesInput
    entries?: RaffleEntryCreateNestedManyWithoutRaffleInput
  }

  export type RaffleUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    raffle_prizes?: RafflePrizeUncheckedCreateNestedManyWithoutRafflesInput
    entries?: RaffleEntryUncheckedCreateNestedManyWithoutRaffleInput
  }

  export type RaffleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raffle_prizes?: RafflePrizeUpdateManyWithoutRafflesNestedInput
    entries?: RaffleEntryUpdateManyWithoutRaffleNestedInput
  }

  export type RaffleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raffle_prizes?: RafflePrizeUncheckedUpdateManyWithoutRafflesNestedInput
    entries?: RaffleEntryUncheckedUpdateManyWithoutRaffleNestedInput
  }

  export type RaffleCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
  }

  export type RaffleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaffleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RafflePrizeCreateInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    quantity?: number
    size?: string | null
    color?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    raffles: RaffleCreateNestedOneWithoutRaffle_prizesInput
  }

  export type RafflePrizeUncheckedCreateInput = {
    id?: string
    raffleId: string
    name: string
    description?: string | null
    imageUrl?: string | null
    quantity?: number
    size?: string | null
    color?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RafflePrizeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    raffles?: RaffleUpdateOneRequiredWithoutRaffle_prizesNestedInput
  }

  export type RafflePrizeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    raffleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RafflePrizeCreateManyInput = {
    id?: string
    raffleId: string
    name: string
    description?: string | null
    imageUrl?: string | null
    quantity?: number
    size?: string | null
    color?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RafflePrizeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RafflePrizeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    raffleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RaffleEntryCreateInput = {
    id?: string
    isWinner?: boolean
    createdAt?: Date | string
    raffle: RaffleCreateNestedOneWithoutEntriesInput
    user: UserCreateNestedOneWithoutRaffleEntriesInput
    note: NoteCreateNestedOneWithoutRaffleEntriesInput
  }

  export type RaffleEntryUncheckedCreateInput = {
    id?: string
    raffleId: string
    userId: string
    noteId: string
    isWinner?: boolean
    createdAt?: Date | string
  }

  export type RaffleEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raffle?: RaffleUpdateOneRequiredWithoutEntriesNestedInput
    user?: UserUpdateOneRequiredWithoutRaffleEntriesNestedInput
    note?: NoteUpdateOneRequiredWithoutRaffleEntriesNestedInput
  }

  export type RaffleEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    raffleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaffleEntryCreateManyInput = {
    id?: string
    raffleId: string
    userId: string
    noteId: string
    isWinner?: boolean
    createdAt?: Date | string
  }

  export type RaffleEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaffleEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    raffleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCoursesCreateInput = {
    Course: CourseCreateNestedOneWithoutUserCoursesInput
    user_roles: UserCreateNestedOneWithoutUserCoursesInput
  }

  export type UserCoursesUncheckedCreateInput = {
    A: string
    B: string
  }

  export type UserCoursesUpdateInput = {
    Course?: CourseUpdateOneRequiredWithoutUserCoursesNestedInput
    user_roles?: UserUpdateOneRequiredWithoutUserCoursesNestedInput
  }

  export type UserCoursesUncheckedUpdateInput = {
    A?: StringFieldUpdateOperationsInput | string
    B?: StringFieldUpdateOperationsInput | string
  }

  export type UserCoursesCreateManyInput = {
    A: string
    B: string
  }

  export type UserCoursesUpdateManyMutationInput = {

  }

  export type UserCoursesUncheckedUpdateManyInput = {
    A?: StringFieldUpdateOperationsInput | string
    B?: StringFieldUpdateOperationsInput | string
  }

  export type AccessCodeCreateInput = {
    id?: string
    code: string
    duration?: number | null
    expiresAt: Date | string
    activatedAt?: Date | string | null
    deviceId?: string | null
    studentEmail?: string | null
    lastHeartbeat?: Date | string | null
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedAccessCodesInput
    notes?: AccessCodeNoteCreateNestedManyWithoutAccessCodeInput
  }

  export type AccessCodeUncheckedCreateInput = {
    id?: string
    code: string
    createdById: string
    duration?: number | null
    expiresAt: Date | string
    activatedAt?: Date | string | null
    deviceId?: string | null
    studentEmail?: string | null
    lastHeartbeat?: Date | string | null
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: Date | string
    notes?: AccessCodeNoteUncheckedCreateNestedManyWithoutAccessCodeInput
  }

  export type AccessCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedAccessCodesNestedInput
    notes?: AccessCodeNoteUpdateManyWithoutAccessCodeNestedInput
  }

  export type AccessCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: AccessCodeNoteUncheckedUpdateManyWithoutAccessCodeNestedInput
  }

  export type AccessCodeCreateManyInput = {
    id?: string
    code: string
    createdById: string
    duration?: number | null
    expiresAt: Date | string
    activatedAt?: Date | string | null
    deviceId?: string | null
    studentEmail?: string | null
    lastHeartbeat?: Date | string | null
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: Date | string
  }

  export type AccessCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessCodeNoteCreateInput = {
    id?: string
    accessCode: AccessCodeCreateNestedOneWithoutNotesInput
    note: NoteCreateNestedOneWithoutAccessCodesInput
  }

  export type AccessCodeNoteUncheckedCreateInput = {
    id?: string
    accessCodeId: string
    noteId: string
  }

  export type AccessCodeNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessCode?: AccessCodeUpdateOneRequiredWithoutNotesNestedInput
    note?: NoteUpdateOneRequiredWithoutAccessCodesNestedInput
  }

  export type AccessCodeNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessCodeId?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
  }

  export type AccessCodeNoteCreateManyInput = {
    id?: string
    accessCodeId: string
    noteId: string
  }

  export type AccessCodeNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type AccessCodeNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessCodeId?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NoteListRelationFilter = {
    every?: NoteWhereInput
    some?: NoteWhereInput
    none?: NoteWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type RaffleEntryListRelationFilter = {
    every?: RaffleEntryWhereInput
    some?: RaffleEntryWhereInput
    none?: RaffleEntryWhereInput
  }

  export type UserCoursesListRelationFilter = {
    every?: UserCoursesWhereInput
    some?: UserCoursesWhereInput
    none?: UserCoursesWhereInput
  }

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type ProfessorListRelationFilter = {
    every?: ProfessorWhereInput
    some?: ProfessorWhereInput
    none?: ProfessorWhereInput
  }

  export type SemesterListRelationFilter = {
    every?: SemesterWhereInput
    some?: SemesterWhereInput
    none?: SemesterWhereInput
  }

  export type AccessCodeListRelationFilter = {
    every?: AccessCodeWhereInput
    some?: AccessCodeWhereInput
    none?: AccessCodeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RaffleEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCoursesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SemesterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccessCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    supabaseId?: SortOrder
    kudosPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    kudosPoints?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    supabaseId?: SortOrder
    kudosPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    supabaseId?: SortOrder
    kudosPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    kudosPoints?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProfessorNullableScalarRelationFilter = {
    is?: ProfessorWhereInput | null
    isNot?: ProfessorWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    professorId?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    professorId?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    professorId?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type ProfessorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdById?: SortOrder
  }

  export type ProfessorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdById?: SortOrder
  }

  export type ProfessorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdById?: SortOrder
  }

  export type SemesterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    year?: SortOrder
    createdById?: SortOrder
  }

  export type SemesterAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type SemesterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    year?: SortOrder
    createdById?: SortOrder
  }

  export type SemesterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    year?: SortOrder
    createdById?: SortOrder
  }

  export type SemesterSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type SemesterNullableScalarRelationFilter = {
    is?: SemesterWhereInput | null
    isNot?: SemesterWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AccessCodeNoteListRelationFilter = {
    every?: AccessCodeNoteWhereInput
    some?: AccessCodeNoteWhereInput
    none?: AccessCodeNoteWhereInput
  }

  export type AccessCodeNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploaderId?: SortOrder
    courseId?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
    semesterId?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedById?: SortOrder
  }

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploaderId?: SortOrder
    courseId?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
    semesterId?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedById?: SortOrder
  }

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploaderId?: SortOrder
    courseId?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
    semesterId?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedById?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NoteScalarRelationFilter = {
    is?: NoteWhereInput
    isNot?: NoteWhereInput
  }

  export type ReviewNoteIdUserIdCompoundUniqueInput = {
    noteId: string
    userId: string
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type RafflePrizeListRelationFilter = {
    every?: RafflePrizeWhereInput
    some?: RafflePrizeWhereInput
    none?: RafflePrizeWhereInput
  }

  export type RafflePrizeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RaffleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }

  export type RaffleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }

  export type RaffleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RaffleScalarRelationFilter = {
    is?: RaffleWhereInput
    isNot?: RaffleWhereInput
  }

  export type RafflePrizeCountOrderByAggregateInput = {
    id?: SortOrder
    raffleId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    quantity?: SortOrder
    size?: SortOrder
    color?: SortOrder
    metadata?: SortOrder
  }

  export type RafflePrizeAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type RafflePrizeMaxOrderByAggregateInput = {
    id?: SortOrder
    raffleId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    quantity?: SortOrder
    size?: SortOrder
    color?: SortOrder
  }

  export type RafflePrizeMinOrderByAggregateInput = {
    id?: SortOrder
    raffleId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    quantity?: SortOrder
    size?: SortOrder
    color?: SortOrder
  }

  export type RafflePrizeSumOrderByAggregateInput = {
    quantity?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type RaffleEntryCountOrderByAggregateInput = {
    id?: SortOrder
    raffleId?: SortOrder
    userId?: SortOrder
    noteId?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
  }

  export type RaffleEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    raffleId?: SortOrder
    userId?: SortOrder
    noteId?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
  }

  export type RaffleEntryMinOrderByAggregateInput = {
    id?: SortOrder
    raffleId?: SortOrder
    userId?: SortOrder
    noteId?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCoursesABCompoundUniqueInput = {
    A: string
    B: string
  }

  export type UserCoursesCountOrderByAggregateInput = {
    A?: SortOrder
    B?: SortOrder
  }

  export type UserCoursesMaxOrderByAggregateInput = {
    A?: SortOrder
    B?: SortOrder
  }

  export type UserCoursesMinOrderByAggregateInput = {
    A?: SortOrder
    B?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AccessCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdById?: SortOrder
    duration?: SortOrder
    expiresAt?: SortOrder
    activatedAt?: SortOrder
    deviceId?: SortOrder
    studentEmail?: SortOrder
    lastHeartbeat?: SortOrder
    isUsed?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
  }

  export type AccessCodeAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type AccessCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdById?: SortOrder
    duration?: SortOrder
    expiresAt?: SortOrder
    activatedAt?: SortOrder
    deviceId?: SortOrder
    studentEmail?: SortOrder
    lastHeartbeat?: SortOrder
    isUsed?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
  }

  export type AccessCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdById?: SortOrder
    duration?: SortOrder
    expiresAt?: SortOrder
    activatedAt?: SortOrder
    deviceId?: SortOrder
    studentEmail?: SortOrder
    lastHeartbeat?: SortOrder
    isUsed?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
  }

  export type AccessCodeSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AccessCodeScalarRelationFilter = {
    is?: AccessCodeWhereInput
    isNot?: AccessCodeWhereInput
  }

  export type AccessCodeNoteAccessCodeIdNoteIdCompoundUniqueInput = {
    accessCodeId: string
    noteId: string
  }

  export type AccessCodeNoteCountOrderByAggregateInput = {
    id?: SortOrder
    accessCodeId?: SortOrder
    noteId?: SortOrder
  }

  export type AccessCodeNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    accessCodeId?: SortOrder
    noteId?: SortOrder
  }

  export type AccessCodeNoteMinOrderByAggregateInput = {
    id?: SortOrder
    accessCodeId?: SortOrder
    noteId?: SortOrder
  }

  export type NoteCreateNestedManyWithoutUploaderInput = {
    create?: XOR<NoteCreateWithoutUploaderInput, NoteUncheckedCreateWithoutUploaderInput> | NoteCreateWithoutUploaderInput[] | NoteUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUploaderInput | NoteCreateOrConnectWithoutUploaderInput[]
    createMany?: NoteCreateManyUploaderInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type RaffleEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<RaffleEntryCreateWithoutUserInput, RaffleEntryUncheckedCreateWithoutUserInput> | RaffleEntryCreateWithoutUserInput[] | RaffleEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutUserInput | RaffleEntryCreateOrConnectWithoutUserInput[]
    createMany?: RaffleEntryCreateManyUserInputEnvelope
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
  }

  export type UserCoursesCreateNestedManyWithoutUser_rolesInput = {
    create?: XOR<UserCoursesCreateWithoutUser_rolesInput, UserCoursesUncheckedCreateWithoutUser_rolesInput> | UserCoursesCreateWithoutUser_rolesInput[] | UserCoursesUncheckedCreateWithoutUser_rolesInput[]
    connectOrCreate?: UserCoursesCreateOrConnectWithoutUser_rolesInput | UserCoursesCreateOrConnectWithoutUser_rolesInput[]
    createMany?: UserCoursesCreateManyUser_rolesInputEnvelope
    connect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
  }

  export type CourseCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput> | CourseCreateWithoutCreatedByInput[] | CourseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutCreatedByInput | CourseCreateOrConnectWithoutCreatedByInput[]
    createMany?: CourseCreateManyCreatedByInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type ProfessorCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProfessorCreateWithoutCreatedByInput, ProfessorUncheckedCreateWithoutCreatedByInput> | ProfessorCreateWithoutCreatedByInput[] | ProfessorUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProfessorCreateOrConnectWithoutCreatedByInput | ProfessorCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProfessorCreateManyCreatedByInputEnvelope
    connect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
  }

  export type SemesterCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<SemesterCreateWithoutCreatedByInput, SemesterUncheckedCreateWithoutCreatedByInput> | SemesterCreateWithoutCreatedByInput[] | SemesterUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SemesterCreateOrConnectWithoutCreatedByInput | SemesterCreateOrConnectWithoutCreatedByInput[]
    createMany?: SemesterCreateManyCreatedByInputEnvelope
    connect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
  }

  export type AccessCodeCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<AccessCodeCreateWithoutCreatedByInput, AccessCodeUncheckedCreateWithoutCreatedByInput> | AccessCodeCreateWithoutCreatedByInput[] | AccessCodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AccessCodeCreateOrConnectWithoutCreatedByInput | AccessCodeCreateOrConnectWithoutCreatedByInput[]
    createMany?: AccessCodeCreateManyCreatedByInputEnvelope
    connect?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
  }

  export type NoteCreateNestedManyWithoutVerifiedByInput = {
    create?: XOR<NoteCreateWithoutVerifiedByInput, NoteUncheckedCreateWithoutVerifiedByInput> | NoteCreateWithoutVerifiedByInput[] | NoteUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutVerifiedByInput | NoteCreateOrConnectWithoutVerifiedByInput[]
    createMany?: NoteCreateManyVerifiedByInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: XOR<NoteCreateWithoutUploaderInput, NoteUncheckedCreateWithoutUploaderInput> | NoteCreateWithoutUploaderInput[] | NoteUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUploaderInput | NoteCreateOrConnectWithoutUploaderInput[]
    createMany?: NoteCreateManyUploaderInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type RaffleEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RaffleEntryCreateWithoutUserInput, RaffleEntryUncheckedCreateWithoutUserInput> | RaffleEntryCreateWithoutUserInput[] | RaffleEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutUserInput | RaffleEntryCreateOrConnectWithoutUserInput[]
    createMany?: RaffleEntryCreateManyUserInputEnvelope
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
  }

  export type UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput = {
    create?: XOR<UserCoursesCreateWithoutUser_rolesInput, UserCoursesUncheckedCreateWithoutUser_rolesInput> | UserCoursesCreateWithoutUser_rolesInput[] | UserCoursesUncheckedCreateWithoutUser_rolesInput[]
    connectOrCreate?: UserCoursesCreateOrConnectWithoutUser_rolesInput | UserCoursesCreateOrConnectWithoutUser_rolesInput[]
    createMany?: UserCoursesCreateManyUser_rolesInputEnvelope
    connect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput> | CourseCreateWithoutCreatedByInput[] | CourseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutCreatedByInput | CourseCreateOrConnectWithoutCreatedByInput[]
    createMany?: CourseCreateManyCreatedByInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type ProfessorUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProfessorCreateWithoutCreatedByInput, ProfessorUncheckedCreateWithoutCreatedByInput> | ProfessorCreateWithoutCreatedByInput[] | ProfessorUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProfessorCreateOrConnectWithoutCreatedByInput | ProfessorCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProfessorCreateManyCreatedByInputEnvelope
    connect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
  }

  export type SemesterUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<SemesterCreateWithoutCreatedByInput, SemesterUncheckedCreateWithoutCreatedByInput> | SemesterCreateWithoutCreatedByInput[] | SemesterUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SemesterCreateOrConnectWithoutCreatedByInput | SemesterCreateOrConnectWithoutCreatedByInput[]
    createMany?: SemesterCreateManyCreatedByInputEnvelope
    connect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
  }

  export type AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<AccessCodeCreateWithoutCreatedByInput, AccessCodeUncheckedCreateWithoutCreatedByInput> | AccessCodeCreateWithoutCreatedByInput[] | AccessCodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AccessCodeCreateOrConnectWithoutCreatedByInput | AccessCodeCreateOrConnectWithoutCreatedByInput[]
    createMany?: AccessCodeCreateManyCreatedByInputEnvelope
    connect?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutVerifiedByInput = {
    create?: XOR<NoteCreateWithoutVerifiedByInput, NoteUncheckedCreateWithoutVerifiedByInput> | NoteCreateWithoutVerifiedByInput[] | NoteUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutVerifiedByInput | NoteCreateOrConnectWithoutVerifiedByInput[]
    createMany?: NoteCreateManyVerifiedByInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NoteUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<NoteCreateWithoutUploaderInput, NoteUncheckedCreateWithoutUploaderInput> | NoteCreateWithoutUploaderInput[] | NoteUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUploaderInput | NoteCreateOrConnectWithoutUploaderInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutUploaderInput | NoteUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: NoteCreateManyUploaderInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutUploaderInput | NoteUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutUploaderInput | NoteUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type RaffleEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<RaffleEntryCreateWithoutUserInput, RaffleEntryUncheckedCreateWithoutUserInput> | RaffleEntryCreateWithoutUserInput[] | RaffleEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutUserInput | RaffleEntryCreateOrConnectWithoutUserInput[]
    upsert?: RaffleEntryUpsertWithWhereUniqueWithoutUserInput | RaffleEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RaffleEntryCreateManyUserInputEnvelope
    set?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    disconnect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    delete?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    update?: RaffleEntryUpdateWithWhereUniqueWithoutUserInput | RaffleEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RaffleEntryUpdateManyWithWhereWithoutUserInput | RaffleEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RaffleEntryScalarWhereInput | RaffleEntryScalarWhereInput[]
  }

  export type UserCoursesUpdateManyWithoutUser_rolesNestedInput = {
    create?: XOR<UserCoursesCreateWithoutUser_rolesInput, UserCoursesUncheckedCreateWithoutUser_rolesInput> | UserCoursesCreateWithoutUser_rolesInput[] | UserCoursesUncheckedCreateWithoutUser_rolesInput[]
    connectOrCreate?: UserCoursesCreateOrConnectWithoutUser_rolesInput | UserCoursesCreateOrConnectWithoutUser_rolesInput[]
    upsert?: UserCoursesUpsertWithWhereUniqueWithoutUser_rolesInput | UserCoursesUpsertWithWhereUniqueWithoutUser_rolesInput[]
    createMany?: UserCoursesCreateManyUser_rolesInputEnvelope
    set?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    disconnect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    delete?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    connect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    update?: UserCoursesUpdateWithWhereUniqueWithoutUser_rolesInput | UserCoursesUpdateWithWhereUniqueWithoutUser_rolesInput[]
    updateMany?: UserCoursesUpdateManyWithWhereWithoutUser_rolesInput | UserCoursesUpdateManyWithWhereWithoutUser_rolesInput[]
    deleteMany?: UserCoursesScalarWhereInput | UserCoursesScalarWhereInput[]
  }

  export type CourseUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput> | CourseCreateWithoutCreatedByInput[] | CourseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutCreatedByInput | CourseCreateOrConnectWithoutCreatedByInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutCreatedByInput | CourseUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CourseCreateManyCreatedByInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutCreatedByInput | CourseUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutCreatedByInput | CourseUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type ProfessorUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProfessorCreateWithoutCreatedByInput, ProfessorUncheckedCreateWithoutCreatedByInput> | ProfessorCreateWithoutCreatedByInput[] | ProfessorUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProfessorCreateOrConnectWithoutCreatedByInput | ProfessorCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProfessorUpsertWithWhereUniqueWithoutCreatedByInput | ProfessorUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProfessorCreateManyCreatedByInputEnvelope
    set?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    disconnect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    delete?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    connect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    update?: ProfessorUpdateWithWhereUniqueWithoutCreatedByInput | ProfessorUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProfessorUpdateManyWithWhereWithoutCreatedByInput | ProfessorUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProfessorScalarWhereInput | ProfessorScalarWhereInput[]
  }

  export type SemesterUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<SemesterCreateWithoutCreatedByInput, SemesterUncheckedCreateWithoutCreatedByInput> | SemesterCreateWithoutCreatedByInput[] | SemesterUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SemesterCreateOrConnectWithoutCreatedByInput | SemesterCreateOrConnectWithoutCreatedByInput[]
    upsert?: SemesterUpsertWithWhereUniqueWithoutCreatedByInput | SemesterUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: SemesterCreateManyCreatedByInputEnvelope
    set?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    disconnect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    delete?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    connect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    update?: SemesterUpdateWithWhereUniqueWithoutCreatedByInput | SemesterUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: SemesterUpdateManyWithWhereWithoutCreatedByInput | SemesterUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: SemesterScalarWhereInput | SemesterScalarWhereInput[]
  }

  export type AccessCodeUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<AccessCodeCreateWithoutCreatedByInput, AccessCodeUncheckedCreateWithoutCreatedByInput> | AccessCodeCreateWithoutCreatedByInput[] | AccessCodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AccessCodeCreateOrConnectWithoutCreatedByInput | AccessCodeCreateOrConnectWithoutCreatedByInput[]
    upsert?: AccessCodeUpsertWithWhereUniqueWithoutCreatedByInput | AccessCodeUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: AccessCodeCreateManyCreatedByInputEnvelope
    set?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
    disconnect?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
    delete?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
    connect?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
    update?: AccessCodeUpdateWithWhereUniqueWithoutCreatedByInput | AccessCodeUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: AccessCodeUpdateManyWithWhereWithoutCreatedByInput | AccessCodeUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: AccessCodeScalarWhereInput | AccessCodeScalarWhereInput[]
  }

  export type NoteUpdateManyWithoutVerifiedByNestedInput = {
    create?: XOR<NoteCreateWithoutVerifiedByInput, NoteUncheckedCreateWithoutVerifiedByInput> | NoteCreateWithoutVerifiedByInput[] | NoteUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutVerifiedByInput | NoteCreateOrConnectWithoutVerifiedByInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutVerifiedByInput | NoteUpsertWithWhereUniqueWithoutVerifiedByInput[]
    createMany?: NoteCreateManyVerifiedByInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutVerifiedByInput | NoteUpdateWithWhereUniqueWithoutVerifiedByInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutVerifiedByInput | NoteUpdateManyWithWhereWithoutVerifiedByInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<NoteCreateWithoutUploaderInput, NoteUncheckedCreateWithoutUploaderInput> | NoteCreateWithoutUploaderInput[] | NoteUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUploaderInput | NoteCreateOrConnectWithoutUploaderInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutUploaderInput | NoteUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: NoteCreateManyUploaderInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutUploaderInput | NoteUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutUploaderInput | NoteUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type RaffleEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RaffleEntryCreateWithoutUserInput, RaffleEntryUncheckedCreateWithoutUserInput> | RaffleEntryCreateWithoutUserInput[] | RaffleEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutUserInput | RaffleEntryCreateOrConnectWithoutUserInput[]
    upsert?: RaffleEntryUpsertWithWhereUniqueWithoutUserInput | RaffleEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RaffleEntryCreateManyUserInputEnvelope
    set?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    disconnect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    delete?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    update?: RaffleEntryUpdateWithWhereUniqueWithoutUserInput | RaffleEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RaffleEntryUpdateManyWithWhereWithoutUserInput | RaffleEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RaffleEntryScalarWhereInput | RaffleEntryScalarWhereInput[]
  }

  export type UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput = {
    create?: XOR<UserCoursesCreateWithoutUser_rolesInput, UserCoursesUncheckedCreateWithoutUser_rolesInput> | UserCoursesCreateWithoutUser_rolesInput[] | UserCoursesUncheckedCreateWithoutUser_rolesInput[]
    connectOrCreate?: UserCoursesCreateOrConnectWithoutUser_rolesInput | UserCoursesCreateOrConnectWithoutUser_rolesInput[]
    upsert?: UserCoursesUpsertWithWhereUniqueWithoutUser_rolesInput | UserCoursesUpsertWithWhereUniqueWithoutUser_rolesInput[]
    createMany?: UserCoursesCreateManyUser_rolesInputEnvelope
    set?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    disconnect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    delete?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    connect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    update?: UserCoursesUpdateWithWhereUniqueWithoutUser_rolesInput | UserCoursesUpdateWithWhereUniqueWithoutUser_rolesInput[]
    updateMany?: UserCoursesUpdateManyWithWhereWithoutUser_rolesInput | UserCoursesUpdateManyWithWhereWithoutUser_rolesInput[]
    deleteMany?: UserCoursesScalarWhereInput | UserCoursesScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput> | CourseCreateWithoutCreatedByInput[] | CourseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutCreatedByInput | CourseCreateOrConnectWithoutCreatedByInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutCreatedByInput | CourseUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CourseCreateManyCreatedByInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutCreatedByInput | CourseUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutCreatedByInput | CourseUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProfessorCreateWithoutCreatedByInput, ProfessorUncheckedCreateWithoutCreatedByInput> | ProfessorCreateWithoutCreatedByInput[] | ProfessorUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProfessorCreateOrConnectWithoutCreatedByInput | ProfessorCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProfessorUpsertWithWhereUniqueWithoutCreatedByInput | ProfessorUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProfessorCreateManyCreatedByInputEnvelope
    set?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    disconnect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    delete?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    connect?: ProfessorWhereUniqueInput | ProfessorWhereUniqueInput[]
    update?: ProfessorUpdateWithWhereUniqueWithoutCreatedByInput | ProfessorUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProfessorUpdateManyWithWhereWithoutCreatedByInput | ProfessorUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProfessorScalarWhereInput | ProfessorScalarWhereInput[]
  }

  export type SemesterUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<SemesterCreateWithoutCreatedByInput, SemesterUncheckedCreateWithoutCreatedByInput> | SemesterCreateWithoutCreatedByInput[] | SemesterUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SemesterCreateOrConnectWithoutCreatedByInput | SemesterCreateOrConnectWithoutCreatedByInput[]
    upsert?: SemesterUpsertWithWhereUniqueWithoutCreatedByInput | SemesterUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: SemesterCreateManyCreatedByInputEnvelope
    set?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    disconnect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    delete?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    connect?: SemesterWhereUniqueInput | SemesterWhereUniqueInput[]
    update?: SemesterUpdateWithWhereUniqueWithoutCreatedByInput | SemesterUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: SemesterUpdateManyWithWhereWithoutCreatedByInput | SemesterUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: SemesterScalarWhereInput | SemesterScalarWhereInput[]
  }

  export type AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<AccessCodeCreateWithoutCreatedByInput, AccessCodeUncheckedCreateWithoutCreatedByInput> | AccessCodeCreateWithoutCreatedByInput[] | AccessCodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AccessCodeCreateOrConnectWithoutCreatedByInput | AccessCodeCreateOrConnectWithoutCreatedByInput[]
    upsert?: AccessCodeUpsertWithWhereUniqueWithoutCreatedByInput | AccessCodeUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: AccessCodeCreateManyCreatedByInputEnvelope
    set?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
    disconnect?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
    delete?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
    connect?: AccessCodeWhereUniqueInput | AccessCodeWhereUniqueInput[]
    update?: AccessCodeUpdateWithWhereUniqueWithoutCreatedByInput | AccessCodeUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: AccessCodeUpdateManyWithWhereWithoutCreatedByInput | AccessCodeUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: AccessCodeScalarWhereInput | AccessCodeScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutVerifiedByNestedInput = {
    create?: XOR<NoteCreateWithoutVerifiedByInput, NoteUncheckedCreateWithoutVerifiedByInput> | NoteCreateWithoutVerifiedByInput[] | NoteUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutVerifiedByInput | NoteCreateOrConnectWithoutVerifiedByInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutVerifiedByInput | NoteUpsertWithWhereUniqueWithoutVerifiedByInput[]
    createMany?: NoteCreateManyVerifiedByInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutVerifiedByInput | NoteUpdateWithWhereUniqueWithoutVerifiedByInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutVerifiedByInput | NoteUpdateManyWithWhereWithoutVerifiedByInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type ProfessorCreateNestedOneWithoutCoursesInput = {
    create?: XOR<ProfessorCreateWithoutCoursesInput, ProfessorUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutCoursesInput
    connect?: ProfessorWhereUniqueInput
  }

  export type NoteCreateNestedManyWithoutCourseInput = {
    create?: XOR<NoteCreateWithoutCourseInput, NoteUncheckedCreateWithoutCourseInput> | NoteCreateWithoutCourseInput[] | NoteUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutCourseInput | NoteCreateOrConnectWithoutCourseInput[]
    createMany?: NoteCreateManyCourseInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type UserCoursesCreateNestedManyWithoutCourseInput = {
    create?: XOR<UserCoursesCreateWithoutCourseInput, UserCoursesUncheckedCreateWithoutCourseInput> | UserCoursesCreateWithoutCourseInput[] | UserCoursesUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UserCoursesCreateOrConnectWithoutCourseInput | UserCoursesCreateOrConnectWithoutCourseInput[]
    createMany?: UserCoursesCreateManyCourseInputEnvelope
    connect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCreatedCoursesInput = {
    create?: XOR<UserCreateWithoutCreatedCoursesInput, UserUncheckedCreateWithoutCreatedCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCoursesInput
    connect?: UserWhereUniqueInput
  }

  export type NoteUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<NoteCreateWithoutCourseInput, NoteUncheckedCreateWithoutCourseInput> | NoteCreateWithoutCourseInput[] | NoteUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutCourseInput | NoteCreateOrConnectWithoutCourseInput[]
    createMany?: NoteCreateManyCourseInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type UserCoursesUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<UserCoursesCreateWithoutCourseInput, UserCoursesUncheckedCreateWithoutCourseInput> | UserCoursesCreateWithoutCourseInput[] | UserCoursesUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UserCoursesCreateOrConnectWithoutCourseInput | UserCoursesCreateOrConnectWithoutCourseInput[]
    createMany?: UserCoursesCreateManyCourseInputEnvelope
    connect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
  }

  export type ProfessorUpdateOneWithoutCoursesNestedInput = {
    create?: XOR<ProfessorCreateWithoutCoursesInput, ProfessorUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutCoursesInput
    upsert?: ProfessorUpsertWithoutCoursesInput
    disconnect?: ProfessorWhereInput | boolean
    delete?: ProfessorWhereInput | boolean
    connect?: ProfessorWhereUniqueInput
    update?: XOR<XOR<ProfessorUpdateToOneWithWhereWithoutCoursesInput, ProfessorUpdateWithoutCoursesInput>, ProfessorUncheckedUpdateWithoutCoursesInput>
  }

  export type NoteUpdateManyWithoutCourseNestedInput = {
    create?: XOR<NoteCreateWithoutCourseInput, NoteUncheckedCreateWithoutCourseInput> | NoteCreateWithoutCourseInput[] | NoteUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutCourseInput | NoteCreateOrConnectWithoutCourseInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutCourseInput | NoteUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: NoteCreateManyCourseInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutCourseInput | NoteUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutCourseInput | NoteUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type UserCoursesUpdateManyWithoutCourseNestedInput = {
    create?: XOR<UserCoursesCreateWithoutCourseInput, UserCoursesUncheckedCreateWithoutCourseInput> | UserCoursesCreateWithoutCourseInput[] | UserCoursesUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UserCoursesCreateOrConnectWithoutCourseInput | UserCoursesCreateOrConnectWithoutCourseInput[]
    upsert?: UserCoursesUpsertWithWhereUniqueWithoutCourseInput | UserCoursesUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: UserCoursesCreateManyCourseInputEnvelope
    set?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    disconnect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    delete?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    connect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    update?: UserCoursesUpdateWithWhereUniqueWithoutCourseInput | UserCoursesUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: UserCoursesUpdateManyWithWhereWithoutCourseInput | UserCoursesUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: UserCoursesScalarWhereInput | UserCoursesScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedCoursesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedCoursesInput, UserUncheckedCreateWithoutCreatedCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCoursesInput
    upsert?: UserUpsertWithoutCreatedCoursesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedCoursesInput, UserUpdateWithoutCreatedCoursesInput>, UserUncheckedUpdateWithoutCreatedCoursesInput>
  }

  export type NoteUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<NoteCreateWithoutCourseInput, NoteUncheckedCreateWithoutCourseInput> | NoteCreateWithoutCourseInput[] | NoteUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutCourseInput | NoteCreateOrConnectWithoutCourseInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutCourseInput | NoteUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: NoteCreateManyCourseInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutCourseInput | NoteUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutCourseInput | NoteUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type UserCoursesUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<UserCoursesCreateWithoutCourseInput, UserCoursesUncheckedCreateWithoutCourseInput> | UserCoursesCreateWithoutCourseInput[] | UserCoursesUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UserCoursesCreateOrConnectWithoutCourseInput | UserCoursesCreateOrConnectWithoutCourseInput[]
    upsert?: UserCoursesUpsertWithWhereUniqueWithoutCourseInput | UserCoursesUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: UserCoursesCreateManyCourseInputEnvelope
    set?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    disconnect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    delete?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    connect?: UserCoursesWhereUniqueInput | UserCoursesWhereUniqueInput[]
    update?: UserCoursesUpdateWithWhereUniqueWithoutCourseInput | UserCoursesUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: UserCoursesUpdateManyWithWhereWithoutCourseInput | UserCoursesUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: UserCoursesScalarWhereInput | UserCoursesScalarWhereInput[]
  }

  export type CourseCreateNestedManyWithoutProfessorInput = {
    create?: XOR<CourseCreateWithoutProfessorInput, CourseUncheckedCreateWithoutProfessorInput> | CourseCreateWithoutProfessorInput[] | CourseUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutProfessorInput | CourseCreateOrConnectWithoutProfessorInput[]
    createMany?: CourseCreateManyProfessorInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCreatedProfessorsInput = {
    create?: XOR<UserCreateWithoutCreatedProfessorsInput, UserUncheckedCreateWithoutCreatedProfessorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedProfessorsInput
    connect?: UserWhereUniqueInput
  }

  export type CourseUncheckedCreateNestedManyWithoutProfessorInput = {
    create?: XOR<CourseCreateWithoutProfessorInput, CourseUncheckedCreateWithoutProfessorInput> | CourseCreateWithoutProfessorInput[] | CourseUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutProfessorInput | CourseCreateOrConnectWithoutProfessorInput[]
    createMany?: CourseCreateManyProfessorInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<CourseCreateWithoutProfessorInput, CourseUncheckedCreateWithoutProfessorInput> | CourseCreateWithoutProfessorInput[] | CourseUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutProfessorInput | CourseCreateOrConnectWithoutProfessorInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutProfessorInput | CourseUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: CourseCreateManyProfessorInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutProfessorInput | CourseUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutProfessorInput | CourseUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedProfessorsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedProfessorsInput, UserUncheckedCreateWithoutCreatedProfessorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedProfessorsInput
    upsert?: UserUpsertWithoutCreatedProfessorsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedProfessorsInput, UserUpdateWithoutCreatedProfessorsInput>, UserUncheckedUpdateWithoutCreatedProfessorsInput>
  }

  export type CourseUncheckedUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<CourseCreateWithoutProfessorInput, CourseUncheckedCreateWithoutProfessorInput> | CourseCreateWithoutProfessorInput[] | CourseUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutProfessorInput | CourseCreateOrConnectWithoutProfessorInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutProfessorInput | CourseUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: CourseCreateManyProfessorInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutProfessorInput | CourseUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutProfessorInput | CourseUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type NoteCreateNestedManyWithoutSemesterInput = {
    create?: XOR<NoteCreateWithoutSemesterInput, NoteUncheckedCreateWithoutSemesterInput> | NoteCreateWithoutSemesterInput[] | NoteUncheckedCreateWithoutSemesterInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutSemesterInput | NoteCreateOrConnectWithoutSemesterInput[]
    createMany?: NoteCreateManySemesterInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCreatedSemestersInput = {
    create?: XOR<UserCreateWithoutCreatedSemestersInput, UserUncheckedCreateWithoutCreatedSemestersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedSemestersInput
    connect?: UserWhereUniqueInput
  }

  export type NoteUncheckedCreateNestedManyWithoutSemesterInput = {
    create?: XOR<NoteCreateWithoutSemesterInput, NoteUncheckedCreateWithoutSemesterInput> | NoteCreateWithoutSemesterInput[] | NoteUncheckedCreateWithoutSemesterInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutSemesterInput | NoteCreateOrConnectWithoutSemesterInput[]
    createMany?: NoteCreateManySemesterInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type NoteUpdateManyWithoutSemesterNestedInput = {
    create?: XOR<NoteCreateWithoutSemesterInput, NoteUncheckedCreateWithoutSemesterInput> | NoteCreateWithoutSemesterInput[] | NoteUncheckedCreateWithoutSemesterInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutSemesterInput | NoteCreateOrConnectWithoutSemesterInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutSemesterInput | NoteUpsertWithWhereUniqueWithoutSemesterInput[]
    createMany?: NoteCreateManySemesterInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutSemesterInput | NoteUpdateWithWhereUniqueWithoutSemesterInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutSemesterInput | NoteUpdateManyWithWhereWithoutSemesterInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedSemestersNestedInput = {
    create?: XOR<UserCreateWithoutCreatedSemestersInput, UserUncheckedCreateWithoutCreatedSemestersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedSemestersInput
    upsert?: UserUpsertWithoutCreatedSemestersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedSemestersInput, UserUpdateWithoutCreatedSemestersInput>, UserUncheckedUpdateWithoutCreatedSemestersInput>
  }

  export type NoteUncheckedUpdateManyWithoutSemesterNestedInput = {
    create?: XOR<NoteCreateWithoutSemesterInput, NoteUncheckedCreateWithoutSemesterInput> | NoteCreateWithoutSemesterInput[] | NoteUncheckedCreateWithoutSemesterInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutSemesterInput | NoteCreateOrConnectWithoutSemesterInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutSemesterInput | NoteUpsertWithWhereUniqueWithoutSemesterInput[]
    createMany?: NoteCreateManySemesterInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutSemesterInput | NoteUpdateWithWhereUniqueWithoutSemesterInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutSemesterInput | NoteUpdateManyWithWhereWithoutSemesterInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutNotesInput = {
    create?: XOR<CourseCreateWithoutNotesInput, CourseUncheckedCreateWithoutNotesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutNotesInput
    connect?: CourseWhereUniqueInput
  }

  export type SemesterCreateNestedOneWithoutNotesInput = {
    create?: XOR<SemesterCreateWithoutNotesInput, SemesterUncheckedCreateWithoutNotesInput>
    connectOrCreate?: SemesterCreateOrConnectWithoutNotesInput
    connect?: SemesterWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNotesInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVerifiedNotesInput = {
    create?: XOR<UserCreateWithoutVerifiedNotesInput, UserUncheckedCreateWithoutVerifiedNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedNotesInput
    connect?: UserWhereUniqueInput
  }

  export type ReviewCreateNestedManyWithoutNoteInput = {
    create?: XOR<ReviewCreateWithoutNoteInput, ReviewUncheckedCreateWithoutNoteInput> | ReviewCreateWithoutNoteInput[] | ReviewUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutNoteInput | ReviewCreateOrConnectWithoutNoteInput[]
    createMany?: ReviewCreateManyNoteInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type RaffleEntryCreateNestedManyWithoutNoteInput = {
    create?: XOR<RaffleEntryCreateWithoutNoteInput, RaffleEntryUncheckedCreateWithoutNoteInput> | RaffleEntryCreateWithoutNoteInput[] | RaffleEntryUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutNoteInput | RaffleEntryCreateOrConnectWithoutNoteInput[]
    createMany?: RaffleEntryCreateManyNoteInputEnvelope
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
  }

  export type AccessCodeNoteCreateNestedManyWithoutNoteInput = {
    create?: XOR<AccessCodeNoteCreateWithoutNoteInput, AccessCodeNoteUncheckedCreateWithoutNoteInput> | AccessCodeNoteCreateWithoutNoteInput[] | AccessCodeNoteUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: AccessCodeNoteCreateOrConnectWithoutNoteInput | AccessCodeNoteCreateOrConnectWithoutNoteInput[]
    createMany?: AccessCodeNoteCreateManyNoteInputEnvelope
    connect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutNoteInput = {
    create?: XOR<ReviewCreateWithoutNoteInput, ReviewUncheckedCreateWithoutNoteInput> | ReviewCreateWithoutNoteInput[] | ReviewUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutNoteInput | ReviewCreateOrConnectWithoutNoteInput[]
    createMany?: ReviewCreateManyNoteInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type RaffleEntryUncheckedCreateNestedManyWithoutNoteInput = {
    create?: XOR<RaffleEntryCreateWithoutNoteInput, RaffleEntryUncheckedCreateWithoutNoteInput> | RaffleEntryCreateWithoutNoteInput[] | RaffleEntryUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutNoteInput | RaffleEntryCreateOrConnectWithoutNoteInput[]
    createMany?: RaffleEntryCreateManyNoteInputEnvelope
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
  }

  export type AccessCodeNoteUncheckedCreateNestedManyWithoutNoteInput = {
    create?: XOR<AccessCodeNoteCreateWithoutNoteInput, AccessCodeNoteUncheckedCreateWithoutNoteInput> | AccessCodeNoteCreateWithoutNoteInput[] | AccessCodeNoteUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: AccessCodeNoteCreateOrConnectWithoutNoteInput | AccessCodeNoteCreateOrConnectWithoutNoteInput[]
    createMany?: AccessCodeNoteCreateManyNoteInputEnvelope
    connect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CourseUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<CourseCreateWithoutNotesInput, CourseUncheckedCreateWithoutNotesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutNotesInput
    upsert?: CourseUpsertWithoutNotesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutNotesInput, CourseUpdateWithoutNotesInput>, CourseUncheckedUpdateWithoutNotesInput>
  }

  export type SemesterUpdateOneWithoutNotesNestedInput = {
    create?: XOR<SemesterCreateWithoutNotesInput, SemesterUncheckedCreateWithoutNotesInput>
    connectOrCreate?: SemesterCreateOrConnectWithoutNotesInput
    upsert?: SemesterUpsertWithoutNotesInput
    disconnect?: SemesterWhereInput | boolean
    delete?: SemesterWhereInput | boolean
    connect?: SemesterWhereUniqueInput
    update?: XOR<XOR<SemesterUpdateToOneWithWhereWithoutNotesInput, SemesterUpdateWithoutNotesInput>, SemesterUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    upsert?: UserUpsertWithoutNotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotesInput, UserUpdateWithoutNotesInput>, UserUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateOneWithoutVerifiedNotesNestedInput = {
    create?: XOR<UserCreateWithoutVerifiedNotesInput, UserUncheckedCreateWithoutVerifiedNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedNotesInput
    upsert?: UserUpsertWithoutVerifiedNotesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerifiedNotesInput, UserUpdateWithoutVerifiedNotesInput>, UserUncheckedUpdateWithoutVerifiedNotesInput>
  }

  export type ReviewUpdateManyWithoutNoteNestedInput = {
    create?: XOR<ReviewCreateWithoutNoteInput, ReviewUncheckedCreateWithoutNoteInput> | ReviewCreateWithoutNoteInput[] | ReviewUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutNoteInput | ReviewCreateOrConnectWithoutNoteInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutNoteInput | ReviewUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: ReviewCreateManyNoteInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutNoteInput | ReviewUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutNoteInput | ReviewUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type RaffleEntryUpdateManyWithoutNoteNestedInput = {
    create?: XOR<RaffleEntryCreateWithoutNoteInput, RaffleEntryUncheckedCreateWithoutNoteInput> | RaffleEntryCreateWithoutNoteInput[] | RaffleEntryUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutNoteInput | RaffleEntryCreateOrConnectWithoutNoteInput[]
    upsert?: RaffleEntryUpsertWithWhereUniqueWithoutNoteInput | RaffleEntryUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: RaffleEntryCreateManyNoteInputEnvelope
    set?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    disconnect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    delete?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    update?: RaffleEntryUpdateWithWhereUniqueWithoutNoteInput | RaffleEntryUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: RaffleEntryUpdateManyWithWhereWithoutNoteInput | RaffleEntryUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: RaffleEntryScalarWhereInput | RaffleEntryScalarWhereInput[]
  }

  export type AccessCodeNoteUpdateManyWithoutNoteNestedInput = {
    create?: XOR<AccessCodeNoteCreateWithoutNoteInput, AccessCodeNoteUncheckedCreateWithoutNoteInput> | AccessCodeNoteCreateWithoutNoteInput[] | AccessCodeNoteUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: AccessCodeNoteCreateOrConnectWithoutNoteInput | AccessCodeNoteCreateOrConnectWithoutNoteInput[]
    upsert?: AccessCodeNoteUpsertWithWhereUniqueWithoutNoteInput | AccessCodeNoteUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: AccessCodeNoteCreateManyNoteInputEnvelope
    set?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    disconnect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    delete?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    connect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    update?: AccessCodeNoteUpdateWithWhereUniqueWithoutNoteInput | AccessCodeNoteUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: AccessCodeNoteUpdateManyWithWhereWithoutNoteInput | AccessCodeNoteUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: AccessCodeNoteScalarWhereInput | AccessCodeNoteScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: XOR<ReviewCreateWithoutNoteInput, ReviewUncheckedCreateWithoutNoteInput> | ReviewCreateWithoutNoteInput[] | ReviewUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutNoteInput | ReviewCreateOrConnectWithoutNoteInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutNoteInput | ReviewUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: ReviewCreateManyNoteInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutNoteInput | ReviewUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutNoteInput | ReviewUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type RaffleEntryUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: XOR<RaffleEntryCreateWithoutNoteInput, RaffleEntryUncheckedCreateWithoutNoteInput> | RaffleEntryCreateWithoutNoteInput[] | RaffleEntryUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutNoteInput | RaffleEntryCreateOrConnectWithoutNoteInput[]
    upsert?: RaffleEntryUpsertWithWhereUniqueWithoutNoteInput | RaffleEntryUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: RaffleEntryCreateManyNoteInputEnvelope
    set?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    disconnect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    delete?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    update?: RaffleEntryUpdateWithWhereUniqueWithoutNoteInput | RaffleEntryUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: RaffleEntryUpdateManyWithWhereWithoutNoteInput | RaffleEntryUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: RaffleEntryScalarWhereInput | RaffleEntryScalarWhereInput[]
  }

  export type AccessCodeNoteUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: XOR<AccessCodeNoteCreateWithoutNoteInput, AccessCodeNoteUncheckedCreateWithoutNoteInput> | AccessCodeNoteCreateWithoutNoteInput[] | AccessCodeNoteUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: AccessCodeNoteCreateOrConnectWithoutNoteInput | AccessCodeNoteCreateOrConnectWithoutNoteInput[]
    upsert?: AccessCodeNoteUpsertWithWhereUniqueWithoutNoteInput | AccessCodeNoteUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: AccessCodeNoteCreateManyNoteInputEnvelope
    set?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    disconnect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    delete?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    connect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    update?: AccessCodeNoteUpdateWithWhereUniqueWithoutNoteInput | AccessCodeNoteUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: AccessCodeNoteUpdateManyWithWhereWithoutNoteInput | AccessCodeNoteUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: AccessCodeNoteScalarWhereInput | AccessCodeNoteScalarWhereInput[]
  }

  export type NoteCreateNestedOneWithoutReviewsInput = {
    create?: XOR<NoteCreateWithoutReviewsInput, NoteUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: NoteCreateOrConnectWithoutReviewsInput
    connect?: NoteWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type NoteUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<NoteCreateWithoutReviewsInput, NoteUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: NoteCreateOrConnectWithoutReviewsInput
    upsert?: NoteUpsertWithoutReviewsInput
    connect?: NoteWhereUniqueInput
    update?: XOR<XOR<NoteUpdateToOneWithWhereWithoutReviewsInput, NoteUpdateWithoutReviewsInput>, NoteUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type RafflePrizeCreateNestedManyWithoutRafflesInput = {
    create?: XOR<RafflePrizeCreateWithoutRafflesInput, RafflePrizeUncheckedCreateWithoutRafflesInput> | RafflePrizeCreateWithoutRafflesInput[] | RafflePrizeUncheckedCreateWithoutRafflesInput[]
    connectOrCreate?: RafflePrizeCreateOrConnectWithoutRafflesInput | RafflePrizeCreateOrConnectWithoutRafflesInput[]
    createMany?: RafflePrizeCreateManyRafflesInputEnvelope
    connect?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
  }

  export type RaffleEntryCreateNestedManyWithoutRaffleInput = {
    create?: XOR<RaffleEntryCreateWithoutRaffleInput, RaffleEntryUncheckedCreateWithoutRaffleInput> | RaffleEntryCreateWithoutRaffleInput[] | RaffleEntryUncheckedCreateWithoutRaffleInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutRaffleInput | RaffleEntryCreateOrConnectWithoutRaffleInput[]
    createMany?: RaffleEntryCreateManyRaffleInputEnvelope
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
  }

  export type RafflePrizeUncheckedCreateNestedManyWithoutRafflesInput = {
    create?: XOR<RafflePrizeCreateWithoutRafflesInput, RafflePrizeUncheckedCreateWithoutRafflesInput> | RafflePrizeCreateWithoutRafflesInput[] | RafflePrizeUncheckedCreateWithoutRafflesInput[]
    connectOrCreate?: RafflePrizeCreateOrConnectWithoutRafflesInput | RafflePrizeCreateOrConnectWithoutRafflesInput[]
    createMany?: RafflePrizeCreateManyRafflesInputEnvelope
    connect?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
  }

  export type RaffleEntryUncheckedCreateNestedManyWithoutRaffleInput = {
    create?: XOR<RaffleEntryCreateWithoutRaffleInput, RaffleEntryUncheckedCreateWithoutRaffleInput> | RaffleEntryCreateWithoutRaffleInput[] | RaffleEntryUncheckedCreateWithoutRaffleInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutRaffleInput | RaffleEntryCreateOrConnectWithoutRaffleInput[]
    createMany?: RaffleEntryCreateManyRaffleInputEnvelope
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
  }

  export type RafflePrizeUpdateManyWithoutRafflesNestedInput = {
    create?: XOR<RafflePrizeCreateWithoutRafflesInput, RafflePrizeUncheckedCreateWithoutRafflesInput> | RafflePrizeCreateWithoutRafflesInput[] | RafflePrizeUncheckedCreateWithoutRafflesInput[]
    connectOrCreate?: RafflePrizeCreateOrConnectWithoutRafflesInput | RafflePrizeCreateOrConnectWithoutRafflesInput[]
    upsert?: RafflePrizeUpsertWithWhereUniqueWithoutRafflesInput | RafflePrizeUpsertWithWhereUniqueWithoutRafflesInput[]
    createMany?: RafflePrizeCreateManyRafflesInputEnvelope
    set?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
    disconnect?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
    delete?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
    connect?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
    update?: RafflePrizeUpdateWithWhereUniqueWithoutRafflesInput | RafflePrizeUpdateWithWhereUniqueWithoutRafflesInput[]
    updateMany?: RafflePrizeUpdateManyWithWhereWithoutRafflesInput | RafflePrizeUpdateManyWithWhereWithoutRafflesInput[]
    deleteMany?: RafflePrizeScalarWhereInput | RafflePrizeScalarWhereInput[]
  }

  export type RaffleEntryUpdateManyWithoutRaffleNestedInput = {
    create?: XOR<RaffleEntryCreateWithoutRaffleInput, RaffleEntryUncheckedCreateWithoutRaffleInput> | RaffleEntryCreateWithoutRaffleInput[] | RaffleEntryUncheckedCreateWithoutRaffleInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutRaffleInput | RaffleEntryCreateOrConnectWithoutRaffleInput[]
    upsert?: RaffleEntryUpsertWithWhereUniqueWithoutRaffleInput | RaffleEntryUpsertWithWhereUniqueWithoutRaffleInput[]
    createMany?: RaffleEntryCreateManyRaffleInputEnvelope
    set?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    disconnect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    delete?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    update?: RaffleEntryUpdateWithWhereUniqueWithoutRaffleInput | RaffleEntryUpdateWithWhereUniqueWithoutRaffleInput[]
    updateMany?: RaffleEntryUpdateManyWithWhereWithoutRaffleInput | RaffleEntryUpdateManyWithWhereWithoutRaffleInput[]
    deleteMany?: RaffleEntryScalarWhereInput | RaffleEntryScalarWhereInput[]
  }

  export type RafflePrizeUncheckedUpdateManyWithoutRafflesNestedInput = {
    create?: XOR<RafflePrizeCreateWithoutRafflesInput, RafflePrizeUncheckedCreateWithoutRafflesInput> | RafflePrizeCreateWithoutRafflesInput[] | RafflePrizeUncheckedCreateWithoutRafflesInput[]
    connectOrCreate?: RafflePrizeCreateOrConnectWithoutRafflesInput | RafflePrizeCreateOrConnectWithoutRafflesInput[]
    upsert?: RafflePrizeUpsertWithWhereUniqueWithoutRafflesInput | RafflePrizeUpsertWithWhereUniqueWithoutRafflesInput[]
    createMany?: RafflePrizeCreateManyRafflesInputEnvelope
    set?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
    disconnect?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
    delete?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
    connect?: RafflePrizeWhereUniqueInput | RafflePrizeWhereUniqueInput[]
    update?: RafflePrizeUpdateWithWhereUniqueWithoutRafflesInput | RafflePrizeUpdateWithWhereUniqueWithoutRafflesInput[]
    updateMany?: RafflePrizeUpdateManyWithWhereWithoutRafflesInput | RafflePrizeUpdateManyWithWhereWithoutRafflesInput[]
    deleteMany?: RafflePrizeScalarWhereInput | RafflePrizeScalarWhereInput[]
  }

  export type RaffleEntryUncheckedUpdateManyWithoutRaffleNestedInput = {
    create?: XOR<RaffleEntryCreateWithoutRaffleInput, RaffleEntryUncheckedCreateWithoutRaffleInput> | RaffleEntryCreateWithoutRaffleInput[] | RaffleEntryUncheckedCreateWithoutRaffleInput[]
    connectOrCreate?: RaffleEntryCreateOrConnectWithoutRaffleInput | RaffleEntryCreateOrConnectWithoutRaffleInput[]
    upsert?: RaffleEntryUpsertWithWhereUniqueWithoutRaffleInput | RaffleEntryUpsertWithWhereUniqueWithoutRaffleInput[]
    createMany?: RaffleEntryCreateManyRaffleInputEnvelope
    set?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    disconnect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    delete?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    connect?: RaffleEntryWhereUniqueInput | RaffleEntryWhereUniqueInput[]
    update?: RaffleEntryUpdateWithWhereUniqueWithoutRaffleInput | RaffleEntryUpdateWithWhereUniqueWithoutRaffleInput[]
    updateMany?: RaffleEntryUpdateManyWithWhereWithoutRaffleInput | RaffleEntryUpdateManyWithWhereWithoutRaffleInput[]
    deleteMany?: RaffleEntryScalarWhereInput | RaffleEntryScalarWhereInput[]
  }

  export type RaffleCreateNestedOneWithoutRaffle_prizesInput = {
    create?: XOR<RaffleCreateWithoutRaffle_prizesInput, RaffleUncheckedCreateWithoutRaffle_prizesInput>
    connectOrCreate?: RaffleCreateOrConnectWithoutRaffle_prizesInput
    connect?: RaffleWhereUniqueInput
  }

  export type RaffleUpdateOneRequiredWithoutRaffle_prizesNestedInput = {
    create?: XOR<RaffleCreateWithoutRaffle_prizesInput, RaffleUncheckedCreateWithoutRaffle_prizesInput>
    connectOrCreate?: RaffleCreateOrConnectWithoutRaffle_prizesInput
    upsert?: RaffleUpsertWithoutRaffle_prizesInput
    connect?: RaffleWhereUniqueInput
    update?: XOR<XOR<RaffleUpdateToOneWithWhereWithoutRaffle_prizesInput, RaffleUpdateWithoutRaffle_prizesInput>, RaffleUncheckedUpdateWithoutRaffle_prizesInput>
  }

  export type RaffleCreateNestedOneWithoutEntriesInput = {
    create?: XOR<RaffleCreateWithoutEntriesInput, RaffleUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: RaffleCreateOrConnectWithoutEntriesInput
    connect?: RaffleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRaffleEntriesInput = {
    create?: XOR<UserCreateWithoutRaffleEntriesInput, UserUncheckedCreateWithoutRaffleEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRaffleEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type NoteCreateNestedOneWithoutRaffleEntriesInput = {
    create?: XOR<NoteCreateWithoutRaffleEntriesInput, NoteUncheckedCreateWithoutRaffleEntriesInput>
    connectOrCreate?: NoteCreateOrConnectWithoutRaffleEntriesInput
    connect?: NoteWhereUniqueInput
  }

  export type RaffleUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<RaffleCreateWithoutEntriesInput, RaffleUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: RaffleCreateOrConnectWithoutEntriesInput
    upsert?: RaffleUpsertWithoutEntriesInput
    connect?: RaffleWhereUniqueInput
    update?: XOR<XOR<RaffleUpdateToOneWithWhereWithoutEntriesInput, RaffleUpdateWithoutEntriesInput>, RaffleUncheckedUpdateWithoutEntriesInput>
  }

  export type UserUpdateOneRequiredWithoutRaffleEntriesNestedInput = {
    create?: XOR<UserCreateWithoutRaffleEntriesInput, UserUncheckedCreateWithoutRaffleEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRaffleEntriesInput
    upsert?: UserUpsertWithoutRaffleEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRaffleEntriesInput, UserUpdateWithoutRaffleEntriesInput>, UserUncheckedUpdateWithoutRaffleEntriesInput>
  }

  export type NoteUpdateOneRequiredWithoutRaffleEntriesNestedInput = {
    create?: XOR<NoteCreateWithoutRaffleEntriesInput, NoteUncheckedCreateWithoutRaffleEntriesInput>
    connectOrCreate?: NoteCreateOrConnectWithoutRaffleEntriesInput
    upsert?: NoteUpsertWithoutRaffleEntriesInput
    connect?: NoteWhereUniqueInput
    update?: XOR<XOR<NoteUpdateToOneWithWhereWithoutRaffleEntriesInput, NoteUpdateWithoutRaffleEntriesInput>, NoteUncheckedUpdateWithoutRaffleEntriesInput>
  }

  export type CourseCreateNestedOneWithoutUserCoursesInput = {
    create?: XOR<CourseCreateWithoutUserCoursesInput, CourseUncheckedCreateWithoutUserCoursesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutUserCoursesInput
    connect?: CourseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUserCoursesInput = {
    create?: XOR<UserCreateWithoutUserCoursesInput, UserUncheckedCreateWithoutUserCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserCoursesInput
    connect?: UserWhereUniqueInput
  }

  export type CourseUpdateOneRequiredWithoutUserCoursesNestedInput = {
    create?: XOR<CourseCreateWithoutUserCoursesInput, CourseUncheckedCreateWithoutUserCoursesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutUserCoursesInput
    upsert?: CourseUpsertWithoutUserCoursesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutUserCoursesInput, CourseUpdateWithoutUserCoursesInput>, CourseUncheckedUpdateWithoutUserCoursesInput>
  }

  export type UserUpdateOneRequiredWithoutUserCoursesNestedInput = {
    create?: XOR<UserCreateWithoutUserCoursesInput, UserUncheckedCreateWithoutUserCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserCoursesInput
    upsert?: UserUpsertWithoutUserCoursesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserCoursesInput, UserUpdateWithoutUserCoursesInput>, UserUncheckedUpdateWithoutUserCoursesInput>
  }

  export type UserCreateNestedOneWithoutCreatedAccessCodesInput = {
    create?: XOR<UserCreateWithoutCreatedAccessCodesInput, UserUncheckedCreateWithoutCreatedAccessCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedAccessCodesInput
    connect?: UserWhereUniqueInput
  }

  export type AccessCodeNoteCreateNestedManyWithoutAccessCodeInput = {
    create?: XOR<AccessCodeNoteCreateWithoutAccessCodeInput, AccessCodeNoteUncheckedCreateWithoutAccessCodeInput> | AccessCodeNoteCreateWithoutAccessCodeInput[] | AccessCodeNoteUncheckedCreateWithoutAccessCodeInput[]
    connectOrCreate?: AccessCodeNoteCreateOrConnectWithoutAccessCodeInput | AccessCodeNoteCreateOrConnectWithoutAccessCodeInput[]
    createMany?: AccessCodeNoteCreateManyAccessCodeInputEnvelope
    connect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
  }

  export type AccessCodeNoteUncheckedCreateNestedManyWithoutAccessCodeInput = {
    create?: XOR<AccessCodeNoteCreateWithoutAccessCodeInput, AccessCodeNoteUncheckedCreateWithoutAccessCodeInput> | AccessCodeNoteCreateWithoutAccessCodeInput[] | AccessCodeNoteUncheckedCreateWithoutAccessCodeInput[]
    connectOrCreate?: AccessCodeNoteCreateOrConnectWithoutAccessCodeInput | AccessCodeNoteCreateOrConnectWithoutAccessCodeInput[]
    createMany?: AccessCodeNoteCreateManyAccessCodeInputEnvelope
    connect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCreatedAccessCodesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedAccessCodesInput, UserUncheckedCreateWithoutCreatedAccessCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedAccessCodesInput
    upsert?: UserUpsertWithoutCreatedAccessCodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedAccessCodesInput, UserUpdateWithoutCreatedAccessCodesInput>, UserUncheckedUpdateWithoutCreatedAccessCodesInput>
  }

  export type AccessCodeNoteUpdateManyWithoutAccessCodeNestedInput = {
    create?: XOR<AccessCodeNoteCreateWithoutAccessCodeInput, AccessCodeNoteUncheckedCreateWithoutAccessCodeInput> | AccessCodeNoteCreateWithoutAccessCodeInput[] | AccessCodeNoteUncheckedCreateWithoutAccessCodeInput[]
    connectOrCreate?: AccessCodeNoteCreateOrConnectWithoutAccessCodeInput | AccessCodeNoteCreateOrConnectWithoutAccessCodeInput[]
    upsert?: AccessCodeNoteUpsertWithWhereUniqueWithoutAccessCodeInput | AccessCodeNoteUpsertWithWhereUniqueWithoutAccessCodeInput[]
    createMany?: AccessCodeNoteCreateManyAccessCodeInputEnvelope
    set?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    disconnect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    delete?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    connect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    update?: AccessCodeNoteUpdateWithWhereUniqueWithoutAccessCodeInput | AccessCodeNoteUpdateWithWhereUniqueWithoutAccessCodeInput[]
    updateMany?: AccessCodeNoteUpdateManyWithWhereWithoutAccessCodeInput | AccessCodeNoteUpdateManyWithWhereWithoutAccessCodeInput[]
    deleteMany?: AccessCodeNoteScalarWhereInput | AccessCodeNoteScalarWhereInput[]
  }

  export type AccessCodeNoteUncheckedUpdateManyWithoutAccessCodeNestedInput = {
    create?: XOR<AccessCodeNoteCreateWithoutAccessCodeInput, AccessCodeNoteUncheckedCreateWithoutAccessCodeInput> | AccessCodeNoteCreateWithoutAccessCodeInput[] | AccessCodeNoteUncheckedCreateWithoutAccessCodeInput[]
    connectOrCreate?: AccessCodeNoteCreateOrConnectWithoutAccessCodeInput | AccessCodeNoteCreateOrConnectWithoutAccessCodeInput[]
    upsert?: AccessCodeNoteUpsertWithWhereUniqueWithoutAccessCodeInput | AccessCodeNoteUpsertWithWhereUniqueWithoutAccessCodeInput[]
    createMany?: AccessCodeNoteCreateManyAccessCodeInputEnvelope
    set?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    disconnect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    delete?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    connect?: AccessCodeNoteWhereUniqueInput | AccessCodeNoteWhereUniqueInput[]
    update?: AccessCodeNoteUpdateWithWhereUniqueWithoutAccessCodeInput | AccessCodeNoteUpdateWithWhereUniqueWithoutAccessCodeInput[]
    updateMany?: AccessCodeNoteUpdateManyWithWhereWithoutAccessCodeInput | AccessCodeNoteUpdateManyWithWhereWithoutAccessCodeInput[]
    deleteMany?: AccessCodeNoteScalarWhereInput | AccessCodeNoteScalarWhereInput[]
  }

  export type AccessCodeCreateNestedOneWithoutNotesInput = {
    create?: XOR<AccessCodeCreateWithoutNotesInput, AccessCodeUncheckedCreateWithoutNotesInput>
    connectOrCreate?: AccessCodeCreateOrConnectWithoutNotesInput
    connect?: AccessCodeWhereUniqueInput
  }

  export type NoteCreateNestedOneWithoutAccessCodesInput = {
    create?: XOR<NoteCreateWithoutAccessCodesInput, NoteUncheckedCreateWithoutAccessCodesInput>
    connectOrCreate?: NoteCreateOrConnectWithoutAccessCodesInput
    connect?: NoteWhereUniqueInput
  }

  export type AccessCodeUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<AccessCodeCreateWithoutNotesInput, AccessCodeUncheckedCreateWithoutNotesInput>
    connectOrCreate?: AccessCodeCreateOrConnectWithoutNotesInput
    upsert?: AccessCodeUpsertWithoutNotesInput
    connect?: AccessCodeWhereUniqueInput
    update?: XOR<XOR<AccessCodeUpdateToOneWithWhereWithoutNotesInput, AccessCodeUpdateWithoutNotesInput>, AccessCodeUncheckedUpdateWithoutNotesInput>
  }

  export type NoteUpdateOneRequiredWithoutAccessCodesNestedInput = {
    create?: XOR<NoteCreateWithoutAccessCodesInput, NoteUncheckedCreateWithoutAccessCodesInput>
    connectOrCreate?: NoteCreateOrConnectWithoutAccessCodesInput
    upsert?: NoteUpsertWithoutAccessCodesInput
    connect?: NoteWhereUniqueInput
    update?: XOR<XOR<NoteUpdateToOneWithWhereWithoutAccessCodesInput, NoteUpdateWithoutAccessCodesInput>, NoteUncheckedUpdateWithoutAccessCodesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NoteCreateWithoutUploaderInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    course: CourseCreateNestedOneWithoutNotesInput
    semester?: SemesterCreateNestedOneWithoutNotesInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedNotesInput
    reviews?: ReviewCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutUploaderInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutUploaderInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutUploaderInput, NoteUncheckedCreateWithoutUploaderInput>
  }

  export type NoteCreateManyUploaderInputEnvelope = {
    data: NoteCreateManyUploaderInput | NoteCreateManyUploaderInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutUserInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    note: NoteCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    noteId: string
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: ReviewCreateManyUserInput | ReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RaffleEntryCreateWithoutUserInput = {
    id?: string
    isWinner?: boolean
    createdAt?: Date | string
    raffle: RaffleCreateNestedOneWithoutEntriesInput
    note: NoteCreateNestedOneWithoutRaffleEntriesInput
  }

  export type RaffleEntryUncheckedCreateWithoutUserInput = {
    id?: string
    raffleId: string
    noteId: string
    isWinner?: boolean
    createdAt?: Date | string
  }

  export type RaffleEntryCreateOrConnectWithoutUserInput = {
    where: RaffleEntryWhereUniqueInput
    create: XOR<RaffleEntryCreateWithoutUserInput, RaffleEntryUncheckedCreateWithoutUserInput>
  }

  export type RaffleEntryCreateManyUserInputEnvelope = {
    data: RaffleEntryCreateManyUserInput | RaffleEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserCoursesCreateWithoutUser_rolesInput = {
    Course: CourseCreateNestedOneWithoutUserCoursesInput
  }

  export type UserCoursesUncheckedCreateWithoutUser_rolesInput = {
    A: string
  }

  export type UserCoursesCreateOrConnectWithoutUser_rolesInput = {
    where: UserCoursesWhereUniqueInput
    create: XOR<UserCoursesCreateWithoutUser_rolesInput, UserCoursesUncheckedCreateWithoutUser_rolesInput>
  }

  export type UserCoursesCreateManyUser_rolesInputEnvelope = {
    data: UserCoursesCreateManyUser_rolesInput | UserCoursesCreateManyUser_rolesInput[]
    skipDuplicates?: boolean
  }

  export type CourseCreateWithoutCreatedByInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    professor?: ProfessorCreateNestedOneWithoutCoursesInput
    notes?: NoteCreateNestedManyWithoutCourseInput
    UserCourses?: UserCoursesCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    code: string
    professorId?: string | null
    createdAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutCourseInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutCreatedByInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput>
  }

  export type CourseCreateManyCreatedByInputEnvelope = {
    data: CourseCreateManyCreatedByInput | CourseCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ProfessorCreateWithoutCreatedByInput = {
    id?: string
    name: string
    email?: string | null
    courses?: CourseCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    email?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorCreateOrConnectWithoutCreatedByInput = {
    where: ProfessorWhereUniqueInput
    create: XOR<ProfessorCreateWithoutCreatedByInput, ProfessorUncheckedCreateWithoutCreatedByInput>
  }

  export type ProfessorCreateManyCreatedByInputEnvelope = {
    data: ProfessorCreateManyCreatedByInput | ProfessorCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type SemesterCreateWithoutCreatedByInput = {
    id?: string
    name: string
    year: number
    notes?: NoteCreateNestedManyWithoutSemesterInput
  }

  export type SemesterUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    year: number
    notes?: NoteUncheckedCreateNestedManyWithoutSemesterInput
  }

  export type SemesterCreateOrConnectWithoutCreatedByInput = {
    where: SemesterWhereUniqueInput
    create: XOR<SemesterCreateWithoutCreatedByInput, SemesterUncheckedCreateWithoutCreatedByInput>
  }

  export type SemesterCreateManyCreatedByInputEnvelope = {
    data: SemesterCreateManyCreatedByInput | SemesterCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type AccessCodeCreateWithoutCreatedByInput = {
    id?: string
    code: string
    duration?: number | null
    expiresAt: Date | string
    activatedAt?: Date | string | null
    deviceId?: string | null
    studentEmail?: string | null
    lastHeartbeat?: Date | string | null
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: Date | string
    notes?: AccessCodeNoteCreateNestedManyWithoutAccessCodeInput
  }

  export type AccessCodeUncheckedCreateWithoutCreatedByInput = {
    id?: string
    code: string
    duration?: number | null
    expiresAt: Date | string
    activatedAt?: Date | string | null
    deviceId?: string | null
    studentEmail?: string | null
    lastHeartbeat?: Date | string | null
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: Date | string
    notes?: AccessCodeNoteUncheckedCreateNestedManyWithoutAccessCodeInput
  }

  export type AccessCodeCreateOrConnectWithoutCreatedByInput = {
    where: AccessCodeWhereUniqueInput
    create: XOR<AccessCodeCreateWithoutCreatedByInput, AccessCodeUncheckedCreateWithoutCreatedByInput>
  }

  export type AccessCodeCreateManyCreatedByInputEnvelope = {
    data: AccessCodeCreateManyCreatedByInput | AccessCodeCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type NoteCreateWithoutVerifiedByInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    course: CourseCreateNestedOneWithoutNotesInput
    semester?: SemesterCreateNestedOneWithoutNotesInput
    uploader: UserCreateNestedOneWithoutNotesInput
    reviews?: ReviewCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutVerifiedByInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutVerifiedByInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutVerifiedByInput, NoteUncheckedCreateWithoutVerifiedByInput>
  }

  export type NoteCreateManyVerifiedByInputEnvelope = {
    data: NoteCreateManyVerifiedByInput | NoteCreateManyVerifiedByInput[]
    skipDuplicates?: boolean
  }

  export type NoteUpsertWithWhereUniqueWithoutUploaderInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutUploaderInput, NoteUncheckedUpdateWithoutUploaderInput>
    create: XOR<NoteCreateWithoutUploaderInput, NoteUncheckedCreateWithoutUploaderInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutUploaderInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutUploaderInput, NoteUncheckedUpdateWithoutUploaderInput>
  }

  export type NoteUpdateManyWithWhereWithoutUploaderInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutUploaderInput>
  }

  export type NoteScalarWhereInput = {
    AND?: NoteScalarWhereInput | NoteScalarWhereInput[]
    OR?: NoteScalarWhereInput[]
    NOT?: NoteScalarWhereInput | NoteScalarWhereInput[]
    id?: StringFilter<"Note"> | string
    title?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    filePath?: StringFilter<"Note"> | string
    fileType?: StringFilter<"Note"> | string
    fileUrl?: StringFilter<"Note"> | string
    uploaderId?: StringFilter<"Note"> | string
    courseId?: StringFilter<"Note"> | string
    description?: StringNullableFilter<"Note"> | string | null
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    semesterId?: StringNullableFilter<"Note"> | string | null
    isVerified?: BoolFilter<"Note"> | boolean
    verifiedAt?: DateTimeNullableFilter<"Note"> | Date | string | null
    verifiedById?: StringNullableFilter<"Note"> | string | null
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    noteId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
  }

  export type RaffleEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: RaffleEntryWhereUniqueInput
    update: XOR<RaffleEntryUpdateWithoutUserInput, RaffleEntryUncheckedUpdateWithoutUserInput>
    create: XOR<RaffleEntryCreateWithoutUserInput, RaffleEntryUncheckedCreateWithoutUserInput>
  }

  export type RaffleEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: RaffleEntryWhereUniqueInput
    data: XOR<RaffleEntryUpdateWithoutUserInput, RaffleEntryUncheckedUpdateWithoutUserInput>
  }

  export type RaffleEntryUpdateManyWithWhereWithoutUserInput = {
    where: RaffleEntryScalarWhereInput
    data: XOR<RaffleEntryUpdateManyMutationInput, RaffleEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type RaffleEntryScalarWhereInput = {
    AND?: RaffleEntryScalarWhereInput | RaffleEntryScalarWhereInput[]
    OR?: RaffleEntryScalarWhereInput[]
    NOT?: RaffleEntryScalarWhereInput | RaffleEntryScalarWhereInput[]
    id?: StringFilter<"RaffleEntry"> | string
    raffleId?: StringFilter<"RaffleEntry"> | string
    userId?: StringFilter<"RaffleEntry"> | string
    noteId?: StringFilter<"RaffleEntry"> | string
    isWinner?: BoolFilter<"RaffleEntry"> | boolean
    createdAt?: DateTimeFilter<"RaffleEntry"> | Date | string
  }

  export type UserCoursesUpsertWithWhereUniqueWithoutUser_rolesInput = {
    where: UserCoursesWhereUniqueInput
    update: XOR<UserCoursesUpdateWithoutUser_rolesInput, UserCoursesUncheckedUpdateWithoutUser_rolesInput>
    create: XOR<UserCoursesCreateWithoutUser_rolesInput, UserCoursesUncheckedCreateWithoutUser_rolesInput>
  }

  export type UserCoursesUpdateWithWhereUniqueWithoutUser_rolesInput = {
    where: UserCoursesWhereUniqueInput
    data: XOR<UserCoursesUpdateWithoutUser_rolesInput, UserCoursesUncheckedUpdateWithoutUser_rolesInput>
  }

  export type UserCoursesUpdateManyWithWhereWithoutUser_rolesInput = {
    where: UserCoursesScalarWhereInput
    data: XOR<UserCoursesUpdateManyMutationInput, UserCoursesUncheckedUpdateManyWithoutUser_rolesInput>
  }

  export type UserCoursesScalarWhereInput = {
    AND?: UserCoursesScalarWhereInput | UserCoursesScalarWhereInput[]
    OR?: UserCoursesScalarWhereInput[]
    NOT?: UserCoursesScalarWhereInput | UserCoursesScalarWhereInput[]
    A?: StringFilter<"UserCourses"> | string
    B?: StringFilter<"UserCourses"> | string
  }

  export type CourseUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutCreatedByInput, CourseUncheckedUpdateWithoutCreatedByInput>
    create: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutCreatedByInput, CourseUncheckedUpdateWithoutCreatedByInput>
  }

  export type CourseUpdateManyWithWhereWithoutCreatedByInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    id?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    code?: StringFilter<"Course"> | string
    professorId?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    createdById?: StringFilter<"Course"> | string
  }

  export type ProfessorUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ProfessorWhereUniqueInput
    update: XOR<ProfessorUpdateWithoutCreatedByInput, ProfessorUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ProfessorCreateWithoutCreatedByInput, ProfessorUncheckedCreateWithoutCreatedByInput>
  }

  export type ProfessorUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ProfessorWhereUniqueInput
    data: XOR<ProfessorUpdateWithoutCreatedByInput, ProfessorUncheckedUpdateWithoutCreatedByInput>
  }

  export type ProfessorUpdateManyWithWhereWithoutCreatedByInput = {
    where: ProfessorScalarWhereInput
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ProfessorScalarWhereInput = {
    AND?: ProfessorScalarWhereInput | ProfessorScalarWhereInput[]
    OR?: ProfessorScalarWhereInput[]
    NOT?: ProfessorScalarWhereInput | ProfessorScalarWhereInput[]
    id?: StringFilter<"Professor"> | string
    name?: StringFilter<"Professor"> | string
    email?: StringNullableFilter<"Professor"> | string | null
    createdById?: StringFilter<"Professor"> | string
  }

  export type SemesterUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: SemesterWhereUniqueInput
    update: XOR<SemesterUpdateWithoutCreatedByInput, SemesterUncheckedUpdateWithoutCreatedByInput>
    create: XOR<SemesterCreateWithoutCreatedByInput, SemesterUncheckedCreateWithoutCreatedByInput>
  }

  export type SemesterUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: SemesterWhereUniqueInput
    data: XOR<SemesterUpdateWithoutCreatedByInput, SemesterUncheckedUpdateWithoutCreatedByInput>
  }

  export type SemesterUpdateManyWithWhereWithoutCreatedByInput = {
    where: SemesterScalarWhereInput
    data: XOR<SemesterUpdateManyMutationInput, SemesterUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type SemesterScalarWhereInput = {
    AND?: SemesterScalarWhereInput | SemesterScalarWhereInput[]
    OR?: SemesterScalarWhereInput[]
    NOT?: SemesterScalarWhereInput | SemesterScalarWhereInput[]
    id?: StringFilter<"Semester"> | string
    name?: StringFilter<"Semester"> | string
    year?: IntFilter<"Semester"> | number
    createdById?: StringFilter<"Semester"> | string
  }

  export type AccessCodeUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: AccessCodeWhereUniqueInput
    update: XOR<AccessCodeUpdateWithoutCreatedByInput, AccessCodeUncheckedUpdateWithoutCreatedByInput>
    create: XOR<AccessCodeCreateWithoutCreatedByInput, AccessCodeUncheckedCreateWithoutCreatedByInput>
  }

  export type AccessCodeUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: AccessCodeWhereUniqueInput
    data: XOR<AccessCodeUpdateWithoutCreatedByInput, AccessCodeUncheckedUpdateWithoutCreatedByInput>
  }

  export type AccessCodeUpdateManyWithWhereWithoutCreatedByInput = {
    where: AccessCodeScalarWhereInput
    data: XOR<AccessCodeUpdateManyMutationInput, AccessCodeUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type AccessCodeScalarWhereInput = {
    AND?: AccessCodeScalarWhereInput | AccessCodeScalarWhereInput[]
    OR?: AccessCodeScalarWhereInput[]
    NOT?: AccessCodeScalarWhereInput | AccessCodeScalarWhereInput[]
    id?: StringFilter<"AccessCode"> | string
    code?: StringFilter<"AccessCode"> | string
    createdById?: StringFilter<"AccessCode"> | string
    duration?: IntNullableFilter<"AccessCode"> | number | null
    expiresAt?: DateTimeFilter<"AccessCode"> | Date | string
    activatedAt?: DateTimeNullableFilter<"AccessCode"> | Date | string | null
    deviceId?: StringNullableFilter<"AccessCode"> | string | null
    studentEmail?: StringNullableFilter<"AccessCode"> | string | null
    lastHeartbeat?: DateTimeNullableFilter<"AccessCode"> | Date | string | null
    isUsed?: BoolFilter<"AccessCode"> | boolean
    isRevoked?: BoolFilter<"AccessCode"> | boolean
    createdAt?: DateTimeFilter<"AccessCode"> | Date | string
  }

  export type NoteUpsertWithWhereUniqueWithoutVerifiedByInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutVerifiedByInput, NoteUncheckedUpdateWithoutVerifiedByInput>
    create: XOR<NoteCreateWithoutVerifiedByInput, NoteUncheckedCreateWithoutVerifiedByInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutVerifiedByInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutVerifiedByInput, NoteUncheckedUpdateWithoutVerifiedByInput>
  }

  export type NoteUpdateManyWithWhereWithoutVerifiedByInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutVerifiedByInput>
  }

  export type ProfessorCreateWithoutCoursesInput = {
    id?: string
    name: string
    email?: string | null
    createdBy: UserCreateNestedOneWithoutCreatedProfessorsInput
  }

  export type ProfessorUncheckedCreateWithoutCoursesInput = {
    id?: string
    name: string
    email?: string | null
    createdById: string
  }

  export type ProfessorCreateOrConnectWithoutCoursesInput = {
    where: ProfessorWhereUniqueInput
    create: XOR<ProfessorCreateWithoutCoursesInput, ProfessorUncheckedCreateWithoutCoursesInput>
  }

  export type NoteCreateWithoutCourseInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    semester?: SemesterCreateNestedOneWithoutNotesInput
    uploader: UserCreateNestedOneWithoutNotesInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedNotesInput
    reviews?: ReviewCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutCourseInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutCourseInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutCourseInput, NoteUncheckedCreateWithoutCourseInput>
  }

  export type NoteCreateManyCourseInputEnvelope = {
    data: NoteCreateManyCourseInput | NoteCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type UserCoursesCreateWithoutCourseInput = {
    user_roles: UserCreateNestedOneWithoutUserCoursesInput
  }

  export type UserCoursesUncheckedCreateWithoutCourseInput = {
    B: string
  }

  export type UserCoursesCreateOrConnectWithoutCourseInput = {
    where: UserCoursesWhereUniqueInput
    create: XOR<UserCoursesCreateWithoutCourseInput, UserCoursesUncheckedCreateWithoutCourseInput>
  }

  export type UserCoursesCreateManyCourseInputEnvelope = {
    data: UserCoursesCreateManyCourseInput | UserCoursesCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCreatedCoursesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutCreatedCoursesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutCreatedCoursesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedCoursesInput, UserUncheckedCreateWithoutCreatedCoursesInput>
  }

  export type ProfessorUpsertWithoutCoursesInput = {
    update: XOR<ProfessorUpdateWithoutCoursesInput, ProfessorUncheckedUpdateWithoutCoursesInput>
    create: XOR<ProfessorCreateWithoutCoursesInput, ProfessorUncheckedCreateWithoutCoursesInput>
    where?: ProfessorWhereInput
  }

  export type ProfessorUpdateToOneWithWhereWithoutCoursesInput = {
    where?: ProfessorWhereInput
    data: XOR<ProfessorUpdateWithoutCoursesInput, ProfessorUncheckedUpdateWithoutCoursesInput>
  }

  export type ProfessorUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: UserUpdateOneRequiredWithoutCreatedProfessorsNestedInput
  }

  export type ProfessorUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type NoteUpsertWithWhereUniqueWithoutCourseInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutCourseInput, NoteUncheckedUpdateWithoutCourseInput>
    create: XOR<NoteCreateWithoutCourseInput, NoteUncheckedCreateWithoutCourseInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutCourseInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutCourseInput, NoteUncheckedUpdateWithoutCourseInput>
  }

  export type NoteUpdateManyWithWhereWithoutCourseInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutCourseInput>
  }

  export type UserCoursesUpsertWithWhereUniqueWithoutCourseInput = {
    where: UserCoursesWhereUniqueInput
    update: XOR<UserCoursesUpdateWithoutCourseInput, UserCoursesUncheckedUpdateWithoutCourseInput>
    create: XOR<UserCoursesCreateWithoutCourseInput, UserCoursesUncheckedCreateWithoutCourseInput>
  }

  export type UserCoursesUpdateWithWhereUniqueWithoutCourseInput = {
    where: UserCoursesWhereUniqueInput
    data: XOR<UserCoursesUpdateWithoutCourseInput, UserCoursesUncheckedUpdateWithoutCourseInput>
  }

  export type UserCoursesUpdateManyWithWhereWithoutCourseInput = {
    where: UserCoursesScalarWhereInput
    data: XOR<UserCoursesUpdateManyMutationInput, UserCoursesUncheckedUpdateManyWithoutCourseInput>
  }

  export type UserUpsertWithoutCreatedCoursesInput = {
    update: XOR<UserUpdateWithoutCreatedCoursesInput, UserUncheckedUpdateWithoutCreatedCoursesInput>
    create: XOR<UserCreateWithoutCreatedCoursesInput, UserUncheckedCreateWithoutCreatedCoursesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedCoursesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedCoursesInput, UserUncheckedUpdateWithoutCreatedCoursesInput>
  }

  export type UserUpdateWithoutCreatedCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type CourseCreateWithoutProfessorInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    notes?: NoteCreateNestedManyWithoutCourseInput
    UserCourses?: UserCoursesCreateNestedManyWithoutCourseInput
    createdBy: UserCreateNestedOneWithoutCreatedCoursesInput
  }

  export type CourseUncheckedCreateWithoutProfessorInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    createdById: string
    notes?: NoteUncheckedCreateNestedManyWithoutCourseInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutProfessorInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutProfessorInput, CourseUncheckedCreateWithoutProfessorInput>
  }

  export type CourseCreateManyProfessorInputEnvelope = {
    data: CourseCreateManyProfessorInput | CourseCreateManyProfessorInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCreatedProfessorsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutCreatedProfessorsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutCreatedProfessorsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedProfessorsInput, UserUncheckedCreateWithoutCreatedProfessorsInput>
  }

  export type CourseUpsertWithWhereUniqueWithoutProfessorInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutProfessorInput, CourseUncheckedUpdateWithoutProfessorInput>
    create: XOR<CourseCreateWithoutProfessorInput, CourseUncheckedCreateWithoutProfessorInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutProfessorInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutProfessorInput, CourseUncheckedUpdateWithoutProfessorInput>
  }

  export type CourseUpdateManyWithWhereWithoutProfessorInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutProfessorInput>
  }

  export type UserUpsertWithoutCreatedProfessorsInput = {
    update: XOR<UserUpdateWithoutCreatedProfessorsInput, UserUncheckedUpdateWithoutCreatedProfessorsInput>
    create: XOR<UserCreateWithoutCreatedProfessorsInput, UserUncheckedCreateWithoutCreatedProfessorsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedProfessorsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedProfessorsInput, UserUncheckedUpdateWithoutCreatedProfessorsInput>
  }

  export type UserUpdateWithoutCreatedProfessorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedProfessorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type NoteCreateWithoutSemesterInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    course: CourseCreateNestedOneWithoutNotesInput
    uploader: UserCreateNestedOneWithoutNotesInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedNotesInput
    reviews?: ReviewCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutSemesterInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutSemesterInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutSemesterInput, NoteUncheckedCreateWithoutSemesterInput>
  }

  export type NoteCreateManySemesterInputEnvelope = {
    data: NoteCreateManySemesterInput | NoteCreateManySemesterInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCreatedSemestersInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutCreatedSemestersInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutCreatedSemestersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedSemestersInput, UserUncheckedCreateWithoutCreatedSemestersInput>
  }

  export type NoteUpsertWithWhereUniqueWithoutSemesterInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutSemesterInput, NoteUncheckedUpdateWithoutSemesterInput>
    create: XOR<NoteCreateWithoutSemesterInput, NoteUncheckedCreateWithoutSemesterInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutSemesterInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutSemesterInput, NoteUncheckedUpdateWithoutSemesterInput>
  }

  export type NoteUpdateManyWithWhereWithoutSemesterInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutSemesterInput>
  }

  export type UserUpsertWithoutCreatedSemestersInput = {
    update: XOR<UserUpdateWithoutCreatedSemestersInput, UserUncheckedUpdateWithoutCreatedSemestersInput>
    create: XOR<UserCreateWithoutCreatedSemestersInput, UserUncheckedCreateWithoutCreatedSemestersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedSemestersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedSemestersInput, UserUncheckedUpdateWithoutCreatedSemestersInput>
  }

  export type UserUpdateWithoutCreatedSemestersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedSemestersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type CourseCreateWithoutNotesInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    professor?: ProfessorCreateNestedOneWithoutCoursesInput
    UserCourses?: UserCoursesCreateNestedManyWithoutCourseInput
    createdBy: UserCreateNestedOneWithoutCreatedCoursesInput
  }

  export type CourseUncheckedCreateWithoutNotesInput = {
    id?: string
    name: string
    code: string
    professorId?: string | null
    createdAt?: Date | string
    createdById: string
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutNotesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutNotesInput, CourseUncheckedCreateWithoutNotesInput>
  }

  export type SemesterCreateWithoutNotesInput = {
    id?: string
    name: string
    year: number
    createdBy: UserCreateNestedOneWithoutCreatedSemestersInput
  }

  export type SemesterUncheckedCreateWithoutNotesInput = {
    id?: string
    name: string
    year: number
    createdById: string
  }

  export type SemesterCreateOrConnectWithoutNotesInput = {
    where: SemesterWhereUniqueInput
    create: XOR<SemesterCreateWithoutNotesInput, SemesterUncheckedCreateWithoutNotesInput>
  }

  export type UserCreateWithoutNotesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutNotesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
  }

  export type UserCreateWithoutVerifiedNotesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutVerifiedNotesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutVerifiedNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerifiedNotesInput, UserUncheckedCreateWithoutVerifiedNotesInput>
  }

  export type ReviewCreateWithoutNoteInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutNoteInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    userId: string
  }

  export type ReviewCreateOrConnectWithoutNoteInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutNoteInput, ReviewUncheckedCreateWithoutNoteInput>
  }

  export type ReviewCreateManyNoteInputEnvelope = {
    data: ReviewCreateManyNoteInput | ReviewCreateManyNoteInput[]
    skipDuplicates?: boolean
  }

  export type RaffleEntryCreateWithoutNoteInput = {
    id?: string
    isWinner?: boolean
    createdAt?: Date | string
    raffle: RaffleCreateNestedOneWithoutEntriesInput
    user: UserCreateNestedOneWithoutRaffleEntriesInput
  }

  export type RaffleEntryUncheckedCreateWithoutNoteInput = {
    id?: string
    raffleId: string
    userId: string
    isWinner?: boolean
    createdAt?: Date | string
  }

  export type RaffleEntryCreateOrConnectWithoutNoteInput = {
    where: RaffleEntryWhereUniqueInput
    create: XOR<RaffleEntryCreateWithoutNoteInput, RaffleEntryUncheckedCreateWithoutNoteInput>
  }

  export type RaffleEntryCreateManyNoteInputEnvelope = {
    data: RaffleEntryCreateManyNoteInput | RaffleEntryCreateManyNoteInput[]
    skipDuplicates?: boolean
  }

  export type AccessCodeNoteCreateWithoutNoteInput = {
    id?: string
    accessCode: AccessCodeCreateNestedOneWithoutNotesInput
  }

  export type AccessCodeNoteUncheckedCreateWithoutNoteInput = {
    id?: string
    accessCodeId: string
  }

  export type AccessCodeNoteCreateOrConnectWithoutNoteInput = {
    where: AccessCodeNoteWhereUniqueInput
    create: XOR<AccessCodeNoteCreateWithoutNoteInput, AccessCodeNoteUncheckedCreateWithoutNoteInput>
  }

  export type AccessCodeNoteCreateManyNoteInputEnvelope = {
    data: AccessCodeNoteCreateManyNoteInput | AccessCodeNoteCreateManyNoteInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithoutNotesInput = {
    update: XOR<CourseUpdateWithoutNotesInput, CourseUncheckedUpdateWithoutNotesInput>
    create: XOR<CourseCreateWithoutNotesInput, CourseUncheckedCreateWithoutNotesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutNotesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutNotesInput, CourseUncheckedUpdateWithoutNotesInput>
  }

  export type CourseUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: ProfessorUpdateOneWithoutCoursesNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutCourseNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type SemesterUpsertWithoutNotesInput = {
    update: XOR<SemesterUpdateWithoutNotesInput, SemesterUncheckedUpdateWithoutNotesInput>
    create: XOR<SemesterCreateWithoutNotesInput, SemesterUncheckedCreateWithoutNotesInput>
    where?: SemesterWhereInput
  }

  export type SemesterUpdateToOneWithWhereWithoutNotesInput = {
    where?: SemesterWhereInput
    data: XOR<SemesterUpdateWithoutNotesInput, SemesterUncheckedUpdateWithoutNotesInput>
  }

  export type SemesterUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    createdBy?: UserUpdateOneRequiredWithoutCreatedSemestersNestedInput
  }

  export type SemesterUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutNotesInput = {
    update: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUpsertWithoutVerifiedNotesInput = {
    update: XOR<UserUpdateWithoutVerifiedNotesInput, UserUncheckedUpdateWithoutVerifiedNotesInput>
    create: XOR<UserCreateWithoutVerifiedNotesInput, UserUncheckedCreateWithoutVerifiedNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerifiedNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerifiedNotesInput, UserUncheckedUpdateWithoutVerifiedNotesInput>
  }

  export type UserUpdateWithoutVerifiedNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutVerifiedNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type ReviewUpsertWithWhereUniqueWithoutNoteInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutNoteInput, ReviewUncheckedUpdateWithoutNoteInput>
    create: XOR<ReviewCreateWithoutNoteInput, ReviewUncheckedCreateWithoutNoteInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutNoteInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutNoteInput, ReviewUncheckedUpdateWithoutNoteInput>
  }

  export type ReviewUpdateManyWithWhereWithoutNoteInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutNoteInput>
  }

  export type RaffleEntryUpsertWithWhereUniqueWithoutNoteInput = {
    where: RaffleEntryWhereUniqueInput
    update: XOR<RaffleEntryUpdateWithoutNoteInput, RaffleEntryUncheckedUpdateWithoutNoteInput>
    create: XOR<RaffleEntryCreateWithoutNoteInput, RaffleEntryUncheckedCreateWithoutNoteInput>
  }

  export type RaffleEntryUpdateWithWhereUniqueWithoutNoteInput = {
    where: RaffleEntryWhereUniqueInput
    data: XOR<RaffleEntryUpdateWithoutNoteInput, RaffleEntryUncheckedUpdateWithoutNoteInput>
  }

  export type RaffleEntryUpdateManyWithWhereWithoutNoteInput = {
    where: RaffleEntryScalarWhereInput
    data: XOR<RaffleEntryUpdateManyMutationInput, RaffleEntryUncheckedUpdateManyWithoutNoteInput>
  }

  export type AccessCodeNoteUpsertWithWhereUniqueWithoutNoteInput = {
    where: AccessCodeNoteWhereUniqueInput
    update: XOR<AccessCodeNoteUpdateWithoutNoteInput, AccessCodeNoteUncheckedUpdateWithoutNoteInput>
    create: XOR<AccessCodeNoteCreateWithoutNoteInput, AccessCodeNoteUncheckedCreateWithoutNoteInput>
  }

  export type AccessCodeNoteUpdateWithWhereUniqueWithoutNoteInput = {
    where: AccessCodeNoteWhereUniqueInput
    data: XOR<AccessCodeNoteUpdateWithoutNoteInput, AccessCodeNoteUncheckedUpdateWithoutNoteInput>
  }

  export type AccessCodeNoteUpdateManyWithWhereWithoutNoteInput = {
    where: AccessCodeNoteScalarWhereInput
    data: XOR<AccessCodeNoteUpdateManyMutationInput, AccessCodeNoteUncheckedUpdateManyWithoutNoteInput>
  }

  export type AccessCodeNoteScalarWhereInput = {
    AND?: AccessCodeNoteScalarWhereInput | AccessCodeNoteScalarWhereInput[]
    OR?: AccessCodeNoteScalarWhereInput[]
    NOT?: AccessCodeNoteScalarWhereInput | AccessCodeNoteScalarWhereInput[]
    id?: StringFilter<"AccessCodeNote"> | string
    accessCodeId?: StringFilter<"AccessCodeNote"> | string
    noteId?: StringFilter<"AccessCodeNote"> | string
  }

  export type NoteCreateWithoutReviewsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    course: CourseCreateNestedOneWithoutNotesInput
    semester?: SemesterCreateNestedOneWithoutNotesInput
    uploader: UserCreateNestedOneWithoutNotesInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedNotesInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutReviewsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutReviewsInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutReviewsInput, NoteUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type NoteUpsertWithoutReviewsInput = {
    update: XOR<NoteUpdateWithoutReviewsInput, NoteUncheckedUpdateWithoutReviewsInput>
    create: XOR<NoteCreateWithoutReviewsInput, NoteUncheckedCreateWithoutReviewsInput>
    where?: NoteWhereInput
  }

  export type NoteUpdateToOneWithWhereWithoutReviewsInput = {
    where?: NoteWhereInput
    data: XOR<NoteUpdateWithoutReviewsInput, NoteUncheckedUpdateWithoutReviewsInput>
  }

  export type NoteUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    course?: CourseUpdateOneRequiredWithoutNotesNestedInput
    semester?: SemesterUpdateOneWithoutNotesNestedInput
    uploader?: UserUpdateOneRequiredWithoutNotesNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedNotesNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type RafflePrizeCreateWithoutRafflesInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    quantity?: number
    size?: string | null
    color?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RafflePrizeUncheckedCreateWithoutRafflesInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    quantity?: number
    size?: string | null
    color?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RafflePrizeCreateOrConnectWithoutRafflesInput = {
    where: RafflePrizeWhereUniqueInput
    create: XOR<RafflePrizeCreateWithoutRafflesInput, RafflePrizeUncheckedCreateWithoutRafflesInput>
  }

  export type RafflePrizeCreateManyRafflesInputEnvelope = {
    data: RafflePrizeCreateManyRafflesInput | RafflePrizeCreateManyRafflesInput[]
    skipDuplicates?: boolean
  }

  export type RaffleEntryCreateWithoutRaffleInput = {
    id?: string
    isWinner?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRaffleEntriesInput
    note: NoteCreateNestedOneWithoutRaffleEntriesInput
  }

  export type RaffleEntryUncheckedCreateWithoutRaffleInput = {
    id?: string
    userId: string
    noteId: string
    isWinner?: boolean
    createdAt?: Date | string
  }

  export type RaffleEntryCreateOrConnectWithoutRaffleInput = {
    where: RaffleEntryWhereUniqueInput
    create: XOR<RaffleEntryCreateWithoutRaffleInput, RaffleEntryUncheckedCreateWithoutRaffleInput>
  }

  export type RaffleEntryCreateManyRaffleInputEnvelope = {
    data: RaffleEntryCreateManyRaffleInput | RaffleEntryCreateManyRaffleInput[]
    skipDuplicates?: boolean
  }

  export type RafflePrizeUpsertWithWhereUniqueWithoutRafflesInput = {
    where: RafflePrizeWhereUniqueInput
    update: XOR<RafflePrizeUpdateWithoutRafflesInput, RafflePrizeUncheckedUpdateWithoutRafflesInput>
    create: XOR<RafflePrizeCreateWithoutRafflesInput, RafflePrizeUncheckedCreateWithoutRafflesInput>
  }

  export type RafflePrizeUpdateWithWhereUniqueWithoutRafflesInput = {
    where: RafflePrizeWhereUniqueInput
    data: XOR<RafflePrizeUpdateWithoutRafflesInput, RafflePrizeUncheckedUpdateWithoutRafflesInput>
  }

  export type RafflePrizeUpdateManyWithWhereWithoutRafflesInput = {
    where: RafflePrizeScalarWhereInput
    data: XOR<RafflePrizeUpdateManyMutationInput, RafflePrizeUncheckedUpdateManyWithoutRafflesInput>
  }

  export type RafflePrizeScalarWhereInput = {
    AND?: RafflePrizeScalarWhereInput | RafflePrizeScalarWhereInput[]
    OR?: RafflePrizeScalarWhereInput[]
    NOT?: RafflePrizeScalarWhereInput | RafflePrizeScalarWhereInput[]
    id?: StringFilter<"RafflePrize"> | string
    raffleId?: StringFilter<"RafflePrize"> | string
    name?: StringFilter<"RafflePrize"> | string
    description?: StringNullableFilter<"RafflePrize"> | string | null
    imageUrl?: StringNullableFilter<"RafflePrize"> | string | null
    quantity?: IntFilter<"RafflePrize"> | number
    size?: StringNullableFilter<"RafflePrize"> | string | null
    color?: StringNullableFilter<"RafflePrize"> | string | null
    metadata?: JsonNullableFilter<"RafflePrize">
  }

  export type RaffleEntryUpsertWithWhereUniqueWithoutRaffleInput = {
    where: RaffleEntryWhereUniqueInput
    update: XOR<RaffleEntryUpdateWithoutRaffleInput, RaffleEntryUncheckedUpdateWithoutRaffleInput>
    create: XOR<RaffleEntryCreateWithoutRaffleInput, RaffleEntryUncheckedCreateWithoutRaffleInput>
  }

  export type RaffleEntryUpdateWithWhereUniqueWithoutRaffleInput = {
    where: RaffleEntryWhereUniqueInput
    data: XOR<RaffleEntryUpdateWithoutRaffleInput, RaffleEntryUncheckedUpdateWithoutRaffleInput>
  }

  export type RaffleEntryUpdateManyWithWhereWithoutRaffleInput = {
    where: RaffleEntryScalarWhereInput
    data: XOR<RaffleEntryUpdateManyMutationInput, RaffleEntryUncheckedUpdateManyWithoutRaffleInput>
  }

  export type RaffleCreateWithoutRaffle_prizesInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    entries?: RaffleEntryCreateNestedManyWithoutRaffleInput
  }

  export type RaffleUncheckedCreateWithoutRaffle_prizesInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    entries?: RaffleEntryUncheckedCreateNestedManyWithoutRaffleInput
  }

  export type RaffleCreateOrConnectWithoutRaffle_prizesInput = {
    where: RaffleWhereUniqueInput
    create: XOR<RaffleCreateWithoutRaffle_prizesInput, RaffleUncheckedCreateWithoutRaffle_prizesInput>
  }

  export type RaffleUpsertWithoutRaffle_prizesInput = {
    update: XOR<RaffleUpdateWithoutRaffle_prizesInput, RaffleUncheckedUpdateWithoutRaffle_prizesInput>
    create: XOR<RaffleCreateWithoutRaffle_prizesInput, RaffleUncheckedCreateWithoutRaffle_prizesInput>
    where?: RaffleWhereInput
  }

  export type RaffleUpdateToOneWithWhereWithoutRaffle_prizesInput = {
    where?: RaffleWhereInput
    data: XOR<RaffleUpdateWithoutRaffle_prizesInput, RaffleUncheckedUpdateWithoutRaffle_prizesInput>
  }

  export type RaffleUpdateWithoutRaffle_prizesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: RaffleEntryUpdateManyWithoutRaffleNestedInput
  }

  export type RaffleUncheckedUpdateWithoutRaffle_prizesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: RaffleEntryUncheckedUpdateManyWithoutRaffleNestedInput
  }

  export type RaffleCreateWithoutEntriesInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    raffle_prizes?: RafflePrizeCreateNestedManyWithoutRafflesInput
  }

  export type RaffleUncheckedCreateWithoutEntriesInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    raffle_prizes?: RafflePrizeUncheckedCreateNestedManyWithoutRafflesInput
  }

  export type RaffleCreateOrConnectWithoutEntriesInput = {
    where: RaffleWhereUniqueInput
    create: XOR<RaffleCreateWithoutEntriesInput, RaffleUncheckedCreateWithoutEntriesInput>
  }

  export type UserCreateWithoutRaffleEntriesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutRaffleEntriesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutRaffleEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRaffleEntriesInput, UserUncheckedCreateWithoutRaffleEntriesInput>
  }

  export type NoteCreateWithoutRaffleEntriesInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    course: CourseCreateNestedOneWithoutNotesInput
    semester?: SemesterCreateNestedOneWithoutNotesInput
    uploader: UserCreateNestedOneWithoutNotesInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedNotesInput
    reviews?: ReviewCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutRaffleEntriesInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutNoteInput
    accessCodes?: AccessCodeNoteUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutRaffleEntriesInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutRaffleEntriesInput, NoteUncheckedCreateWithoutRaffleEntriesInput>
  }

  export type RaffleUpsertWithoutEntriesInput = {
    update: XOR<RaffleUpdateWithoutEntriesInput, RaffleUncheckedUpdateWithoutEntriesInput>
    create: XOR<RaffleCreateWithoutEntriesInput, RaffleUncheckedCreateWithoutEntriesInput>
    where?: RaffleWhereInput
  }

  export type RaffleUpdateToOneWithWhereWithoutEntriesInput = {
    where?: RaffleWhereInput
    data: XOR<RaffleUpdateWithoutEntriesInput, RaffleUncheckedUpdateWithoutEntriesInput>
  }

  export type RaffleUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raffle_prizes?: RafflePrizeUpdateManyWithoutRafflesNestedInput
  }

  export type RaffleUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raffle_prizes?: RafflePrizeUncheckedUpdateManyWithoutRafflesNestedInput
  }

  export type UserUpsertWithoutRaffleEntriesInput = {
    update: XOR<UserUpdateWithoutRaffleEntriesInput, UserUncheckedUpdateWithoutRaffleEntriesInput>
    create: XOR<UserCreateWithoutRaffleEntriesInput, UserUncheckedCreateWithoutRaffleEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRaffleEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRaffleEntriesInput, UserUncheckedUpdateWithoutRaffleEntriesInput>
  }

  export type UserUpdateWithoutRaffleEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutRaffleEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type NoteUpsertWithoutRaffleEntriesInput = {
    update: XOR<NoteUpdateWithoutRaffleEntriesInput, NoteUncheckedUpdateWithoutRaffleEntriesInput>
    create: XOR<NoteCreateWithoutRaffleEntriesInput, NoteUncheckedCreateWithoutRaffleEntriesInput>
    where?: NoteWhereInput
  }

  export type NoteUpdateToOneWithWhereWithoutRaffleEntriesInput = {
    where?: NoteWhereInput
    data: XOR<NoteUpdateWithoutRaffleEntriesInput, NoteUncheckedUpdateWithoutRaffleEntriesInput>
  }

  export type NoteUpdateWithoutRaffleEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    course?: CourseUpdateOneRequiredWithoutNotesNestedInput
    semester?: SemesterUpdateOneWithoutNotesNestedInput
    uploader?: UserUpdateOneRequiredWithoutNotesNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedNotesNestedInput
    reviews?: ReviewUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutRaffleEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type CourseCreateWithoutUserCoursesInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    professor?: ProfessorCreateNestedOneWithoutCoursesInput
    notes?: NoteCreateNestedManyWithoutCourseInput
    createdBy: UserCreateNestedOneWithoutCreatedCoursesInput
  }

  export type CourseUncheckedCreateWithoutUserCoursesInput = {
    id?: string
    name: string
    code: string
    professorId?: string | null
    createdAt?: Date | string
    createdById: string
    notes?: NoteUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutUserCoursesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutUserCoursesInput, CourseUncheckedCreateWithoutUserCoursesInput>
  }

  export type UserCreateWithoutUserCoursesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutUserCoursesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    createdAccessCodes?: AccessCodeUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutUserCoursesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserCoursesInput, UserUncheckedCreateWithoutUserCoursesInput>
  }

  export type CourseUpsertWithoutUserCoursesInput = {
    update: XOR<CourseUpdateWithoutUserCoursesInput, CourseUncheckedUpdateWithoutUserCoursesInput>
    create: XOR<CourseCreateWithoutUserCoursesInput, CourseUncheckedCreateWithoutUserCoursesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutUserCoursesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutUserCoursesInput, CourseUncheckedUpdateWithoutUserCoursesInput>
  }

  export type CourseUpdateWithoutUserCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: ProfessorUpdateOneWithoutCoursesNestedInput
    notes?: NoteUpdateManyWithoutCourseNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutUserCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    notes?: NoteUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type UserUpsertWithoutUserCoursesInput = {
    update: XOR<UserUpdateWithoutUserCoursesInput, UserUncheckedUpdateWithoutUserCoursesInput>
    create: XOR<UserCreateWithoutUserCoursesInput, UserUncheckedCreateWithoutUserCoursesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserCoursesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserCoursesInput, UserUncheckedUpdateWithoutUserCoursesInput>
  }

  export type UserUpdateWithoutUserCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUserCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAccessCodes?: AccessCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserCreateWithoutCreatedAccessCodesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUploaderInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutCreatedAccessCodesInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.Role
    supabaseId: string
    kudosPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUploaderInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutUserInput
    UserCourses?: UserCoursesUncheckedCreateNestedManyWithoutUser_rolesInput
    createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput
    createdProfessors?: ProfessorUncheckedCreateNestedManyWithoutCreatedByInput
    createdSemesters?: SemesterUncheckedCreateNestedManyWithoutCreatedByInput
    verifiedNotes?: NoteUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutCreatedAccessCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedAccessCodesInput, UserUncheckedCreateWithoutCreatedAccessCodesInput>
  }

  export type AccessCodeNoteCreateWithoutAccessCodeInput = {
    id?: string
    note: NoteCreateNestedOneWithoutAccessCodesInput
  }

  export type AccessCodeNoteUncheckedCreateWithoutAccessCodeInput = {
    id?: string
    noteId: string
  }

  export type AccessCodeNoteCreateOrConnectWithoutAccessCodeInput = {
    where: AccessCodeNoteWhereUniqueInput
    create: XOR<AccessCodeNoteCreateWithoutAccessCodeInput, AccessCodeNoteUncheckedCreateWithoutAccessCodeInput>
  }

  export type AccessCodeNoteCreateManyAccessCodeInputEnvelope = {
    data: AccessCodeNoteCreateManyAccessCodeInput | AccessCodeNoteCreateManyAccessCodeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedAccessCodesInput = {
    update: XOR<UserUpdateWithoutCreatedAccessCodesInput, UserUncheckedUpdateWithoutCreatedAccessCodesInput>
    create: XOR<UserCreateWithoutCreatedAccessCodesInput, UserUncheckedCreateWithoutCreatedAccessCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedAccessCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedAccessCodesInput, UserUncheckedUpdateWithoutCreatedAccessCodesInput>
  }

  export type UserUpdateWithoutCreatedAccessCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedAccessCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    supabaseId?: StringFieldUpdateOperationsInput | string
    kudosPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUploaderNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutUserNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutUser_rolesNestedInput
    createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdProfessors?: ProfessorUncheckedUpdateManyWithoutCreatedByNestedInput
    createdSemesters?: SemesterUncheckedUpdateManyWithoutCreatedByNestedInput
    verifiedNotes?: NoteUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type AccessCodeNoteUpsertWithWhereUniqueWithoutAccessCodeInput = {
    where: AccessCodeNoteWhereUniqueInput
    update: XOR<AccessCodeNoteUpdateWithoutAccessCodeInput, AccessCodeNoteUncheckedUpdateWithoutAccessCodeInput>
    create: XOR<AccessCodeNoteCreateWithoutAccessCodeInput, AccessCodeNoteUncheckedCreateWithoutAccessCodeInput>
  }

  export type AccessCodeNoteUpdateWithWhereUniqueWithoutAccessCodeInput = {
    where: AccessCodeNoteWhereUniqueInput
    data: XOR<AccessCodeNoteUpdateWithoutAccessCodeInput, AccessCodeNoteUncheckedUpdateWithoutAccessCodeInput>
  }

  export type AccessCodeNoteUpdateManyWithWhereWithoutAccessCodeInput = {
    where: AccessCodeNoteScalarWhereInput
    data: XOR<AccessCodeNoteUpdateManyMutationInput, AccessCodeNoteUncheckedUpdateManyWithoutAccessCodeInput>
  }

  export type AccessCodeCreateWithoutNotesInput = {
    id?: string
    code: string
    duration?: number | null
    expiresAt: Date | string
    activatedAt?: Date | string | null
    deviceId?: string | null
    studentEmail?: string | null
    lastHeartbeat?: Date | string | null
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedAccessCodesInput
  }

  export type AccessCodeUncheckedCreateWithoutNotesInput = {
    id?: string
    code: string
    createdById: string
    duration?: number | null
    expiresAt: Date | string
    activatedAt?: Date | string | null
    deviceId?: string | null
    studentEmail?: string | null
    lastHeartbeat?: Date | string | null
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: Date | string
  }

  export type AccessCodeCreateOrConnectWithoutNotesInput = {
    where: AccessCodeWhereUniqueInput
    create: XOR<AccessCodeCreateWithoutNotesInput, AccessCodeUncheckedCreateWithoutNotesInput>
  }

  export type NoteCreateWithoutAccessCodesInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    course: CourseCreateNestedOneWithoutNotesInput
    semester?: SemesterCreateNestedOneWithoutNotesInput
    uploader: UserCreateNestedOneWithoutNotesInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedNotesInput
    reviews?: ReviewCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutAccessCodesInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutNoteInput
    raffleEntries?: RaffleEntryUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutAccessCodesInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutAccessCodesInput, NoteUncheckedCreateWithoutAccessCodesInput>
  }

  export type AccessCodeUpsertWithoutNotesInput = {
    update: XOR<AccessCodeUpdateWithoutNotesInput, AccessCodeUncheckedUpdateWithoutNotesInput>
    create: XOR<AccessCodeCreateWithoutNotesInput, AccessCodeUncheckedCreateWithoutNotesInput>
    where?: AccessCodeWhereInput
  }

  export type AccessCodeUpdateToOneWithWhereWithoutNotesInput = {
    where?: AccessCodeWhereInput
    data: XOR<AccessCodeUpdateWithoutNotesInput, AccessCodeUncheckedUpdateWithoutNotesInput>
  }

  export type AccessCodeUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedAccessCodesNestedInput
  }

  export type AccessCodeUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUpsertWithoutAccessCodesInput = {
    update: XOR<NoteUpdateWithoutAccessCodesInput, NoteUncheckedUpdateWithoutAccessCodesInput>
    create: XOR<NoteCreateWithoutAccessCodesInput, NoteUncheckedCreateWithoutAccessCodesInput>
    where?: NoteWhereInput
  }

  export type NoteUpdateToOneWithWhereWithoutAccessCodesInput = {
    where?: NoteWhereInput
    data: XOR<NoteUpdateWithoutAccessCodesInput, NoteUncheckedUpdateWithoutAccessCodesInput>
  }

  export type NoteUpdateWithoutAccessCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    course?: CourseUpdateOneRequiredWithoutNotesNestedInput
    semester?: SemesterUpdateOneWithoutNotesNestedInput
    uploader?: UserUpdateOneRequiredWithoutNotesNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedNotesNestedInput
    reviews?: ReviewUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutAccessCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteCreateManyUploaderInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
  }

  export type ReviewCreateManyUserInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    noteId: string
  }

  export type RaffleEntryCreateManyUserInput = {
    id?: string
    raffleId: string
    noteId: string
    isWinner?: boolean
    createdAt?: Date | string
  }

  export type UserCoursesCreateManyUser_rolesInput = {
    A: string
  }

  export type CourseCreateManyCreatedByInput = {
    id?: string
    name: string
    code: string
    professorId?: string | null
    createdAt?: Date | string
  }

  export type ProfessorCreateManyCreatedByInput = {
    id?: string
    name: string
    email?: string | null
  }

  export type SemesterCreateManyCreatedByInput = {
    id?: string
    name: string
    year: number
  }

  export type AccessCodeCreateManyCreatedByInput = {
    id?: string
    code: string
    duration?: number | null
    expiresAt: Date | string
    activatedAt?: Date | string | null
    deviceId?: string | null
    studentEmail?: string | null
    lastHeartbeat?: Date | string | null
    isUsed?: boolean
    isRevoked?: boolean
    createdAt?: Date | string
  }

  export type NoteCreateManyVerifiedByInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
  }

  export type NoteUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    course?: CourseUpdateOneRequiredWithoutNotesNestedInput
    semester?: SemesterUpdateOneWithoutNotesNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedNotesNestedInput
    reviews?: ReviewUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateManyWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NoteUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    noteId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    noteId?: StringFieldUpdateOperationsInput | string
  }

  export type RaffleEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raffle?: RaffleUpdateOneRequiredWithoutEntriesNestedInput
    note?: NoteUpdateOneRequiredWithoutRaffleEntriesNestedInput
  }

  export type RaffleEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    raffleId?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaffleEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    raffleId?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCoursesUpdateWithoutUser_rolesInput = {
    Course?: CourseUpdateOneRequiredWithoutUserCoursesNestedInput
  }

  export type UserCoursesUncheckedUpdateWithoutUser_rolesInput = {
    A?: StringFieldUpdateOperationsInput | string
  }

  export type UserCoursesUncheckedUpdateManyWithoutUser_rolesInput = {
    A?: StringFieldUpdateOperationsInput | string
  }

  export type CourseUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: ProfessorUpdateOneWithoutCoursesNestedInput
    notes?: NoteUpdateManyWithoutCourseNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutCourseNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SemesterUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    notes?: NoteUpdateManyWithoutSemesterNestedInput
  }

  export type SemesterUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    notes?: NoteUncheckedUpdateManyWithoutSemesterNestedInput
  }

  export type SemesterUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
  }

  export type AccessCodeUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: AccessCodeNoteUpdateManyWithoutAccessCodeNestedInput
  }

  export type AccessCodeUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: AccessCodeNoteUncheckedUpdateManyWithoutAccessCodeNestedInput
  }

  export type AccessCodeUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    studentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUpdateWithoutVerifiedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    course?: CourseUpdateOneRequiredWithoutNotesNestedInput
    semester?: SemesterUpdateOneWithoutNotesNestedInput
    uploader?: UserUpdateOneRequiredWithoutNotesNestedInput
    reviews?: ReviewUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutVerifiedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateManyWithoutVerifiedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NoteCreateManyCourseInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    description?: string | null
    updatedAt?: Date | string
    semesterId?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
  }

  export type UserCoursesCreateManyCourseInput = {
    B: string
  }

  export type NoteUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    semester?: SemesterUpdateOneWithoutNotesNestedInput
    uploader?: UserUpdateOneRequiredWithoutNotesNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedNotesNestedInput
    reviews?: ReviewUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    semesterId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCoursesUpdateWithoutCourseInput = {
    user_roles?: UserUpdateOneRequiredWithoutUserCoursesNestedInput
  }

  export type UserCoursesUncheckedUpdateWithoutCourseInput = {
    B?: StringFieldUpdateOperationsInput | string
  }

  export type UserCoursesUncheckedUpdateManyWithoutCourseInput = {
    B?: StringFieldUpdateOperationsInput | string
  }

  export type CourseCreateManyProfessorInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    createdById: string
  }

  export type CourseUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutCourseNestedInput
    UserCourses?: UserCoursesUpdateManyWithoutCourseNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    notes?: NoteUncheckedUpdateManyWithoutCourseNestedInput
    UserCourses?: UserCoursesUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type NoteCreateManySemesterInput = {
    id?: string
    title: string
    createdAt?: Date | string
    filePath: string
    fileType: string
    fileUrl: string
    uploaderId: string
    courseId: string
    description?: string | null
    updatedAt?: Date | string
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
  }

  export type NoteUpdateWithoutSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    course?: CourseUpdateOneRequiredWithoutNotesNestedInput
    uploader?: UserUpdateOneRequiredWithoutNotesNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedNotesNestedInput
    reviews?: ReviewUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutNoteNestedInput
    raffleEntries?: RaffleEntryUncheckedUpdateManyWithoutNoteNestedInput
    accessCodes?: AccessCodeNoteUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateManyWithoutSemesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploaderId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewCreateManyNoteInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    userId: string
  }

  export type RaffleEntryCreateManyNoteInput = {
    id?: string
    raffleId: string
    userId: string
    isWinner?: boolean
    createdAt?: Date | string
  }

  export type AccessCodeNoteCreateManyNoteInput = {
    id?: string
    accessCodeId: string
  }

  export type ReviewUpdateWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RaffleEntryUpdateWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raffle?: RaffleUpdateOneRequiredWithoutEntriesNestedInput
    user?: UserUpdateOneRequiredWithoutRaffleEntriesNestedInput
  }

  export type RaffleEntryUncheckedUpdateWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    raffleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaffleEntryUncheckedUpdateManyWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    raffleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessCodeNoteUpdateWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessCode?: AccessCodeUpdateOneRequiredWithoutNotesNestedInput
  }

  export type AccessCodeNoteUncheckedUpdateWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessCodeId?: StringFieldUpdateOperationsInput | string
  }

  export type AccessCodeNoteUncheckedUpdateManyWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessCodeId?: StringFieldUpdateOperationsInput | string
  }

  export type RafflePrizeCreateManyRafflesInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    quantity?: number
    size?: string | null
    color?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RaffleEntryCreateManyRaffleInput = {
    id?: string
    userId: string
    noteId: string
    isWinner?: boolean
    createdAt?: Date | string
  }

  export type RafflePrizeUpdateWithoutRafflesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RafflePrizeUncheckedUpdateWithoutRafflesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RafflePrizeUncheckedUpdateManyWithoutRafflesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RaffleEntryUpdateWithoutRaffleInput = {
    id?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRaffleEntriesNestedInput
    note?: NoteUpdateOneRequiredWithoutRaffleEntriesNestedInput
  }

  export type RaffleEntryUncheckedUpdateWithoutRaffleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaffleEntryUncheckedUpdateManyWithoutRaffleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessCodeNoteCreateManyAccessCodeInput = {
    id?: string
    noteId: string
  }

  export type AccessCodeNoteUpdateWithoutAccessCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: NoteUpdateOneRequiredWithoutAccessCodesNestedInput
  }

  export type AccessCodeNoteUncheckedUpdateWithoutAccessCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
  }

  export type AccessCodeNoteUncheckedUpdateManyWithoutAccessCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}