import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllPosts, deletePost, togglePublish } from '../api';

export default function Dashboard() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts(token)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, [token]);

  async function handleDelete(id) {
    if (!window.confirm('Delete this post and all its comments?')) return;
    await deletePost(id, token);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleToggle(id) {
    const updated = await togglePublish(id, token);
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: updated.published } : p))
    );
  }

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="page-heading">Posts</h1>
        <Link to="/new" className="btn-primary">
          New Post
        </Link>
      </div>

      {posts.length === 0 && (
        <p className="muted">No posts yet. Write your first one.</p>
      )}

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-row">
            <div className="post-row-info">
              <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                {post.published ? 'Live' : 'Draft'}
              </span>
              <Link to={`/edit/${post.id}`} className="post-row-title">
                {post.title}
              </Link>
              <span className="muted small">
                {post._count.comments} comment{post._count.comments !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="post-row-actions">
              <button onClick={() => handleToggle(post.id)} className="btn-ghost">
                {post.published ? 'Unpublish' : 'Publish'}
              </button>
              <Link to={`/edit/${post.id}`} className="btn-ghost">
                Edit
              </Link>
              <button onClick={() => handleDelete(post.id)} className="btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}