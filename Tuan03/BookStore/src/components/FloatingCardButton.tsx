import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../hooks/useCart";

const FloatingCardButton = () => {
  const navigation = useNavigation<any>();
  const { totalQuantity } = useCart();

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("Cart")}
        activeOpacity={0.8}
      >
        <Text style={styles.cartText}>Giỏ hàng</Text>
        {totalQuantity > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FloatingCardButton;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 24,
    right: 20,
    zIndex: 99,
  },
  cartButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#6688ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cartText: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#fff",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 26,
    height: 24,
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
