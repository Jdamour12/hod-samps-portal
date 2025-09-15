"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExcelPreviewTable } from '@/components/ui/excel-preview-table'
import { Download, FileSpreadsheet, AlertCircle, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { 
  generateYearSummarySheet, 
  generateSummarySheetForPreview,
  fetchAndParseSummarySheet
} from '@/lib/api-summary'
import { type SummarySheetResponse } from '@/lib/api-summary'

interface SummarySheetInfo {
  yearId: string
  groupId: string
  filename?: string
  lastModified?: Date
  size?: number
}

interface SummaryPageProps {
  groupId?: string
  academicYearId?: string
}

export default function SummaryPage({ groupId, academicYearId }: SummaryPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [sheetInfo, setSheetInfo] = useState<SummarySheetInfo>({
    yearId: academicYearId || '',
    groupId: groupId || ''
  })
  const [error, setError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info")
  const { toast } = useToast()

  // Function to fetch the Excel sheet info
  const fetchSheetInfo = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!sheetInfo.yearId || !sheetInfo.groupId) {
        throw new Error('Academic Year ID and Group ID are required for summary sheet generation.')
      }
      
      const { blob, filename } = await generateSummarySheetForPreview(sheetInfo.yearId, sheetInfo.groupId)
      
      // Update sheet info with fetched data
      setSheetInfo(prev => ({
        ...prev,
        filename,
        size: blob.size,
        lastModified: new Date()
      }))

      toast({
        title: "Sheet Info Updated",
        description: "Successfully fetched summary sheet information.",
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadPreview = async () => {
    setIsPreviewLoading(true)
    setError(null)

    try {
      if (!sheetInfo.yearId || !sheetInfo.groupId) {
        throw new Error('Academic Year ID and Group ID are required for summary sheet generation.')
      }
      
      const previewData = await fetchAndParseSummarySheet(sheetInfo.yearId, sheetInfo.groupId)
      setPreviewData(previewData)
      
      // Update sheet info with preview data
      setSheetInfo(prev => ({
        ...prev,
        filename: previewData.filename,
        size: previewData.fileSize,
        lastModified: new Date()
      }))

      toast({
        title: "Preview Loaded",
        description: "Summary sheet preview loaded successfully.",
      })

      // Switch to preview tab automatically
      setActiveTab("preview")

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Preview Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsPreviewLoading(false)
    }
  }

  // Load preview automatically when component mounts (if we have required data)
  useEffect(() => {
    if (sheetInfo.yearId && sheetInfo.groupId) {
      // Try to load preview automatically; errors are handled inside loadPreview
      void loadPreview()
    }
  }, [])

  // Function to download the Excel sheet
  const downloadSheet = async () => {
    setIsDownloading(true)
    setError(null)

    try {
      if (!sheetInfo.yearId || !sheetInfo.groupId) {
        throw new Error('Academic Year ID and Group ID are required for summary sheet generation.')
      }
      
      await generateYearSummarySheet(sheetInfo.yearId, sheetInfo.groupId)
      
      toast({
        title: "Download Started",
        description: "Excel summary sheet is being downloaded.",
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Download Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  // Show validation message if no real data is provided
  if (!groupId || !academicYearId) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Real Group Data Required</h3>
                  <p className="text-sm mt-1">
                    Please navigate from the main classes page to load real group and academic year information.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
      <div>
        
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "info" | "preview")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Sheet Information</TabsTrigger>
            <TabsTrigger value="preview" disabled={!previewData}>
              Excel Preview {previewData && (
                <Badge variant="secondary" className="ml-2">
                  {previewData.sheets.length} sheets
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="">
          {/* Sheet Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                Summary Sheet Information
              </CardTitle>
              <CardDescription>
                Academic year summary sheet details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {sheetInfo.filename && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Filename</label>
                    <p className="text-sm text-gray-900">{sheetInfo.filename}</p>
                  </div>
                  {sheetInfo.size && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">File Size</label>
                      <p className="text-sm text-gray-900">{(sheetInfo.size / 1024).toFixed(1)} KB</p>
                    </div>
                  )}
                  {sheetInfo.lastModified && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Modified</label>
                      <p className="text-sm text-gray-900">{sheetInfo.lastModified.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Academic Year ID</label>
                  <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                    {sheetInfo.yearId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Group ID</label>
                  <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                    {sheetInfo.groupId}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button 
                  onClick={fetchSheetInfo}
                  disabled={isLoading}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  {isLoading ? 'Updating...' : 'Refresh Info'}
                </Button>
                
                <Button 
                  onClick={loadPreview}
                  disabled={isPreviewLoading}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isPreviewLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="h-4 w-4" />
                  )}
                  {isPreviewLoading ? 'Loading Preview...' : 'Load Preview'}
                </Button>
                
                <Button 
                  onClick={downloadSheet}
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-[#026892] hover:bg-[#026899]"
                >
                  {isDownloading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {isDownloading ? 'Downloading...' : 'Download Summary Sheet'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Error:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {(isLoading || isDownloading) && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm font-medium">
                      {isLoading ? 'Fetching sheet information...' : 'Preparing download...'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {previewData ? (
              <ExcelPreviewTable
                data={previewData.sheets}
                onDownload={downloadSheet}
                isDownloadLoading={isDownloading}
              />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Preview Available</h3>
                  <p className="text-gray-500 mb-4">
                    Load the Excel preview to view the summary sheet contents before downloading.
                  </p>
                  <Button onClick={loadPreview} disabled={isPreviewLoading}>
                    {isPreviewLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                    )}
                    {isPreviewLoading ? 'Loading...' : 'Load Preview'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
  )
}
