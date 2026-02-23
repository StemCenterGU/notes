"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Tags,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORY_LABELS = {
  RESOURCE_TYPE: "Resource Type",
  STUDY_CYCLE: "Study Cycle",
  GENERAL: "General",
}

const CATEGORY_DESCRIPTIONS = {
  RESOURCE_TYPE: "Tags for types of study material (e.g., Lecture Notes, Practice Exam, Study Guide)",
  STUDY_CYCLE: "Tags for study phases (e.g., Midterm Prep, Final Review, Week 1)",
  GENERAL: "General-purpose tags (e.g., Important, Recommended, Supplementary)",
}

export default function TagsManagementPage() {
  const [tags, setTags] = useState({ RESOURCE_TYPE: [], STUDY_CYCLE: [], GENERAL: [] })
  const [loading, setLoading] = useState(true)

  // Tag dialog state
  const [tagDialogOpen, setTagDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState(null)
  const [tagForm, setTagForm] = useState({ name: "", category: "RESOURCE_TYPE" })
  const [tagSaving, setTagSaving] = useState(false)

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState(null)

  const fetchTags = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/tags")
      if (res.ok) {
        const data = await res.json()
        setTags(data)
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const openNewTagDialog = (category) => {
    setEditingTag(null)
    setTagForm({ name: "", category: category || "RESOURCE_TYPE" })
    setTagDialogOpen(true)
  }

  const openEditTagDialog = (tag) => {
    setEditingTag(tag)
    setTagForm({ name: tag.name, category: tag.category })
    setTagDialogOpen(true)
  }

  const saveTag = async () => {
    if (!tagForm.name.trim()) return
    setTagSaving(true)

    try {
      const url = editingTag
        ? `/api/tags/${editingTag.id}`
        : "/api/tags"
      const method = editingTag ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagForm),
      })

      if (res.ok) {
        setTagDialogOpen(false)
        fetchTags()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to save tag")
      }
    } catch {
      alert("Failed to save tag")
    }
    setTagSaving(false)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    try {
      const res = await fetch(`/api/tags/${deleteTarget.id}`, { method: "DELETE" })

      if (res.ok) {
        setDeleteTarget(null)
        fetchTags()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to delete tag")
      }
    } catch {
      alert("Failed to delete tag")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const totalTags = tags.RESOURCE_TYPE.length + tags.STUDY_CYCLE.length + tags.GENERAL.length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tag Management</h1>
        <Button onClick={() => openNewTagDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>

      {totalTags === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Tags className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg font-medium">
              No tags yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Create tags to help students categorize their uploads.
            </p>
            <Button onClick={() => openNewTagDialog()} className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Tag
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{label}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {CATEGORY_DESCRIPTIONS[category]}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openNewTagDialog(category)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {tags[category].length === 0 ? (
                  <p className="text-sm text-muted-foreground py-2">
                    No tags in this category yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {tags[category].map((tag) => (
                      <div
                        key={tag.id}
                        className="flex items-center justify-between rounded-md border px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <Tags className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{tag.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditTagDialog(tag)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setDeleteTarget({
                                id: tag.id,
                                name: tag.name,
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tag Dialog */}
      <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingTag ? "Edit Tag" : "Add Tag"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tag-name">Tag Name</Label>
              <Input
                id="tag-name"
                placeholder="e.g., Lecture Notes"
                value={tagForm.name}
                onChange={(e) =>
                  setTagForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={tagForm.category}
                onValueChange={(val) =>
                  setTagForm((prev) => ({ ...prev, category: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setTagDialogOpen(false)}
                disabled={tagSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={saveTag}
                disabled={tagSaving || !tagForm.name.trim()}
              >
                {tagSaving ? "Saving..." : editingTag ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Tag</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deleteTarget?.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
