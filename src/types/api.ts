export interface MediaItem {
  hash: string;
  media_type: string;
  media_title: string;
  season: number | null;
  episode: number | null;
  release_year: number;
  pipeline_status: string;
  error_status: boolean;
  error_condition: string | null;
  rejection_status: 'unfiltered' | 'accepted' | 'rejected' | 'override';
  rejection_reason: string | null;
  parent_path: string | null;
  target_path: string | null;
  original_title: string;
  original_path: string | null;
  original_link: string | null;
  rss_source: string | null;
  uploader: string | null;
  genre: string[];
  language: string[];
  rt_score: number | null;
  metascore: number | null;
  imdb_rating: number | null;
  imdb_votes: number | null;
  imdb_id: string | null;
  resolution: string | null;
  video_codec: string | null;
  upload_type: string | null;
  audio_codec: string | null;
  created_at: string;
  updated_at: string;
  tmdb_id: number | null;
}

export interface MediaResponse {
  data: MediaItem[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
  };
}

export interface RejectionStatusUpdate {
  hash: string;
  rejection_status: 'unfiltered' | 'accepted' | 'rejected' | 'override';
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
} 