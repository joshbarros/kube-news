// ── Post ──────────────────────────────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  publishDate: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  summary: string;
  content: string;
}

export interface UpdatePostInput {
  title?: string;
  summary?: string;
  content?: string;
}

// ── API Responses ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
