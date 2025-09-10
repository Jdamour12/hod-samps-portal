"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Dummy data for demonstration
// Sample chart data for grade distribution
const gradeDistributionData = [
  { name: "Approved", value: 3, color: "#22c55e" },
  { name: "Pending", value: 2, color: "#eab308" },
  { name: "Not Submitted", value: 1, color: "#6b7280" },
];

// Analytics data based on the image
const submissionStatistics = {
  totalSubmissions: 4,
  approved: 1,
  pending: 1,
  overdue: 1,
  rejected: 1,
};

const gradeDistribution = [
  { grade: "A", percentage: 25, color: "#22c55e" },
  { grade: "B", percentage: 35, color: "#3b82f6" },
  { grade: "C", percentage: 30, color: "#f59e0b" },
  { grade: "D", percentage: 8, color: "#8b5cf6" },
  { grade: "F", percentage: 2, color: "#ef4444" },
];

const departmentStats = {
  overallAverage: 74.2,
  highestModuleAvg: 86.3,
  lowestModuleAvg: 62.1,
};

// Deadlines data based on the image
const deadlinesData = [
  {
    module: "COE3166 - Web Development",
    instructor: "Ms. Carol Davis",
    deadline: "Dec 18, 2024",
    status: "Overdue",
    daysLeft: -2,
  },
  {
    module: "COE3163 - Software Engineering",
    instructor: "Dr. Alice Smith",
    deadline: "Dec 20, 2024",
    status: "2 days left",
    daysLeft: 2,
  },
];

const marksData = [
  {
    lecturer: "Dr. Alice Smith",
    module: "COE3163 - Software Engineering",
    students: 45,
    submissionDate: "2024-12-15",
    deadline: "2024-12-20",
    status: "Pending",
  },
  {
    lecturer: "Prof. Bob Johnson",
    module: "COE3264 - Database Systems",
    students: 38,
    submissionDate: "2024-12-14",
    deadline: "2024-12-20",
    status: "Approved",
  },
  {
    lecturer: "Ms. Carol Davis",
    module: "COE3166 - Web Development",
    students: 42,
    submissionDate: "Not submitted",
    deadline: "2024-12-18",
    status: "Overdue",
  },
  {
    lecturer: "Dr. David Brown",
    module: "COE3261 - Machine Learning",
    students: 35,
    submissionDate: "2024-12-16",
    deadline: "2024-12-20",
    status: "Rejected",
  },
];

