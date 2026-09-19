import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const BookDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Ảnh sách */}
      <Image
        source={require("../../assets/biasach.jpg")}
        style={styles.bookImage}
        resizeMode="contain"
      />

      {/* Nội dung chi tiết */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Săn cá thần</Text>

        <Text style={styles.author}>Tác giả: Đặng Thiều Quang</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>200.000 đ</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Mô tả sách</Text>

          <Text style={styles.description}>
            Đây là một cuốn sách hấp dẫn dành cho những người yêu thích thể loại
            phiêu lưu và khám phá. Nội dung sách mang đến nhiều câu chuyện thú
            vị và những trải nghiệm đáng nhớ cho người đọc.
          </Text>

          <Text style={styles.label}>Thông tin sách</Text>

          <Text style={styles.infoText}>Nhà xuất bản: NXB Văn học</Text>
          <Text style={styles.infoText}>Năm xuất bản: 2024</Text>
          <Text style={styles.infoText}>Số trang: 320</Text>
          <Text style={styles.infoText}>Ngôn ngữ: Tiếng Việt</Text>
        </View>
      </ScrollView>

      {/* Thanh dưới cùng - nằm ngoài ScrollView */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
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

  bookImage: {
    alignSelf: "center",
    width: "55%",
    height: 260,
    marginVertical: 16,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },

  author: {
    fontSize: 16,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#e53935",
  },

  oldPrice: {
    fontSize: 16,
    color: "#888",
    textDecorationLine: "line-through",
  },

  info: {
    gap: 12,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
  },

  infoText: {
    fontSize: 15,
    color: "#444",
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#6688ff",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
