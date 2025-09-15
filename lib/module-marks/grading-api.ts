// lib/grading-api.ts
import { api } from '@/lib/api';

// Fetch the marksheet Excel file from database
export const fetchModuleMarkSheetExcel = async (moduleId: string): Promise<Blob> => {
  try {
    const response = await api.get(
      `/grading/student-marks/module/${moduleId}/generateModuleMarkSheetExcel`,
      { 
        responseType: 'blob',
        timeout: 30000, // 30 seconds timeout for large files
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching marksheet Excel:', error);
    if (error.response?.status === 404) {
      throw new Error('Marksheet not found for this module');
    } else if (error.response?.status === 500) {
      throw new Error('Server error while generating marksheet');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - marksheet file might be too large');
    } else {
      throw new Error(error.message || 'Failed to fetch marksheet');
    }
  }
};

// Fetch the exam marksheet Excel file from database
export const fetchModuleExamSheetExcel = async (moduleId: string): Promise<Blob> => {
  try {
    const response = await api.get(
      `/grading/exam-marks/module/${moduleId}/generate-exam-sheet`,
      { 
        responseType: 'blob',
        timeout: 30000, // 30 seconds timeout for large files
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching exam sheet Excel:', error);
    if (error.response?.status === 404) {
      throw new Error('Exam sheet not found for this module');
    } else if (error.response?.status === 500) {
      throw new Error('Server error while generating exam sheet');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - exam sheet file might be too large');
    } else {
      throw new Error(error.message || 'Failed to fetch exam sheet');
    }
  }
};

// Approve assessment marks (CATs) by HOD
export const approveCATMarksByHOD = async (moduleId: string): Promise<void> => {
  try {
    const response = await api.post(
      `/grading/marks-submission/module/${moduleId}/approve-cat`,
      {},
      {
        timeout: 30000, // 30 seconds timeout
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error approving CAT marks by HOD:', error);
    if (error.response?.status === 404) {
      throw new Error('Module not found or no CAT marks available');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid approval - please check the marks data');
    } else if (error.response?.status === 409) {
      throw new Error('CAT marks have already been approved');
    } else if (error.response?.status === 500) {
      throw new Error('Server error while approving CAT marks');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - approval is taking longer than expected');
    } else {
      throw new Error(error.message || 'Failed to approve CAT marks by HOD');
    }
  }
};

// Approve exam marks by HOD
export const approveExamMarksByHOD = async (moduleId: string): Promise<void> => {
  try {
    const response = await api.post(
      `/grading/marks-submission/module/${moduleId}/approve-exam`,
      {},
      {
        timeout: 30000, // 30 seconds timeout
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error approving exam marks by HOD:', error);
    if (error.response?.status === 404) {
      throw new Error('Module not found or no exam marks available');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid approval - please check the exam marks data');
    } else if (error.response?.status === 409) {
      throw new Error('Exam marks have already been approved');
    } else if (error.response?.status === 500) {
      throw new Error('Server error while approving exam marks');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - approval is taking longer than expected');
    } else {
      throw new Error(error.message || 'Failed to approve exam marks by HOD');
    }
  }
};

// Submit group marks to dean for approval
export const submitToDean = async (
  groupId: string, 
  semesterId: string, 
  submissionNotes?: string
): Promise<any> => {
  try {
    const response = await api.post(`/grading/group-submissions/submit-to-dean`, {
      groupId,
      semesterId,
      submissionNotes: submissionNotes || "All marks verified and ready for review",
      priorityLevel: "NORMAL",
      submissionType: "REGULAR"
    });
    return response.data;
  } catch (error: any) {
    console.error('Error submitting to dean:', error);
    if (error.response?.status === 404) {
      throw new Error('Group or semester not found');
    } else if (error.response?.status === 409) {
      throw new Error('Marks have already been submitted to dean');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid submission data');
    } else if (error.response?.status === 500) {
      throw new Error('Server error while submitting to dean');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - submission is taking longer than expected');
    } else {
      throw new Error(error.message || 'Failed to submit marks to dean');
    }
  }
};