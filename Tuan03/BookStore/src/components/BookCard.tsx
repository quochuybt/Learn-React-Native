import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { BookCardItemProp } from "../interface/BookInterface";

const BookCard = ({book}:BookCardItemProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={book.source}
          style={styles.biasach}
          resizeMode="contain"
        />
        <View style={styles.discount}>
          <Text style={{color:"white",fontWeight:"bold"}}>{book.discount} %</Text>
        </View>
      </View>
      <View style={styles.content}>
          <Text numberOfLines={2}>{book.title} - {book.price} đ</Text>
      </View>
    </View>
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
    alignItems:"center",
    paddingVertical: 5,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 10,
    overflow: "hidden",
  },
  discount: {
    position:"absolute",
    backgroundColor:"red",
    top:6,
    left:16,
    zIndex:1,
    borderRadius:15,
    padding:5
  }
});
