import { useState } from 'react';

export default function CommentForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !content.trim()) {
      setError('Both fields are required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onSubmit({ username: username.trim(), content: content.trim() });
      setUsername('');
      setContent('');
    } catch {
      setError('Failed to post comment. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3>Leave a comment</h3>
      {error && <p className="error">{error}</p>}
      <div className="field">
        <label htmlFor="comment-username">Username</label>
        <input
          id="comment-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
        />
      </div>
      <div className="field">
        <label htmlFor="comment-content">Comment</label>
        <textarea
          id="comment-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Write your comment..."
        />
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}