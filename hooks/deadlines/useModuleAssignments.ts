import { useState, useEffect, useCallback } from 'react';
import { 
  moduleAssignmentsApi, 
  ModuleAssignment, 
  ModuleAssignmentsParams, 
  DeadlineSubmission,
  CreateSubmissionsResponse,
  ModuleSubmissionDetailsResponse
} from '@/lib/deadlines/moduleAssignmentsApi';

interface UseModuleAssignmentsReturn {
  data: ModuleAssignment[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  refetch: () => void;
  clearError: () => void;
  updateFilters: (filters: Partial<ModuleAssignmentsParams>) => void;
    createSubmissions: (moduleId: string, deadlines: { catDeadline: string; examDeadline: string }) => Promise<CreateSubmissionsResponse>;
  isCreatingSubmissions: boolean;
  submissionError: string | null;
  getSubmissionDetails: (moduleId: string) => Promise<ModuleSubmissionDetailsResponse>;
  isLoadingSubmissionDetails: boolean;
  submissionDetailsError: string | null;
}

export const useModuleAssignments = (
  initialParams: ModuleAssignmentsParams = {}
): UseModuleAssignmentsReturn => {
  const [data, setData] = useState<ModuleAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isCreatingSubmissions, setIsCreatingSubmissions] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isLoadingSubmissionDetails, setIsLoadingSubmissionDetails] = useState(false);
  const [submissionDetailsError, setSubmissionDetailsError] = useState<string | null>(null);
  const [params, setParams] = useState<ModuleAssignmentsParams>({
    page: 0,
    size: 20,
    ...initialParams
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await moduleAssignmentsApi.getModuleAssignments(params);
      
      setData(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch module assignments';
      setError(errorMessage);
      console.error('Error fetching module assignments:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setPage = useCallback((page: number) => {
    setParams(prev => ({
      ...prev,
      page
    }));
  }, []);

  const updateFilters = useCallback((filters: Partial<ModuleAssignmentsParams>) => {
    setParams(prev => ({
      ...prev,
      ...filters,
      page: 0
    }));
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const clearError = useCallback(() => {
    setError(null);
    setSubmissionError(null);
    setSubmissionDetailsError(null);
  }, []);

  const createSubmissions = useCallback(async (moduleId: string, deadlines: { catDeadline: string; examDeadline: string }): Promise<CreateSubmissionsResponse> => {
    try {
      setIsCreatingSubmissions(true);
      setSubmissionError(null);
      
      console.log('Hook: Creating submissions for module:', moduleId);
      console.log('Hook: Deadlines data:', deadlines);
      
      const response = await moduleAssignmentsApi.createModuleSubmissions(moduleId, deadlines);
      
      console.log('Hook: API Response:', response);
      
      if (response.success) {
        // Refresh the data after successful creation
        await fetchData();
      }
      
      return response;
    } catch (err: any) {
      console.error('Hook: Error creating submissions:', err);
      
      let errorMessage = 'Failed to create submissions';
      
      // Extract error message from various possible locations
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data && typeof err.response.data === 'string') {
        errorMessage = err.response.data;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setSubmissionError(errorMessage);
      throw err;
    } finally {
      setIsCreatingSubmissions(false);
    }
  }, [fetchData]);

  const getSubmissionDetails = useCallback(async (moduleId: string): Promise<ModuleSubmissionDetailsResponse> => {
    try {
      setIsLoadingSubmissionDetails(true);
      setSubmissionDetailsError(null);
      
      console.log('Hook: Fetching submission details for module:', moduleId);
      
      const response = await moduleAssignmentsApi.getModuleSubmissionDetails(moduleId);
      
      console.log('Hook: Submission details response:', response);
      
      return response;
    } catch (err: any) {
      console.error('Hook: Error fetching submission details:', err);
      
      let errorMessage = 'Failed to fetch submission details';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data && typeof err.response.data === 'string') {
        errorMessage = err.response.data;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setSubmissionDetailsError(errorMessage);
      throw err;
    } finally {
      setIsLoadingSubmissionDetails(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    totalElements,
    totalPages,
    currentPage: params.page || 0,
    setPage,
    refetch,
    clearError,
    updateFilters,
    createSubmissions,
    isCreatingSubmissions,
    submissionError,
    getSubmissionDetails,
    isLoadingSubmissionDetails,
    submissionDetailsError
  };
};