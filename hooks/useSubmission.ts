import { useState, useCallback } from 'react';
import { approveCATMarksByHOD, approveExamMarksByHOD } from '@/lib/module-marks/grading-api';

interface UseSubmissionReturn {
  isSubmitting: boolean;
  submissionData: any;
  error: string | null;
  submit: (moduleId: string, type: 'cat' | 'exam') => Promise<void>;
  clearSubmission: () => void;
}

export const useSubmission = (): UseSubmissionReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (moduleId: string, type: 'cat' | 'exam') => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSubmissionData(null);

      let response;
      if (type === 'cat') {
        response = await approveCATMarksByHOD(moduleId);
      } else {
        response = await approveExamMarksByHOD(moduleId);
      }

      setSubmissionData({
        success: true,
        message: `${type.toUpperCase()} marks have been approved successfully.`,
        data: response
      });
    } catch (err: any) {
      setError(err.message || `Failed to approve ${type.toUpperCase()} marks`);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const clearSubmission = useCallback(() => {
    setSubmissionData(null);
    setError(null);
  }, []);

  return {
    isSubmitting,
    submissionData,
    error,
    submit,
    clearSubmission,
  };
};
