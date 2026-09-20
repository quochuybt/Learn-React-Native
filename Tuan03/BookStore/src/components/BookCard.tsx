import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BookCardItemProp } from "../interface/BookInterface";

const BookCard = ({ book, isSingle, onPress }: BookCardItemProp) => {
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
          resizeMode="contain"
        />

        <View style={styles.discount}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {book.discount} %
          </Text>
        </View>
      </View>

      <View style={[styles.content, isSingle && styles.singleContent]}>
        {isSingle ? (
          <>
            <Text style={styles.singleTitle}>{book.title}</Text>

            <Text style={styles.singleAuthor}>{book.author}</Text>

            <Text style={styles.singlePrice}>{book.price} đ</Text>
          </>
        ) : (
          <Text numberOfLines={2}>
            {book.title} - {book.price} đ
          </Text>
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
    marginBottom: 8,
    borderRadius: 12,
  },
  biasach: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 10,
    overflow: "hidden",
  },
  discount: {
    position: "absolute",
    backgroundColor: "red",
    top: 6,
    left: 16,
    zIndex: 1,
    borderRadius: 15,
    padding: 5,
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
    fontWeight: "500",
    fontSize: 24,
    width: "100%",
    paddingVertical: 8,
  },

  singleAuthor: {
    width: "80%",
    paddingVertical: 8,
    fontSize: 18,
  },

  singlePrice: {
    width: "40%",
    paddingVertical: 8,
    color: "red",
  },
});
