import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BookCardItemProp } from "../interface/BookInterface";

const BookCard = ({
  book,
  isSingle,
  onPress,
  onToggleWishlist,
  isWishlisted,
}: BookCardItemProp) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSingle && styles.singleContainer]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.imageBox, isSingle && styles.singleImageBox]}>
        <Image
          source={book.source}
          style={styles.biasach}
          resizeMode="cover"
        />

        <View style={styles.discount}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 11 }}>
            {book.discount}%
          </Text>
        </View>

        {onToggleWishlist && (
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={onToggleWishlist}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={isWishlisted ? "heart" : "heart-o"}
              size={15}
              color={isWishlisted ? "#e74c3c" : "#666"}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.content, isSingle && styles.singleContent]}>
        {isSingle ? (
          <>
            <Text style={styles.singleTitle}>{book.title}</Text>
            <Text style={styles.singleAuthor}>{book.author}</Text>
            <Text style={styles.singlePrice}>
              {book.price.toLocaleString("vi-VN")} đ
            </Text>
          </>
        ) : (
          <>
            <Text numberOfLines={1} style={styles.cardTitle}>
              {book.title}
            </Text>
            <Text numberOfLines={1} style={styles.cardAuthor}>
              {book.author}
            </Text>
            <Text style={styles.cardPrice}>
              {book.price.toLocaleString("vi-VN")} đ
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  biasach: {
    width: "100%",
    height: "100%",
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 2,
  },
  cardAuthor: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  imageBox: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f6fa",
    position: "relative",
  },
  discount: {
    position: "absolute",
    backgroundColor: "#e74c3c",
    top: 6,
    left: 8,
    zIndex: 1,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  wishlistBtn: {
    position: "absolute",
    top: 6,
    right: 8,
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  singleContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
  },
  singleImageBox: {
    width: "30%",
    aspectRatio: 3 / 4,
  },
  singleContent: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },
  singleTitle: {
    fontWeight: "bold",
    fontSize: 20,
    width: "100%",
    color: "#2c3e50",
  },
  singleAuthor: {
    width: "80%",
    fontSize: 15,
    color: "#7f8c8d",
  },
  singlePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e74c3c",
  },
});
