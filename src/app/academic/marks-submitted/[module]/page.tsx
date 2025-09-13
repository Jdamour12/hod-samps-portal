"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const students = [
  { sn: 1, reg: "222005824", gender: "F" },
  { sn: 2, reg: "222007252", gender: "M" },
  { sn: 3, reg: "321013529", gender: "M" },
  { sn: 4, reg: "222017795", gender: "F" },
  { sn: 5, reg: "222017468", gender: "M" },
  { sn: 6, reg: "222004841", gender: "M" },
  { sn: 7, reg: "222013628", gender: "F" },
  { sn: 8, reg: "222018030", gender: "M" },
  { sn: 9, reg: "222009408", gender: "M" },
  { sn: 10, reg: "222009765", gender: "F" },
  { sn: 11, reg: "222008333", gender: "M" },
  { sn: 12, reg: "222003168", gender: "M" },
];

export default function StudentMarksPage() {
  const params = useParams();
  const router = require("next/navigation").useRouter();
  let moduleParam = params.module;
  if (Array.isArray(moduleParam)) {
    moduleParam = moduleParam[0];
  }
  moduleParam = decodeURIComponent(moduleParam || "");

  function handleBackToMarks() {
    router.back();
  }
  const [search, setSearch] = useState("");
  const [published, setPublished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  // Dummy marksData copied from marks-submitted/page.tsx
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
  // Find the module and lecturer
  const moduleInfo = marksData.find((m) =>
    m.module.toLowerCase().includes(moduleParam.toLowerCase())
  );
  const moduleTitle = moduleInfo ? moduleInfo.module : moduleParam;
  const lecturerName = moduleInfo ? moduleInfo.lecturer : "Unknown Lecturer";
  const marks = [
    {
      cat1: "12",
      cat2: "14",
      testAvg: "13",
      quiz1: "8",
      quiz2: "9",
      quizAvg: "8.5",
      a1: "10",
      a2: "9",
      assignAvg: "9.5",
      l1: "7",
      l2: "8",
      l3: "7",
      labAvg: "7.3",
      total: "83.3",
      remark: "PASS",
    },
    {
      cat1: "10",
      cat2: "11",
      testAvg: "10.5",
      quiz1: "7",
      quiz2: "6",
      quizAvg: "6.5",
      a1: "8",
      a2: "7",
      assignAvg: "7.5",
      l1: "6",
      l2: "7",
      l3: "6",
      labAvg: "6.3",
      total: "68.3",
      remark: "PASS",
    },
    {
      cat1: "6",
      cat2: "7",
      testAvg: "6.5",
      quiz1: "5",
      quiz2: "4",
      quizAvg: "4.5",
      a1: "6",
      a2: "5",
      assignAvg: "5.5",
      l1: "4",
      l2: "5",
      l3: "4",
      labAvg: "4.3",
      total: "38.3",
      remark: "FAIL",
    },
    // Remaining students have empty marks
    ...students.slice(3).map(() => ({
      cat1: "",
      cat2: "",
      testAvg: "",
      quiz1: "",
      quiz2: "",
      quizAvg: "",
      a1: "",
      a2: "",
      assignAvg: "",
      l1: "",
      l2: "",
      l3: "",
      labAvg: "",
      total: "0.00",
      remark: "FAIL",
    })),
  ];
  const filteredStudents = students.filter((student) =>
    student.reg.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <div className="p-2">
      <Button
        variant="outline"
        className="mb-4 flex items-center gap-2 hover:bg-blue-100 hover:text-gray-900"
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
      <h1 className="text-2xl font-bold mb-2">{moduleTitle} Marks</h1>
      <p className="text-gray-600 mb-1">
        Lecturer: <span className="font-semibold">{lecturerName}</span>
      </p>
      <p className="text-gray-600 mb-4">
        Below are the marks submitted for the module{" "}
        <span className="font-semibold">{moduleTitle}</span>. Review and submit
        to the Dean if ready.
      </p>
      <div className="mb-4 flex flex-row gap-2 items-center justify-end">
        <Button
          className="bg-[#026892] hover:bg-[#026892]/90"
          onClick={() => setSubmitted(true)}
          disabled={submitted}
        >
          Approve & Submit to Dean
        </Button>
        <Button
          variant="outline"
          className="hover:bg-[#026892]/30 hover:text-white"
        >
          Export
        </Button>
      </div>
      <div className="flex gap-2 mb-2">
        {published && (
          <Badge className="bg-green-100 text-green-700">
            Published to Students
          </Badge>
        )}
        {submitted && (
          <Badge className="bg-blue-100 text-blue-700">Submitted to Dean</Badge>
        )}
      </div>
      <div className="overflow-x-auto">
        <Card>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <Input
                className="w-96 mt-4"
                placeholder="Search marks by student ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table
              className="w-full text-sm border rounded-lg"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-gray-700"
                  >
                    SN
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-[#d2f0d2] border p-2 text-xs font-semibold text-gray-700"
                  >
                    REG. NUMBER
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-[#d2f0d2] border p-2 text-xs font-semibold text-gray-700"
                  >
                    GENDER
                  </th>
                  <th
                    colSpan={3}
                    className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-center text-gray-700"
                  >
                    TESTS
                  </th>
                  <th
                    colSpan={3}
                    className="bg-[#d2eaf6] border p-2 text-xs font-semibold text-center text-gray-700"
                  >
                    Quiz
                  </th>
                  <th
                    colSpan={3}
                    className="bg-[#f6f2d2] border p-2 text-xs font-semibold text-center text-gray-700"
                  >
                    Assignments
                  </th>
                  <th
                    colSpan={4}
                    className="bg-[#f6eae2] border p-2 text-xs font-semibold text-center text-gray-700"
                  >
                    Laboratory practice
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-[#f6d2d2] border p-2 text-xs font-semibold text-gray-700"
                  >
                    Total Marks (50%)
                  </th>
                  <th
                    rowSpan={2}
                    className="bg-[#f6d2d2] border p-2 text-xs font-semibold text-gray-700"
                  >
                    REMARK
                  </th>
                </tr>
                <tr>
                  <th className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-gray-700">
                    CAT1
                  </th>
                  <th className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-gray-700">
                    CAT2
                  </th>
                  <th className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-gray-700">
                    Average
                  </th>
                  <th className="bg-[#d2eaf6] border p-2 text-xs font-semibold text-gray-700">
                    Quiz1
                  </th>
                  <th className="bg-[#d2eaf6] border p-2 text-xs font-semibold text-gray-700">
                    Quiz2
                  </th>
                  <th className="bg-[#d2eaf6] border p-2 text-xs font-semibold text-gray-700">
                    Average
                  </th>
                  <th className="bg-[#f6f2d2] border p-2 text-xs font-semibold text-gray-700">
                    A1
                  </th>
                  <th className="bg-[#f6f2d2] border p-2 text-xs font-semibold text-gray-700">
                    A2
                  </th>
                  <th className="bg-[#f6f2d2] border p-2 text-xs font-semibold text-gray-700">
                    Average
                  </th>
                  <th className="bg-[#f6eae2] border p-2 text-xs font-semibold text-gray-700">
                    L1
                  </th>
                  <th className="bg-[#f6eae2] border p-2 text-xs font-semibold text-gray-700">
                    L2
                  </th>
                  <th className="bg-[#f6eae2] border p-2 text-xs font-semibold text-gray-700">
                    L3
                  </th>
                  <th className="bg-[#f6eae2] border p-2 text-xs font-semibold text-gray-700">
                    Average
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student, idx) => {
                  const globalIdx = (currentPage - 1) * rowsPerPage + idx;
                  return (
                    <tr key={student.reg} className="border-t">
                      <td className="border p-2 text-center bg-[#eaf6ea]">
                        {student.sn}
                      </td>
                      <td className="border p-2 text-center bg-[#d2f0d2]">
                        {student.reg}
                      </td>
                      <td className="border p-2 text-center bg-[#d2f0d2]">
                        {student.gender}
                      </td>
                      <td className="border p-2 text-center bg-[#eaf6ea]">
                        {marks[globalIdx].cat1}
                      </td>
                      <td className="border p-2 text-center bg-[#eaf6ea]">
                        {marks[globalIdx].cat2}
                      </td>
                      <td className="border p-2 text-center bg-[#eaf6ea]">
                        {marks[globalIdx].testAvg}
                      </td>
                      <td className="border p-2 text-center bg-[#d2eaf6]">
                        {marks[globalIdx].quiz1}
                      </td>
                      <td className="border p-2 text-center bg-[#d2eaf6]">
                        {marks[globalIdx].quiz2}
                      </td>
                      <td className="border p-2 text-center bg-[#d2eaf6]">
                        {marks[globalIdx].quizAvg}
                      </td>
                      <td className="border p-2 text-center bg-[#f6f2d2]">
                        {marks[globalIdx].a1}
                      </td>
                      <td className="border p-2 text-center bg-[#f6f2d2]">
                        {marks[globalIdx].a2}
                      </td>
                      <td className="border p-2 text-center bg-[#f6f2d2]">
                        {marks[globalIdx].assignAvg}
                      </td>
                      <td className="border p-2 text-center bg-[#f6eae2]">
                        {marks[globalIdx].l1}
                      </td>
                      <td className="border p-2 text-center bg-[#f6eae2]">
                        {marks[globalIdx].l2}
                      </td>
                      <td className="border p-2 text-center bg-[#f6eae2]">
                        {marks[globalIdx].l3}
                      </td>
                      <td className="border p-2 text-center bg-[#f6eae2]">
                        {marks[globalIdx].labAvg}
                      </td>
                      <td className="border p-2 text-center bg-[#f6d2d2] font-bold">
                        {marks[globalIdx].total}
                      </td>
                      <td className="border p-2 text-center bg-[#f6d2d2] font-bold">
                        {marks[globalIdx].remark}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end items-center mt-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-xs">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
