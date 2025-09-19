import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function StatsPage() {
  const { shortId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/stats/${shortId}`);
        setData(res.data);
      } catch (e) {
        setError(
          e.response?.data?.error || e.message || "Failed to fetch stats"
        );
      }
    })();
  }, [shortId]);

  if (error)
    return (
      <div className="container">
        <p className="error">{error}</p>
        <Link to="/">Home</Link>
      </div>
    );
  if (!data) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Stats: {data.shortId}</h2>
      <table className="stats-table">
        <tbody>
          <tr>
            <td>Original URL</td>
            <td>
              <a href={data.originalUrl}>{data.originalUrl}</a>
            </td>
          </tr>
          <tr>
            <td>Clicks</td>
            <td>{data.clicks}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>{new Date(data.createdAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <p>
        <Link to="/">Create another</Link>
      </p>
    </div>
  );
}
