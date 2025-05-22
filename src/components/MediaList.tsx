import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { MediaItem } from '../types/api';

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('API baseURL:', baseURL);

export function MediaList() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    fetchMedia();
  }, [selectedType]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = selectedType !== 'all' ? { media_type: selectedType } : {};
      const response = await api.getMedia(params);
      setMediaItems(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch media items');
    } finally {
      setLoading(false);
    }
  };

  const handleLabelUpdate = async (imdb_id: string, newLabel: 'would_watch' | 'would_not_watch') => {
    try {
      await api.updateLabel(imdb_id, { imdb_id, label: newLabel });
      // Refresh the list after update
      fetchMedia();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update label');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">All Types</option>
          <option value="movie">Movies</option>
          <option value="tv_show">TV Shows</option>
          <option value="tv_season">TV Seasons</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mediaItems.map((item) => (
              <tr key={item.imdb_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.media_title}</div>
                  <div className="text-sm text-gray-500">{item.original_media_title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {item.media_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.release_year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.label === 'would_watch' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select
                    value={item.label}
                    onChange={(e) => handleLabelUpdate(item.imdb_id, e.target.value as 'would_watch' | 'would_not_watch')}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="would_watch">Would Watch</option>
                    <option value="would_not_watch">Would Not Watch</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 