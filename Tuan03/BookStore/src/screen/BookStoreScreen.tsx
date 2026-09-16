import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BookCard from "../components/BookCard";

const books = [
  {
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    author: "Đặng Thiều Quang",
    price: 200000,
    discount: 20,
  },
  {
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    author: "Đặng Thiều Quang",
    price: 200000,
    discount: 10,
  },
  {
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    author: "Đặng Thiều Quang",
    price: 200000,
    discount: 15,
  },
  {
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    author: "Đặng Thiều Quang",
    price: 200000,
    discount: 21,
  },
  {
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    author: "Đặng Thiều Quang",
    price: 200000,
    discount: 11,
  },
];

const BookStoreScreen = () => {
  return (
    <View style={styles.container}>
      {books.map((book, index) => {
        const isSingle = books.length % 2 !== 0 && index === books.length - 1;
        return <BookCard key={index} book={book} isSingle={isSingle} />;
      })}
    </View>
  );
};

export default BookStoreScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
