"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Plus, Upload, Check, ChevronsUpDown, Loader2, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// Small inline dialog for adding a new professor or semester without prompt()
function AddNewDialog({ open, onOpenChange, title, placeholder, hint, onConfirm }) {
  const [value, setValue] = useState("")

  const handleConfirm = () => {
    if (value.trim()) {
      onConfirm(value.trim())
      setValue("")
      onOpenChange(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleConfirm()
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) setValue("")
      onOpenChange(isOpen)
    }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {hint && <DialogDescription>{hint}</DialogDescription>}
        </DialogHeader>
        <div className="py-2">
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { setValue(""); onOpenChange(false) }}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!value.trim()}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Reusable Combobox Component
function Combobox({
  items,
  value,
  onSelect,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  onAddNew,
  disabled,
  loading,
  displayField = "name",
}) {
  const [open, setOpen] = useState(false)

  const selectedLabel = value
    ? items.find((item) => item.id === value)?.[displayField]
    : null

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled || loading}
        >
          {loading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading...
            </span>
          ) : (
            <span className="truncate">{selectedLabel || placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="max-h-[200px]">
            <CommandEmpty>
              {onAddNew ? (
                <Button variant="ghost" size="sm" onClick={() => { onAddNew(); setOpen(false) }}>
                  <Plus className="mr-2 h-4 w-4" />
                  {emptyMessage}
                </Button>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {emptyMessage}
                </span>
              )}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item[displayField]}
                  onSelect={() => {
                    onSelect(item.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item[displayField]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function UploadSection({ onNoteUploaded }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [academics, setAcademics] = useState({
    departments: [],
    courses: [],
    professors: [],
    semesters: [],
  })
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedProfessor, setSelectedProfessor] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [tags, setTags] = useState({ RESOURCE_TYPE: [], STUDY_CYCLE: [], GENERAL: [] })
  const [selectedTagIds, setSelectedTagIds] = useState(new Set())
  const [dataLoaded, setDataLoaded] = useState(false)

  // Mini dialog state for add-new professor/semester
  const [addProfessorOpen, setAddProfessorOpen] = useState(false)
  const [addSemesterOpen, setAddSemesterOpen] = useState(false)

  // Add display labels: "CODE - Name" for departments and courses
  const departmentItems = useMemo(
    () => academics.departments.map((d) => ({ ...d, label: `${d.code} - ${d.name}` })),
    [academics.departments]
  )

  // Filter courses by selected department, add display labels
  const filteredCourses = useMemo(() => {
    if (!selectedDepartment) return []
    return academics.courses
      .filter((course) => course.departmentId === selectedDepartment)
      .map((c) => ({ ...c, label: `${c.code} - ${c.name}` }))
  }, [selectedDepartment, academics.courses])

  // When department changes, clear course selection
  const handleDepartmentSelect = useCallback((deptId) => {
    setSelectedDepartment(deptId)
    setSelectedCourse(null)
  }, [])

  // Eagerly prefetch academic data and tags on mount (not on dialog open)
  useEffect(() => {
    if (dataLoaded) return
    const fetchAcademics = async () => {
      const res = await fetch("/api/academics")
      if (res.ok) {
        const data = await res.json()
        setAcademics(data)
      }
    }
    const fetchTags = async () => {
      const res = await fetch("/api/tags")
      if (res.ok) {
        const data = await res.json()
        setTags(data)
      }
    }
    Promise.all([fetchAcademics(), fetchTags()]).then(() => setDataLoaded(true))
  }, [dataLoaded])

  const toggleTag = useCallback((tagId) => {
    setSelectedTagIds((prev) => {
      const next = new Set(prev)
      if (next.has(tagId)) {
        next.delete(tagId)
      } else {
        next.add(tagId)
      }
      return next
    })
  }, [])

  const refetchAcademics = useCallback(async () => {
    const res = await fetch("/api/academics")
    if (res.ok) setAcademics(await res.json())
  }, [])

  const handleAddNew = useCallback(async (type, name) => {
    const endpoint = "/api/academics/create"
    let data = {}

    if (type === 'semester') {
      const parts = name.split(' ')
      const year = parseInt(parts.pop(), 10)
      const season = parts.join(' ')
      if (isNaN(year)) {
        setError("Invalid semester format. Please use 'Season Year', e.g., 'Spring 2025'.")
        return
      }
      data = { name: season, year }
    } else {
      data = { name }
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    })

    if (res.ok) {
      const newItem = await res.json()
      setAcademics((prev) => ({
        ...prev,
        [`${type}s`]: [...prev[`${type}s`], newItem],
      }))
      if (type === 'professor') setSelectedProfessor(newItem.id)
      if (type === 'semester') setSelectedSemester(newItem.id)
    } else {
      const { error: apiError } = await res.json()
      setError(`Error: ${apiError}`)
    }
  }, [])

  const handleFileUpload = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    const form = e.target
    const formData = new FormData(form)

    // Append selected IDs
    formData.append("courseId", selectedCourse)
    if (selectedProfessor) formData.append("professorId", selectedProfessor)
    formData.append("semesterId", selectedSemester)
    if (selectedTagIds.size > 0) {
      formData.append("tagIds", JSON.stringify([...selectedTagIds]))
    }

    const res = await fetch("/api/notes/upload", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      onNoteUploaded(data.note)
      setIsOpen(false)
      form.reset()
      setSelectedDepartment(null)
      setSelectedCourse(null)
      setSelectedProfessor(null)
      setSelectedSemester(null)
      setSelectedTagIds(new Set())
    } else {
      const { error: apiError } = await res.json()
      setError(`Upload failed: ${apiError}`)
    }
    setIsLoading(false)
  }

  const hasTags =
    tags.RESOURCE_TYPE.length > 0 ||
    tags.STUDY_CYCLE.length > 0 ||
    tags.GENERAL.length > 0

  return (
    <>
      {/* Add Professor mini dialog */}
      <AddNewDialog
        open={addProfessorOpen}
        onOpenChange={setAddProfessorOpen}
        title="Add New Professor"
        placeholder="e.g., Dr. Jane Smith"
        onConfirm={(name) => handleAddNew('professor', name)}
      />

      {/* Add Semester mini dialog */}
      <AddNewDialog
        open={addSemesterOpen}
        onOpenChange={setAddSemesterOpen}
        title="Add New Semester"
        placeholder="e.g., Spring 2025"
        hint="Enter the season followed by the year, e.g., Spring 2025."
        onConfirm={(name) => handleAddNew('semester', name)}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card className="group border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all h-full flex flex-col items-center justify-center p-8">
            <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <p className="font-semibold text-lg">Upload Notes</p>
            <p className="text-sm text-muted-foreground mt-1">Share your study materials</p>
            <Badge variant="secondary" className="mt-3">
              <Award className="h-3 w-3 mr-1" />
              Earn raffle entries
            </Badge>
          </Card>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg flex flex-col max-h-[90vh] p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
            <DialogTitle>Upload Study Notes</DialogTitle>
            <DialogDescription>
              Fill in the details below and attach your file to share with the community.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFileUpload} className="flex flex-col flex-1 min-h-0">
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-4">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Section: Note Details */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Note Details
                </p>

                <div>
                  <Label htmlFor="title">Note Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Chapter 5 Summary"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label>Department</Label>
                  <div className="mt-1.5">
                    <Combobox
                      items={departmentItems}
                      value={selectedDepartment}
                      onSelect={handleDepartmentSelect}
                      placeholder="Select a department"
                      searchPlaceholder="Search departments..."
                      emptyMessage="No departments found"
                      displayField="label"
                      loading={!dataLoaded}
                    />
                  </div>
                </div>

                <div>
                  <Label>Course</Label>
                  <div className="mt-1.5">
                    <Combobox
                      items={filteredCourses}
                      value={selectedCourse}
                      onSelect={setSelectedCourse}
                      placeholder={selectedDepartment ? "Select a course" : "Select a department first"}
                      searchPlaceholder="Search courses..."
                      emptyMessage="No courses in this department"
                      disabled={!selectedDepartment}
                      displayField="label"
                      loading={!dataLoaded}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Additional Info */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Additional Info
                </p>

                <div>
                  <Label>Professor <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                  <div className="mt-1.5">
                    <Combobox
                      items={academics.professors}
                      value={selectedProfessor}
                      onSelect={setSelectedProfessor}
                      placeholder="Select a professor"
                      searchPlaceholder="Search professors..."
                      emptyMessage="Add a new professor"
                      onAddNew={() => setAddProfessorOpen(true)}
                      loading={!dataLoaded}
                    />
                  </div>
                </div>

                <div>
                  <Label>Semester</Label>
                  <div className="mt-1.5">
                    <Combobox
                      items={academics.semesters}
                      value={selectedSemester}
                      onSelect={setSelectedSemester}
                      placeholder="Select a semester"
                      searchPlaceholder="Search semesters..."
                      emptyMessage="Add a new semester"
                      onAddNew={() => setAddSemesterOpen(true)}
                      loading={!dataLoaded}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Any extra details about the note"
                    className="mt-1.5"
                  />
                </div>
              </div>

              {/* Section: Tags */}
              {hasTags && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tags <span className="font-normal normal-case">(Optional)</span>
                    </p>

                    {tags.RESOURCE_TYPE.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1.5">Resource Type</p>
                        <div className="flex flex-wrap gap-2">
                          {tags.RESOURCE_TYPE.map((tag) => (
                            <label
                              key={tag.id}
                              className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-colors",
                                selectedTagIds.has(tag.id)
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "bg-background border-border text-muted-foreground hover:bg-muted"
                              )}
                            >
                              <Checkbox
                                checked={selectedTagIds.has(tag.id)}
                                onCheckedChange={() => toggleTag(tag.id)}
                                className="h-3 w-3"
                              />
                              {tag.name}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {tags.STUDY_CYCLE.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1.5">Study Cycle</p>
                        <div className="flex flex-wrap gap-2">
                          {tags.STUDY_CYCLE.map((tag) => (
                            <label
                              key={tag.id}
                              className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-colors",
                                selectedTagIds.has(tag.id)
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "bg-background border-border text-muted-foreground hover:bg-muted"
                              )}
                            >
                              <Checkbox
                                checked={selectedTagIds.has(tag.id)}
                                onCheckedChange={() => toggleTag(tag.id)}
                                className="h-3 w-3"
                              />
                              {tag.name}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {tags.GENERAL.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1.5">General</p>
                        <div className="flex flex-wrap gap-2">
                          {tags.GENERAL.map((tag) => (
                            <label
                              key={tag.id}
                              className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-colors",
                                selectedTagIds.has(tag.id)
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "bg-background border-border text-muted-foreground hover:bg-muted"
                              )}
                            >
                              <Checkbox
                                checked={selectedTagIds.has(tag.id)}
                                onCheckedChange={() => toggleTag(tag.id)}
                                className="h-3 w-3"
                              />
                              {tag.name}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Section: File Upload */}
              <Separator />
              <div className="space-y-3 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  File Upload
                </p>
                <label htmlFor="file" className="block">
                  <div className="group/drop rounded-xl border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer p-8 text-center">
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground group-hover/drop:text-primary transition-colors" />
                    <p className="mt-3 text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPT (max 10MB)</p>
                  </div>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 border-t px-6 py-4 flex justify-end gap-2 bg-background">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
