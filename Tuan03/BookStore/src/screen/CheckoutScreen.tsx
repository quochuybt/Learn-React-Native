import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { useCart } from "../hooks/useCart";

type CheckoutRouteProp = RouteProp<RootStackParamList, "Checkout">;

const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<CheckoutRouteProp>();
  const { totalAmount = 0 } = route.params || {};
  const { clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "banking">("cod");

  const handleConfirmOrder = () => {
    Alert.alert(
      "Đặt hàng thành công 🎉",
      `Đơn hàng trị giá ${totalAmount.toLocaleString(
        "vi-VN"
      )} đ đã được tiếp nhận thành công. Cảm ơn bạn đã mua sắm tại BookStore!`,
      [
        {
          text: "Về trang chủ",
          onPress: () => {
            clearCart();
            navigation.navigate("MainTabs", { screen: "Home" });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <FontAwesome name="arrow-left" size={20} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner Tuần 5 & 9 Note */}
        <View style={styles.badgeNote}>
          <Text style={styles.badgeNoteText}>
            📌 Khung màn hình Checkout (Tuần 5 - Hoàn thiện đầy đủ ở Tuần 9)
          </Text>
        </View>

        {/* Card: Tổng tiền nhận từ route.params (Yêu cầu kỹ thuật BT2) */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Tổng tiền thanh toán</Text>
          <Text style={styles.amountValue}>
            {totalAmount.toLocaleString("vi-VN")} đ
          </Text>
          <Text style={styles.amountParamNote}>
            (Dữ liệu nhận qua route.params.totalAmount)
          </Text>
        </View>

        {/* Địa chỉ giao hàng mẫu */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="map-marker" size={18} color="#e74c3c" />
            <Text style={styles.sectionTitle}>Địa chỉ nhận hàng</Text>
          </View>
          <Text style={styles.addressName}>Nguyễn Văn A | 0912 345 678</Text>
          <Text style={styles.addressDetail}>
            Số 123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
          </Text>
        </View>

        {/* Phương thức thanh toán */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="credit-card" size={18} color="#3498db" />
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.methodOption,
              paymentMethod === "cod" && styles.methodSelected,
            ]}
            onPress={() => setPaymentMethod("cod")}
            activeOpacity={0.7}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === "cod" && <View style={styles.radioDot} />}
            </View>
            <View style={styles.methodTextGroup}>
              <Text style={styles.methodName}>Thanh toán khi nhận hàng (COD)</Text>
              <Text style={styles.methodSub}>Trả tiền mặt khi shipper giao sách</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodOption,
              paymentMethod === "banking" && styles.methodSelected,
            ]}
            onPress={() => setPaymentMethod("banking")}
            activeOpacity={0.7}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === "banking" && <View style={styles.radioDot} />}
            </View>
            <View style={styles.methodTextGroup}>
              <Text style={styles.methodName}>Chuyển khoản Ngân hàng / QR Code</Text>
              <Text style={styles.methodSub}>Quét mã VietQR hoặc ví MoMo</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Chi tiết chi phí */}
        <View style={styles.sectionCard}>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Tạm tính</Text>
            <Text style={styles.costValue}>
              {totalAmount.toLocaleString("vi-VN")} đ
            </Text>
          </View>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Phí vận chuyển</Text>
            <Text style={[styles.costValue, { color: "#27ae60" }]}>Miễn phí</Text>
          </View>
          <View style={[styles.costRow, styles.costTotalRow]}>
            <Text style={styles.costTotalLabel}>Tổng thanh toán:</Text>
            <Text style={styles.costTotalValue}>
              {totalAmount.toLocaleString("vi-VN")} đ
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar: Nút xác nhận đặt hàng */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomTotal}>
          <Text style={styles.bottomLabel}>Tổng cộng</Text>
          <Text style={styles.bottomValue}>
            {totalAmount.toLocaleString("vi-VN")} đ
          </Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmText}>Đặt hàng ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  placeholder: {
    width: 38,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  badgeNote: {
    backgroundColor: "#e0f2fe",
    borderColor: "#bae6fd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  badgeNoteText: {
    fontSize: 12,
    color: "#0369a1",
    fontWeight: "600",
  },
  amountCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#27ae60",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  amountLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 6,
  },
  amountValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e53e3e",
    marginBottom: 4,
  },
  amountParamNote: {
    fontSize: 11,
    color: "#718096",
    fontStyle: "italic",
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  addressName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
  },
  addressDetail: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
  },
  methodOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
  },
  methodSelected: {
    borderColor: "#4058c9",
    backgroundColor: "#f0f4ff",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4058c9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4058c9",
  },
  methodTextGroup: {
    flex: 1,
  },
  methodName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
  },
  methodSub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  costValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  costTotalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
    marginTop: 4,
    marginBottom: 0,
  },
  costTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  costTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e53e3e",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  bottomTotal: {
    flex: 1,
  },
  bottomLabel: {
    fontSize: 12,
    color: "#718096",
  },
  bottomValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e53e3e",
  },
  confirmButton: {
    backgroundColor: "#4058c9",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  confirmText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
