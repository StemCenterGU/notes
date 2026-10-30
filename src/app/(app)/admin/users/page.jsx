"use client"

import { useState, useEffect, useCallback } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ROLE_META, ROLE_ORDER, roleLabel } from "@/lib/roles-display"
import {
  Page,
  PageHeader,
  DataTable,
  Td,
  EmptyState,
  TableSkeleton,
} from "@/components/page"

const COLUMNS = [
  { key: "user", label: "User" },
  { key: "email", label: "Email", className: "hidden md:table-cell" },
  { key: "role", label: "Role", align: "right" },
]

export default function UserManagementPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [savingId, setSavingId] = useState(null)
  const [nextCursor, setNextCursor] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [counts, setCounts] = useState({})

  const fetchUsers = useCallback(async (query) => {
    setLoading(true)
    const p = new URLSearchParams()
    if (query) p.set("search", query)
    const res = await fetch(`/api/admin/users?${p}`)
    const data = await res.json()
    if (res.ok) {
      setUsers(data.users || [])
      setNextCursor(data.nextCursor ?? null)
      setHasMore(Boolean(data.hasMore))
      if (data.counts) setCounts(data.counts)
    } else {
      console.error("Failed to fetch users:", data.error)
    }
    setLoading(false)
  }, [])

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return
    setLoadingMore(true)
    try {
      const p = new URLSearchParams({ cursor: nextCursor })
      if (searchQuery) p.set("search", searchQuery)
      const res = await fetch(`/api/admin/users?${p}`)
      if (res.ok) {
        const data = await res.json()
        setUsers((prev) => [...prev, ...(data.users || [])])
        setNextCursor(data.nextCursor ?? null)
        setHasMore(Boolean(data.hasMore))
      }
    } finally {
      setLoadingMore(false)
    }
  }, [nextCursor, loadingMore, searchQuery])

  useEffect(() => {
    const handler = setTimeout(() => fetchUsers(searchQuery), 300)
    return () => clearTimeout(handler)
  }, [searchQuery, fetchUsers])

  const handleRoleChange = async (userId, newRole) => {
    setSavingId(userId)
    // Optimistic: the select should not snap back while the request is in flight.
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    })
    await fetchUsers(searchQuery)
    setSavingId(null)
  }

  return (
    <Page wide>
      <PageHeader
        eyebrow="Administration"
        title="Users & roles"
        description="Roles decide what each person can see and review."
      />

      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
        {ROLE_ORDER.map((role) => (
          <div key={role}>
            <p className="font-display tabular text-xl text-foreground">{counts[role] || 0}</p>
            <p className="text-xs text-muted-foreground">{roleLabel(role)}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-7 max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8 pl-8 text-sm"
        />
      </div>

      <div className="mt-5">
        {loading ? (
          <TableSkeleton rows={6} cols={3} />
        ) : users.length === 0 ? (
          <EmptyState
            title="No users found"
            description={searchQuery ? "Try a different search." : "No one has signed up yet."}
          />
        ) : (
          <DataTable columns={COLUMNS}>
            {users.map((user) => (
              <tr key={user.id}>
                <Td>
                  <p className="font-medium text-foreground">{user.name || "—"}</p>
                  <p className="text-xs text-muted-foreground md:hidden">{user.email}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {ROLE_META[user.role]?.description}
                  </p>
                </Td>
                <Td className="hidden md:table-cell">
                  <span className="text-muted-foreground">{user.email}</span>
                </Td>
                <Td align="right">
                  <Select
                    value={user.role}
                    disabled={savingId === user.id}
                    onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                  >
                    <SelectTrigger className="ml-auto h-8 w-[170px] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_ORDER.map((role) => (
                        <SelectItem key={role} value={role}>
                          {roleLabel(role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Td>
              </tr>
            ))}
          </DataTable>
        )}

        {hasMore && !loading && (
          <div className="mt-6 flex justify-center">
            <Button variant="outline" size="sm" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? "Loading…" : "Load more"}
            </Button>
          </div>
        )}
      </div>
    </Page>
  )
}
