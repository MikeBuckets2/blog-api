const BASE_URL = import.meta.env.VITE_API_URL;

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Login failed');
  }
  return res.json();
}

export async function getAllPosts(token) {
  const res = await fetch(`${BASE_URL}/api/posts/admin`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getAdminPost(id, token) {
  const res = await fetch(`${BASE_URL}/api/posts/${id}/admin`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Post not found');
  return res.json();
}

export async function createPost(data, token) {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function updatePost(id, data, token) {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deletePost(id, token) {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete post');
  return res.json();
}

export async function togglePublish(id, token) {
  const res = await fetch(`${BASE_URL}/api/posts/${id}/publish`, {
    method: 'PATCH',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to toggle publish');
  return res.json();
}

export async function deleteComment(id, token) {
  const res = await fetch(`${BASE_URL}/api/comments/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete comment');
  return res.json();
}