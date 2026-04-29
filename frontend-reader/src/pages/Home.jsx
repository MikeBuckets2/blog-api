import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError('Could not load posts.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p className="error">{error}</p></div>;

  return (
    <div className="container">
      <p className="label">All Posts</p>
      {posts.length === 0 && <p className="muted">No posts yet.</p>}
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/post/${post.id}`}>
              <h2 className="post-title">{post.title}</h2>
            </Link>
            <p className="post-meta">
              {formatDate(post.createdAt)}
              {' · '}
              {post.author.username}
              {' · '}
              {post._count.comments} comment{post._count.comments !== 1 ? 's' : ''}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}