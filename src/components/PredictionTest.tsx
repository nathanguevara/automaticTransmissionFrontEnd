import { useState } from 'react';
import { submitPrediction } from '@/api/predictApi';
import type { PredictionData, PredictionResult } from '@/types/media';

export function PredictionTest() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: PredictionData = {
      hash: formData.get('hash') as string,
      release_year: parseInt(formData.get('release_year') as string),
      genres: (formData.get('genres') as string).split(',').map(g => g.trim()),
      languages: (formData.get('languages') as string).split(',').map(l => l.trim()),
      metascore: formData.get('metascore') ? parseInt(formData.get('metascore') as string) : undefined,
      rt_score: formData.get('rt_score') ? parseInt(formData.get('rt_score') as string) : undefined,
      imdb_rating: formData.get('imdb_rating') ? parseFloat(formData.get('imdb_rating') as string) : undefined,
      imdb_votes: formData.get('imdb_votes') ? parseInt(formData.get('imdb_votes') as string) : undefined,
    };

    try {
      const response = await submitPrediction(data);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Test Prediction API</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Hash:</label>
          <input
            type="text"
            name="hash"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Release Year:</label>
          <input
            type="number"
            name="release_year"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Genres (comma-separated):</label>
          <input
            type="text"
            name="genres"
            required
            className="w-full p-2 border rounded"
            placeholder="Action, Drama, Sci-Fi"
          />
        </div>

        <div>
          <label className="block mb-1">Languages (comma-separated):</label>
          <input
            type="text"
            name="languages"
            required
            className="w-full p-2 border rounded"
            placeholder="English, Spanish"
          />
        </div>

        <div>
          <label className="block mb-1">Metascore (optional):</label>
          <input
            type="number"
            name="metascore"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">RT Score (optional):</label>
          <input
            type="number"
            name="rt_score"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">IMDB Rating (optional):</label>
          <input
            type="number"
            name="imdb_rating"
            step="0.1"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">IMDB Votes (optional):</label>
          <input
            type="number"
            name="imdb_votes"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Submitting...' : 'Submit Prediction'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h3 className="font-bold">Prediction Result:</h3>
          <p>Prediction: {result.prediction}</p>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
          {result.processing_time && (
            <p>Processing Time: {result.processing_time.toFixed(2)}s</p>
          )}
          {result.alternatives && result.alternatives.length > 0 && (
            <div className="mt-2">
              <h4 className="font-bold">Alternative Predictions:</h4>
              <ul className="list-disc list-inside">
                {result.alternatives.map((alt, index) => (
                  <li key={index}>
                    {alt.prediction} ({(alt.confidence * 100).toFixed(2)}%)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 