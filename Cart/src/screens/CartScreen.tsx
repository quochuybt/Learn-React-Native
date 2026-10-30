// screens/CartScreen.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useCheckout } from "../hooks/useCheckout";

export default function CartScreen({ navigation }: any) {
  const { items, total, isSubmitting, submit, isSuccess, lastOrderId, error } =
    useCheckout();

  const handleCheckout = async () => {
    const result = await submit("Nguyễn Văn A", "123 Lê Lợi, Q1");
    if (result.meta.requestStatus === "fulfilled") {
      Alert.alert(
        "Đặt hàng thành công",
        `Mã đơn: ${(result.payload as any).id}`,
      );
      navigation.goBack();
    } else {
      Alert.alert("Lỗi", String(error));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={{ flex: 1 }}>
              {item.name} × {item.quantity}
            </Text>
            <Text>{(item.price * item.quantity).toLocaleString()} đ</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng trống</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Tổng: {total.toLocaleString()} đ</Text>
        <TouchableOpacity
          style={[
            styles.btn,
            (!items.length || isSubmitting) && { opacity: 0.5 },
          ]}
          disabled={!items.length || isSubmitting}
          onPress={handleCheckout}
        >
          <Text style={{ color: "#fff" }}>
            {isSubmitting ? "Đang đặt..." : "Đặt hàng"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  empty: { textAlign: "center", marginTop: 40, color: "#888" },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  total: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  btn: {
    backgroundColor: "#2f80ed",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});
