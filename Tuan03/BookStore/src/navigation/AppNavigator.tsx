import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTabParamList, RootStackParamList } from "./types";

import HomeScreen from "../screen/HomeScreen";
import CategoryScreen from "../screen/CategoryScreen";
import CartScreen from "../screen/CartScreen";
import AccountScreen from "../screen/AccountScreen";
import BookDetailScreen from "../screen/BookDetailScreen";
import CheckoutScreen from "../screen/CheckoutScreen";
import BottomTabBar from "../components/BottomTabBar";

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Bottom Tab Navigator với 4 tab (Home, Danh mục, Giỏ hàng, Tài khoản)
// Dùng lại toàn bộ UI Tab Bar tuần 3-4 làm custom tabBar (Bài tập 1)
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{ title: "Danh mục" }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Giỏ hàng" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "Tài khoản" }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator cho toàn bộ ứng dụng:
// - MainTabs: Chứa 4 tab chính
// - BookDetail: Màn hình chi tiết sách (nhận bookId qua route.params)
// - Checkout: Màn hình thanh toán (Bài tập 2, nhận totalAmount qua route.params)
export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      {/* Fallback alias screens */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
