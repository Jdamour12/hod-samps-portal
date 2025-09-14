"use client"

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2 } from 'lucide-react'
import { type ExcelSheetData } from '@/lib/api-grading'

/**
 * Enhanced Excel Preview Table Component
 * 
 * Features:
 * - Full support for merged cells with rowspan and colspan
 * - Rich cell styling preservation (fonts, colors, alignment, borders)
 * - Performance optimized with memoized lookups
 * - Maintains original blue theme (#026892)
 * - Proper cell skipping for merged ranges
 * - Excel-like appearance and behavior
 */

interface ExcelPreviewTableProps {
  data: ExcelSheetData[]
  onDownload?: () => void
  isDownloadLoading?: boolean
}

export function ExcelPreviewTable({ 
  data, 
  onDownload, 
  isDownloadLoading = false 
}: ExcelPreviewTableProps) {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentSheet = data[currentSheetIndex]
  
  if (!currentSheet) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">No data available to preview</p>
        </CardContent>
      </Card>
    )
  }

  // Show all rows without pagination
  const visibleRows = currentSheet.rows

  // Memoize merged cells lookup for performance
  const mergedCellsLookup = React.useMemo(() => {
    const lookup = new Map<string, {
      startRow: number
      startCol: number
      endRow: number
      endCol: number
      value: any
    }>()
    
    if (currentSheet.mergedCells) {
      currentSheet.mergedCells.forEach(merge => {
        for (let row = merge.startRow; row <= merge.endRow; row++) {
          for (let col = merge.startCol; col <= merge.endCol; col++) {
            lookup.set(`${row}-${col}`, merge)
          }
        }
      })
    }
    
    return lookup
  }, [currentSheet.mergedCells])

  return (
    <>
      <style jsx>{`
        .excel-preview-table {
          scrollbar-width: auto;
          scrollbar-color: #3b82f6 #e5e7eb;
        }
        .excel-preview-table::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        .excel-preview-table::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 6px;
        }
        .excel-preview-table::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 6px;
          border: 2px solid #e5e7eb;
        }
        .excel-preview-table::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
        .excel-preview-table::-webkit-scrollbar-corner {
          background: #e5e7eb;
        }
      `}</style>
    <Card className={isExpanded ? "fixed inset-4 z-50 bg-white shadow-2xl" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gray-50 border-b">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-[#026892]">
            <div className="w-6 h-6 bg-[#026892] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">X</span>
            </div>
            Excel Preview
            <Badge variant="outline" className="bg-gray-100 text-[#026892] border-[#026892]">
              {currentSheet.totalRows} rows
            </Badge>
          </CardTitle>
          <CardDescription className="text-[#026892]">
            Sheet: <span className="font-medium">{currentSheet.sheetName}</span> • 
            Columns: <span className="font-medium">{currentSheet.headers.length}</span>
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {onDownload && (
            <Button
              size="sm"
              onClick={onDownload}
              disabled={isDownloadLoading}
              className="bg-[#026892] hover:bg-[#025f7f] flex items-center gap-2"
            >
              <Download className="h-4 w-4 mr-1" />
              {isDownloadLoading ? 'Downloading...' : 'Download'}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Sheet Tabs */}
        {data.length > 1 && (
          <div className="flex gap-1 flex-wrap border-b-2 border-gray-300 pb-0 bg-gray-100 p-2 rounded-t-md">
            {data.map((sheet, index) => (
              <Button
                key={index}
                variant={index === currentSheetIndex ? "default" : "ghost"}
                size="sm"
                className={`
                  rounded-t-md rounded-b-none border-b-0 px-3 py-1 text-xs font-medium
                  ${index === currentSheetIndex 
                    ? 'bg-white text-[#026892] border border-gray-300 border-b-white shadow-sm' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 border border-transparent'
                  }
                `}
                onClick={() => {
                  setCurrentSheetIndex(index)
                }}
              >
                {sheet.sheetName}
                <Badge 
                  variant={index === currentSheetIndex ? "outline" : "secondary"} 
                  className={`ml-2 text-xs ${
                    index === currentSheetIndex 
                      ? 'bg-gray-100 text-[#026892] border-[#026892]' 
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {sheet.totalRows}
                </Badge>
              </Button>
            ))}
          </div>
        )}

        {/* Table */}
          <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className={`excel-preview-table ${isExpanded ? "h-[calc(100vh-16rem)]" : "h-96"} overflow-auto`}>
            <Table className="border-collapse w-full table-auto" style={{ minWidth: '600px', fontSize: '13px' }}>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-300">
                  <TableHead className="w-16 text-center bg-gray-100 border-r border-gray-300 font-semibold text-gray-700 p-2 sticky left-0 z-10">
                    #
                  </TableHead>
                  {currentSheet.headers.map((header, index) => {
                    // Check if we have styled header data from first row
                    const headerData = currentSheet.rows.length > 0 && currentSheet.rows[0] && currentSheet.rows[0][index] 
                      ? currentSheet.rows[0][index] 
                      : null
                    
                    const headerValue = headerData && typeof headerData === 'object' && 'value' in headerData
                      ? headerData.value 
                      : header
                    const headerStyling = headerData && typeof headerData === 'object' && 'styling' in headerData
                      ? headerData.styling 
                      : null
                    
                    // Build header style with default centering
                    const headerStyle: React.CSSProperties = {
                      whiteSpace: headerStyling?.wrapText ? 'pre-wrap' : 'nowrap',
                      wordWrap: 'break-word',
                      minWidth: '80px',
                      maxWidth: '150px',
                      overflow: 'visible',
                      padding: '4px 8px',
                      verticalAlign: 'middle',
                      textAlign: 'center' // Default center alignment for headers
                    }
                    
                    // Default header classes with center alignment
                    const headerClasses = ["bg-gray-100", "border-r", "border-gray-300", "font-semibold", "text-gray-700", "p-2", "last:border-r-0", "text-center"]
                    
                    // Initialize header spans
                    let headerRowSpan: number | undefined = undefined
                    let headerColSpan: number | undefined = undefined
                    
                    if (headerStyling) {
                      if (headerStyling.bold) headerClasses.push("font-bold")
                      if (headerStyling.italic) headerClasses.push("italic")
                      if (headerStyling.underline) headerClasses.push("underline")
                      
                      // Apply original colors from Excel
                      if (headerStyling.color) {
                        headerStyle.color = headerStyling.color
                        
                        // Remove default text color class when custom color is applied
                        // const grayIndex = headerClasses.indexOf("text-gray-700")
                        // if (grayIndex !== -1) headerClasses.splice(grayIndex, 1)
                      }
                      if (headerStyling.backgroundColor) {
                        headerStyle.backgroundColor = headerStyling.backgroundColor
                        // Remove default background class when custom background is applied
                        // const bgIndex = headerClasses.indexOf("bg-gray-100")
                        // if (bgIndex !== -1) headerClasses.splice(bgIndex, 1)
                      }
                      
                      if (headerStyling.fontSize) headerStyle.fontSize = `${headerStyling.fontSize}px`
                      if (headerStyling.fontFamily) headerStyle.fontFamily = headerStyling.fontFamily
                      
                      // Override alignment if specified in Excel, otherwise keep center
                      if (headerStyling.alignment) {
                        // Remove default center class
                        const centerIndex = headerClasses.indexOf("text-center")
                        if (centerIndex !== -1) headerClasses.splice(centerIndex, 1)
                        
                        if (headerStyling.alignment === 'center') {
                          headerClasses.push("text-center")
                          headerStyle.textAlign = 'center'
                        } else if (headerStyling.alignment === 'right') {
                          headerClasses.push("text-right")
                          headerStyle.textAlign = 'right'
                        } else if (headerStyling.alignment === 'left') {
                          headerClasses.push("text-left")
                          headerStyle.textAlign = 'left'
                        }
                      }
                      
                      if (headerStyling.border) {
                        headerStyle.border = headerStyling.border
                      }
                      
                      // Handle merged header cells
                      if (headerStyling.merged && headerStyling.mergeRange) {
                        const [startRow, startCol, endRow, endCol] = headerStyling.mergeRange
                        const calculatedRowSpan = endRow - startRow + 1
                        const calculatedColSpan = endCol - startCol + 1
                        
                        // Only apply spans if they are greater than 1
                        if (calculatedRowSpan > 1) headerRowSpan = calculatedRowSpan
                        if (calculatedColSpan > 1) headerColSpan = calculatedColSpan
                        
                        // Center content for merged header cells (rowspan and colspan)
                        if (headerRowSpan && headerRowSpan > 1 || headerColSpan && headerColSpan > 1) {
                          // Remove any existing alignment classes
                          const alignmentClasses = ['text-left', 'text-right', 'text-center']
                          alignmentClasses.forEach(alignClass => {
                            const index = headerClasses.indexOf(alignClass)
                            if (index !== -1) headerClasses.splice(index, 1)
                          })
                          
                          // Add center alignment for merged header cells
                          headerClasses.push("text-center")
                          headerStyle.textAlign = 'center'
                          headerStyle.verticalAlign = 'middle'
                        }
                      }
                    }
                    
                    return (
                      <TableHead 
                        key={index} 
                        className={headerClasses.join(" ")}
                        style={headerStyle}
                        rowSpan={headerRowSpan}
                        colSpan={headerColSpan}
                      >
                        {headerValue || `Column ${String.fromCharCode(65 + index)}`}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleRows.map((row, rowIndex) => {
                  const actualRowIndex = rowIndex
                  
                  return (
                    <TableRow 
                      key={actualRowIndex}
                      className={`border-b border-gray-200 hover:bg-blue-50 ${
                        actualRowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'
                      }`}
                      style={{ height: '32px' }}
                    >
                      <TableCell className="text-center font-mono text-xs text-gray-500 bg-gray-50 border-r border-gray-200 p-2 font-medium sticky left-0 z-10">
                        {actualRowIndex + 2}
                      </TableCell>
                      {row.map((cell, cellIndex) => {
                        // Check if this cell should be skipped due to being part of a merged range
                        // (but not the top-left cell of the range)
                        const mergeInfo = mergedCellsLookup.get(`${actualRowIndex + 1}-${cellIndex}`)
                        const isTopLeftOfMerge = mergeInfo && 
                          actualRowIndex + 1 === mergeInfo.startRow && 
                          cellIndex === mergeInfo.startCol
                        
                        // Skip if part of merge but not top-left
                        if (mergeInfo && !isTopLeftOfMerge) {
                          return null
                        }
                        
                        // Skip rendering if cell is null (merged cell continuation or empty cell)
                        if (cell === null) {
                          return (
                            <TableCell 
                              key={cellIndex} 
                              className="border-r border-gray-200 p-1 last:border-r-0" 
                              style={{ minWidth: '50px', height: '32px' }}
                            />
                          )
                        }
                        
                        // Handle both old format (simple values) and new format (cell objects with styling)
                        const cellValue = cell && typeof cell === 'object' && 'value' in cell ? cell.value : cell
                        const styling = cell && typeof cell === 'object' && 'styling' in cell ? cell.styling : null
                        
                        // Build style object for the cell
                        const cellStyle: React.CSSProperties = {
                          whiteSpace: styling?.wrapText ? 'pre-wrap' : 'nowrap',
                          wordWrap: 'break-word',
                          minWidth: '80px',
                          maxWidth: '150px',
                          overflow: 'visible',
                          padding: '4px 8px',
                          verticalAlign: 'middle'
                        }
                        const cellClasses = ["border-r", "border-gray-200", "p-2", "last:border-r-0", "text-sm"]
                        
                        // Initialize rowspan and colspan
                        let rowSpan: number | undefined = undefined
                        let colSpan: number | undefined = undefined
                        
                        if (styling) {
                          // Apply font styling
                          if (styling.bold) cellClasses.push("font-bold")
                          if (styling.italic) cellClasses.push("italic")
                          if (styling.underline) cellClasses.push("underline")
                          
                          // Apply colors
                          if (styling.color) cellStyle.color = styling.color
                          if (styling.backgroundColor) cellStyle.backgroundColor = styling.backgroundColor
                          
                          // Apply font size and family
                          if (styling.fontSize) cellStyle.fontSize = `${styling.fontSize}px`
                          if (styling.fontFamily) cellStyle.fontFamily = styling.fontFamily
                          
                          // Apply alignment
                          if (styling.alignment) {
                            if (styling.alignment === 'center') cellClasses.push("text-center")
                            else if (styling.alignment === 'right') cellClasses.push("text-right")
                            else if (styling.alignment === 'left') cellClasses.push("text-left")
                          }
                          
                          // Apply border
                          if (styling.border) {
                            cellStyle.border = styling.border
                          }
                          
                          // Handle merged cells - calculate rowspan and colspan
                          if (styling.merged && styling.mergeRange) {
                            const [startRow, startCol, endRow, endCol] = styling.mergeRange
                            const calculatedRowSpan = endRow - startRow + 1
                            const calculatedColSpan = endCol - startCol + 1
                            
                            // Only apply spans if they are greater than 1
                            if (calculatedRowSpan > 1) rowSpan = calculatedRowSpan
                            if (calculatedColSpan > 1) colSpan = calculatedColSpan
                            
                            // Center content for merged cells (rowspan and colspan)
                            if (rowSpan && rowSpan > 1 || colSpan && colSpan > 1) {
                              // Remove any existing alignment classes
                              const alignmentClasses = ['text-left', 'text-right', 'text-center']
                              alignmentClasses.forEach(alignClass => {
                                const index = cellClasses.indexOf(alignClass)
                                if (index !== -1) cellClasses.splice(index, 1)
                              })
                              
                              // Add center alignment for merged cells
                              cellClasses.push("text-center")
                              cellStyle.textAlign = 'center'
                              cellStyle.verticalAlign = 'middle'
                            }
                          }
                        }
                        
                        return (
                          <TableCell 
                            key={cellIndex} 
                            className={cellClasses.join(" ")}
                            style={cellStyle}
                            rowSpan={rowSpan}
                            colSpan={colSpan}
                          >
                            <div 
                              className="break-words" 
                              title={String(cellValue || '')}
                              style={{ 
                                maxHeight: styling?.wrapText ? 'none' : '1.5em',
                                lineHeight: '1.5em',
                                minHeight: '20px',
                                // Center content for merged cells
                                display: (rowSpan && rowSpan > 1) || (colSpan && colSpan > 1) ? 'flex' : 'block',
                                alignItems: (rowSpan && rowSpan > 1) || (colSpan && colSpan > 1) ? 'center' : 'flex-start',
                                justifyContent: (rowSpan && rowSpan > 1) || (colSpan && colSpan > 1) ? 'center' : 'flex-start'
                              }}
                            >
                              {(() => {
                                if (cellValue === null || cellValue === undefined || cellValue === '') {
                                  return <span className="text-transparent select-none">.</span>
                                }
                                
                                // Use the original styling color if available, otherwise use default colors
                                const textColor = styling?.color || 'inherit'
                                
                                // Check if this is a merged cell for special alignment handling
                                const isMergedCell = (rowSpan && rowSpan > 1) || (colSpan && colSpan > 1)
                                
                                if (typeof cellValue === 'number') {
                                  return (
                                    <span 
                                      className={isMergedCell ? "block font-mono text-center" : "text-right block font-mono"} 
                                      style={{ color: textColor }}
                                    >
                                      {cellValue.toLocaleString()}
                                    </span>
                                  )
                                }
                                if (typeof cellValue === 'boolean') {
                                  return (
                                    <span 
                                      className="text-center block font-medium" 
                                      style={{ color: textColor }}
                                    >
                                      {cellValue ? 'TRUE' : 'FALSE'}
                                    </span>
                                  )
                                }
                                const stringValue = String(cellValue).trim()
                                if (stringValue === '') {
                                  return <span className="text-transparent select-none">.</span>
                                }
                                return (
                                  <span 
                                    className={isMergedCell ? "text-center" : ""}
                                    style={{ color: textColor }}
                                  >
                                    {stringValue}
                                  </span>
                                )
                              })()}
                            </div>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Statistics */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t text-sm bg-[#f0f9ff] p-3 rounded-b-md">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Sheets:</span>
            <span className="font-semibold text-[#026892]">{data.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Current:</span>
            <span className="font-semibold text-[#026892]">{currentSheet.sheetName}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Columns:</span>
            <span className="font-semibold text-[#026892]">{currentSheet.headers.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Total Rows:</span>
            <span className="font-semibold text-[#026892]">{currentSheet.totalRows}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  )
}