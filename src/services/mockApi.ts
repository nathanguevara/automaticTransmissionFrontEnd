import { MediaResponse, RejectionStatusUpdate, ApiResponse } from '../types/api';
import { mockMediaItems } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getMedia(params: { media_type?: string } = {}): Promise<MediaResponse> {
    await delay(500); // Simulate network delay

    let filteredItems = [...mockMediaItems];
    
    if (params.media_type && params.media_type !== 'all') {
      filteredItems = filteredItems.filter(item => item.media_type === params.media_type);
    }

    return {
      data: filteredItems,
      pagination: {
        total: filteredItems.length,
        limit: 100,
        offset: 0,
        next: null,
        previous: null
      }
    };
  },

  async updateRejectionStatus(hash: string, status: RejectionStatusUpdate): Promise<ApiResponse> {
    await delay(300); // Simulate network delay

    const item = mockMediaItems.find(item => item.hash === hash);
    if (!item) {
      throw new Error('Media item not found');
    }

    // Update the mock data
    item.rejection_status = status.rejection_status;
    item.updated_at = new Date().toISOString();

    return {
      success: true,
      message: 'Rejection status updated successfully'
    };
  },

  async checkHealth(): Promise<boolean> {
    await delay(100); // Simulate network delay
    return true;
  }
}; 