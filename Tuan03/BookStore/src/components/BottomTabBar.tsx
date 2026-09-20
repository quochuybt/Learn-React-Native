import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TabItem = {
  label: string;
  icon: string;
};

const TABS: TabItem[] = [
  {
    label: "Trang chủ",
    icon: "⌂",
  },
  {
    label: "Danh mục",
    icon: "☰",
  },
  {
    label: "Giỏ hàng",
    icon: "🛒",
  },
  {
    label: "Tài khoản",
    icon: "👤",
  },
];

type BottomTabBarProps = {
  activeTab: number;
  onChange: (index: number) => void;
};

const BottomTabBar = ({
  activeTab,
  onChange,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab, index) => {
        const isActive = activeTab === index;

        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tab}
            onPress={() => onChange(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.icon,
                isActive && styles.activeIcon,
              ]}
            >
              {tab.icon}
            </Text>

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 24,
    marginBottom: 4,
    color: "#777",
  },

  label: {
    fontSize: 12,
    color: "#777",
  },

  activeIcon: {
    color: "#4058c9",
  },

  activeLabel: {
    color: "#4058c9",
    fontWeight: "bold",
  },
});