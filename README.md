# blog-api

A full-stack blog platform built with Express, Prisma, and React. The backend exposes a REST API consumed by two separate frontends: one for readers and one for the author.

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | Node.js, Express, Prisma          |
| Database  | PostgreSQL                        |
| Auth      | JSON Web Tokens (JWT)             |
| Frontends | React                             |
| Hosting   | Render, Netlify                   |

## Features

- Create, edit, and delete posts
- Toggle posts between draft and published states. Unpublished posts are invisible to readers
- Authenticated author-only dashboard via JWT
- Readers can leave comments with a username
- Author can delete any comment from the edit page
- Separate public and protected API routes