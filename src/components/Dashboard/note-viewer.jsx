'use client'
import { useEffect, useState } from "react"
import { X, Download, FileWarning, Loader2 } from "lucide-react"
import { useUser } from "@/contexts/AuthContext"
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'

export default function NoteViewer({ filePath: fileUrl, onClose, allowDownload = true }) {
  const { role } = useUser()
  const isAdmin = role === 'ADMIN'
  // Allow download if explicitly allowed (for own notes) or if admin
  const canDownload = allowDownload || isAdmin
  const [wordHtml, setWordHtml] = useState(null)
  const [excelHtml, setExcelHtml] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [fileBlobUrl, setFileBlobUrl] = useState(null)

  // Prevent background scrolling when the viewer is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
      if (fileBlobUrl) {
        URL.revokeObjectURL(fileBlobUrl)
      }
    }
  }, [fileBlobUrl])

  // Convert Word/Excel files for preview
  useEffect(() => {
    if (!fileUrl) return

    const fileExtension = fileUrl.split(".").pop().toLowerCase()
    
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
  }, [fileUrl])

  if (!fileUrl) {
    return null
  }

  const fileExtension = fileUrl.split(".").pop().toLowerCase()

  const renderContent = () => {
    // PDFs
    if (fileExtension === "pdf") {
      return (
        <div className="w-full h-full relative">
          <embed
            src={fileUrl}
            type="application/pdf"
            className="w-full h-full"
          />
          {canDownload && (
            <a
              href={fileUrl}
              download
              className="absolute top-4 right-16 z-10 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download
            </a>
          )}
        </div>
      )
    }
    
    // Images
    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(fileExtension)) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4 relative">
          <img
            src={fileUrl}
            alt="Note preview"
            className="max-w-full max-h-full object-contain"
          />
          {canDownload && (
            <a
              href={fileUrl}
              download
              className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
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
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )
      }
      
      if (fileExtension === 'doc') {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
            <FileWarning className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Legacy .doc format not supported
            </h3>
            <p className="text-gray-600 mt-2">
              Please convert to .docx format for preview.
            </p>
            {canDownload && (
              <a
                href={fileUrl}
                download
                className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
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
          <div className="w-full h-full overflow-auto p-8 bg-white relative">
            {canDownload && (
              <a
                href={fileUrl}
                download
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download
              </a>
            )}
            <div 
              dangerouslySetInnerHTML={{ __html: wordHtml }}
              style={{
                maxWidth: '8.5in',
                margin: '0 auto',
                fontFamily: 'Times New Roman, serif',
                fontSize: '12pt',
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
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )
      }

      if (excelHtml) {
        return (
          <div className="w-full h-full overflow-auto p-8 bg-white relative">
            {canDownload && (
              <a
                href={fileUrl}
                download
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download
              </a>
            )}
            <div 
              dangerouslySetInnerHTML={{ __html: excelHtml }}
              style={{
                margin: '0 auto',
                fontFamily: 'Arial, sans-serif',
                fontSize: '12pt',
              }}
            />
          </div>
        )
      }
    }

    // Text files
    if (['txt', 'md', 'json', 'js', 'ts', 'html', 'css', 'xml'].includes(fileExtension)) {
      return (
        <div className="w-full h-full flex flex-col">
          {canDownload && (
            <div className="p-4 border-b bg-gray-50">
              <a
                href={fileUrl}
                download
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5" />
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
        <div className="w-full h-full flex flex-col">
          {canDownload && (
            <div className="p-4 border-b bg-gray-50">
              <a
                href={fileUrl}
                download
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5" />
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
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
        <FileWarning className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800">
          Preview not available
        </h3>
        <p className="text-gray-600 mt-2">
          This file type ({fileExtension}) cannot be previewed directly.
        </p>
        <a
          href={fileUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download File
        </a>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 p-2 rounded-full transition-all shadow-sm"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {renderContent()}
      </div>
    </div>
  )
}
