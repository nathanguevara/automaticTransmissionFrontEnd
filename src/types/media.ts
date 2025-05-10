export interface Media {
  id: number;
  title: string;
  type: 'movie' | 'tv';
  release_year: number;
  genres: string[];
  languages: string[];
  metascore?: number;
  rt_score?: number;
  imdb_rating?: number;
  imdb_votes?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MediaFormData {
  title: string;
  type: 'movie' | 'tv';
  release_year: number;
  genres: string[];
  languages: string[];
  metascore?: number;
  rt_score?: number;
  imdb_rating?: number;
  imdb_votes?: number;
}

export interface PredictionData {
  hash: string;
  release_year: number;
  genres: string[];
  languages: string[];
  metascore?: number;
  rt_score?: number;
  imdb_rating?: number;
  imdb_votes?: number;
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
  alternatives?: {
    prediction: string;
    confidence: number;
  }[];
  processing_time?: number;
}