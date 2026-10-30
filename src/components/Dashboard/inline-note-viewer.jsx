'use client'
import { useEffect, useState } from "react"
import { Download, FileWarning, Loader2 } from "lucide-react"
import { useUser } from "@/contexts/AuthContext"
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'

/** Extension from the note's recorded type, falling back to the URL path. */
function extensionOf(url, fileType) {
  if (fileType) return String(fileType).replace(/^\./, '').toLowerCase()
  try {
    return new URL(url).pathname.split('.').pop().toLowerCase()
  } catch {
    return String(url).split('?')[0].split('.').pop().toLowerCase()
  }
}

/**
 * `fileType` is the extension recorded on the note at upload time. Prefer it
 * over parsing the URL: file URLs are now short-lived signed URLs whose query
 * string is a JWT, and JWTs contain dots -- so splitting the URL on "." yields
 * a chunk of the token instead of the extension.
 */
export default function InlineNoteViewer({ filePath: fileUrl, fileType, allowDownload = true }) {
  const { role } = useUser()
  const isPrivileged = ['ADMIN', 'LEAD_TUTOR', 'STEMPASS_TUTOR'].includes(role)
  // Allow download if explicitly allowed (for own notes) or if privileged
  const canDownload = allowDownload || isPrivileged
  const [wordHtml, setWordHtml] = useState(null)
  const [excelHtml, setExcelHtml] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [fileBlobUrl, setFileBlobUrl] = useState(null)

  // Clean up blob URLs
  useEffect(() => {
    return () => {
      if (fileBlobUrl) {
        URL.revokeObjectURL(fileBlobUrl)
      }
    }
  }, [fileBlobUrl])

  // Convert Word/Excel files for preview
  useEffect(() => {
    if (!fileUrl) return

    const fileExtension = extensionOf(fileUrl, fileType)

    // Fetch and convert Word documents
    if (fileExtension === 'docx' || fileExtension === 'doc') {
      setIsConverting(true)
      fetch(fileUrl)
        .then(res => res.arrayBuffer())
        .then(async (arrayBuffer) => {
          if (fileExtension === 'docx') {
            try {
              const result = await mammoth.convertToHtml({ arrayBuffer })
              setWordHtml(result.value)
            } catch (err) {
              console.error('Word conversion error:', err)
            }
          }
          setIsConverting(false)
        })
        .catch(err => {
          console.error('Error fetching Word file:', err)
          setIsConverting(false)
        })
    }

    // Fetch and convert Excel files
    if (fileExtension === 'xlsx' || fileExtension === 'xls' || fileExtension === 'csv') {
      setIsConverting(true)
      fetch(fileUrl)
        .then(res => res.arrayBuffer())
        .then(async (arrayBuffer) => {
          try {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' })
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]
            const html = XLSX.utils.sheet_to_html(worksheet)
            setExcelHtml(html)
          } catch (err) {
            console.error('Excel conversion error:', err)
          }
          setIsConverting(false)
        })
        .catch(err => {
          console.error('Error fetching Excel file:', err)
          setIsConverting(false)
        })
    }

    // Create blob URL for other file types
    if (!['pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'docx', 'doc', 'xlsx', 'xls', 'csv'].includes(fileExtension)) {
      fetch(fileUrl)
        .then(res => res.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob)
          setFileBlobUrl(blobUrl)
        })
        .catch(err => console.error('Error creating blob URL:', err))
    }
  }, [fileUrl, fileType])

  if (!fileUrl) {
    return null
  }

  const fileExtension = extensionOf(fileUrl, fileType)

  const renderContent = () => {
    // PDFs
    if (fileExtension === "pdf") {
      // Without these the built-in viewer opens with the thumbnail rail
      // expanded and the page fit to height — which renders the document at
      // ~54% inside an already-narrow column. FitH fills the width instead.
      const viewerParams = "#view=FitH&navpanes=0&pagemode=none"
      return (
        <div className="relative h-full w-full">
          <embed
            src={`${fileUrl}${viewerParams}`}
            type="application/pdf"
            className="h-full w-full rounded-md"
          />
          {canDownload && (
            <a
              href={fileUrl}
              download
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-md border border-border bg-card/95 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          )}
        </div>
      )
    }

    // Images
    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(fileExtension)) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 relative rounded-lg">
          <img
            src={fileUrl}
            alt="Note preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          {canDownload && (
            <a
              href={fileUrl}
              download
              className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 rounded-md border border-border bg-card/95 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          )}
        </div>
      )
    }

    // Word documents
    if (fileExtension === 'docx' || fileExtension === 'doc') {
      if (isConverting) {
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )
      }

      if (fileExtension === 'doc') {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 text-center rounded-lg">
            <FileWarning className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold">
              Legacy .doc format not supported
            </h3>
            <p className="text-muted-foreground mt-2">
              Please convert to .docx format for preview.
            </p>
            {canDownload && (
              <a
                href={fileUrl}
                download
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="w-5 h-5" />
                Download File
              </a>
            )}
          </div>
        )
      }

      if (wordHtml) {
        return (
          <div className="w-full h-full overflow-auto p-6 bg-white dark:bg-gray-950 relative rounded-lg border">
            {canDownload && (
              <a
                href={fileUrl}
                download
                className="sticky top-4 float-right z-10 inline-flex items-center gap-2 rounded-md border border-border bg-card/95 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent mb-4"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: wordHtml }}
              style={{
                maxWidth: '100%',
                margin: '0 auto',
                fontFamily: 'Times New Roman, serif',
                fontSize: '11pt',
                lineHeight: '1.5',
              }}
            />
          </div>
        )
      }
    }

    // Excel files
    if (fileExtension === 'xlsx' || fileExtension === 'xls' || fileExtension === 'csv') {
      if (isConverting) {
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )
      }

      if (excelHtml) {
        return (
          <div className="w-full h-full overflow-auto p-6 bg-white dark:bg-gray-950 relative rounded-lg border">
            {canDownload && (
              <a
                href={fileUrl}
                download
                className="sticky top-4 float-right z-10 inline-flex items-center gap-2 rounded-md border border-border bg-card/95 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent mb-4"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: excelHtml }}
              style={{
                margin: '0 auto',
                fontFamily: 'Arial, sans-serif',
                fontSize: '11pt',
              }}
            />
          </div>
        )
      }
    }

    // Text files
    if (['txt', 'md', 'json', 'js', 'ts', 'html', 'css', 'xml'].includes(fileExtension)) {
      return (
        <div className="w-full h-full flex flex-col rounded-lg border overflow-hidden">
          {canDownload && (
            <div className="p-3 border-b bg-gray-50 dark:bg-gray-900">
              <a
                href={fileUrl}
                download
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          )}
          <iframe
            src={fileUrl}
            className="w-full flex-1 border-0"
            title="Text file preview"
          />
        </div>
      )
    }

    // Other file types - try to display with blob URL or show download
    if (fileBlobUrl) {
      return (
        <div className="w-full h-full flex flex-col rounded-lg border overflow-hidden">
          {canDownload && (
            <div className="p-3 border-b bg-gray-50 dark:bg-gray-900">
              <a
                href={fileUrl}
                download
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          )}
          <object
            data={fileBlobUrl}
            type="application/octet-stream"
            className="w-full flex-1"
          >
            <iframe
              src={fileBlobUrl}
              className="w-full flex-1 border-0"
            />
          </object>
        </div>
      )
    }

    // Fallback - show download option
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 text-center rounded-lg">
        <FileWarning className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold">
          Preview not available
        </h3>
        <p className="text-muted-foreground mt-2">
          This file type ({fileExtension}) cannot be previewed directly.
        </p>
        <a
          href={fileUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Download className="w-5 h-5" />
          Download File
        </a>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-background rounded-lg overflow-hidden border shadow-sm">
      {renderContent()}
    </div>
  )
}
