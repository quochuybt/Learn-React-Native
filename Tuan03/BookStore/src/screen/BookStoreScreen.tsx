import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BookCard from "../components/BookCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

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
  {
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    author: "Đặng Thiều Quang",
    price: 200000,
    discount: 11,
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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {books.map((book, index) => {
        const isSingle = books.length % 2 !== 0 && index === books.length - 1;

        return (
          <BookCard
            key={index}
            book={book}
            isSingle={isSingle}
            onPress={() =>
              navigation.navigate("BookDetail", {
                book: book,
              })
            }
          />
        );
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
