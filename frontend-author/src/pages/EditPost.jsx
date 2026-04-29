import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAdminPost, updatePost, deleteComment } from '../api';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function EditPost() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminPost(id, token)
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setPublished(data.published);
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updatePost(id, { title, content, published }, token);
      navigate('/');
    } catch {
      setError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteComment(commentId) {
    if (!window.confirm('Delete this comment?')) return;
    await deleteComment(commentId, token);
    setPost((prev) => ({
      ...prev,
      comments: prev.comments.filter((c) => c.id !== commentId),
    }));
  }

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Dashboard
      </Link>
      <h1 className="page-heading">Edit Post</h1>

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
            Published
          </label>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {post.comments && post.comments.length > 0 && (
        <section className="comments-section">
          <p className="label">Comments ({post.comments.length})</p>
          <ul className="admin-comment-list">
            {post.comments.map((comment) => (
              <li key={comment.id} className="admin-comment-item">
                <div className="admin-comment-body">
                  <p className="comment-username">
                    {comment.username}
                    <span className="muted"> · {formatDate(comment.createdAt)}</span>
                  </p>
                  <p className="comment-content">{comment.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}