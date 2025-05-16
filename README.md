# Automatic Transmission Frontend

This is a React-based frontend application containerized and ready for Kubernetes deployment.

## Project Structure

```
.
├── src/                    # Source code
├── Dockerfile             # Multi-stage build configuration
├── nginx.conf             # Nginx server configuration
├── k8s/                   # Kubernetes configurations
│   └── deployment.yaml    # Deployment and service configuration
└── package.json          # Project dependencies
```

## Prerequisites

- Node.js 20.x or later
- Docker
- Kubernetes cluster
- kubectl configured to access your cluster
- Container registry (e.g., Docker Hub, GitHub Container Registry)

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

## Building and Running with Docker

1. Build the Docker image:
   ```bash
   docker build -t frontend:latest .
   ```

2. Run the container locally:
   ```bash
   docker run -p 80:80 frontend:latest
   ```

## Kubernetes Deployment

### 1. Prepare Environment Variables

Create a `.env` file in the root directory:
```env
DOCKER_REGISTRY=your-registry.com  # e.g., docker.io/username
```

### 2. Build and Push Docker Image

```bash
# Build the image
docker build -t ${DOCKER_REGISTRY}/frontend:latest .

# Push to your registry
docker push ${DOCKER_REGISTRY}/frontend:latest
```

### 3. Deploy to Kubernetes

```bash
# Apply the Kubernetes configuration
kubectl apply -f k8s/deployment.yaml
```

### 4. Verify Deployment

```bash
# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get services
```

## Configuration Details

### Docker Setup
- Uses multi-stage build to minimize final image size
- Builds the React application in a Node.js container
- Serves the built application using Nginx

### Nginx Configuration
- Configured for single-page application routing
- Enables gzip compression for better performance
- Sets up caching for static assets
- Includes security headers

### Kubernetes Configuration
- Deploys 2 replicas for high availability
- Sets resource limits and requests:
  - CPU: 100m-200m
  - Memory: 128Mi-256Mi
- Creates a ClusterIP service for internal access

## Monitoring and Maintenance

### View Logs
```bash
kubectl logs -l app=frontend
```

### Scale Deployment
```bash
kubectl scale deployment frontend --replicas=3
```

### Update Deployment
```bash
# After pushing a new image
kubectl set image deployment/frontend frontend=${DOCKER_REGISTRY}/frontend:new-tag
```

## Troubleshooting

1. If pods are not starting:
   ```bash
   kubectl describe pod -l app=frontend
   ```

2. If service is not accessible:
   ```bash
   kubectl describe service frontend
   ```

3. Check nginx logs inside the container:
   ```bash
   kubectl exec -it <pod-name> -- nginx -t
   ```

## Security Considerations

- The application runs as a non-root user in the container
- Security headers are configured in nginx
- Resource limits are set to prevent resource exhaustion
- Environment variables are used for sensitive configuration

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

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

## Project Functionality

