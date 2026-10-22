import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const AccountScreen = () => {
  const { isLoggedIn, user, token, login, logout, toggleAuth } = useAuth();
  const { totalQuantity } = useCart();
  const { wishlist } = useWishlist();

  const handleLoginPress = () => {
    login({
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0912 345 678",
      membership: "Thành viên Vàng (Gold VIP)",
    });
    Alert.alert("Thành công", "Đã đăng nhập thành công vào tài khoản!");
  };

  const handleLogoutPress = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
        {/* Nút test nhanh toggle login/logout cho Bài tập 4 */}
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={toggleAuth}
          activeOpacity={0.7}
        >
          <Text style={styles.toggleBtnText}>
            {isLoggedIn ? "Thử Đăng xuất" : "Thử Đăng nhập"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Yêu cầu BT4: Hiển thị khác nhau tùy isLoggedIn */}
        {!isLoggedIn ? (
          /* TRƯỜNG HỢP 1: CHƯA ĐĂNG NHẬP (GUEST) */
          <View style={styles.guestContainer}>
            <View style={styles.guestAvatar}>
              <FontAwesome name="user-circle" size={80} color="#cbd5e0" />
            </View>

            <Text style={styles.guestTitle}>Chào mừng bạn đến với BookStore</Text>
            <Text style={styles.guestSubtitle}>
              Đăng nhập để nhận mã giảm giá thành viên, lưu sách yêu thích và theo dõi
              đơn hàng dễ dàng hơn.
            </Text>

            <TouchableOpacity
              style={styles.primaryLoginBtn}
              onPress={handleLoginPress}
              activeOpacity={0.8}
            >
              <FontAwesome name="sign-in" size={18} color="#fff" />
              <Text style={styles.primaryLoginBtnText}>Đăng nhập ngay</Text>
            </TouchableOpacity>

            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <FontAwesome name="check-circle" size={16} color="#27ae60" />
                <Text style={styles.featureText}>Ưu đãi độc quyền cho thành viên</Text>
              </View>
              <View style={styles.featureItem}>
                <FontAwesome name="check-circle" size={16} color="#27ae60" />
                <Text style={styles.featureText}>Lưu trữ giỏ hàng và đồng bộ đa thiết bị</Text>
              </View>
              <View style={styles.featureItem}>
                <FontAwesome name="check-circle" size={16} color="#27ae60" />
                <Text style={styles.featureText}>Tra cứu trạng thái vận chuyển tức thì</Text>
              </View>
            </View>
          </View>
        ) : (
          /* TRƯỜNG HỢP 2: ĐÃ ĐĂNG NHẬP (LOGGED IN) */
          <View>
            {/* Card thông tin người dùng */}
            <View style={styles.profileCard}>
              <View style={styles.profileRow}>
                <View style={styles.avatarWrapper}>
                  {user?.avatar ? (
                    <Image
                      source={{ uri: user.avatar }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <FontAwesome name="user-circle" size={60} color="#4058c9" />
                  )}
                </View>

                <View style={styles.profileInfo}>
                  <Text style={styles.userName}>{user?.name || "Người dùng"}</Text>
                  <Text style={styles.userEmail}>{user?.email}</Text>
                  {user?.phone && (
                    <Text style={styles.userPhone}>{user?.phone}</Text>
                  )}
                  <View style={styles.membershipTag}>
                    <FontAwesome name="star" size={11} color="#f59e0b" />
                    <Text style={styles.membershipText}>
                      {user?.membership || "Thành viên"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Token test indicator */}
              <View style={styles.tokenBox}>
                <Text style={styles.tokenLabel}>Trạng thái Auth:</Text>
                <Text style={styles.tokenValue}>
                  isLoggedIn = true | Token: {token ? `${token.substring(0, 16)}...` : "None"}
                </Text>
              </View>
            </View>

            {/* Quick stats */}
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalQuantity}</Text>
                <Text style={styles.statLabel}>Trong giỏ</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{wishlist.length}</Text>
                <Text style={styles.statLabel}>Yêu thích</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>Đơn hàng</Text>
              </View>
            </View>

            {/* Menu options */}
            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuLeft}>
                  <FontAwesome name="file-text-o" size={18} color="#4058c9" />
                  <Text style={styles.menuTitle}>Đơn hàng của tôi</Text>
                </View>
                <FontAwesome name="angle-right" size={18} color="#a0aec0" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuLeft}>
                  <FontAwesome name="heart-o" size={18} color="#e53e3e" />
                  <Text style={styles.menuTitle}>Danh sách yêu thích ({wishlist.length})</Text>
                </View>
                <FontAwesome name="angle-right" size={18} color="#a0aec0" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuLeft}>
                  <FontAwesome name="map-marker" size={18} color="#27ae60" />
                  <Text style={styles.menuTitle}>Sổ địa chỉ nhận hàng</Text>
                </View>
                <FontAwesome name="angle-right" size={18} color="#a0aec0" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuLeft}>
                  <FontAwesome name="bell-o" size={18} color="#f59e0b" />
                  <Text style={styles.menuTitle}>Thông báo & Khuyến mãi</Text>
                </View>
                <FontAwesome name="angle-right" size={18} color="#a0aec0" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuLeft}>
                  <FontAwesome name="lock" size={18} color="#6366f1" />
                  <Text style={styles.menuTitle}>Đổi mật khẩu & Bảo mật</Text>
                </View>
                <FontAwesome name="angle-right" size={18} color="#a0aec0" />
              </TouchableOpacity>
            </View>

            {/* Nút Đăng xuất */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogoutPress}
              activeOpacity={0.8}
            >
              <FontAwesome name="sign-out" size={18} color="#e53e3e" />
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

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
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  toggleBtn: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  toggleBtnText: {
    fontSize: 12,
    color: "#4058c9",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  // Guest styles
  guestContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  guestAvatar: {
    marginBottom: 16,
  },
  guestTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  guestSubtitle: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  primaryLoginBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#4058c9",
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: "#4058c9",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryLoginBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  featureList: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 16,
    gap: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 13,
    color: "#475569",
  },
  // Logged-in styles
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: "hidden",
    marginRight: 14,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 6,
  },
  membershipTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  membershipText: {
    fontSize: 11,
    color: "#b45309",
    fontWeight: "bold",
  },
  tokenBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  tokenLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
  },
  tokenValue: {
    fontSize: 11,
    color: "#059669",
    marginTop: 2,
    fontFamily: "monospace",
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4058c9",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#f1f5f9",
    height: "80%",
    alignSelf: "center",
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuTitle: {
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fee2e2",
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  logoutText: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "bold",
  },
});
