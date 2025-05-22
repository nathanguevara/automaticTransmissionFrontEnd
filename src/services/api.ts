import { MediaResponse, LabelUpdate, ApiResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/rear-diff';

interface MediaQueryParams {
  media_type?: string;
  label?: 'would_watch' | 'would_not_watch';
  limit?: number;
  offset?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export const api = {
  async getMedia(params: MediaQueryParams = {}): Promise<MediaResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/training?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }
    return response.json();
  },

  async updateLabel(imdb_id: string, label: LabelUpdate): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/training/${imdb_id}/label`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(label),
    });

    if (!response.ok) {
      throw new Error(`Failed to update label: ${response.statusText}`);
    }
    return response.json();
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  },
}; 