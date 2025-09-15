"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ExcelMarksPage from "@/components/marks/over-all";
import RepeatersComponent from "@/components/marks/repeaters";
import SummaryPage from "@/components/marks/summary";
import { AcademicContextProvider } from '@/app/academicContext';
import { useAcademicYears } from "@/hooks/academic-year-and-semesters/useAcademicYears";
import { useSemesters } from "@/hooks/academic-year-and-semesters/useSemesters";


// Tab component for the class marks view
const ClassMarksTabs: React.FC<{
    activeTab: string;
    setActiveTab: (tab: string) => void;
}> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { key: "summary", label: "Summary" },
        { key: "overall-marks", label: "Overall Marks" },
        { key: "repeaters-retakers", label: "Repeaters & Retakers" },
    ];

    return (
        <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.key
                            ? "border-[#026892] text-[#026892] bg-[#026892]/5"
                            : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Summary tab content
const SummaryTab: React.FC<{ className: string; year: string; groupId: string; academicYearId: string }> = ({ className, year, groupId, academicYearId }) => {
    return (
        <div className="space-y-6">
            <SummaryPage groupId={groupId} academicYearId={academicYearId} />
        </div>
    );
};

// Overall Marks tab content
const OverallMarksTab: React.FC<{ className: string; year: string; groupId: string; academicYearId: string }> = ({ className, year, groupId, academicYearId }) => {

    return (
        <ExcelMarksPage groupId={groupId} academicYearId={academicYearId} />
    );
};

// Repeaters & Retakers tab content
const RepeatersRetakersTab: React.FC<{ className: string; year: string; groupId: string; academicYearId: string }> = ({ className, year, groupId, academicYearId }) => {
    return (
        <RepeatersComponent className={className} year={year} groupId={groupId} academicYearId={academicYearId} />
    );
};

export default function ClassMarksPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState("summary");
    
    // Get group ID from URL search params or localStorage
    const [groupId, setGroupId] = useState<string>("");
    const [semesterId, setSemesterId] = useState<string>("");
    const [academicYearId, setAcademicYearId] = useState<string>("");
    
    // Get stored academic year and semester from localStorage
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedSemester, setSelectedSemester] = useState<string>("");
    
    // Fetch academic years and semesters
    const { years, isLoading: yearsLoading } = useAcademicYears();
    const { semesters, isLoading: semestersLoading } = useSemesters(selectedYear);

    useEffect(() => {
        // Get group ID and other IDs from URL params or localStorage
        const urlGroupId = searchParams.get('groupId') || (typeof window !== "undefined" ? localStorage.getItem("selectedGroupId") : "");
        const urlSemesterId = searchParams.get('semesterId') || (typeof window !== "undefined" ? localStorage.getItem("selectedSemesterId") : "");
        const urlAcademicYearId = (typeof window !== "undefined" ? localStorage.getItem("selectedAcademicYearId") : "");
        
        // Load stored academic year and semester from localStorage
        const storedYear = typeof window !== "undefined" ? localStorage.getItem("selectedAcademicYear") : "";
        const storedSemester = typeof window !== "undefined" ? localStorage.getItem("selectedSemester") : "";
        
        if (urlGroupId) setGroupId(urlGroupId);
        if (urlSemesterId) setSemesterId(urlSemesterId);
        if (urlAcademicYearId) setAcademicYearId(urlAcademicYearId);
        if (storedYear) setSelectedYear(storedYear);
        if (storedSemester) setSelectedSemester(storedSemester);
    }, [searchParams]);

    const className = decodeURIComponent(params.class as string);
    const year = params.year as string;

    const handleBackToMarks = () => {
        router.push("/academic/classes-marks");
    };

    const handleYearChange = (yearId: string) => {
        setSelectedYear(yearId);
        localStorage.setItem("selectedAcademicYear", yearId);
    };

    const handleSemesterChange = (semesterId: string) => {
        setSelectedSemester(semesterId);
        localStorage.setItem("selectedSemester", semesterId);
    };

    return (
        <AcademicContextProvider
            academicYears={years || []}
            selectedYear={selectedYear}
            academicSemesters={semesters || []}
            selectedSemester={selectedSemester}
            isLoading={yearsLoading || semestersLoading}
            error={null}
            onYearChange={handleYearChange}
            onSemesterChange={handleSemesterChange}
        >
            <div className="p-2">
                {/* Back button */}
                <div className="mb-4">
                    <Button
                        variant="outline"
                        onClick={handleBackToMarks}
                        className="flex items-center gap-2 text-[#026892] border-[#026892] hover:bg-[#026892] hover:text-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Marks
                    </Button>
                </div>

                {/* Page title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {className} -  Marks
                    </h1>
                </div>

                {/* Tabs */}
                <ClassMarksTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab content */}
                <div className="mt-6">
                    {activeTab === "summary" && <SummaryTab className={className} year={year} groupId={groupId} academicYearId={academicYearId} />}
                    {activeTab === "overall-marks" && <OverallMarksTab className={className} year={year} groupId={groupId} academicYearId={academicYearId} />}
                    {activeTab === "repeaters-retakers" && <RepeatersRetakersTab className={className} year={year} groupId={groupId} academicYearId={academicYearId} />}
                </div>
            </div>
        </AcademicContextProvider>
    );
}