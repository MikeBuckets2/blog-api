const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/api/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`);
  if (!res.ok) throw new Error('Post not found');
  return res.json();
}

export async function postComment(postId, data) {
  const res = await fetch(`${BASE_URL}/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to post comment');
  return res.json();
}