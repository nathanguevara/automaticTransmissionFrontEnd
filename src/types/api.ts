export interface MediaItem {
  imdb_id: string;
  tmdb_id: number;
  label: 'would_watch' | 'would_not_watch';
  media_type: string;
  media_title: string;
  season: number | null;
  episode: number | null;
  release_year: number;
  budget: number;
  revenue: number;
  runtime: number;
  origin_country: string[];
  production_companies: string[];
  production_countries: string[];
  production_status: string;
  original_language: string;
  spoken_languages: string[];
  genre: string[];
  original_media_title: string;
  tagline: string;
  overview: string;
  tmdb_rating: number;
  tmdb_votes: number;
  rt_score: number | null;
  metascore: number | null;
  imdb_rating: number | null;
  imdb_votes: number | null;
  human_labeled: boolean | null;
  anomalous: boolean | null;
  created_at: string;
  updated_at: string;
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

export interface LabelUpdate {
  imdb_id: string;
  label: 'would_watch' | 'would_not_watch';
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
} 