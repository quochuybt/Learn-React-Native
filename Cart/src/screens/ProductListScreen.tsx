// screens/ProductListScreen.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

export default function ProductListScreen({ navigation }: any) {
  const { products, isLoading, isError, error, refetch } = useProducts();
  const { add, count } = useCart();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Lỗi: {error}</Text>
        <TouchableOpacity onPress={refetch}>
          <Text style={{ color: "blue" }}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text>🛒 Giỏ hàng ({count})</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => add(item)}>
              <Text style={{ color: "#fff" }}>Thêm</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  cartBtn: { padding: 12, backgroundColor: "#eef" },
  row: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  img: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { color: "#d00", marginTop: 4 },
  btn: { backgroundColor: "#2f80ed", padding: 8, borderRadius: 6 },
});
