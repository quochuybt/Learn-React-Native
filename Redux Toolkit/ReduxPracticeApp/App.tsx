import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import UsersScreen from './src/features/users/UsersScreen';
import PostsCrudScreen from './src/features/posts/PostsCrudScreen';
import ShoppingCartLevel3Screen from './src/features/cartLevel3/ShoppingCartLevel3Screen';

type TabType = 'users' | 'posts' | 'cart';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        {/* Top App Bar */}
        <View style={styles.appHeader}>
          <Text style={styles.appTitle}>⚛️ Redux Toolkit Lab</Text>
          <Text style={styles.appBadge}>Thực hành Lập trình di động</Text>
        </View>

        {/* Segmented Tab Navigation Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'users' && styles.tabButtonActive]}
            onPress={() => setActiveTab('users')}
          >
            <Text
              style={[styles.tabButtonText, activeTab === 'users' && styles.tabButtonTextActive]}
            >
              1. Get API
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'posts' && styles.tabButtonActive]}
            onPress={() => setActiveTab('posts')}
          >
            <Text
              style={[styles.tabButtonText, activeTab === 'posts' && styles.tabButtonTextActive]}
            >
              2. CRUD Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'cart' && styles.tabButtonActive]}
            onPress={() => setActiveTab('cart')}
          >
            <Text
              style={[styles.tabButtonText, activeTab === 'cart' && styles.tabButtonTextActive]}
            >
              3. Cart Level 3
            </Text>
          </TouchableOpacity>
        </View>

        {/* Main Screen Content */}
        <View style={styles.screenContainer}>
          {activeTab === 'users' && <UsersScreen />}
          {activeTab === 'posts' && <PostsCrudScreen />}
          {activeTab === 'cart' && <ShoppingCartLevel3Screen />}
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  appBadge: {
    fontSize: 11,
    color: '#4F46E5',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  tabButtonTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});

