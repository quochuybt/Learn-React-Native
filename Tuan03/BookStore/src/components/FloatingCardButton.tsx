import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const FloatingCardButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View pointerEvents="box-none">
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("Cart")}
        activeOpacity={0.8}
      >
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
