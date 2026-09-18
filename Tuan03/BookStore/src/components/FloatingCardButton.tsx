import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const FloatingCardButton = () => {
  return (
    <View>
      <TouchableOpacity style={styles.cartButton}>
        <Text style={styles.cartText}>Giỏ hàng</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>4</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingCardButton;

const styles = StyleSheet.create({
  cartButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6688ff",
    justifyContent: "center",
    alignItems: "center",
  },
  cartText: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#fff",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: -5,
    width: 30,
    height: 24,
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
