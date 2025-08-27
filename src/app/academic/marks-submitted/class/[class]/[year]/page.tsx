// --- Reference table constants ---
"use client";
type Student = {
  sn: number;
  ref: string;
  sex: "M" | "F";
  status?: "ABSCONDED";
};

const students: Student[] = [
  { sn: 1, ref: "223020071", sex: "M" },
  { sn: 2, ref: "223020155", sex: "F" },
  { sn: 3, ref: "223020281", sex: "F" },
  { sn: 4, ref: "223015014", sex: "F" },
  { sn: 5, ref: "223025287", sex: "M", status: "ABSCONDED" },
  { sn: 6, ref: "223023693", sex: "F", status: "ABSCONDED" },
];
const sem1Codes = ["MAT113", "PHY116", "CHE116", "MEE112", "MEE116", "EGP111"];
const sem2Codes = [
  "MAT112",
  "PHY112",
  "CSC112",
  "MEE114",
  "CTE111",
  "MEE117",
  "MEE132",
];
const sem1Credits = [10, 10, 10, 10, 10, 5];
const sem2Credits = [10, 10, 10, 10, 10, 5, 10];

// Data for the Summary tab - Student Summary
const studentSummaryData = [
  { category: "Total number of students registered", f: 11, m: 22, tot: 33, fPct: 33.33, mPct: 66.67, totPct: 100.0 },
  {
    category: "Total number of students who sat for exams",
    f: 10,
    m: 19,
    tot: 29,
    fPct: 30.3,
    mPct: 57.58,
    totPct: 87.88,
  },
  { category: "Total number of students to progress", f: 5, m: 11, tot: 16, fPct: 17.24, mPct: 37.93, totPct: 55.17 },
  {
    category: "Total number of students to progress with retake(s)",
    f: 4,
    m: 5,
    tot: 9,
    fPct: 13.79,
    mPct: 17.24,
    totPct: 31.03,
  },
  {
    category: "Total number of students to repeat the year",
    f: 1,
    m: 3,
    tot: 4,
    fPct: 3.45,
    mPct: 10.34,
    totPct: 13.79,
  },
  { category: "Total number of students discontinued", f: 0, m: 0, tot: 0, fPct: 0.0, mPct: 0.0, totPct: 0.0 },
];

// Data for the Summary tab - Module Performance
const moduleData = [
  {
    semester: "I",
    code: "MAT1163",
    title: "Calculus for Engineers",
    avgScore: 58.27,
    sd: 8.97,
    registered: 33,
    whoSat: 31,
    pass: 33,
    retake: 4,
  },
  {
    semester: "",
    code: "PHY1164",
    title: "Physics for Engineers I",
    avgScore: 58.32,
    sd: 9.48,
    registered: 33,
    whoSat: 31,
    pass: 4,
    retake: 3,
  },
  {
    semester: "",
    code: "CHE1165",
    title: "Chemistry for Engineers",
    avgScore: 56.04,
    sd: 13.67,
    registered: 33,
    whoSat: 37,
    pass: 29,
    retake: 8,
  },
  {
    semester: "",
    code: "MEE1162",
    title: "Engineering Workshop",
    avgScore: 76.81,
    sd: 6.04,
    registered: 33,
    whoSat: 33,
    pass: 33,
    retake: 0,
  },
  {
    semester: "",
    code: "MEE1161",
    title: "Engineering Drawing and CAD",
    avgScore: 66.87,
    sd: 8.6,
    registered: 33,
    whoSat: 37,
    pass: 36,
    retake: 1,
  },
  {
    semester: "II",
    code: "MAT1263",
    title: "Advanced Calculus for Engineers",
    avgScore: 67.09,
    sd: 9.24,
    registered: 33,
    whoSat: 33,
    pass: 32,
    retake: 1,
  },
  {
    semester: "",
    code: "MEE1262",
    title: "Basics of Electrical and Electronic Engineering",
    avgScore: 60.33,
    sd: 10.28,
    registered: 33,
    whoSat: 33,
    pass: 29,
    retake: 4,
  },
];

