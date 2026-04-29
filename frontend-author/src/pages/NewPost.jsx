import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../api';

export default function NewPost() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await createPost({ title, content, published }, token);
      navigate('/');
    } catch {
      setError('Failed to create post.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Dashboard
      </Link>
      <h1 className="page-heading">New Post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        {error && <p className="error">{error}</p>}
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={18}
            required
          />
        </div>
        <div className="field-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Publish immediately
          </label>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  );
}