The intended future state is to provide a modular front-end to the automatic-transmission platfrom.
> see full automatic-transmission platform documentation [here](https://github.com/x81k25/automatic-transmission/wiki)

**Future state features**:
- the ability to manually tag/re-tag items for training of the reel-driver API model
- ability to view and browse one's media library
- ability to remove items, including all files from one's media library
- ability to dynamically search for and item new media items end-to-end

### re-tagging training items

The underlying model of the reel-driver media prediction API service will be retrained on a weekly basis. automaticTransmissionFrontEnd will give users a way to manually re-tag new items to improve the performance of all future predictions

**Functionality**:
- view the full automatic-transmission library
- select which columns to view
- sort by any column
- manually re-tag items for improved training
  - re-tagged items will update exist database records and be pulled in on the next training cycle

## Backend API Requirements

automaticTransmissionFrontEnd will be served by a separate API containerized API within the automatic-transmission platform. For testing and documentation purposes the endpoint of that API will be listed here.

### GET /media

Retrieves all media entries from the database.

**Description**
This endpoint returns a collection of all media items stored in the system. Each item contains detailed information about media files including identification, content metadata, processing status, and technical specifications.

**HTTP Method**
`GET`

**Parameters**
No required parameters for basic retrieval of all items.

**Optional Query Parameters**
- `media_type`: Filter by media type (e.g., "movie", "tv")
- `pipeline_status`: Filter by processing status (e.g., "ingested", "rejected")
- `limit`: Maximum number of records to return (default: 100)
- `offset`: Number of records to skip (for pagination)
- `sort_by`: Field to sort results by (default: "created_at")
- `sort_order`: Direction of sort ("asc" or "desc", default: "desc")

#### Response
Returns a JSON array of media objects with the following structure:

**Success Response (200 OK)**
```json
{
  "data": [
    {
      "hash": "eb50f630702e8a59ef6ecfaf9f5eecae7a9856a1",
      "media_type": "movie",
      "media_title": "40 Under 40",
      "season": null,
      "episode": null,
      "release_year": 2013,
      "pipeline_status": "rejected",
      "error_status": false,
      "error_condition": "media ratings API status code: 401",
      "rejection_status": "rejected",
      "rejection_reason": "resolution 720p is not in allowed_values",
      "parent_path": null,
      "target_path": null,
      "original_title": "40 Under 40 (2013) [720p] [WEBRip] [YTS.MX]",
      "original_path": null,
      "original_link": "https://yts.mx/torrent/download/EB50F630702E8A59EF6ECFAF9F5EECAE7A9856A1",
      "rss_source": null,
      "uploader": null,
      "genre": ["Documentary"],
      "language": ["en"],
      "rt_score": null,
      "metascore": null,
      "imdb_rating": null,
      "imdb_votes": null,
      "imdb_id": "tt2759766",
      "resolution": "720p",
      "video_codec": null,
      "upload_type": "WEBRip",
      "audio_codec": null,
      "created_at": "2025-05-07T20:33:57.738163Z",
      "updated_at": "2025-05-07T20:33:57.738163Z",
      "tmdb_id": 802473
    }
    // Additional media items...
  ],
  "pagination": {
    "total": 1245,
    "limit": 100,
    "offset": 0,
    "next": "/media?offset=100&limit=100",
    "previous": null
  }
}
```

**Error Response (500 Internal Server Error)**
```json
{
  "error": "Database error occurred",
  "details": "Error details here"
}
```

#### Example Requests

1. Get all movies sorted by most recent
```
GET /media?media_type=movie&limit=10&sort_by=release_year&sort_order=desc
```

2. Get rejected media items
```
GET /media?pipeline_status=rejected&limit=25&sort_by=updated_at&sort_order=desc
```

3. Get documentaries in English
```
GET /media?genre=Documentary&language=en&limit=50
```

#### JavaScript Examples (React)

Here are examples of how to fetch data from the Media API in a React application:

**Using Fetch API**
```javascript
import { useEffect, useState } from 'react';

function MediaList() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example 1: Get recent movies
    const fetchRecentMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/media?media_type=movie&limit=10&sort_by=release_year&sort_order=desc');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setMedia(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMovies();
  }, []);

  if (loading) return <p>Loading media...</p>;
  if (error) return <p>Error loading media: {error}</p>;

  return (
    <div>
      <h2>Recent Movies</h2>
      <ul>
        {media.map(item => (
          <li key={item.hash}>
            {item.media_title} ({item.release_year})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Using Axios**
```javascript
import { useEffect, useState } from 'react';
import axios from 'axios';

function RejectedMediaList() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example 2: Get rejected media items
    const fetchRejectedMedia = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/media', {
          params: {
            pipeline_status: 'rejected',
            limit: 25,
            sort_by: 'updated_at',
            sort_order: 'desc'
          }
        });
        
        setMedia(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedMedia();
  }, []);

  // Component rendering...
}
```

**Custom Hook Example**
```javascript
// hooks/useMedia.js
import { useState, useEffect } from 'react';

export function useMedia(queryParams = {}) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        
        // Build query string from params object
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          params.append(key, value);
        });
        
        const response = await fetch(`/media?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result.data);
        setPagination(result.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [JSON.stringify(queryParams)]); // Re-fetch when query params change

  return { data, pagination, loading, error };
}

// Usage in component
function DocumentariesList() {
  const { data, loading, error } = useMedia({
    genre: 'Documentary',
    language: 'en',
    limit: 50
  });

  // Component rendering...
}
```

### PATCH /media/{hash}/rejection-status

Updates the rejection status for a specific media item.

**Description**
This endpoint allows users to update the `rejection_status` column in the database for a media item identified by its hash.

**HTTP Method**
`PATCH`

**Path Parameters**
- `hash`: The unique identifier (40-character SHA-1 hash) of the media item to update

**Request Body**
```json
{
  "hash": "eb50f630702e8a59ef6ecfaf9f5eecae7a9856a1",
  "rejection_status": "accepted"
}
```

**Required Fields**
- `hash`: String - The 40-character SHA-1 hash of the media item (must match the hash in the URL path)
- `rejection_status`: String - The new rejection status value
  - Valid values: "unfiltered", "accepted", "rejected", "override"

#### Responses

**Success Response (200 OK)**
```json
{
  "success": true,
  "message": "Rejection status updated successfully"
}
```

#### Error Responses

**400 Bad Request**
```json
{
  "success": false,
  "error": "Invalid request",
  "message": "Rejection status must be one of: unfiltered, accepted, rejected, override"
}
```

**400 Bad Request (Hash Mismatch)**
```json
{
  "success": false,
  "error": "Hash mismatch",
  "message": "Path hash and body hash do not match"
}
```

**404 Not Found**
```json
{
  "success": false,
  "error": "Media not found",
  "message": "No media found with hash: eb50f630702e8a59ef6ecfaf9f5eecae7a9856a1"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": "Database error",
  "message": "Error details here"
}
```

#### JavaScript Example (React)

```javascript
import { useState } from 'react';

function UpdateRejectionStatus({ mediaHash }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleStatusUpdate = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`/media/${mediaHash}/rejection-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          hash: mediaHash,
          rejection_status: status 
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }
      
      setResult({ success: true, message: data.message });
    } catch (error) {
      setResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Update Rejection Status</h3>
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)}
        disabled={loading}
      >
        <option value="">Select status...</option>
        <option value="unfiltered">Unfiltered</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="override">Override</option>
      </select>
      
      <button 
        onClick={handleStatusUpdate} 
        disabled={!status || loading}
      >
        {loading ? 'Updating...' : 'Update Status'}
      </button>
      
      {result && (
        <div className={result.success ? 'success' : 'error'}>
          {result.message}
        </div>
      )}
    </div>
  );
}
```