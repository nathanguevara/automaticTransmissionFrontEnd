export const MEDIA_TYPES = [
  { value: 'movie', label: 'Movie' },
  { value: 'tv', label: 'TV Show' },
];

export const GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 
  'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 
  'History', 'Horror', 'Music', 'Musical', 'Mystery', 
  'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
];

export const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 
  'Japanese', 'Korean', 'Chinese', 'Russian', 'Arabic', 
  'Hindi', 'Portuguese', 'Swedish', 'Dutch', 'Danish',
  'Norwegian', 'Finnish', 'Turkish', 'Greek', 'Polish'
];

export const INITIAL_MEDIA_FORM: Omit<MediaFormData, 'id'> = {
  title: '',
  type: 'movie',
  release_year: new Date().getFullYear(),
  genres: [],
  languages: [],
  metascore: undefined,
  rt_score: undefined,
  imdb_rating: undefined,
  imdb_votes: undefined,
};

export const INITIAL_PREDICTION_FORM: PredictionData = {
  hash: '',
  release_year: new Date().getFullYear(),
  genres: [],
  languages: [],
  metascore: undefined,
  rt_score: undefined,
  imdb_rating: undefined,
  imdb_votes: undefined,
};

import { PredictionData, MediaFormData } from '@/types/media';