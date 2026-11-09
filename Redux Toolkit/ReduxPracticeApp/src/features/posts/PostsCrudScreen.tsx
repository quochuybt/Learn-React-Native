import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  selectPosts,
  selectPostsStatus,
  selectPostsError,
  selectDeletingId,
  selectActionLoading,
  Post,
} from './postsSlice';
import { AppDispatch } from '../../app/store';

export default function PostsCrudScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const deletingId = useSelector(selectDeletingId);
  const actionLoading = useSelector(selectActionLoading);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  // Bắt đầu chỉnh sửa
  const handleStartEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setBody(post.body);
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingPost(null);
    setTitle('');
    setBody('');
  };

  // Submit Thêm mới hoặc Cập nhật
  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tiêu đề bài viết');
      return;
    }
    if (!body.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung bài viết');
      return;
    }

    try {
      if (editingPost) {
        // UPDATE với unwrap()
        await dispatch(
          updatePost({
            id: editingPost.id,
            title: title.trim(),
            body: body.trim(),
            userId: editingPost.userId || 1,
          })
        ).unwrap();
        Alert.alert('Thành công', 'Đã cập nhật bài viết thành công!');
        handleCancelEdit();
      } else {
        // CREATE với unwrap()
        await dispatch(
          addPost({
            title: title.trim(),
            body: body.trim(),
          })
        ).unwrap();
        Alert.alert('Thành công', 'Đã thêm bài viết mới vào đầu danh sách!');
        setTitle('');
        setBody('');
      }
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Thao tác không thành công');
    }
  };

  // DELETE bài viết
  const handleDelete = (id: number) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa bài viết này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa ngay',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deletePost(id)).unwrap();
              Alert.alert('Thành công', 'Đã xóa bài viết thành công!');
            } catch (err: any) {
              Alert.alert('Lỗi', 'Không thể xóa bài viết này');
            }
          },
        },
      ]
    );
  };

  const renderPostItem = ({ item }: { item: Post }) => {
    const isDeleting = deletingId === item.id;
    const isBeingEdited = editingPost?.id === item.id;

    return (
      <View style={[styles.postCard, isBeingEdited && styles.postCardEditing]}>
        <View style={styles.postHeader}>
          <Text style={styles.postIdBadge}>#{item.id}</Text>
          {isBeingEdited && (
            <Text style={styles.editingBadge}>Đang chỉnh sửa</Text>
          )}
        </View>

        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>

        <View style={styles.postActions}>
          <TouchableOpacity
            style={[styles.editButton, isBeingEdited && styles.editButtonActive]}
            onPress={() => handleStartEdit(item)}
            disabled={actionLoading || isDeleting}
          >
            <Text style={styles.editButtonText}>✏️ Sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deleteButton, isDeleting && styles.buttonDisabled]}
            onPress={() => handleDelete(item.id)}
            disabled={isDeleting || actionLoading}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="#DC2626" />
            ) : (
              <Text style={styles.deleteButtonText}>🗑️ Xóa</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Form thêm/sửa bài viết */}
        <View style={styles.formContainer}>
          <View style={styles.formHeaderRow}>
            <Text style={styles.formTitle}>
              {editingPost ? '✏️ Chỉnh sửa bài viết' : '➕ Thêm bài viết mới'}
            </Text>
            {editingPost && (
              <TouchableOpacity onPress={handleCancelEdit}>
                <Text style={styles.cancelLink}>Hủy</Text>
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Tiêu đề bài viết..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#94A3B8"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Nội dung bài viết..."
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={2}
            placeholderTextColor="#94A3B8"
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              editingPost ? styles.submitButtonUpdate : styles.submitButtonCreate,
              actionLoading && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>
                {editingPost ? '💾 Lưu thay đổi' : '🚀 Thêm bài viết'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Danh sách bài viết */}
        <View style={styles.listSection}>
          <View style={styles.listHeaderRow}>
            <Text style={styles.listTitle}>
              📰 Danh sách bài viết ({posts.length})
            </Text>
            <TouchableOpacity onPress={() => dispatch(fetchPosts())}>
              <Text style={styles.refreshLink}>🔄 Làm mới</Text>
            </TouchableOpacity>
          </View>

          {status === 'loading' && posts.length === 0 ? (
            <View style={styles.centerBox}>
              <ActivityIndicator size="large" color="#4F46E5" />
              <Text style={styles.loadingText}>Đang tải bài viết...</Text>
            </View>
          ) : status === 'failed' && posts.length === 0 ? (
            <View style={styles.centerBox}>
              <Text style={styles.errorText}>Lỗi: {error}</Text>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={() => dispatch(fetchPosts())}
              >
                <Text style={styles.retryBtnText}>Thử lại</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPostItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  cancelLink: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  submitButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonCreate: {
    backgroundColor: '#4F46E5',
  },
  submitButtonUpdate: {
    backgroundColor: '#059669',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  refreshLink: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 24,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  postCardEditing: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  postIdBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  editingBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  postBody: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
    gap: 10,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  editButtonActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  editButtonText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 12,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    minWidth: 55,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 12,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 10,
    color: '#64748B',
  },
  errorText: {
    color: '#DC2626',
    marginBottom: 10,
  },
  retryBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

