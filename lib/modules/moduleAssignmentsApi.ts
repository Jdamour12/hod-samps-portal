import { api } from '@/lib/api';

export interface ModuleAssignment {
  id: string;
  moduleId: string;
  moduleCode: string;
  moduleName: string;
  moduleCredits: number;
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  groupId: string;
  groupCode: string;
  groupName: string;
  academicYearId: string;
  academicYearName: string;
  semesterId: string;
  semesterName: string;
  semesterNumber: number;
  programId: string | null;
  programName: string | null;
  programCode: string | null;
  yearLevel: number | null;
  assignmentDate: string;
  startDate: string;
  endDate: string;
  creditHours: number | null;
  contactHours: number;
  assignmentType: string;
  notes: string;
  isActive: boolean;
  isPrimary: boolean;
  teachingMethods: string | null;
  assessmentMethods: string | null;
  venue: string | null;
  schedule: string | null;
  maxStudents: number;
  currentEnrollment: number;
  status: string;
  departmentName: string;
  schoolName: string;
  collegeName: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface ModuleAssignmentsResponse {
  success: boolean;
  message: string;
  data: {
    content: ModuleAssignment[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  timestamp: string;
}

export interface ModuleAssignmentsParams {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
  academicYearId?: string;
  semesterId?: string;
  departmentName?: string;
  instructorId?: string;
}

// API functions
export const moduleAssignmentsApi = {
  // Get all module assignments with optional filters and pagination
  getModuleAssignments: async (params?: ModuleAssignmentsParams): Promise<ModuleAssignmentsResponse> => {
    const response = await api.get('/academics/module-assignments', { params });
    return response.data;
  },

  // Get a specific module assignment by ID
  getModuleAssignmentById: async (id: string): Promise<{ success: boolean; data: ModuleAssignment; message: string }> => {
    const response = await api.get(`/academics/module-assignments/${id}`);
    return response.data;
  },

  // Get module assignments by instructor ID
  getModuleAssignmentsByInstructor: async (instructorId: string, params?: ModuleAssignmentsParams): Promise<ModuleAssignmentsResponse> => {
    const response = await api.get(`/academics/module-assignments/instructor/${instructorId}`, { params });
    return response.data;
  },

  // Get module assignments by academic year
  getModuleAssignmentsByAcademicYear: async (academicYearId: string, params?: ModuleAssignmentsParams): Promise<ModuleAssignmentsResponse> => {
    const response = await api.get(`/academics/module-assignments/academic-year/${academicYearId}`, { params });
    return response.data;
  },

  // Get module assignments by semester
  getModuleAssignmentsBySemester: async (semesterId: string, params?: ModuleAssignmentsParams): Promise<ModuleAssignmentsResponse> => {
    const response = await api.get(`/academics/module-assignments/semester/${semesterId}`, { params });
    return response.data;
  },
};