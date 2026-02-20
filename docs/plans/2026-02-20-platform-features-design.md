# GUNotes Platform Features Design

**Date:** 2026-02-20
**Status:** Approved
**Approach:** Incremental layers (feature-by-feature in dependency order)

## Overview

Six new features to add quality control, content curation, and better organization to GUNotes. Microsoft AD auth is deferred pending ITS approval.

## Feature 1: LEAD_TUTOR Role & Dashboard

### Role Hierarchy

```
STUDENT < TUTOR < [LEAD_TUTOR | PROFESSOR] < ADMIN
```

LEAD_TUTOR and PROFESSOR are peers with different domains:
- **LEAD_TUTOR:** content management, tutor oversight, platform settings
- **PROFESSOR:** academic verification

### Schema Changes

Add `LEAD_TUTOR` to the `Role` enum.

### Permissions

Everything a TUTOR can do, plus:
- Access lead tutor dashboard (`/lead-tutor`)
- Manage course catalog (CRUD departments, courses)
- Define/manage tags
- Mark approved notes as public
- Override tutor review decisions
- Edit/delete any note
- View tutor activity/stats

### Dashboard Pages

| Route | Purpose |
|---|---|
| `/lead-tutor` | Overview: pending reviews, recent uploads, stats |
| `/lead-tutor/courses` | Manage departments & courses |
| `/lead-tutor/tags` | Manage tag definitions |
| `/lead-tutor/notes` | Manage all notes: edit, delete, toggle public, override reviews |
| `/lead-tutor/tutors` | View tutor review activity |

Promotion to LEAD_TUTOR: ADMINs only (via existing user management).

## Feature 2: Department-Based Course Catalog

### Schema Changes

**New table: Department**
- `id` (UUID, PK)
- `name` (String) -- e.g. "Computer Science"
- `code` (String, unique) -- e.g. "CS"
- `createdById` (FK to User)
- `createdAt` (DateTime)

**Course table changes:**
- Add `departmentId` (FK to Department, required)
- Professor becomes optional on individual notes, not on the course

### Upload Flow

1. Select Department (dropdown)
2. Select Course (filtered by department)
3. Select Semester (existing)
4. Optionally tag professor

Students can no longer create new courses/professors inline -- they pick from the lead-tutor-managed catalog.

### Management

Lead tutors manage departments + courses at `/lead-tutor/courses`. Searchable, filterable list with add/edit/delete.

## Feature 3: Tag System

### Schema Changes

**New table: Tag**
- `id` (UUID, PK)
- `name` (String)
- `category` (Enum: `RESOURCE_TYPE`, `STUDY_CYCLE`, `GENERAL`)
- `createdById` (FK to User)
- `createdAt` (DateTime)
- Unique constraint on `name` + `category`

**New junction table: NoteTag**
- `noteId` (FK to Note)
- `tagId` (FK to Tag)
- Composite PK on `noteId` + `tagId`

### How It Works

- Lead tutors create/edit/delete tags at `/lead-tutor/tags`, organized by category
- During upload, students see tag dropdowns grouped by category
- Tags displayed on note cards, filterable in browse/explore views

### Example Tags

- **Resource Type:** Lecture Notes, Study Guide, Practice Exam, Cheat Sheet, Lab Report
- **Study Cycle:** Midterm Prep, Final Prep, Weekly Review, Pre-Exam
- **General:** as defined by lead tutors

## Feature 4: Tutor Review & Approval System

### Schema Changes

**Note table changes:**
- Add `status` (Enum: `UNREVIEWED`, `APPROVED`, `REJECTED`, default `UNREVIEWED`)

**New table: TutorReview**
- `id` (UUID, PK)
- `noteId` (FK to Note)
- `reviewerId` (FK to User)
- `comment` (String)
- `rating` (Int, 1-5, quality score)
- `decision` (Enum: `APPROVE`, `REJECT`, `COMMENT_ONLY`)
- `createdAt` (DateTime)
- Unique constraint on `noteId` + `reviewerId`

Existing student `Review` table stays separate -- that's for student feedback on public notes.

### Flow

1. Student uploads note -> `status = UNREVIEWED`, visible but flagged
2. Any tutor can open the note and leave a review with a decision
3. First APPROVE or REJECT decision sets the note's status
4. Lead tutors can override (change status, delete reviews)
5. Rejected notes: hidden from other students, visible to uploader with feedback

## Feature 5: Public Notes

### Schema Changes

**Note table changes:**
- Add `isPublic` (Boolean, default false)

### Flow

- Only LEAD_TUTOR and ADMIN can toggle `isPublic` on approved notes
- Public notes appear in a browse page visible to all logged-in students
- Non-public approved notes still require access codes (current behavior)
- Rejected or unreviewed notes cannot be made public

## Feature 6: Microsoft AD Integration (Deferred)

Switch authentication from Supabase to Microsoft Entra ID (Azure AD) used by Gannon University. Pending ITS approval -- not part of current implementation scope.

## Build Order

Each layer builds on the previous:

1. **LEAD_TUTOR role** -- schema + role checks + dashboard shell
2. **Department/Course catalog** -- new tables + management UI + upload flow update
3. **Tag system** -- new tables + management UI + upload flow update
4. **Tutor review/approval** -- new table + review workflow + status display
5. **Public notes** -- isPublic flag + browse page + lead tutor toggle

## Data Flow Summary

```
Student uploads note
  -> picks Department > Course > Semester
  -> picks tags from predefined list
  -> note.status = UNREVIEWED
  -> visible to all but flagged

Tutor reviews note
  -> leaves comment + rating + decision (approve/reject/comment)
  -> first decision sets note.status

Lead tutor curates
  -> can override review decisions
  -> can mark approved notes as public (isPublic = true)
  -> manages departments, courses, tags

Students browse
  -> public notes: visible to all logged-in students
  -> non-public approved notes: access code required
  -> rejected notes: hidden (visible to uploader only)
```
