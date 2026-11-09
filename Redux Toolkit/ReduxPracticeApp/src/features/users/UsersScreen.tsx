import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  selectUsers,
  selectUsersStatus,
  selectUsersError,
  User,
} from './usersSlice';
import { AppDispatch } from '../../app/store';

export default function UsersScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleRefetch = () => {
    dispatch(fetchUsers());
  };

  const renderUserItem = ({ item }: { item: User }) => {
    const initials = item.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    return (
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userUsername}>@{item.username}</Text>
          <Text style={styles.userDetail}>📧 {item.email}</Text>
          <Text style={styles.userDetail}>📞 {item.phone}</Text>
          <Text style={styles.userDetail}>🏢 {item.company.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>👥 Get API - Users</Text>
          <Text style={styles.subtitle}>Sử dụng createAsyncThunk & extraReducers</Text>
        </View>
        <TouchableOpacity style={styles.refetchButton} onPress={handleRefetch}>
          <Text style={styles.refetchText}>🔄 Tải lại</Text>
        </TouchableOpacity>
      </View>

      {/* Trạng thái Status Badge */}
      <View style={styles.statusBadgeRow}>
        <Text style={styles.statusLabel}>Trạng thái Store:</Text>
        <View
          style={[
            styles.statusBadge,
            status === 'loading' && styles.statusBadgeLoading,
            status === 'succeeded' && styles.statusBadgeSuccess,
            status === 'failed' && styles.statusBadgeError,
          ]}
        >
          <Text style={styles.statusBadgeText}>
            {status === 'loading' && '⏳ Đang tải (Loading)...'}
            {status === 'succeeded' && `✅ Thành công (${users.length} users)`}
            {status === 'failed' && '❌ Lỗi kết nối (Failed)'}
            {status === 'idle' && '⚪ Chưa gọi (Idle)'}
          </Text>
        </View>
      </View>

      {/* Loading state */}
      {status === 'loading' && (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Đang lấy dữ liệu từ jsonplaceholder.typicode.com...</Text>
        </View>
      )}

      {/* Error state */}
      {status === 'failed' && (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Đã xảy ra lỗi!</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefetch}>
            <Text style={styles.retryButtonText}>Thử lại ngay</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Succeeded state */}
      {status === 'succeeded' && (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  refetchButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  refetchText: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 13,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
  },
  statusLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
  },
  statusBadgeLoading: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeSuccess: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeError: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  userUsername: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '500',
    marginBottom: 4,
  },
  userDetail: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
  errorBox: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 13,
    color: '#B91C1C',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

