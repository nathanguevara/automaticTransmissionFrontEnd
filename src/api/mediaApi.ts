import api from './axios';
import { Media, MediaFormData } from '@/types/media';

/**
 * Fetch all media entries
 */
export const getAllMedia = async (): Promise<Media[]> => {
  const response = await api.get('/api/media');
  return response.data;
};

/**
 * Fetch a single media entry by ID
 */
export const getMediaById = async (id: number): Promise<Media> => {
  const response = await api.get(`/api/media/${id}`);
  return response.data;
};

/**
 * Create a new media entry
 */
export const createMedia = async (mediaData: MediaFormData): Promise<Media> => {
  const response = await api.post('/api/media', mediaData);
  return response.data;
};

/**
 * Update an existing media entry
 */
export const updateMedia = async (id: number, mediaData: MediaFormData): Promise<Media> => {
  const response = await api.put(`/api/media/${id}`, mediaData);
  return response.data;
};

/**
 * Delete a media entry
 */
export const deleteMedia = async (id: number): Promise<void> => {
  await api.delete(`/api/media/${id}`);
};