import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BottomTabBar from "../components/BottomTabBar";

const BottomTabScreen = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Text style={styles.title}>Trang chủ</Text>;

      case 1:
        return <Text style={styles.title}>Danh mục</Text>;

      case 2:
        return <Text style={styles.title}>Giỏ hàng</Text>;

      case 3:
        return <Text style={styles.title}>Tài khoản</Text>;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>

      <BottomTabBar
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </SafeAreaView>
  );
};

export default BottomTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});