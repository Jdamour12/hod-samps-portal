"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useStudentMarks } from "@/hooks/module-marks/useStudentMarks";

export default function StudentMarksPage() {
  const params = useParams();
  const router = useRouter();
  
  // Get the module assignment ID from URL params
  let moduleAssignmentId = params.module;
  if (Array.isArray(moduleAssignmentId)) {
    moduleAssignmentId = moduleAssignmentId[0];
  }
  moduleAssignmentId = decodeURIComponent(moduleAssignmentId || "");

  const {
    data: moduleMarksheet,
    loading,
    error,
    submitting,
    publishing,
    exporting,
    fetchModuleMarksheet,
    submitToDean,
    publishToStudents,
    exportExcel,
    clearError
  } = useStudentMarks();

  const [search, setSearch] = useState("");

  // Fetch marksheet data when component mounts
  useEffect(() => {
    if (moduleAssignmentId) {
      fetchModuleMarksheet(moduleAssignmentId);
    }
  }, [moduleAssignmentId, fetchModuleMarksheet]);

  function handleBackToMarks() {
    router.back();
  }

  const handleSubmitToDean = async () => {
    if (!moduleAssignmentId) return;
    
    const success = await submitToDean(moduleAssignmentId);
    if (success) {
      console.log('Successfully submitted to dean');
    }
  };

  const handlePublishToStudents = async () => {
    if (!moduleAssignmentId) return;
    
    const success = await publishToStudents(moduleAssignmentId);
    if (success) {
      console.log('Successfully published to students');
    }
  };

  const handleExport = async () => {
    if (!moduleAssignmentId) return;
    
    try {
      await exportExcel(moduleAssignmentId);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  // Create the marksheet display content
  const renderMarksheetContent = () => {
    if (!moduleMarksheet || !moduleMarksheet.students) return null;

    // Filter students based on search if needed
    const filteredStudents = search 
      ? moduleMarksheet.students.filter(student =>
          student.studentRegNumber?.toLowerCase().includes(search.toLowerCase()) ||
          student.studentName?.toLowerCase().includes(search.toLowerCase())
        )
      : moduleMarksheet.students;

    return (
      <div className="marksheet-content">
        <style jsx>{`
          .marksheet-content table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin: 0;
          }
          
          .marksheet-content th,
          .marksheet-content td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
            vertical-align: middle;
          }
          
          .marksheet-content th {
            background-color: #f5f5f5;
            font-weight: bold;
            font-size: 11px;
          }
          
          .marksheet-content tbody tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          
          .marksheet-content tbody tr:hover {
            background-color: #f0f8ff;
          }
        `}</style>
        
        {/* Display the raw marksheet data */}
        <div className="overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: JSON.stringify(filteredStudents) }} />
        </div>
      </div>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#026892] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading module marksheet...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the student marks data</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 hover:bg-blue-100 hover:text-gray-900"
          onClick={handleBackToMarks}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Marks
        </Button>

        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="flex items-center justify-between">
            <div>
              <strong className="text-red-800">Error Loading Marksheet:</strong>
              <p className="text-red-700 mt-1">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Module ID: <code className="bg-red-100 px-1 rounded">{moduleAssignmentId}</code>
              </p>
              <p className="text-red-600 text-sm">
                Please verify the module assignment ID is correct.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={clearError}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>

        <Button 
          onClick={() => moduleAssignmentId && fetchModuleMarksheet(moduleAssignmentId)}
          className="bg-[#026892] hover:bg-[#026892]/90"
        >
          Retry Loading Marksheet
        </Button>
      </div>
    );
  }

  // Show no data state
  if (!moduleMarksheet) {
    return (
      <div className="p-6">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 hover:bg-blue-100 hover:text-gray-900"
          onClick={handleBackToMarks}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Marks
        </Button>

        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Marksheet Found</h3>
          <p className="text-gray-600">No marksheet data is available for this module assignment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Navigation */}
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-2 hover:bg-blue-100 hover:text-gray-900"
        onClick={handleBackToMarks}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Marks
      </Button>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {moduleMarksheet.moduleCode} - {moduleMarksheet.moduleName}
        </h1>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Module Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <span className="text-gray-600 text-sm">Instructor:</span>
              <p className="font-semibold text-gray-900">{moduleMarksheet.instructorName}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Academic Year:</span>
              <p className="font-semibold text-gray-900">{moduleMarksheet.academicYear}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Semester:</span>
              <p className="font-semibold text-gray-900">{moduleMarksheet.semester}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Total Students:</span>
              <p className="font-semibold text-gray-900">{moduleMarksheet.totalStudents}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Module ID:</span>
              <p className="font-semibold text-gray-900">{moduleMarksheet.moduleId}</p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 text-base leading-relaxed">
            This comprehensive marksheet contains all student assessment data for <strong>{moduleMarksheet.moduleCode}</strong>. 
            The marksheet includes detailed breakdown of student performance across various assessment components including 
            Continuous Assessment Tests (CATs), Quizzes, Assignments, and Laboratory Practicals. Each student's marks are 
            calculated and compiled to provide their total coursework marks (50% of final grade) along with appropriate remarks 
            indicating pass/fail status.
          </p>
          
          <p className="text-gray-700 text-base leading-relaxed mt-4">
            As the course instructor, you can review the compiled marks, export the data for record-keeping, submit the finalized 
            marks to the Dean for approval, and publish the results to students once approved. All actions are tracked and the 
            system maintains proper workflow states to ensure academic integrity and proper approval processes.
          </p>
        </div>
      </div>

      {/* Action Buttons and Status */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            {moduleMarksheet.isPublished && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                ✓ Published to Students
              </Badge>
            )}
            {moduleMarksheet.isSubmittedToDean && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                ✓ Submitted to Dean
              </Badge>
            )}
            {!moduleMarksheet.isSubmittedToDean && (
              <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50">
                ⏳ Pending Submission
              </Badge>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              className="bg-[#026892] hover:bg-[#026892]/90 text-white"
              onClick={handleSubmitToDean}
              disabled={submitting || moduleMarksheet.isSubmittedToDean}
            >
              {submitting ? "Submitting..." : moduleMarksheet.isSubmittedToDean ? "✓ Already Submitted" : "Submit to Dean"}
            </Button>
            
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handlePublishToStudents}
              disabled={publishing || moduleMarksheet.isPublished || !moduleMarksheet.isSubmittedToDean}
              title={!moduleMarksheet.isSubmittedToDean ? "Must submit to Dean first" : ""}
            >
              {publishing ? "Publishing..." : moduleMarksheet.isPublished ? "✓ Already Published" : "Publish to Students"}
            </Button>
            
            <Button
              variant="outline"
              className="hover:bg-[#026892] hover:text-white border-[#026892] text-[#026892]"
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? "Exporting..." : "📄 Export Excel"}
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          className="max-w-md"
          placeholder="Search by student name or registration number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Marksheet Display */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Student Marksheet</h3>
            <span className="text-sm text-gray-500">
              Showing {search ? 'filtered' : 'all'} student records
            </span>
          </div>
          
          {/* Display the raw marksheet data from API */}
          <div className="overflow-x-auto bg-white rounded-lg border">
            <pre className="p-4 text-xs whitespace-pre-wrap font-mono text-gray-800 leading-relaxed">
              {JSON.stringify(moduleMarksheet, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}