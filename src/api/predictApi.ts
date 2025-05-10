import api from './axios';
import { PredictionData, PredictionResult } from '@/types/media';

/**
 * Submit data to the prediction endpoint
 */
export const submitPrediction = async (data: PredictionData): Promise<PredictionResult> => {
  const response = await api.post('/api/predict', data);
  return response.data;
};