export default function MarksSubmittedPage() {
  // Main tabs: 'mark-submissions', 'analytics', 'deadlines'
  const [mainActiveTab, setMainActiveTab] = React.useState("mark-submissions");
  
  // Sub tabs: 'module' or 'class' (only for mark-submissions tab)
  const [activeTab, setActiveTab] = React.useState("module");
  
  // Module Table State
  const [modulePage, setModulePage] = React.useState(1);
  const router = useRouter();
  const [moduleSearch, setModuleSearch] = React.useState("");
  const modulePageSize = 4;
  const moduleFilteredData = marksData.filter(
    (row) =>
      (row.lecturer &&
        row.lecturer.toLowerCase().includes(moduleSearch.toLowerCase())) ||
      (row.module &&
        row.module.toLowerCase().includes(moduleSearch.toLowerCase()))
  );
  const moduleTotalPages = Math.ceil(
    moduleFilteredData.length / modulePageSize
  );
  const modulePaginatedData = moduleFilteredData.slice(
    (modulePage - 1) * modulePageSize,
    modulePage * modulePageSize
  );
  // Handle back to marks from detailed view
  function handleBackToMarks() {
    router.back();
  }

  // Dummy class data for demonstration
  const classData = [
    {
      className: "CS101 - Computer Science Year 1",
      lecturer: "Dr. Alice Smith",
      students: 45,
      submissionDate: "2024-12-15",
      deadline: "2024-12-20",
      status: "Pending",
    },
    {
      className: "CS201 - Computer Science Year 2",
      lecturer: "Prof. Bob Johnson",
      students: 38,
      submissionDate: "2024-12-14",
      deadline: "2024-12-20",
      status: "Approved",
    },
    {
      className: "IT101 - IT Year 1",
      lecturer: "Ms. Carol Davis",
      students: 42,
      submissionDate: "Not submitted",
      deadline: "2024-12-18",
      status: "Overdue",
    },
    {
      className: "ML301 - Machine Learning",
      lecturer: "Dr. David Brown",
      students: 35,
      submissionDate: "2024-12-16",
      deadline: "2024-12-20",
      status: "Rejected",
    },
  ];
  // Class Table State
  const [classPage, setClassPage] = React.useState(1);
  const [classSearch, setClassSearch] = React.useState("");
  const classPageSize = 4;
  const classFilteredData = classData.filter(
    (row) =>
      (row.className &&
        row.className.toLowerCase().includes(classSearch.toLowerCase())) ||
      (row.lecturer &&
        row.lecturer.toLowerCase().includes(classSearch.toLowerCase()))
  );
  const classTotalPages = Math.ceil(classFilteredData.length / classPageSize);
  const classPaginatedData = classFilteredData.slice(
    (classPage - 1) * classPageSize,
    classPage * classPageSize
  );

  // Deadlines state
  const [selectedModule, setSelectedModule] = React.useState("");
  const [selectedDeadline, setSelectedDeadline] = React.useState("");

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Marks Management
      </h1>
      <p className="text-gray-600 text-base mb-2">
        Review and approve marks submitted by lecturers
      </p>

      {/* Back to module selection */}
          <Button
        variant="outline"
        className="mb-4 flex items-center gap-2 hover:bg-gray-200 hover:text-gray-900 text-gray-600 border border-none bg-gray-50 h-8 my-5"
        onClick={handleBackToMarks}
      >
        <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
        
        Back to Module Selection
      </Button>

      <div className="flex items-center justify-between mb-4 mt-4">
        <div className="flex gap-2 w-full">
          <button 
            className={`px-6 py-2 rounded-md font-medium text-sm border ${
              mainActiveTab === "mark-submissions"
                ? "bg-[#026892] text-white border-gray-200 hover:bg-[#026892]/90"
                : "bg-white text-black border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setMainActiveTab("mark-submissions")}
          >
            Mark Submissions
          </button>
          <button 
            className={`px-6 py-2 rounded-md font-medium text-sm border ${
              mainActiveTab === "analytics"
                ? "bg-[#026892] text-white border-gray-200 hover:bg-[#026892]/90"
                : "bg-white text-black border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setMainActiveTab("analytics")}
          >
            Analytics
          </button>
          <button 
            className={`px-6 py-2 rounded-md font-medium text-sm border ${
              mainActiveTab === "deadlines"
                ? "bg-[#026892] text-white border-gray-200 hover:bg-[#026892]/90"
                : "bg-white text-black border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setMainActiveTab("deadlines")}
          >
            Deadlines
          </button>
        </div>
        <button className="bg-[#026892] text-white px-2 py-2 rounded-md font-medium text-sm hover:bg-[#026892]/90 w-[180px]">
          Export All Marks
        </button>
      </div>

      {/* Mark Submissions Tab */}
      {mainActiveTab === "mark-submissions" && (
        <Card className="p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-1">
            Lecturer Mark Submissions
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Review and manage marks submitted by department lecturers
          </p>

          {/* Tabs for Module and Class */}
          <div className="flex gap-2 mb-6">
            <button
              className={`px-6 py-2 rounded-md font-medium text-sm border ${
                activeTab === "module"
                  ? "bg-[#026892] text-white border-gray-200 hover:bg-[#026892]/90"
                  : "bg-white text-black border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("module")}
            >
              Module
            </button>
            <button
              className={`px-6 py-2 rounded-md font-medium text-sm border ${
                activeTab === "class"
                  ? "bg-[#026892] text-white font-medium hover:bg-[#026892]/90 border-gray-200"
                  : "bg-white text-black border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("class")}
            >
              Class
            </button>
          </div>
          {/* Table for Module Tab */}
          {activeTab === "module" && (
            <>
              <div className="flex gap-2 mb-4 items-center">
                <select className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Overdue</option>
                  <option>Rejected</option>
                </select>
                <div className="relative w-full max-w-xs">
                  <input
                    type="search"
                    value={moduleSearch}
                    onChange={(e) => {
                      setModuleSearch(e.target.value);
                      setModulePage(1);
                    }}
                    placeholder="Search lecturer, module..."
                    className="border rounded-md px-10 py-2 text-sm w-full bg-white focus:border-none focus:ring-blue"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-gray-700 font-semibold">Lecturer</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Module</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Students</TableHead>
                      <TableHead className="text-gray-700 font-semibold">
                        Submission Date
                      </TableHead>
                      <TableHead className="text-gray-700 font-semibold">Deadline</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modulePaginatedData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-gray-700 text-sm">
                          {row.lecturer}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">
                          {row.module}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">
                          {row.students}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">
                          {row.submissionDate}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">
                          {row.deadline}
                        </TableCell>
                        <TableCell>
                          {row.status === "Pending" && (
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg
                                className="h-4 w-4 inline"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 8v4l2 2"
                                />
                              </svg>
                              Pending
                            </span>
                          )}
                          {row.status === "Approved" && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg
                                className="h-4 w-4 inline"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Approved
                            </span>
                          )}
                          {row.status === "Overdue" && (
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg
                                className="h-4 w-4 inline"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 8v4l2 2"
                                />
                              </svg>
                              Overdue
                            </span>
                          )}
                          {row.status === "Rejected" && (
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg
                                className="h-4 w-4 inline"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Rejected
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <button
                            className="flex items-center gap-1 text-[#0891b2] bg-[#e0f2fe] hover:bg-[#bae6fd] px-3 py-1 rounded-md text-sm font-medium"
                            onClick={() =>
                              router.push(
                                `/academic/marks-submitted/${encodeURIComponent(
                                  row.module
                                )}`
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>{" "}
                            View
                          </button>
                          {row.status === "Overdue" && (
                            <button className="flex items-center gap-1 text-[#0891b2] bg-[#e0f2fe] hover:bg-[#bae6fd] px-3 py-1 rounded-md text-sm font-medium">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8v6m0 0l-3-3m3 3l3-3"
                                />
                              </svg>{" "}
                              Remind
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-end items-center mt-4 gap-2">
                <button
                  className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 disabled:opacity-50"
                  onClick={() => setModulePage((p) => Math.max(1, p - 1))}
                  disabled={modulePage === 1}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {modulePage} of {moduleTotalPages}
                </span>
                <button
                  className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 disabled:opacity-50"
                  onClick={() =>
                    setModulePage((p) => Math.min(moduleTotalPages, p + 1))
                  }
                  disabled={modulePage === moduleTotalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {/* Table for Class Tab */}
          {activeTab === "class" && (
            <>
              <div className="flex gap-2 mb-4 items-center">
                <select className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                  <option>All Years</option>
                  <option>Year 1</option>
                  <option>Year 2</option>
                  <option>Year 3</option>
                </select>
                <select className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Overdue</option>
                  <option>Rejected</option>
                </select>
                <div className="relative w-full max-w-xs">
                  <input
                    type="search"
                    value={classSearch}
                    onChange={(e) => {
                      setClassSearch(e.target.value);
                      setClassPage(1);
                    }}
                    placeholder="Search class, lecturer..."
                    className="border rounded-md px-10 py-2 text-sm w-full bg-white focus:border-[#0891b2] focus:ring-[#0891b2]"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-gray-700 font-semibold">Class</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Lecturer</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Students</TableHead>
                      <TableHead className="text-gray-700 font-semibold">
                        Submission Date
                      </TableHead>
                      <TableHead className="text-gray-700 font-semibold">Deadline</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classPaginatedData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-gray-700 text-sm">
                          {row.className}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">
                          {row.lecturer}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">
                          {row.students}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">
                          {row.submissionDate}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">
                          {row.deadline}
                        </TableCell>
                        <TableCell>
                          {row.status === "Pending" && (
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg
                                className="h-4 w-4 inline"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 8v4l2 2"
                                />
                              </svg>
                              Pending
                            </span>
                          )}
                          {row.status === "Approved" && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg
                                className="h-4 w-4 inline"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Approved
                            </span>
                          )}
                          {row.status === "Overdue" && (
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg
                                className="h-4 w-4 inline"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 8v4l2 2"
                                />
                              </svg>
                              Overdue
                            </span>
                          )}
                          {row.status === "Rejected" && (
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg
                                className="h-4 w-4 inline"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Rejected
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <button
                            className="flex items-center gap-1 text-[#0891b2] bg-[#e0f2fe] hover:bg-[#bae6fd] px-3 py-1 rounded-md text-sm font-medium"
                            onClick={() => {
                              // Use router to navigate to the class details page
                              router.push(
                                `/academic/marks-submitted/class/${encodeURIComponent(
                                  row.className
                                )}/2025`
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>{" "}
                            View
                          </button>
                          {row.status === "Overdue" && (
                            <button className="flex items-center gap-1 text-[#0891b2] bg-[#e0f2fe] hover:bg-[#bae6fd] px-3 py-1 rounded-md text-sm font-medium">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8v6m0 0l-3-3m3 3l3-3"
                                />
                              </svg>{" "}
                              Remind
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-end items-center mt-4 gap-2">
                <button
                  className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 disabled:opacity-50"
                  onClick={() => setClassPage((p) => Math.max(1, p - 1))}
                  disabled={classPage === 1}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {classPage} of {classTotalPages}
                </span>
                <button
                  className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 disabled:opacity-50"
                  onClick={() =>
                    setClassPage((p) => Math.min(classTotalPages, p + 1))
                  }
                  disabled={classPage === classTotalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </Card>
      )}

      {/* Analytics Tab */}
      {mainActiveTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Submission Statistics Card */}
          <Card className="p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Submissions:</span>
                <span className="font-semibold">{submissionStatistics.totalSubmissions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved:</span>
                <span className="font-semibold text-green-600">{submissionStatistics.approved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending:</span>
                <span className="font-semibold text-orange-600">{submissionStatistics.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overdue:</span>
                <span className="font-semibold text-red-600">{submissionStatistics.overdue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rejected:</span>
                <span className="font-semibold text-red-600">{submissionStatistics.rejected}</span>
              </div>
            </div>
          </Card>

          {/* Grade Distribution Card */}
          <Card className="p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
            <div className="space-y-3">
              {gradeDistribution.map((grade) => (
                <div key={grade.grade} className="flex justify-between items-center">
                  <span className="text-gray-600">{grade.grade} Grades:</span>
                  <span className={`font-semibold ${grade.grade === 'F' ? 'text-red-600' : 'text-gray-900'}`}>
                    {grade.percentage}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#026892" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Department Average Card */}
          <Card className="p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Average</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#026892] mb-2">
                {departmentStats.overallAverage}%
              </div>
              <div className="text-sm text-gray-600">Overall Department Average</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Highest Module Avg:</span>
                <span className="font-semibold text-green-600">{departmentStats.highestModuleAvg}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lowest Module Avg:</span>
                <span className="font-semibold text-red-600">{departmentStats.lowestModuleAvg}%</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Deadlines Tab */}
      {mainActiveTab === "deadlines" && (
        <Card className="p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-1">
            Mark Submission Deadlines
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Manage and track mark submission deadlines for all modules
          </p>

          {/* Set New Deadline Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Set New Deadline</h3>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
                <select 
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white"
                >
                  <option value="">Select Module</option>
                  <option value="COE3163">COE3163 - Software Engineering</option>
                  <option value="COE3166">COE3166 - Web Development</option>
                  <option value="COE3264">COE3264 - Database Systems</option>
                  <option value="COE3261">COE3261 - Machine Learning</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDeadline}
                    onChange={(e) => setSelectedDeadline(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white pr-10"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <button className="bg-[#026892] text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-[#026892]/90">
                Set Deadline
              </button>
            </div>
          </div>

          {/* Upcoming Deadlines Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {deadlinesData.map((deadline, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    deadline.status === "Overdue" 
                      ? "bg-red-50 border-red-200" 
                      : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{deadline.module}</h4>
                      <p className="text-sm text-gray-600">Instructor: {deadline.instructor}</p>
                      <p className="text-sm text-gray-600">Deadline: {deadline.deadline}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        deadline.status === "Overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {deadline.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
