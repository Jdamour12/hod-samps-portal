"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileSpreadsheet, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchRetakersExcelSheet, 
  downloadRetakersExcelSheet, 
  fetchAndParseRetakersSheet,
  validateRetakersSheetParams,
  type RetakersExcelPreviewData,
  type RetakersSheetParams,
  DEFAULT_RETAKERS_PARAMS
} from '@/lib/api-retakers';

interface RepeatersComponentProps {
  className?: string;
  year?: string;
}

const RepeatersComponent: React.FC<RepeatersComponentProps> = ({ className, year }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  
  // Default parameters - using imported constants
  const [sheetInfo] = useState<RetakersSheetParams>(DEFAULT_RETAKERS_PARAMS);
  
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<RetakersExcelPreviewData | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info");
  const { toast } = useToast();

  const loadPreview = async () => {
    setIsPreviewLoading(true);
    setError(null);

    try {
      validateRetakersSheetParams(sheetInfo);
      const data = await fetchAndParseRetakersSheet(sheetInfo);
      setPreviewData(data);
      setActiveTab("preview");
      
      toast({
        title: "Preview Loaded",
        description: `Successfully loaded retakers sheet preview with ${data.sheets.length} sheet(s).`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Preview Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const downloadSheet = async () => {
    setIsDownloading(true);
    setError(null);

    try {
      validateRetakersSheetParams(sheetInfo);
      const filename = await downloadRetakersExcelSheet(sheetInfo);
      
      toast({
        title: "Download Started",
        description: `Retakers sheet "${filename}" is being downloaded.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Download Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const mockRepeaters = [
    { id: "S006", name: "David Lee", previousGrade: "F", currentStatus: "Retaking", reason: "Failed final exam" },
    { id: "S007", name: "Emma Davis", previousGrade: "D", currentStatus: "Repeating", reason: "Below minimum requirement" },
    { id: "S008", name: "Mike Taylor", previousGrade: "F", currentStatus: "Retaking", reason: "Did not complete assignments" },
  ];

  return (
    <div className="space-y-6">
   

      {/* Excel Sheet Management */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "info" | "preview")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Excel Sheet Management</TabsTrigger>
          <TabsTrigger value="preview">Excel Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileSpreadsheet className="h-8 w-8 text-[#000]" />
              <div>
                <h2 className="text-xl font-semibold">Retakers & Repeaters Excel Sheet</h2>
                <p className="text-sm text-gray-600">
                  Generate and manage Excel sheets for students who need to retake or repeat courses
                  {className && year && ` for ${className} - ${year}`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Button
                  onClick={loadPreview}
                  disabled={isPreviewLoading}
                  className="w-full bg-[#026892] hover:bg-[#025f7f]"
                >
                  {isPreviewLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Loading Preview...
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Load Excel Preview
                    </>
                  )}
                </Button>

                <Button
                  onClick={downloadSheet}
                  disabled={isDownloading}
                  variant="outline"
                  className="w-full border-[#026892] text-[#026892] hover:bg-[#025f7f] hover:text-white"
                >
                  {isDownloading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Retakers Sheet
                    </>
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-800">Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          {previewData ? (
            <div className="space-y-4">
              {previewData.sheets.map((sheet, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{sheet.sheetName}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          {sheet.headers.map((header, headerIndex) => (
                            <th key={headerIndex} className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-900">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sheet.rows.slice(0, 10).map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                                {typeof cell === 'object' && cell !== null ? String(cell) : String(cell || '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {sheet.totalRows > 10 && (
                      <p className="text-sm text-gray-500 mt-2">
                        Showing first 10 rows of {sheet.totalRows} total rows
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Preview Available</h3>
              <p className="text-gray-600 mb-4">Load the Excel preview to view the retakers sheet data.</p>
              <Button onClick={loadPreview} disabled={isPreviewLoading} className="bg-[#026892] hover:bg-[#025f7f]">
                {isPreviewLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Load Preview
                  </>
                )}
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RepeatersComponent;
