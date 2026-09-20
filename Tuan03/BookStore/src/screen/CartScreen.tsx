import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import BottomTabBar from "../components/BottomTabBar";

interface CartItem {
  id: number;
  source: any;
  title: string;
  price: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    price: 200000,
    quantity: 1,
  },
  {
    id: 2,
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    price: 200000,
    quantity: 2,
  },
  {
    id: 3,
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    price: 200000,
    quantity: 1,
  },
  {
    id: 4,
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    price: 200000,
    quantity: 1,
  },
];

const CartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [activeTab, setActiveTab] = useState(2); // 2: Giỏ hàng

  // Tính tổng tiền động
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Tăng số lượng
  const handleIncrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Giảm số lượng
  const handleDecrease = (id: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Xử lý chuyển Tab
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (index === 0) {
      navigation.navigate("Home");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Thông báo", "Giỏ hàng của bạn đang trống!");
      return;
    }
    Alert.alert(
      "Thanh toán thành công",
      `Bạn đã đặt hàng thành công với tổng số tiền: ${total.toLocaleString("vi-VN")} đ`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* VÙNG 1: Nội dung cuộn ở giữa (ScrollView flex: 1) */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.heading}>Giỏ hàng ({items.length})</Text>

        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              {/* 1. Ảnh cố định kích thước */}
              <Image
                source={item.source}
                style={styles.image}
                resizeMode="cover"
              />

              {/* 2. Cột giữa: Tên (flex: 1) và Số lượng */}
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>SL: </Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => handleDecrease(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => handleIncrease(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 3. Ô giá bên phải: width cố định, khung viền xanh lá theo Wireframe */}
              <View style={styles.priceBox}>
                <Text style={styles.priceText}>
                  {item.price.toLocaleString("vi-VN")} đ
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* VÙNG 2: Thanh tổng tiền + nút Thanh toán KHÔNG cuộn, cố định ngay trên Tab Bar */}
      <View style={styles.totalContainer}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalValue}>
            {total.toLocaleString("vi-VN")} đ
          </Text>
        </View>

        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.paymentText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>

      {/* VÙNG 3: Tab Bar (Bài tập 1) cố định ở đáy màn hình */}
      <BottomTabBar activeTab={activeTab} onChange={handleTabChange} />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  // Container bao bọc toàn màn hình (flex: 1)
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  // VÙNG 1: Danh sách sản phẩm cuộn được
  scrollView: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },

  // Mỗi dòng sản phẩm dạng row, alignItems: 'center'
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    // Shadow nhẹ
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  // 1. Ảnh cố định kích thước
  image: {
    width: 65,
    height: 85,
    borderRadius: 6,
    backgroundColor: "#e2e8f0",
  },

  // 2. Cột thông tin ở giữa (flex: 1)
  info: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  quantityLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    marginRight: 4,
  },

  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#edf2f7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cbd5e0",
  },

  qtyBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4a5568",
    lineHeight: 18,
  },

  quantityValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3748",
    marginHorizontal: 8,
    minWidth: 16,
    textAlign: "center",
  },

  // 3. Ô giá tiền bên phải với width cố định và viền xanh lá (theo đúng Wireframe)
  priceBox: {
    width: 95,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "#27ae60",
    backgroundColor: "#eafaf1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  priceText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#27ae60",
    textAlign: "center",
  },

  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#888",
  },

  // VÙNG 2: Thanh tổng tiền + nút Thanh toán KHÔNG cuộn, cố định ngay trên Tab Bar
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },

  totalInfo: {
    flex: 1,
  },

  totalLabel: {
    fontSize: 13,
    color: "#718096",
    marginBottom: 2,
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e53e3e",
  },

  paymentButton: {
    backgroundColor: "#6688ff",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },

  paymentText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});