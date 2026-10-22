import React from "react";
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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCart } from "../hooks/useCart";

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const {
    items,
    totalAmount,
    totalQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Xử lý chuyển sang màn hình Thanh toán (Bài tập 2)
  const handleGoToCheckout = () => {
    if (items.length === 0) {
      Alert.alert(
        "Giỏ hàng trống",
        "Vui lòng chọn thêm sách vào giỏ trước khi tiến hành thanh toán."
      );
      return;
    }

    navigation.navigate("Checkout", {
      totalAmount: totalAmount,
      items: items,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* VÙNG 1: Nội dung cuộn ở giữa (ScrollView flex: 1) */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.headerRow}>
          <Text style={styles.heading}>
            Giỏ hàng ({totalQuantity} sản phẩm)
          </Text>
        </View>

        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome name="shopping-cart" size={60} color="#cbd5e0" />
            <Text style={styles.emptyTitle}>Giỏ hàng của bạn đang trống</Text>
            <Text style={styles.emptySub}>
              Hãy khám phá các tác phẩm sách hấp dẫn và thêm vào giỏ nhé!
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigation.navigate("Home")}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreBtnText}>Tiếp tục mua sách</Text>
            </TouchableOpacity>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.bookId || item.id} style={styles.cartItem}>
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

                {item.author && (
                  <Text style={styles.author} numberOfLines={1}>
                    {item.author}
                  </Text>
                )}

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>SL: </Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => decreaseQuantity(item.bookId || item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => increaseQuantity(item.bookId || item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>

                  {/* Nút xóa item */}
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFromCart(item.bookId || item.id)}
                    activeOpacity={0.7}
                  >
                    <FontAwesome name="trash-o" size={16} color="#e53e3e" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* 3. Ô giá bên phải: width cố định, khung viền xanh lá theo Wireframe */}
              <View style={styles.priceBox}>
                <Text style={styles.priceText}>
                  {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                </Text>
                {item.quantity > 1 && (
                  <Text style={styles.unitPrice}>
                    ({item.price.toLocaleString("vi-VN")} đ/c)
                  </Text>
                )}
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
            {totalAmount.toLocaleString("vi-VN")} đ
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.paymentButton,
            items.length === 0 && styles.disabledButton,
          ]}
          onPress={handleGoToCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.paymentText}>Thanh toán</Text>
          <FontAwesome
            name="chevron-right"
            size={13}
            color="#fff"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 20,
  },
  headerRow: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 65,
    height: 85,
    borderRadius: 6,
    backgroundColor: "#e2e8f0",
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  author: {
    fontSize: 12,
    color: "#718096",
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
  removeBtn: {
    marginLeft: 14,
    padding: 4,
  },
  priceBox: {
    width: 100,
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
  unitPrice: {
    fontSize: 10,
    color: "#2e7d32",
    marginTop: 2,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a5568",
    marginTop: 16,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: "#718096",
    textAlign: "center",
    paddingHorizontal: 30,
    marginBottom: 20,
    lineHeight: 18,
  },
  exploreBtn: {
    backgroundColor: "#4058c9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  exploreBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
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
    flexDirection: "row",
    backgroundColor: "#4058c9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  disabledButton: {
    backgroundColor: "#a0aec0",
  },
  paymentText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});