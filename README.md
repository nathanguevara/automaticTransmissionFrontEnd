# Automatic Transmission UI

A modern React web application for managing media entries and making predictions using a FastAPI backend.

## Features

- Complete CRUD operations for media entries (movies and TV shows)
- Prediction form for content analysis
- Modern, responsive UI with light/dark mode support
- Sortable data tables with search functionality
- Form validation and error handling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A running FastAPI backend service

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure the environment:

Create or modify the `.env` file in the project root:

```
VITE_API_BASE_URL=http://your-backend-api-url
```

Replace `http://your-backend-api-url` with the URL of your FastAPI backend service.

4. Start the development server:

```bash
npm run dev
```

## Backend API Requirements

The application expects the following API endpoints:

### Media Endpoints

- `GET /api/media` - List all media entries
- `GET /api/media/:id` - Get a specific media entry by ID
- `POST /api/media` - Create a new media entry
- `PUT /api/media/:id` - Update an existing media entry
- `DELETE /api/media/:id` - Delete a media entry

### Prediction Endpoint

- `POST /api/predict` - Submit data for prediction

## JSON Payload Formats

### Media Entry

```json
{
  "title": "string",
  "type": "movie" | "tv",
  "release_year": number,
  "genres": string[],
  "languages": string[],
  "metascore": number | null,
  "rt_score": number | null,
  "imdb_rating": number | null,
  "imdb_votes": number | null
}
```

### Prediction Request

```json
{
  "hash": "string",
  "release_year": number,
  "genres": string[],
  "languages": string[],
  "metascore": number | null,
  "rt_score": number | null,
  "imdb_rating": number | null,
  "imdb_votes": number | null
}
```

### Prediction Response

```json
{
  "prediction": "string",
  "confidence": number,
  "alternatives": [
    {
      "prediction": "string",
      "confidence": number
    }
  ],
  "processing_time": number
}
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Technologies Used

- React
- Vite
- Axios
- React Router
- React Hook Form
- Zod
- ShadCN UI
- Tailwind CSS
- Lucide React Icons
- Recharts