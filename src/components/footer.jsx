export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} GUNotes. All Rights Reserved.</p>
        <p className="text-sm text-muted-foreground mt-2">
          A community project for Gannon University students.
        </p>
      </div>
    </footer>
  )
}
