"use client"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/AuthContext"
import NotesGrid from "@/components/Dashboard/notes-grid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, CheckCircle, Search } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

function MultiSelectFilter({ title, options, selected, onSelectedChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={selected.length > 0 ? "border-primary text-primary" : ""}>
          {title}
          {selected.length > 0 && (
            <span className="ml-1.5 rounded-full bg-primary text-primary-foreground text-xs w-4 h-4 inline-flex items-center justify-center">
              {selected.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selected.includes(option)}
            onCheckedChange={() => {
              const newSelected = selected.includes(option)
                ? selected.filter((item) => item !== option)
                : [...selected, option]
              onSelectedChange(newSelected)
            }}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function ExplorePage() {
  const { role, isLoading: authLoading } = useUser()
  const [loading, setLoading] = useState(true)
  const [allNotes, setAllNotes] = useState([])
  const [filterOptions, setFilterOptions] = useState({ courses: [], professors: [], semesters: [] })
  const [activeFilters, setActiveFilters] = useState({
    course: [],
    semester: [],
    professor: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const router = useRouter()

  const isStudent = role === 'STUDENT'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/notes/explore")
        if (!res.ok) {
          router.replace("/dashboard")
          return
        }
        const data = await res.json()
        setAllNotes(data.notes || [])
        setFilterOptions(data.filterOptions || { courses: [], professors: [], semesters: [] })
      } catch (err) {
        console.error("Fetch error:", err)
        router.replace("/dashboard")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  const filteredNotes = useMemo(() => {
    return allNotes
      .filter((note) => {
        const isCourseMatch = activeFilters.course.length === 0 || activeFilters.course.includes(note.course?.name)
        const isSemesterMatch = activeFilters.semester.length === 0 || activeFilters.semester.includes(`${note.semester?.name} ${note.semester?.year}`)
        const isProfessorMatch = activeFilters.professor.length === 0 || activeFilters.professor.includes(note.course?.professor?.name)
        const isSearchMatch = !searchQuery || note.title.toLowerCase().includes(searchQuery.toLowerCase())
        const isVerifiedMatch = !verifiedOnly || note.isVerified
        return isCourseMatch && isSemesterMatch && isProfessorMatch && isSearchMatch && isVerifiedMatch
      })
  }, [allNotes, activeFilters, searchQuery, verifiedOnly])

  const hasActiveFilters =
    activeFilters.course.length > 0 ||
    activeFilters.semester.length > 0 ||
    activeFilters.professor.length > 0 ||
    searchQuery.length > 0 ||
    verifiedOnly

  const renderSkeletons = () => (
    <div>
      {/* Filter bar skeleton */}
      <Card className="mb-8">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <Skeleton className="h-9 flex-1 w-full rounded-md" />
            <Separator orientation="vertical" className="hidden md:block h-8" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-36 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count skeleton */}
      <Skeleton className="h-4 w-40 mb-6 rounded" />

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded mt-1" />
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-5/6 rounded mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderEmptyState = () => {
    if (hasActiveFilters) {
      return (
        <div className="text-center py-24">
          <Search className="mx-auto h-14 w-14 text-muted-foreground" />
          <h3 className="mt-6 text-xl font-semibold">No matching notes</h3>
          <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">
            No notes match your filters. Try adjusting your search criteria.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setActiveFilters({ course: [], semester: [], professor: [] })
              setVerifiedOnly(false)
            }}
          >
            Clear filters
          </Button>
        </div>
      )
    }
    return (
      <div className="text-center py-24">
        <FileText className="mx-auto h-14 w-14 text-muted-foreground" />
        <h3 className="mt-6 text-xl font-semibold">No Notes to Explore</h3>
        <p className="text-muted-foreground text-sm mt-2">
          It looks like no notes have been shared by other users yet.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Explore Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-3">
            {isStudent
              ? "Browse approved public notes from our community."
              : "Find the study materials you need from our community."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          renderSkeletons()
        ) : (
          <>
            {/* Sticky filter bar */}
            <Card className="sticky top-16 z-10 mb-8">
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      placeholder="Search notes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Separator orientation="vertical" className="hidden md:block h-8" />
                  <div className="flex flex-wrap gap-2 items-center">
                    <MultiSelectFilter
                      title="Courses"
                      options={filterOptions.courses}
                      selected={activeFilters.course}
                      onSelectedChange={(selected) => setActiveFilters(prev => ({ ...prev, course: selected }))}
                    />
                    <MultiSelectFilter
                      title="Professors"
                      options={filterOptions.professors}
                      selected={activeFilters.professor}
                      onSelectedChange={(selected) => setActiveFilters(prev => ({ ...prev, professor: selected }))}
                    />
                    <MultiSelectFilter
                      title="Semesters"
                      options={filterOptions.semesters}
                      selected={activeFilters.semester}
                      onSelectedChange={(selected) => setActiveFilters(prev => ({ ...prev, semester: selected }))}
                    />
                    <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-background">
                      <Switch
                        id="verified-only"
                        checked={verifiedOnly}
                        onCheckedChange={setVerifiedOnly}
                      />
                      <Label htmlFor="verified-only" className="flex items-center gap-1 cursor-pointer text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Verified Only
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results count */}
            {allNotes.length > 0 && (
              <p className="text-sm text-muted-foreground mb-6">
                Showing <span className="font-medium text-foreground">{filteredNotes.length}</span> of{" "}
                <span className="font-medium text-foreground">{allNotes.length}</span> notes
              </p>
            )}

            {/* Content */}
            {allNotes.length === 0 || filteredNotes.length === 0
              ? renderEmptyState()
              : <NotesGrid notes={filteredNotes} showUploader={true} />
            }
          </>
        )}
      </div>
    </div>
  )
}
