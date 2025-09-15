import { api } from '@/lib/api';

export interface ModuleAssignment {
  id: string;
  moduleCode: string;
  moduleName: string;
  instructorName: string;
  instructorEmail: string;
  currentEnrollment: number;
  maxStudents: number;
  startDate: string;
  endDate: string;
  academicYearName: string;
  semesterName: string;
  departmentName: string;
  schoolName: string;
  collegeName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModuleAssignmentsResponse {
  content: ModuleAssignment[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}

export interface ModuleAssignmentsParams {
  page?: number;
  size?: number;
  moduleCode?: string;
  instructorName?: string;
  departmentName?: string;
  academicYear?: string;
  semester?: string;
}

export interface SubmissionDeadline {
  submissionType: 'CAT' | 'EXAM';
  deadline: string;
}

// Fixed: The API expects the submissions to be sent directly, not wrapped in a submissions object
export interface CreateSubmissionsRequest {
  submissionType: 'CAT' | 'EXAM';
  deadline: string;
}

export interface CreateSubmissionsResponse {
  success: boolean;
  message: string;
  data: {
    CAT?: DetailedSubmission;
    EXAM?: DetailedSubmission;
  };
  timestamp: string;
}

export interface SubmissionDetails {
  completionPercentage: number;
  submissionId: string;
  isSubmitted: boolean;
  canApprove: boolean;
  statusDisplay: string;
  deadline: string;
  submittedAt?: string;
  isApproved: boolean;
  status: string;
}

// Extended submission details from the create submissions API response
export interface DetailedSubmission {
  id: string;
  submissionTitle: string;
  submissionDescription: string;
  submissionType: 'CAT' | 'EXAM';
  submissionTypeDisplayName: string;
  moduleAssignmentId: string;
  moduleCode: string;
  moduleName: string;
  semesterCode: string;
  semesterName: string;
  academicYear: string | null;
  lecturerName: string;
  groupName: string;
  departmentName: string | null;
  schoolName: string | null;
  processingStatus: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'OVERDUE';
  processingStatusDisplayName: string;
  processingStatusColor: string;
  currentProcessingLevel: string;
  currentProcessingOfficerId: string | null;
  currentProcessingOfficerName: string | null;
  submissionDeadline: string;
  submittedAt: string | null;
  lastProcessedAt: string;
  completedAt: string | null;
  isOverdue: boolean;
  isCompleted: boolean;
  daysUntilDeadline: number;
  daysSinceSubmission: number | null;
  submissionStatistics: {
    totalStudents: number;
    studentsWithCompleteMarks: number;
    studentsWithIncompleteMarks: number;
    absentStudents: number;
    completionPercentage: number;
    averageMarks: number;
    passRate: number;
    gradeDistribution: Record<string, any>;
  };
  workflowSteps: Array<{
    stepName: string;
    processingLevel: string;
    officerId: string | null;
    officerName: string | null;
    status: 'PENDING' | 'COMPLETED' | 'REJECTED';
    completedAt: string | null;
    comments: string | null;
    isRequired: boolean;
    stepOrder: number;
    processingTimeHours: number | null;
  }>;
  currentWorkflowStep: number;
  totalWorkflowSteps: number;
  workflowCompletionPercentage: number;
  validationInfo: {
    isValid: boolean;
    isComplete: boolean;
    validationErrors: string[];
    validationWarnings: string[];
    missingData: string[];
    consistencyScore: number;
    lastValidatedAt: string;
    validatedBy: string | null;
  };
  markSheetInfo: {
    markSheetGenerated: boolean;
    markSheetGeneratedAt: string | null;
    markSheetFormat: string;
    markSheetSize: number | null;
    markSheetLocation: string | null;
    isPublished: boolean;
    publishedAt: string | null;
    publishedBy: string | null;
  };
  approvals: any[];
  requiresApproval: boolean;
  isFullyApproved: boolean;
  finalApproverId: string | null;
  finalApproverName: string | null;
  finalApprovalDate: string | null;
  submittedByUserId: string | null;
  submittedByName: string | null;
  submittedByRole: string;
  totalProcessingActions: number;
  approvalCount: number;
  rejectionCount: number;
  escalationCount: number;
  notificationsEnabled: boolean;
  notificationsSent: number;
  lastNotificationSent: string | null;
  submissionCode: string;
  referenceNumber: string;
  metadata: {
    submissionType: 'CAT' | 'EXAM';
    priorityLevel: string;
    isLocked: boolean;
    gracePeriodHours: number;
  };
  performanceMetrics: {
    totalProcessingTime: number;
    averageStepProcessingTime: number;
    processingEfficiency: number;
    meetsSLA: boolean;
    performanceRating: string;
    qualityScore: number;
    firstTimeRight: boolean;
    revisionCount: number;
  };
  relatedSubmissionIds: string[];
  parentSubmissionId: string | null;
  childSubmissionIds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  lastModifiedBy: string | null;
  approved: boolean;
  pending: boolean;
  rejected: boolean;
  urgencyLevel: string;
  urgencyColor: string;
  overallProgress: number;
  readyForNextStep: boolean;
  submissionAge: string;
}

export interface ModuleSubmissionDetails {
  lecturerId: string;
  groupName: string;
  moduleCode: string;
  lecturerName: string;
  catSubmission: SubmissionDetails;
  moduleName: string;
  semesterName: string;
  examSubmission: SubmissionDetails;
  overallSubmission: {
    submissionId: string;
    canApprove: boolean;
    statusDisplay: string;
    status: string;
  };
  moduleAssignmentId: string;
  groupCode: string;
}

export interface ModuleSubmissionDetailsResponse {
  success: boolean;
  message: string;
  data: ModuleSubmissionDetails;
  timestamp: string;
}

export const moduleAssignmentsApi = {
  getModuleAssignments: async (params: ModuleAssignmentsParams = {}): Promise<ModuleAssignmentsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.moduleCode) queryParams.append('moduleCode', params.moduleCode);
    if (params.instructorName) queryParams.append('instructorName', params.instructorName);
    if (params.departmentName) queryParams.append('departmentName', params.departmentName);
    if (params.academicYear) queryParams.append('academicYear', params.academicYear);
    if (params.semester) queryParams.append('semester', params.semester);

    const response = await api.get(`/academics/module-assignments?${queryParams.toString()}`);
    return response.data.data;
  },

  getModuleSubmissionDetails: async (moduleId: string): Promise<ModuleSubmissionDetailsResponse> => {
    const response = await api.get(`/grading/marks-submission/module/${moduleId}/submission-details`);
    return response.data;
  },

  // Fixed: Send submissions as array directly, matching the API's expected format
  createModuleSubmissions: async (moduleId: string, submissions: SubmissionDeadline[]): Promise<CreateSubmissionsResponse> => {
    console.log('Creating submissions for module:', moduleId);
    console.log('Submissions data:', submissions);
    
    try {
      // The API expects submissions array directly, not wrapped in an object
      const response = await api.post(`/grading/marks-submission/module/${moduleId}/create-submissions`, submissions);
      console.log('API response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data);
      console.error('Status:', error.response?.status);
      console.error('Full error:', error);
      throw error;
    }
  },

  // Keep these for potential future use if individual/bulk deadline updates are added
  updateModuleDeadline: async (moduleId: string, deadline: string): Promise<void> => {
    await api.put(`/academics/module-assignments/${moduleId}/deadline`, {
      deadline
    });
  },

  bulkUpdateDeadlines: async (updates: Array<{ moduleId: string; deadline: string }>): Promise<void> => {
    await api.put('/academics/module-assignments/bulk-deadline-update', {
      updates
    });
  }
};