import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { getBookById, BOOKS_DATA } from "../data/booksData";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

type BookDetailRouteProp = RouteProp<RootStackParamList, "BookDetail">;

const BookDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<BookDetailRouteProp>();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const { bookId, book: paramBook } = route.params || {};

  // Retrieve book by id or fall back to paramBook or default to first book
  const book =
    (bookId ? getBookById(bookId) : undefined) ||
    paramBook ||
    BOOKS_DATA[0];

  const isFavorite = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book, 1);
    Alert.alert(
      "Đã thêm vào giỏ hàng 🛒",
      `"${book.title}" đã được thêm vào giỏ hàng thành công!`,
      [
        { text: "Tiếp tục xem", style: "cancel" },
        {
          text: "Xem giỏ hàng",
          onPress: () => navigation.navigate("Cart"),
        },
      ]
    );
  };

  const handleBuyNow = () => {
    addToCart(book, 1);
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header phía trên với nút quay lại và nút yêu thích */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <FontAwesome name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sách</Text>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleWishlist(book)}
          activeOpacity={0.7}
        >
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={22}
            color={isFavorite ? "#e74c3c" : "#555"}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={book.source}
        style={styles.bookImage}
        resizeMode="contain"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.badgeIdRow}>
          <Text style={styles.badgeIdText}>Mã sách: #{book.id}</Text>
          {book.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{book.category}</Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Tác giả: {book.author}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {book.price.toLocaleString("vi-VN")} đ
          </Text>

          <Text style={styles.oldPrice}>
            {(book.price + 50000).toLocaleString("vi-VN")} đ
          </Text>

          <View style={styles.discountTag}>
            <Text style={styles.discountTagText}>-{book.discount}%</Text>
          </View>
        </View>

        <Text style={styles.label}>Mô tả sách</Text>
        <Text style={styles.description}>
          {book.description ||
            "Đây là một cuốn sách hấp dẫn dành cho những người yêu thích thể loại phiêu lưu và khám phá."}
        </Text>

        <Text style={styles.label}>Thông tin chi tiết</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tác giả:</Text>
            <Text style={styles.infoValue}>{book.author}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giá bán:</Text>
            <Text style={styles.infoValue}>
              {book.price.toLocaleString("vi-VN")} đ
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ưu đãi:</Text>
            <Text style={styles.infoValue}>Giảm {book.discount}%</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tình trạng:</Text>
            <Text style={[styles.infoValue, { color: "#27ae60" }]}>Còn hàng</Text>
          </View>
        </View>
      </ScrollView>

      {/* Thanh hành động dưới cùng */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <FontAwesome name="cart-plus" size={18} color="#4058c9" />
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={handleBuyNow}
          activeOpacity={0.8}
        >
          <Text style={styles.buyNowButtonText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  heartButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  bookImage: {
    alignSelf: "center",
    width: "55%",
    height: 240,
    marginVertical: 16,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  badgeIdRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  badgeIdText: {
    fontSize: 12,
    color: "#718096",
    fontWeight: "600",
  },
  categoryBadge: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    color: "#4058c9",
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#2c3e50",
  },
  author: {
    fontSize: 15,
    color: "#555",
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e53935",
  },
  oldPrice: {
    fontSize: 16,
    color: "#888",
    textDecorationLine: "line-through",
  },
  discountTag: {
    backgroundColor: "#fee2e2",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountTagText: {
    color: "#dc2626",
    fontWeight: "bold",
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 6,
    color: "#2c3e50",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4a5568",
  },
  infoCard: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: "#64748b",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  bottomBar: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  addButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#eff2fe",
    borderWidth: 1.5,
    borderColor: "#4058c9",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  addButtonText: {
    color: "#4058c9",
    fontSize: 15,
    fontWeight: "bold",
  },
  buyNowButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#4058c9",
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
