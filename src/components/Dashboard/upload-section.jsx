"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Plus, Upload, Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
                <Button variant="ghost" size="sm" onClick={() => onAddNew()}>
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
        const parts = name.split(' ');
        const year = parseInt(parts.pop(), 10);
        const season = parts.join(' ');
        if(isNaN(year)) {
            alert("Invalid semester format. Please use 'Season Year', e.g., 'Spring 2025'.");
            return;
        }
        data = { name: season, year };
    } else {
        data = { name };
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
      if (type === 'professor') setSelectedProfessor(newItem.id);
      if (type === 'semester') setSelectedSemester(newItem.id);
    } else {
      const { error } = await res.json();
      alert(`Error: ${error}`);
    }
  }, [])

  const handleFileUpload = async (e) => {
    e.preventDefault()
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
      const { error } = await res.json();
      alert(`Upload failed: ${error}`);
    }
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="p-6 flex flex-col items-center justify-center h-64 border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
          <Plus className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground font-medium">Upload New Notes</p>
          <p className="text-xs text-muted-foreground/80 mt-1">
            Earn a raffle entry for each upload!
          </p>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Study Notes</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <Label htmlFor="title">Note Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Chapter 5 Summary"
              required
            />
          </div>

          <div>
            <Label>Department</Label>
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

          <div>
            <Label>Course</Label>
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

          <div>
            <Label>Professor (Optional)</Label>
            <Combobox
              items={academics.professors}
              value={selectedProfessor}
              onSelect={setSelectedProfessor}
              placeholder="Select a professor"
              searchPlaceholder="Search professors..."
              emptyMessage="Add a new professor"
              onAddNew={() => {
                const name = prompt("Enter new professor name:");
                if (name) handleAddNew('professor', name);
              }}
              loading={!dataLoaded}
            />
          </div>

          <div>
            <Label>Semester</Label>
            <Combobox
              items={academics.semesters}
              value={selectedSemester}
              onSelect={setSelectedSemester}
              placeholder="Select a semester"
              searchPlaceholder="Search semesters..."
              emptyMessage="Add a new semester"
              onAddNew={() => {
                const name = prompt("Enter new semester (e.g., Spring 2025):");
                if (name) handleAddNew('semester', name);
              }}
              loading={!dataLoaded}
            />
          </div>

          {/* Tag Selection */}
          {(tags.RESOURCE_TYPE.length > 0 || tags.STUDY_CYCLE.length > 0 || tags.GENERAL.length > 0) && (
            <div className="space-y-3">
              <Label>Tags (Optional)</Label>
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
          )}

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              name="description"
              placeholder="Any extra details about the note"
            />
          </div>

          <div>
            <Label htmlFor="file">File</Label>
            <div className="mt-1 flex items-center justify-center w-full">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX, PPT, etc.
                  </p>
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

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
