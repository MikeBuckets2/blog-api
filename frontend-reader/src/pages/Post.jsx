import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, postComment } from '../api';
import CommentForm from '../components/CommentForm';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPost(id)
      .then(setPost)
      .catch(() => setError('Post not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleComment(data) {
    const newComment = await postComment(id, data);
    setPost((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));
  }

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return (
    <div className="container">
      <p className="error">{error}</p>
      <Link to="/" className="back-link">Go back</Link>
    </div>
  );

  return (
    <div className="container">
      <Link to="/" className="back-link">← All posts</Link>
      <article>
        <h1 className="article-title">{post.title}</h1>
        <p className="post-meta">
          {formatDate(post.createdAt)} · {post.author.username}
        </p>
        <div className="article-body">
          {post.content.split('\n').map((para, i) =>
            para ? <p key={i}>{para}</p> : <br key={i} />
          )}
        </div>
      </article>

      <section className="comments-section">
        <p className="label">Comments ({post.comments.length})</p>
        <CommentForm onSubmit={handleComment} />
        {post.comments.length > 0 && (
          <ul className="comment-list">
            {post.comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p className="comment-username">{comment.username}</p>
                <p className="comment-content">{comment.content}</p>
                <p className="comment-date">{formatDate(comment.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}