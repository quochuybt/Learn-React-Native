import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

interface PostsState {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  deletingId: number | null;
  actionLoading: boolean;
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
  deletingId: null,
  actionLoading: false,
};

// 1. READ (Lấy danh sách bài viết)
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}?_limit=8`);
      if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status}`);
      return (await response.json()) as Post[];
    } catch (err: any) {
      return rejectWithValue(err.message || 'Không thể tải danh sách bài viết');
    }
  }
);

// 2. CREATE (Thêm bài viết mới)
export const addPost = createAsyncThunk(
  'posts/addPost',
  async (newPost: { title: string; body: string; userId?: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newPost, userId: 1 }),
      });
      if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status}`);
      const data = await response.json();
      // Vì JSONPlaceholder luôn trả id: 101, ta tạo id ngẫu nhiên để tránh trùng key
      return {
        ...data,
        id: Date.now(),
      } as Post;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Không thể thêm bài viết');
    }
  }
);

// 3. UPDATE (Cập nhật bài viết)
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post: Post, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      // JSONPlaceholder trả 500 hoặc 404 cho các id tự tạo mới > 100, do đó nếu có lỗi mạng ta vẫn trả về post để demo mượt mà
      if (!response.ok && post.id > 100) {
        return post;
      }
      if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status}`);
      const data = await response.json();
      return { ...post, ...data } as Post;
    } catch (err: any) {
      // Fallback cho ID mới thêm ở client
      return post;
    }
  }
);

// 4. DELETE (Xóa bài viết)
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok && id <= 100) throw new Error(`Lỗi HTTP: ${response.status}`);
      return id; // Trả về ID để reducer loại khỏi mảng
    } catch (err: any) {
      return id; // Cho phép xoá client-side
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH POSTS
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Lỗi khi tải bài viết';
      })

      // CREATE POST
      .addCase(addPost.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Thêm vào đầu danh sách
        state.items.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = (action.payload as string) || 'Không thể tạo bài viết';
      })

      // UPDATE POST
      .addCase(updatePost.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = (action.payload as string) || 'Không thể cập nhật bài viết';
      })

      // DELETE POST (Xử lý deletingId theo chuẩn Bài 3)
      .addCase(deletePost.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletingId = null;
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state) => {
        state.deletingId = null;
      });
  },
});

export const selectPosts = (state: { posts: PostsState }) => state.posts.items;
export const selectPostsStatus = (state: { posts: PostsState }) => state.posts.status;
export const selectPostsError = (state: { posts: PostsState }) => state.posts.error;
export const selectDeletingId = (state: { posts: PostsState }) => state.posts.deletingId;
export const selectActionLoading = (state: { posts: PostsState }) => state.posts.actionLoading;

export default postsSlice.reducer;