// Sample data for students
const studentData = [
  {
    scores1: [69.83, 73.8, 73.5, 87.5, 68.06, 61.83],
    scores2: [68.0, 62.83, 72.24, 53.0, 61.7, 67.5, 60.0],
    avg: 63.13,
  },
  {
    scores1: [51.5, 50.7, 51.08, 75.1, 64.8, 50.35],
    scores2: [66.5, 50.5, 58.07, 51.0, 50.1, 64.5, 56.0],
    avg: 57.88,
  },
  {
    scores1: [52.33, 63.1, 60.62, 77.3, 59.32, 55.6],
    scores2: [66.75, 66.33, 70.0, 50.0, 65.3, 81.5, 62.0],
    avg: 64.74,
  },
  {
    scores1: [63.5, 64.8, 68.63, 77.8, 61.08, 65.33],
    scores2: [70.0, 73.0, 70.0, 75.0, 62.3, 76.0, 62.0],
    avg: 70.5,
  },
  { scores1: [44.0, 37.1, 42.48, 0, 55.52, 40.38], scores2: [], avg: 0 }, // ABSCONDED
  { scores1: [66.0, 56.8, 81.53, 0, 69.88, 66.57], scores2: [], avg: 0 }, // ABSCONDED
];

function getLetterGrade(score: number): string {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tabs = ["Summary", "Overall Marks", "Repeaters Summary", "Repeaters & Retakers"];

export default function ClassMarksPage() {
  const params = useParams();
  const router = require('next/navigation').useRouter();
  const className = params.class
    ? decodeURIComponent(
        Array.isArray(params.class) ? params.class[0] : params.class
      )
    : "Class";
  const year = params.year
    ? decodeURIComponent(
        Array.isArray(params.year) ? params.year[0] : params.year
      )
    : "Year";
  function handleBackToMarks() {
    router.back();
  }
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const filteredStudents = students.filter((student) =>
    student.ref.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Data for Repeaters Summary tab
  const repeatersSummaryData = [
    { category: "TOTAL NUMBER OF STUDENTS REGISTERED", f: 0, m: 7, tot: 7 },
    { category: "Total number of students who sat for exams", f: 0, m: 6, tot: 6 },
    { category: "Total number of students to progress", f: 0, m: 3, tot: 3 },
    {
      category: "Total number of students to progress with retake(s)",
      f: 0,
      m: 3,
      tot: 3,
    },
    { category: "Total number of students to repeat the year", f: 0, m: 0, tot: 0 },
    { category: "Total number of students discontinued", f: 0, m: 0, tot: 0 },
    { category: "Total number of students who absconded", f: 0, m: 1, tot: 1 },
    { category: "Total number of students suspended", f: 0, m: 0, tot: 0 },
  ];

  // Data for Repeaters & Retakers tab (scoped names to avoid collisions)
  type RRStudent = {
    sn: number;
    ref: string;
    sex: "M" | "F";
    totalCredits: number;
    annualAvg: number;
    failedModules: string[];
    remark: string;
  };

  const rrStudents: RRStudent[] = [
    {
      sn: 1,
      ref: "222011037",
      sex: "M",
      totalCredits: 135,
      annualAvg: 60.39,
      failedModules: ["MEE1264", "MEE1263"],
      remark: "PROGRESS",
    },
    {
      sn: 2,
      ref: "222008350",
      sex: "M",
      totalCredits: 135,
      annualAvg: 57.38,
      failedModules: ["MEE1264"],
      remark: "PROGRESS",
    },
    {
      sn: 3,
      ref: "222008543",
      sex: "M",
      totalCredits: 115,
      annualAvg: 54.48,
      failedModules: ["MAT1166", "MEE1168", "MEE1264", "MEE1263"],
      remark: "PROGRESS WITH RETAKE",
    },
    {
      sn: 4,
      ref: "222004337",
      sex: "M",
      totalCredits: 115,
      annualAvg: 53.75,
      failedModules: ["ENE1161", "ETE1262", "MEE1264"],
      remark: "PROGRESS WITH RETAKE",
    },
    {
      sn: 5,
      ref: "222011778",
      sex: "M",
      totalCredits: 115,
      annualAvg: 55.33,
      failedModules: ["CTE1111", "ENE1161", "MEE1263"],
      remark: "PROGRESS WITH RETAKE",
    },
  ];

  const rrSem1Codes = [
    "MAT1165",
    "PHY1163",
    "CHE1163",
    "CSC1163",
    "TME1151",

  ];
  const rrSem2Codes = [
    "ENE1161",
    "EGP1141",
    "MAT1263",
    "PHY1264",
    "CSC1261",
    "ETE1262",

  ];

  const rrSem1Credits = [10, 10, 10, 10, 5];
  const rrSem2Credits = [10, 10, 10, 10, 10, 10];

  const rrStudentScores = [
    {
      sem1: [50.0, 57.0, 62.0, 67.0, 70.83],
      sem2: [62.42, 57.0, 50.0, 53.5, 72.5, 54.42],
      sem1Original: [null, null, null, null, 33.29],
      sem2Original: [null, null, null, null, null, null],
    },
    {
      sem1: [50.0, 59.0, 50.0, 75.0, 76.25],
      sem2: [51.17, 51.0, 55.5, 54.0, 75.88, 50.35],
      sem1Original: [null, null, 44.5, null, null],
      sem2Original: [null, null, null, null, null, null],
    },
    {
      sem1: [36.0, 54.5, 50.0, 69.0, 55.0],
      sem2: [53.53, 64.0, 50.0, 58.5, 61.0, 50.0],
      sem1Original: [45.0, null, null, null, 25.35],
      sem2Original: [null, 33.0, null, null, null, 45.24],
    },
    {
      sem1: [50.0, 50.0, 61.5, 52.0, 66.67],
      sem2: [45.53, 50.0, 50.0, 56.5, 58.75, 24.0],
      sem1Original: [null, null, null, null, 40.1],
      sem2Original: [null, null, null, null, null, 42.32],
    },
    {
      sem1: [61.0, 55.25, 50.5, 67.0, 67.5],
      sem2: [36.17, 50.0, 66.0, 57.0, 58.44, 52.83],
      sem1Original: [null, null, null, null, null, null],
      sem2Original: [null, null, null, null, null, null],
    },
  ];

  return (
    <div className="p-2">
      <Button
        variant="outline"
        className="mb-4 flex items-center gap-2 hover:bg-blue-100 hover:text-gray-800"
        onClick={handleBackToMarks}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Marks
      </Button>
      <h1 className="text-2xl font-bold mb-2">
        {className} - {year} Marks
      </h1>
      <div className="mb-4 flex gap-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-2 rounded-md font-medium text-sm border ${
              activeTab === idx
                ? "bg-[#026892] text-white border-gray-200 hover:bg-[#026892]/90"
                : "bg-white text-black border-gray-200 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === 0 && (
        <div className="space-y-8">
          {/* First Table - Student Summary */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-[#e8e8e8] text-center font-bold" colSpan={7}>
                        TOTAL NUMBER OF STUDENTS
                      </th>
                    </tr>
                    <tr className="bg-[#f5f5f5]">
                      <th className="border p-2 text-left w-80 text-gray-700 font-semibold"></th>
                      <th className="border p-2 text-center w-12 font-semibold">F</th>
                      <th className="border p-2 text-center w-12 font-semibold">M</th>
                      <th className="border p-2 text-center w-16 font-semibold">TOT</th>
                      <th className="border p-2 text-center w-16 font-semibold">%F</th>
                      <th className="border p-2 text-center w-16 font-semibold">%M</th>
                      <th className="border p-2 text-center w-16 font-semibold">%TOT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentSummaryData.map((row, idx) => (
                      <tr key={idx} className="even:bg-muted/30">
                        <td className="border p-2 text-left text-gray-700 text-sm">{row.category}</td>
                        <td className="border p-2 text-center text-gray-700 text-sm">{row.f}</td>
                        <td className="border p-2 text-center text-gray-700 text-sm">{row.m}</td>
                        <td className="border p-2 text-center font-semibold text-gray-700 text-sm">{row.tot}</td>
                        <td className="border p-2 text-center text-gray-700 text-sm">{row.fPct.toFixed(2)}%</td>
                        <td className="border p-2 text-center text-gray-700 text-sm">{row.mPct.toFixed(2)}%</td>
                        <td className="border p-2 text-center font-semibold text-gray-700 text-sm">{row.totPct.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Second Table - Module Performance */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-[#f5f5f5]">
                      <th className="border p-2 text-center w-20 font-semibold">SEMESTER</th>
                      <th className="border p-2 text-center w-20 font-semibold">MODULE CODE</th>
                      <th className="border p-2 text-center w-80 font-semibold">MODULE TITLE</th>
                      <th className="border p-2 text-center w-20 font-semibold">AVERAGE SCORE (%)</th>
                      <th className="border p-2 text-center w-16 font-semibold">SD</th>
                      <th className="border p-2 text-center w-20 font-semibold">NUMBER OF REGISTERED</th>
                      <th className="border p-2 text-center w-24 font-semibold">NUMBER OF STUDENTS WHO SAT FOR EXAMS</th>
                      <th className="border p-2 text-center w-16 font-semibold">PASS</th>
                      <th className="border p-2 text-center w-16 font-semibold">RETAKE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moduleData.map((row, idx) => (
                      <tr key={idx} className="even:bg-muted/30">
                        <td className="border p-2 text-center font-semibold">{row.semester}</td>
                        <td className="border p-2 text-center font-mono">{row.code}</td>
                        <td className="border p-2 text-left">{row.title}</td>
                        <td className="border p-2 text-center">{row.avgScore.toFixed(2)}</td>
                        <td className="border p-2 text-center">{row.sd.toFixed(2)}</td>
                        <td className="border p-2 text-center">{row.registered}</td>
                        <td className="border p-2 text-center">{row.whoSat}</td>
                        <td className="border p-2 text-center">{row.pass}</td>
                        <td className="border p-2 text-center">{row.retake}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-[11px] border-collapse">
                <thead className="sticky top-0 z-10 w-full">
                  <tr>
                    <th rowSpan={2} className="border p-2 bg-[#cfeac4] w-8">
                      SN
                    </th>
                    <th
                      rowSpan={2}
                      className="border p-2 bg-[#cfeac4] w-24 text-left"
                    >
                      Ref.No.
                    </th>
                    <th rowSpan={3} className="border p-2 bg-[#cfeac4] w-8">
                      SEX
                    </th>
                    <th
                      colSpan={sem1Codes.length}
                      className="border p-2 bg-[#c6f3f1] text-center font-semibold"
                    >
                      SEMESTER I
                    </th>
                    <th
                      colSpan={sem2Codes.length}
                      className="border p-2 bg-[#c6f3f1] text-center font-semibold"
                    >
                      SEMESTER II
                    </th>
                    <th
                      colSpan={6}
                      className="border p-2 bg-[#bfb0d8] text-center font-semibold"
                    >
                      OBSERVATIONS
                    </th>
                  </tr>
                  <tr className="text-[10px]">
                    {sem1Codes.map((c) => (
                      <th
                        key={c}
                        className="border p-1 bg-[#e0f2f1] w-12 text-center"
                      >
                        {c}
                      </th>
                    ))}
                    {sem2Codes.map((c) => (
                      <th
                        key={c}
                        className="border p-1 bg-[#e0f2f1] w-12 text-center"
                      >
                        {c}
                      </th>
                    ))}
                    <th className="border p-1 bg-[#d8caec] w-16">
                      Total credits (ΣCi)
                    </th>
                    <th className="border p-1 bg-[#d8caec] w-16">
                      Annual Average
                    </th>
                    <th className="border p-1 bg-[#d8caec] w-20">
                      Previous Failed module
                    </th>
                    <th className="border p-1 bg-[#d8caec] w-20">
                      Current Failed module
                    </th>
                    <th className="border p-1 bg-[#d8caec] w-20">Remark</th>
                    <th className="border p-1 bg-[#d8caec] w-12">PRH</th>
                  </tr>
                  <tr className="text-[10px]">
                    <th className="border p-1 bg-[#fff8f0]" colSpan={3}>
                      Max Mark
                    </th>
                    {sem1Codes.map((_, i) => (
                      <th key={`max1-${i}`} className="border p-1 bg-[#f0f8ff]">
                        100
                      </th>
                    ))}
                    {sem2Codes.map((_, i) => (
                      <th key={`max2-${i}`} className="border p-1 bg-[#f0f8ff]">
                        100
                      </th>
                    ))}
                    <th className="border p-1 bg-[#f0f8ff]" colSpan={6}></th>
                  </tr>
                  <tr className="text-[10px]">
                    <th className="border p-1 bg-[#fff8f0]" colSpan={3}>
                      Pass Mark
                    </th>
                    {Array.from({
                      length: sem1Codes.length + sem2Codes.length,
                    }).map((_, i) => (
                      <th key={`pass-${i}`} className="border p-1 bg-[#fff8f0]">
                        50
                      </th>
                    ))}
                    <th className="border p-1 bg-[#fff8f0]" colSpan={6}></th>
                  </tr>
                  <tr className="text-[10px]">
                    <th className="border p-1 bg-[#f8fff8]" colSpan={3}>
                      Credit (Ci)
                    </th>
                    {sem1Credits.map((c, i) => (
                      <th
                        key={`cred1-${i}`}
                        className="border p-1 bg-[#f8fff8]"
                      >
                        {c}
                      </th>
                    ))}
                    {sem2Credits.map((c, i) => (
                      <th
                        key={`cred2-${i}`}
                        className="border p-1 bg-[#f8fff8]"
                      >
                        {c}
                      </th>
                    ))}
                    <th className="border p-1 bg-[#f8fff8]">130</th>
                    <th className="border p-1 bg-[#f8fff8]" colSpan={5}></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((s, idx) => {
                    // Find the correct index in studentData for the current student
                    const dataIdx = students.findIndex(
                      (stu) => stu.ref === s.ref
                    );
                    return (
                      <React.Fragment key={s.sn}>
                        {/* Numeric scores row */}
                        <tr className="even:bg-muted/30">
                          <td className="border p-1 text-center">{s.sn}</td>
                          <td className="border p-1">{s.ref}</td>
                          <td className="border p-1 text-center">{s.sex}</td>
                          {/* Semester 1 scores */}
                          {studentData[dataIdx]?.scores1.map((score, i) => (
                            <td
                              key={`s1-${i}`}
                              className={`border p-1 text-center ${
                                score < 50 && score > 0
                                  ? "bg-[#ffd9de] text-red-600 font-semibold"
                                  : ""
                              }`}
                            >
                              {score > 0 ? score.toFixed(2) : ""}
                            </td>
                          ))}
                          {/* Semester 2 scores */}
                          {s.status === "ABSCONDED"
                            ? Array.from({ length: sem2Codes.length }).map(
                                (_, i) => (
                                  <td
                                    key={`s2-abs-${i}`}
                                    className="border p-1 text-center bg-[#ffe4ea]"
                                  ></td>
                                )
                              )
                            : studentData[dataIdx]?.scores2.map((score, i) => (
                                <td
                                  key={`s2-${i}`}
                                  className={`border p-1 text-center ${
                                    score < 50
                                      ? "bg-[#ffd9de] text-red-600 font-semibold"
                                      : ""
                                  }`}
                                >
                                  {score.toFixed(2)}
                                </td>
                              ))}
                          <td className="border p-1 text-center">130</td>
                          <td className="border p-1 text-center">
                            {studentData[dataIdx]?.avg > 0
                              ? studentData[dataIdx]?.avg.toFixed(2)
                              : ""}
                          </td>
                          <td className="border p-1"></td>
                          <td className="border p-1"></td>
                          <td className="border p-1 font-semibold">
                            {s.status || "PROGRESS"}
                          </td>
                          <td className="border p-1"></td>
                        </tr>
                        {/* Letter grades row */}
                        <tr className="text-[10px]">
                          <td
                            className="border p-1 text-muted-foreground"
                            colSpan={3}
                          >
                            Letter Grade
                          </td>
                          {/* Semester 1 letter grades */}
                          {studentData[dataIdx]?.scores1.map((score, i) => (
                            <td
                              key={`lg1-${i}`}
                              className="border p-1 text-center text-muted-foreground"
                            >
                              {score > 0 ? getLetterGrade(score) : ""}
                            </td>
                          ))}
                          {/* Semester 2 letter grades */}
                          {s.status === "ABSCONDED"
                            ? Array.from({ length: sem2Codes.length }).map(
                                (_, i) => (
                                  <td
                                    key={`lg2-abs-${i}`}
                                    className="border p-1 text-center text-muted-foreground"
                                  >
                                    F
                                  </td>
                                )
                              )
                            : studentData[dataIdx]?.scores2.map((score, i) => (
                                <td
                                  key={`lg2-${i}`}
                                  className="border p-1 text-center text-muted-foreground"
                                >
                                  {getLetterGrade(score)}
                                </td>
                              ))}
                          <td className="border p-1" colSpan={6}></td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination controls */}
            <div className="flex justify-end items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-xs">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {activeTab === 2 && (
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <p className="text-muted-foreground mb-4 text-sm">
                Summary statistics for students who are repeating courses or the academic year.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f5]">
                    <th className="border p-3 text-left w-96 font-semibold"></th>
                    <th className="border p-3 text-center w-20 font-semibold bg-[#e8f5e8]">F</th>
                    <th className="border p-3 text-center w-20 font-semibold bg-[#e8f5e8]">M</th>
                    <th className="border p-3 text-center w-20 font-semibold bg-[#e8f5e8]">TOT</th>
                  </tr>
                </thead>
                <tbody>
                  {repeatersSummaryData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`${idx === 0 ? "bg-[#f0f0f0] font-semibold text-gray-700 text-sm" : "even:bg-muted/30"}`}
                    >
                      <td className={`border p-3 text-left text-gray-700 text-sm ${idx === 0 ? "font-bold" : ""}`}>
                        {row.category}
                      </td>
                      <td className="border border-gray-200 p-3 text-center text-gray-700 text-sm">{row.f}</td>
                      <td className="border p-3 text-center text-gray-700 text-sm">{row.m}</td>
                      <td className="border p-3 text-center font-semibold text-gray-700 text-sm">{row.tot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Repeaters and Retakers tab */}
      {activeTab === 3 && (
        <Card>
          <CardContent>
            <div className="mb-4">
              <p className="text-muted-foreground text-sm mt-4">
                Detailed results for students repeating courses or retaking failed modules, including original marks.
              </p>
            </div>
            <div>
              <table className="w-full table-fixed text-[9px] border-collapse">
                <colgroup>
                  <col className="w-[28px]" />
                  <col className="w-[92px]" />
                  <col className="w-[32px]" />
                  {rrSem1Codes.map((_, i) => (
                    <col key={`cg1-${i}`} className="w-[60px]" />
                  ))}
                  {rrSem2Codes.map((_, i) => (
                    <col key={`cg2-${i}`} className="w-[60px]" />
                  ))}
                  <col className="w-[56px]" />
                  <col className="w-[70px]" />
                  <col className="w-[70px]" />
                  <col className="w-[70px]" />
                  <col className="w-[86px]" />
                </colgroup>
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th rowSpan={2} className="border p-2 bg-[#cfeac4] w-8">SN</th>
                    <th rowSpan={2} className="border p-2 bg-[#cfeac4] text-left">Ref.No.</th>
                    <th rowSpan={2} className="border p-2 bg-[#cfeac4] w-8">SEX</th>
                    <th colSpan={rrSem1Codes.length} className="border p-2 bg-[#c6f3f1] text-center font-semibold">SEMESTER I</th>
                    <th colSpan={rrSem2Codes.length} className="border p-2 bg-[#c6f3f1] text-center font-semibold">SEMESTER II</th>
                    <th colSpan={5} className="border p-2 bg-[#bfb0d8] text-center font-semibold">OBSERVATIONS</th>
                  </tr>
                  <tr className="text-[9px]">
                    {rrSem1Codes.map((c) => (
                      <th key={c} className="border p-1 bg-[#e0f2f1] text-center truncate">{c}</th>
                    ))}
                    {rrSem2Codes.map((c) => (
                      <th key={c} className="border p-1 bg-[#e0f2f1] text-center truncate">{c}</th>
                    ))}
                    <th className="border p-1 bg-[#d8caec]">Total credits (ΣCi)</th>
                    <th className="border p-1 bg-[#d8caec]">Annual Average (%)</th>
                    <th className="border p-1 bg-[#d8caec]">Previous Failed modules</th>
                    <th className="border p-1 bg-[#d8caec]">Current Failed modules</th>
                    <th className="border p-1 bg-[#d8caec]">Remark</th>
                  </tr>
                  <tr className="text-[9px]">
                    <th className="border p-1 bg-[#f0f8ff]" colSpan={3}>Max. Mark</th>
                    {Array.from({ length: rrSem1Codes.length + rrSem2Codes.length }).map((_, i) => (
                      <th key={`rr-max-${i}`} className="border p-1 bg-[#f0f8ff]">100</th>
                    ))}
                    <th className="border p-1 bg-[#f0f8ff]" colSpan={5}></th>
                  </tr>
                  <tr className="text-[9px]">
                    <th className="border p-1 bg-[#fff8f0]" colSpan={3}>Pass Mark</th>
                    {Array.from({ length: rrSem1Codes.length + rrSem2Codes.length }).map((_, i) => (
                      <th key={`rr-pass-${i}`} className="border p-1 bg-[#fff8f0]">50</th>
                    ))}
                    <th className="border p-1 bg-[#fff8f0]" colSpan={5}></th>
                  </tr>
                  <tr className="text-[9px]">
                    <th className="border p-1 bg-[#f8fff8]" colSpan={3}>Credit (Ci)</th>
                    {rrSem1Credits.map((c, i) => (
                      <th key={`rr-cred1-${i}`} className="border p-1 bg-[#f8fff8]">{c}</th>
                    ))}
                    {rrSem2Credits.map((c, i) => (
                      <th key={`rr-cred2-${i}`} className="border p-1 bg-[#f8fff8]">{c}</th>
                    ))}
                    <th className="border p-1 bg-[#f8fff8]">135</th>
                    <th className="border p-1 bg-[#f8fff8]" colSpan={4}></th>
                  </tr>
                </thead>
                <tbody>
                  {rrStudents.map((s, idx) => (
                    <React.Fragment key={s.sn}>
                      <tr className="even:bg-muted/30">
                        <td className="border px-0.5 py-0.5 text-center">{s.sn}</td>
                        <td className="border px-0.5 py-0.5">{s.ref}</td>
                        <td className="border px-0.5 py-0.5 text-center">{s.sex}</td>
                        {rrStudentScores[idx]?.sem1.map((score, i) => (
                          <td key={`rr-s1-${i}`} className={`border px-0.5 py-0.5 text-center ${score < 50 && score > 0 ? "bg-[#ffd9de] text-red-600 font-semibold" : ""}`}>
                            {score > 0 ? score.toFixed(2) : ""}
                          </td>
                        ))}
                        {rrStudentScores[idx]?.sem2.map((score, i) => (
                          <td key={`rr-s2-${i}`} className={`border px-0.5 py-0.5 text-center ${score < 50 && score > 0 ? "bg-[#ffd9de] text-red-600 font-semibold" : score === 0 ? "bg-[#ffe4ea]" : ""}`}>
                            {score > 0 ? score.toFixed(2) : ""}
                          </td>
                        ))}
                        <td className="border px-0.5 py-0.5 text-center">{s.totalCredits}</td>
                        <td className="border px-0.5 py-0.5 text-center">{s.annualAvg.toFixed(2)}</td>
                        <td className="border px-0.5 py-0.5 text-center text-[9px]">
                          <div className="flex flex-col items-center leading-tight">
                            {s.failedModules.map((m) => (
                              <span key={`prev-${s.ref}-${m}`}>{m}</span>
                            ))}
                          </div>
                        </td>
                        <td className="border px-0.5 py-0.5 text-center text-[9px]">
                          <div className="flex flex-col items-center leading-tight">
                            {s.failedModules.map((m) => (
                              <span key={`curr-${s.ref}-${m}`}>{m}</span>
                            ))}
                          </div>
                        </td>
                        <td className="border px-0.5 py-0.5 font-semibold text-[9px]">{s.remark}</td>
                      </tr>
                      <tr className="text-[9px]">
                        <td className="border px-1 py-0.5 text-muted-foreground" colSpan={3}>Letter Grade</td>
                        {rrStudentScores[idx]?.sem1.map((score, i) => (
                          <td key={`rr-lg1-${i}`} className="border px-1 py-0.5 text-center text-muted-foreground">{score > 0 ? getLetterGrade(score) : ""}</td>
                        ))}
                        {rrStudentScores[idx]?.sem2.map((score, i) => (
                          <td key={`rr-lg2-${i}`} className="border px-1 py-0.5 text-center text-muted-foreground">{score > 0 ? getLetterGrade(score) : score === 0 ? "F" : ""}</td>
                        ))}
                        <td className="border p-1" colSpan={5}></td>
                      </tr>
                      <tr className="text-[9px]">
                        <td className="border px-1 py-0.5 text-muted-foreground" colSpan={3}>Original marks</td>
                        {rrStudentScores[idx]?.sem1Original.map((score, i) => (
                          <td key={`rr-om1-${i}`} className="border px-1 py-0.5 text-center text-red-600 font-semibold">{score ? score.toFixed(2) : ""}</td>
                        ))}
                        {rrStudentScores[idx]?.sem2Original.map((score, i) => (
                          <td key={`rr-om2-${i}`} className="border px-1 py-0.5 text-center text-red-600 font-semibold">{score ? score.toFixed(2) : ""}</td>
                        ))}
                        <td className="border p-1" colSpan={5}></td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
