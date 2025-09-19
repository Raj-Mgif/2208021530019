import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setShortUrl('');
    try {
      const res = await axios.post(`${API_BASE}/api/shorten`, { url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to shorten');
    }
  }

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/long/path" />
        <button type="submit">Shorten</button>
      </form>
      {error && <p className="error">{error}</p>}
      {shortUrl && (
        <div className="result">
          <p>Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a></p>
          <p><Link to={`/stats/${shortUrl.split('/').pop()}`}>View stats</Link></p>
        </div>
      )}
    </div>
  );
}
