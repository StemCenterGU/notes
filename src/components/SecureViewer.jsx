'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Clock, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'

export default function SecureViewer({ token, noteId, onExpire }) {
  const router = useRouter()
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isBlurred, setIsBlurred] = useState(false)
  const [remainingTime, setRemainingTime] = useState(null)
  const [watermark, setWatermark] = useState(null)
  const [wordHtml, setWordHtml] = useState(null)
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null)
  const [excelHtml, setExcelHtml] = useState(null)
  const [otherFileBlobUrl, setOtherFileBlobUrl] = useState(null)

  // Fetch protected content
  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/access-codes/view/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const data = await res.json()
        if (res.status === 403 || res.status === 401) {
          onExpire?.(data.error)
          return
        }
        setError(data.error || 'Failed to load content')
        return
      }

      const data = await res.json()
      setContent(data)
      setWatermark(data.watermark)
      setRemainingTime(data.remainingSeconds)

      // Create blob URL for PDFs (Chrome blocks data URLs in iframes)
      if (data.mimeType === 'application/pdf') {
        try {
          const binaryString = atob(data.content)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          const blob = new Blob([bytes], { type: 'application/pdf' })
          const blobUrl = URL.createObjectURL(blob)
          setPdfBlobUrl(blobUrl)
        } catch (pdfError) {
          console.error('Error creating PDF blob:', pdfError)
          setError('Failed to load PDF')
        }
      }

      // Convert Word documents to HTML
      if (data.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
          data.mimeType === 'application/msword') {
        try {
          // Convert base64 to ArrayBuffer
          const binaryString = atob(data.content)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          const arrayBuffer = bytes.buffer

          // Convert .docx to HTML using mammoth
          if (data.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.convertToHtml({ arrayBuffer })
            setWordHtml(result.value)
          } else {
            // .doc files are not supported by mammoth, show message
            setWordHtml(null)
            setError('Legacy .doc format is not supported. Please convert to .docx format.')
          }
        } catch (wordError) {
          console.error('Error converting Word document:', wordError)
          setError('Failed to convert Word document for preview')
        }
      }

      // Convert Excel files to HTML
      if (data.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          data.mimeType === 'application/vnd.ms-excel' ||
          data.mimeType === 'text/csv') {
        try {
          // Convert base64 to ArrayBuffer
          const binaryString = atob(data.content)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          const arrayBuffer = bytes.buffer

          // Read Excel file
          const workbook = XLSX.read(arrayBuffer, { type: 'array' })
          
          // Convert first sheet to HTML
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const html = XLSX.utils.sheet_to_html(worksheet)
          
          setExcelHtml(html)
        } catch (excelError) {
          console.error('Error converting Excel file:', excelError)
          setError('Failed to convert Excel file for preview')
        }
      }

      // For other file types, create blob URL for preview
      if (!data.mimeType?.startsWith('image/') && 
          data.mimeType !== 'application/pdf' &&
          data.mimeType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
          data.mimeType !== 'application/msword' &&
          data.mimeType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
          data.mimeType !== 'application/vnd.ms-excel' &&
          data.mimeType !== 'text/csv') {
        try {
          const binaryString = atob(data.content)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          const blob = new Blob([bytes], { type: data.mimeType })
          const blobUrl = URL.createObjectURL(blob)
          setOtherFileBlobUrl(blobUrl)
        } catch (blobError) {
          console.error('Error creating blob URL:', blobError)
        }
      }
    } catch (err) {
      setError('Failed to load content')
    } finally {
      setIsLoading(false)
    }
  }, [noteId, token, onExpire])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  // Heartbeat every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/access-codes/heartbeat', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const data = await res.json()
          onExpire?.(data.error)
          return
        }

        const data = await res.json()
        setRemainingTime(data.remainingSeconds)
      } catch (err) {
        console.error('Heartbeat failed:', err)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [token, onExpire])

  // Countdown timer
  useEffect(() => {
    if (remainingTime === null) return

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          onExpire?.('Session expired')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [remainingTime, onExpire])

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl)
      }
      if (otherFileBlobUrl) {
        URL.revokeObjectURL(otherFileBlobUrl)
      }
    }
  }, [pdfBlobUrl, otherFileBlobUrl])

  // Disable copy/paste/screenshot/download
  useEffect(() => {
    const prevent = (e) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    // Disable right-click
    document.addEventListener('contextmenu', prevent, { capture: true })
    // Disable copy
    document.addEventListener('copy', prevent, { capture: true })
    // Disable cut
    document.addEventListener('cut', prevent, { capture: true })
    // Disable paste
    document.addEventListener('paste', prevent, { capture: true })
    // Disable text selection
    document.addEventListener('selectstart', prevent, { capture: true })
    // Disable drag
    document.addEventListener('dragstart', prevent, { capture: true })
    // Disable drop
    document.addEventListener('drop', prevent, { capture: true })
    // Disable drag over
    document.addEventListener('dragover', prevent, { capture: true })

    // Block keyboard shortcuts
    const blockKeys = (e) => {
      // Ctrl+S (Save), Ctrl+P (Print), Ctrl+C (Copy), Ctrl+U (View Source)
      // Ctrl+Shift+I (DevTools), Ctrl+Shift+C (Inspect), Ctrl+A (Select All)
      // F12 (DevTools), PrintScreen, Windows+Shift+S (Snipping Tool)
      if (
        (e.ctrlKey && ['s', 'p', 'c', 'u', 'a'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ['i', 'c'].includes(e.key.toLowerCase())) ||
        (e.metaKey && ['s', 'p', 'c'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        e.key === 'PrintScreen' ||
        e.key === 'F11' ||
        (e.key === 's' && e.shiftKey && (e.metaKey || e.ctrlKey)) // Windows+Shift+S
      ) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }
    document.addEventListener('keydown', blockKeys, { capture: true })

    // Prevent screenshot on mobile devices
    const preventMobileScreenshot = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault()
        return false
      }
    }
    document.addEventListener('touchstart', preventMobileScreenshot, { capture: true })
    document.addEventListener('touchmove', preventMobileScreenshot, { capture: true })

    // Disable print
    window.addEventListener('beforeprint', prevent)
    window.addEventListener('afterprint', prevent)

    return () => {
      document.removeEventListener('contextmenu', prevent, { capture: true })
      document.removeEventListener('copy', prevent, { capture: true })
      document.removeEventListener('cut', prevent, { capture: true })
      document.removeEventListener('paste', prevent, { capture: true })
      document.removeEventListener('selectstart', prevent, { capture: true })
      document.removeEventListener('dragstart', prevent, { capture: true })
      document.removeEventListener('drop', prevent, { capture: true })
      document.removeEventListener('dragover', prevent, { capture: true })
      document.removeEventListener('keydown', blockKeys, { capture: true })
      document.removeEventListener('touchstart', preventMobileScreenshot, { capture: true })
      document.removeEventListener('touchmove', preventMobileScreenshot, { capture: true })
      window.removeEventListener('beforeprint', prevent)
      window.removeEventListener('afterprint', prevent)
    }
  }, [])

  // Blur on tab switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsBlurred(document.hidden)
    }

    const handleBlur = () => setIsBlurred(true)
    const handleFocus = () => setIsBlurred(false)

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-red-600">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (!content) return null

    const dataUrl = `data:${content.mimeType};base64,${content.content}`

    // Render based on file type
    if (content.mimeType?.startsWith('image/')) {
      return (
        <img
          src={dataUrl}
          alt={content.title}
          className="max-w-full max-h-full object-contain"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            pointerEvents: 'auto',
          }}
        />
      )
    }

    if (content.mimeType === 'application/pdf') {
      // For PDFs, use blob URL instead of data URL to avoid Chrome blocking
      if (!pdfBlobUrl) {
        return (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )
      }
      
      return (
        <object
          data={`${pdfBlobUrl}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-fit`}
          type="application/pdf"
          className="w-full h-full"
          style={{ 
            border: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <iframe
            src={`${pdfBlobUrl}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-fit`}
            className="w-full h-full"
            style={{ 
              border: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </object>
      )
    }

    // Word documents (.docx) - converted to HTML
    if (content.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        content.mimeType === 'application/msword') {
      if (content.mimeType === 'application/msword') {
        // Legacy .doc format not supported
        return (
          <div className="text-center text-muted-foreground p-8">
            <p className="mb-2">Legacy .doc format is not supported.</p>
            <p className="text-sm">Please convert to .docx format.</p>
          </div>
        )
      }
      
      if (!wordHtml) {
        return (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )
      }
      return (
        <div 
          className="w-full h-full overflow-auto p-8 bg-white dark:bg-gray-900"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
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

    // Excel files (.xlsx, .xls, .csv) - converted to HTML table
    if (content.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        content.mimeType === 'application/vnd.ms-excel' ||
        content.mimeType === 'text/csv') {
      if (!excelHtml) {
        return (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )
      }
      
      return (
        <div 
          className="w-full h-full overflow-auto p-8 bg-white dark:bg-gray-900"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
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

    // PowerPoint files - try to display as object/iframe
    if (content.mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        content.mimeType === 'application/vnd.ms-powerpoint') {
      if (otherFileBlobUrl) {
        return (
          <iframe
            src={otherFileBlobUrl}
            className="w-full h-full"
            style={{ 
              border: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
            onContextMenu={(e) => e.preventDefault()}
          />
        )
      }
    }

    // Text files - display as text
    if (content.mimeType?.startsWith('text/')) {
      try {
        const textContent = atob(content.content)
        return (
          <div 
            className="w-full h-full overflow-auto p-8 bg-white dark:bg-gray-900 font-mono text-sm"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              whiteSpace: 'pre-wrap',
            }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          >
            {textContent}
          </div>
        )
      } catch (textError) {
        // Fall through to generic handler
      }
    }

    // For other file types, try to display using blob URL or object tag
    if (otherFileBlobUrl) {
      return (
        <object
          data={otherFileBlobUrl}
          type={content.mimeType}
          className="w-full h-full"
          style={{ 
            border: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <iframe
            src={otherFileBlobUrl}
            className="w-full h-full"
            style={{ 
              border: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </object>
      )
    }

    // Fallback for unsupported types
    return (
      <div className="text-center text-muted-foreground p-8">
        <p className="mb-2">Preview not available for this file type.</p>
        <p className="text-sm">File: {content.title}</p>
        <p className="text-xs mt-2">Type: {content.mimeType || content.fileType}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Timer */}
      <div className="absolute top-4 right-4 z-40 bg-background/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
        <Clock className="h-4 w-4" />
        <span className={`font-mono ${remainingTime < 60 ? 'text-red-600' : ''}`}>
          {formatTime(remainingTime || 0)}
        </span>
      </div>

      {/* Blur overlay when tab is inactive */}
      {isBlurred && (
        <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center">
            <EyeOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Content Hidden</h2>
            <p className="text-muted-foreground">Click here to view the notes</p>
          </div>
        </div>
      )}

      {/* Watermark overlay */}
      {watermark && (
        <div
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
          style={{ opacity: 0.15 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 100px,
                transparent 100px,
                transparent 200px
              )`,
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-sm font-mono whitespace-nowrap"
                style={{
                  transform: 'rotate(-30deg)',
                  left: `${(i % 5) * 25 - 10}%`,
                  top: `${Math.floor(i / 5) * 25}%`,
                }}
              >
                {watermark.email} | {watermark.code} | {new Date(watermark.timestamp).toLocaleTimeString()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div 
        className="h-full flex items-center justify-center p-4 select-none"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserDrag: 'none',
          KhtmlUserSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        {renderContent()}
      </div>
    </div>
  )
}
