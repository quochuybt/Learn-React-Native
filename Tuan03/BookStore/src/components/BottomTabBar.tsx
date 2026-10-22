import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps as ReactNavigationBottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useCart } from "../hooks/useCart";

type TabItem = {
  name: string;
  label: string;
  icon: string;
};

const TABS: TabItem[] = [
  {
    name: "Home",
    label: "Trang chủ",
    icon: "⌂",
  },
  {
    name: "Category",
    label: "Danh mục",
    icon: "☰",
  },
  {
    name: "Cart",
    label: "Giỏ hàng",
    icon: "🛒",
  },
  {
    name: "Account",
    label: "Tài khoản",
    icon: "👤",
  },
];

type CustomTabBarProps =
  | ReactNavigationBottomTabBarProps
  | {
      activeTab: number;
      onChange: (index: number) => void;
      state?: never;
    };

const BottomTabBar = (props: CustomTabBarProps) => {
  const { totalQuantity } = useCart();

  // If used directly as React Navigation custom tabBar:
  if ("state" in props && props.state) {
    const { state, descriptors, navigation } = props;
    const activeIndex = state.index;

    return (
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const tabMeta = TABS[index] || {
            label: options.title || route.name,
            icon: "•",
          };
          const label =
            options.tabBarLabel !== undefined
              ? (options.tabBarLabel as string)
              : options.title !== undefined
              ? options.title
              : tabMeta.label;

          const isFocused = activeIndex === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const isCartTab = route.name.toLowerCase().includes("cart") || index === 2;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <Text
                  style={[
                    styles.icon,
                    isFocused && styles.activeIcon,
                  ]}
                >
                  {tabMeta.icon}
                </Text>

                {isCartTab && totalQuantity > 0 && (
                  <View style={styles.badgeWrapper}>
                    <Text style={styles.badgeCount}>
                      {totalQuantity > 99 ? "99+" : totalQuantity}
                    </Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.label,
                  isFocused && styles.activeLabel,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // Fallback for manual usage with activeTab and onChange
  const { activeTab, onChange } = props as {
    activeTab: number;
    onChange: (index: number) => void;
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab, index) => {
        const isActive = activeTab === index;
        const isCartTab = index === 2;

        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tab}
            onPress={() => onChange(index)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Text
                style={[
                  styles.icon,
                  isActive && styles.activeIcon,
                ]}
              >
                {tab.icon}
              </Text>

              {isCartTab && totalQuantity > 0 && (
                <View style={styles.badgeWrapper}>
                  <Text style={styles.badgeCount}>
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                  </Text>
                </View>
              )}
            </View>

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

  iconWrapper: {
    position: "relative",
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

  badgeWrapper: {
    position: "absolute",
    top: -3,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeCount: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});