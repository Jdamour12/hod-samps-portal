"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExcelPreviewTable } from '@/components/ui/excel-preview-table'
import { Download, FileSpreadsheet, AlertCircle, RefreshCw, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { 
  fetchGradingExcelSheet, 
  downloadGradingExcelSheet, 
  fetchAndParseGradingSheet,
  validateGradingSheetParams,
  formatFileSize,
  type ExcelPreviewData // Import the type from the API module
} from '@/lib/api-grading'

interface GradingSheetInfo {
  semesterId: string
  groupId: string
  filename?: string
  lastModified?: Date
  size?: number
}

export default function ExcelMarksPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [sheetInfo, setSheetInfo] = useState<GradingSheetInfo>({
    semesterId: 'e16a166e-3ff6-4f5a-98f4-8b4dabbafecb',
    groupId: 'e29ea9f8-b815-4a1b-8a66-478df24cda7d'
  })
  const [error, setError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<ExcelPreviewData | null>(null)
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info")
  const { toast } = useToast()

    // Function to fetch the Excel sheet info
  const fetchSheetInfo = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate parameters first
      validateGradingSheetParams(sheetInfo)
      
      const { blob, filename } = await fetchGradingExcelSheet(sheetInfo)
      
      // Update sheet info with fetched data
      setSheetInfo(prev => ({
        ...prev,
        filename,
        size: blob.size,
        lastModified: new Date()
      }))

      toast({
        title: "Sheet Info Updated",
        description: "Successfully fetched grading sheet information.",
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
      // Validate parameters first
      validateGradingSheetParams(sheetInfo)
      
      const previewData = await fetchAndParseGradingSheet(sheetInfo)
      setPreviewData(previewData)
      
      // Update sheet info with preview data
      setSheetInfo(prev => ({
        ...prev,
        filename: previewData.filename,
        size: previewData.fileSize,
        lastModified: new Date()
      }))

      setActiveTab("preview")
      
      toast({
        title: "Preview Loaded",
        description: `Successfully loaded Excel preview with ${previewData.sheets.length} sheet(s).`,
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Preview Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsPreviewLoading(false)
    }
  }

  // Function to download the Excel sheet
  const downloadSheet = async () => {
    setIsDownloading(true)
    setError(null)

    try {
      // Validate parameters first
      validateGradingSheetParams(sheetInfo)
      
      const filename = await downloadGradingExcelSheet(sheetInfo)
      
      toast({
        title: "Download Started",
        description: `Excel sheet "${filename}" is being downloaded.`,
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

  return (
      <div className="">
        
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

          <TabsContent value="info" className="space-y-6">
          {/* Sheet Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                Grading Sheet Information
              </CardTitle>
              <CardDescription>
                Current semester regular grading sheet details
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
                      <p className="text-sm text-gray-900">{formatFileSize(sheetInfo.size)}</p>
                    </div>
                  )}
                  {sheetInfo.lastModified && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Generated</label>
                      <p className="text-sm text-gray-900">
                        {sheetInfo.lastModified.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>
                Generate and download the Excel grading sheet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={fetchSheetInfo}
                  disabled={isLoading}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  {isLoading ? 'Loading...' : 'Fetch Sheet Info'}
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
                  {isDownloading ? 'Downloading...' : 'Download Excel Sheet'}
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
                    Load the Excel preview to view the sheet contents before downloading.
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
