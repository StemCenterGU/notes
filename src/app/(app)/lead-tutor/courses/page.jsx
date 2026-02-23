"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Building2,
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

export default function CoursesManagementPage() {
  const [departments, setDepartments] = useState([])
  const [professors, setProfessors] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedDepts, setExpandedDepts] = useState(new Set())

  // Department dialog state
  const [deptDialogOpen, setDeptDialogOpen] = useState(false)
  const [editingDept, setEditingDept] = useState(null)
  const [deptForm, setDeptForm] = useState({ name: "", code: "" })
  const [deptSaving, setDeptSaving] = useState(false)

  // Course dialog state
  const [courseDialogOpen, setCourseDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [courseForm, setCourseForm] = useState({
    name: "",
    code: "",
    departmentId: "",
    professorId: "",
  })
  const [courseSaving, setCourseSaving] = useState(false)

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState(null) // { type: 'department'|'course', id, name }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [deptRes, acadRes] = await Promise.all([
        fetch("/api/departments"),
        fetch("/api/academics"),
      ])
      if (deptRes.ok) {
        const deptData = await deptRes.json()
        setDepartments(deptData)
        // Expand all departments by default
        setExpandedDepts(new Set(deptData.map((d) => d.id)))
      }
      if (acadRes.ok) {
        const acadData = await acadRes.json()
        setProfessors(acadData.professors || [])
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Department CRUD
  const toggleDept = (id) => {
    setExpandedDepts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const openNewDeptDialog = () => {
    setEditingDept(null)
    setDeptForm({ name: "", code: "" })
    setDeptDialogOpen(true)
  }

  const openEditDeptDialog = (dept) => {
    setEditingDept(dept)
    setDeptForm({ name: dept.name, code: dept.code })
    setDeptDialogOpen(true)
  }

  const saveDepartment = async () => {
    if (!deptForm.name.trim() || !deptForm.code.trim()) return
    setDeptSaving(true)

    try {
      const url = editingDept
        ? `/api/departments/${editingDept.id}`
        : "/api/departments"
      const method = editingDept ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deptForm),
      })

      if (res.ok) {
        setDeptDialogOpen(false)
        fetchData()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to save department")
      }
    } catch {
      alert("Failed to save department")
    }
    setDeptSaving(false)
  }

  // Course CRUD
  const openNewCourseDialog = (departmentId) => {
    setEditingCourse(null)
    setCourseForm({ name: "", code: "", departmentId, professorId: "" })
    setCourseDialogOpen(true)
  }

  const openEditCourseDialog = (course, departmentId) => {
    setEditingCourse(course)
    setCourseForm({
      name: course.name,
      code: course.code,
      departmentId: departmentId || "",
      professorId: course.professorId || "",
    })
    setCourseDialogOpen(true)
  }

  const saveCourse = async () => {
    if (!courseForm.name.trim() || !courseForm.code.trim() || !courseForm.departmentId) return
    setCourseSaving(true)

    try {
      if (editingCourse) {
        // Update existing course
        const res = await fetch(`/api/academics/courses/${editingCourse.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseForm),
        })

        if (res.ok) {
          setCourseDialogOpen(false)
          fetchData()
        } else {
          const data = await res.json()
          alert(data.error || "Failed to update course")
        }
      } else {
        // Create new course
        const res = await fetch("/api/academics/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "course",
            data: {
              name: courseForm.name.trim(),
              code: courseForm.code.trim().toUpperCase(),
              departmentId: courseForm.departmentId,
              professorId: courseForm.professorId || undefined,
            },
          }),
        })

        if (res.ok) {
          setCourseDialogOpen(false)
          fetchData()
        } else {
          const data = await res.json()
          alert(data.error || "Failed to create course")
        }
      }
    } catch {
      alert("Failed to save course")
    }
    setCourseSaving(false)
  }

  // Delete handler
  const confirmDelete = async () => {
    if (!deleteTarget) return

    try {
      const url =
        deleteTarget.type === "department"
          ? `/api/departments/${deleteTarget.id}`
          : `/api/academics/courses/${deleteTarget.id}`

      const res = await fetch(url, { method: "DELETE" })

      if (res.ok) {
        setDeleteTarget(null)
        fetchData()
      } else {
        const data = await res.json()
        alert(data.error || `Failed to delete ${deleteTarget.type}`)
      }
    } catch {
      alert(`Failed to delete ${deleteTarget.type}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <Button onClick={openNewDeptDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      {departments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg font-medium">
              No departments yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Create your first department to start organizing courses.
            </p>
            <Button onClick={openNewDeptDialog} className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {departments.map((dept) => {
            const isExpanded = expandedDepts.has(dept.id)
            return (
              <Card key={dept.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleDept(dept.id)}
                      className="flex items-center gap-2 text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                      <CardTitle className="text-lg">
                        {dept.name}
                        <Badge variant="secondary" className="ml-2 font-mono">
                          {dept.code}
                        </Badge>
                      </CardTitle>
                      <span className="text-sm text-muted-foreground ml-2">
                        {dept.courses?.length || 0} course
                        {dept.courses?.length !== 1 ? "s" : ""}
                      </span>
                    </button>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openNewCourseDialog(dept.id)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Course
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDeptDialog(dept)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setDeleteTarget({
                            type: "department",
                            id: dept.id,
                            name: dept.name,
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent>
                    {!dept.courses || dept.courses.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-2">
                        No courses in this department yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {dept.courses.map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between rounded-md border px-4 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <span className="font-medium">
                                  {course.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="ml-2 font-mono text-xs"
                                >
                                  {course.code}
                                </Badge>
                                {course.professor && (
                                  <span className="text-sm text-muted-foreground ml-2">
                                    -- {course.professor.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  openEditCourseDialog(course, dept.id)
                                }
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setDeleteTarget({
                                    type: "course",
                                    id: course.id,
                                    name: course.name,
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
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* Department Dialog */}
      <Dialog open={deptDialogOpen} onOpenChange={setDeptDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingDept ? "Edit Department" : "Add Department"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dept-name">Department Name</Label>
              <Input
                id="dept-name"
                placeholder="e.g., Computer Science"
                value={deptForm.name}
                onChange={(e) =>
                  setDeptForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="dept-code">Department Code</Label>
              <Input
                id="dept-code"
                placeholder="e.g., CS"
                value={deptForm.code}
                onChange={(e) =>
                  setDeptForm((prev) => ({ ...prev, code: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeptDialogOpen(false)}
                disabled={deptSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={saveDepartment}
                disabled={
                  deptSaving || !deptForm.name.trim() || !deptForm.code.trim()
                }
              >
                {deptSaving ? "Saving..." : editingDept ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Course Dialog */}
      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit Course" : "Add Course"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="course-name">Course Name</Label>
              <Input
                id="course-name"
                placeholder="e.g., Introduction to Programming"
                value={courseForm.name}
                onChange={(e) =>
                  setCourseForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="course-code">Course Code</Label>
              <Input
                id="course-code"
                placeholder="e.g., CS101"
                value={courseForm.code}
                onChange={(e) =>
                  setCourseForm((prev) => ({ ...prev, code: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Department</Label>
              <Select
                value={courseForm.departmentId}
                onValueChange={(val) =>
                  setCourseForm((prev) => ({ ...prev, departmentId: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name} ({dept.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Professor (Optional)</Label>
              <Select
                value={courseForm.professorId || "none"}
                onValueChange={(val) =>
                  setCourseForm((prev) => ({
                    ...prev,
                    professorId: val === "none" ? "" : val,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select professor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No professor</SelectItem>
                  {professors.map((prof) => (
                    <SelectItem key={prof.id} value={prof.id}>
                      {prof.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setCourseDialogOpen(false)}
                disabled={courseSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={saveCourse}
                disabled={
                  courseSaving ||
                  !courseForm.name.trim() ||
                  !courseForm.code.trim() ||
                  !courseForm.departmentId
                }
              >
                {courseSaving
                  ? "Saving..."
                  : editingCourse
                    ? "Update"
                    : "Create"}
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
            <DialogTitle>
              Delete {deleteTarget?.type === "department" ? "Department" : "Course"}
            </DialogTitle>
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
