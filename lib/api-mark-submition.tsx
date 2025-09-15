
/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string like "1.2 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Interface for group submission data from API
export interface GroupSubmission {
  id: string;
  groupId: string;
  groupName: string;
  groupCode: string;
  status: string;
  statusDisplayName: string;
  statusColorCode: string;
  statusIcon: string;
  isActive: boolean;
  isLocked: boolean;
  lockedAt: string | null;
  lockedBy: string | null;
  submissionNotes: string;
  priorityLevel: string;
  submissionType: string;
  submittedToDeanAt: string;
  submittedToDeanBy: string;
  deanReviewedAt: string | null;
  deanReviewedBy: string | null;
  deanComments: string | null;
  registrarReviewedAt: string | null;
  registrarReviewedBy: string | null;
  registrarComments: string | null;
  principalReviewedAt: string | null;
  principalReviewedBy: string | null;
  principalComments: string | null;
  finalApprovedAt: string | null;
  publishedAt: string | null;
  rejectionReason: string | null;
  currentOfficeId: string;
  responsibleOfficeId: string;
  responsibleOfficeName: string;
  workflowStageDescription: string;
  nextApproverRole: string;
  canBeForwarded: boolean;
  canBeEdited: boolean;
  isFinalState: boolean;
  isHighPriority: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
}

export interface GroupSubmissionsResponse {
  success: boolean;
  message: string;
  data: GroupSubmission[];
  timestamp: string;
}

/**
 * Fetch pending group submissions for officer review
 * @returns Promise<GroupSubmissionsResponse>
 */
export const fetchPendingGroupSubmissions = async (): Promise<GroupSubmissionsResponse> => {
  try {
    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authorization header if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch('/grading/group-submissions/submit-to-dean', {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GroupSubmissionsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pending group submissions:', error);
    throw error;
  }
};

// Interface for approval request data
export interface ApprovalRequest {
  submissionId: string;
  approved: boolean;
  comments: string;
}

export interface ApprovalResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

/**
 * Submit approval/rejection for a group submission
 * @param approvalData - The approval data containing submissionId, approved status, and comments
 * @returns Promise<ApprovalResponse>
 */
export const submitGroupSubmissionApproval = async (approvalData: ApprovalRequest): Promise<ApprovalResponse> => {
  try {
    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authorization header if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Use the proxy API endpoint structure from api.ts
    const response = await fetch('/grading/group-submissions/submit-to-dean', {
      method: 'POST',
      headers,
      body: JSON.stringify(approvalData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApprovalResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting group submission approval:', error);
    throw error;
  }
};