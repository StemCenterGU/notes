-- CreateIndex
CREATE INDEX "Note_createdAt_id_idx" ON "Note"("createdAt", "id");

-- CreateIndex
CREATE INDEX "Note_isPublic_status_createdAt_idx" ON "Note"("isPublic", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Note_status_createdAt_idx" ON "Note"("status", "createdAt");
