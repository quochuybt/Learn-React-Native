import { StyleSheet, View } from "react-native";
import React from "react";
import BookCard from "../components/BookCard";
import { useNavigation } from "@react-navigation/native";
import { BOOKS_DATA } from "../data/booksData";
import { useWishlist } from "../hooks/useWishlist";

const BookStoreScreen = () => {
  const navigation = useNavigation<any>();
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <View style={styles.container}>
      {BOOKS_DATA.map((book, index) => {
        const isSingle =
          BOOKS_DATA.length % 2 !== 0 && index === BOOKS_DATA.length - 1;

        return (
          <BookCard
            key={book.id}
            book={book}
            isSingle={isSingle}
            isWishlisted={isInWishlist(book.id)}
            onToggleWishlist={() => toggleWishlist(book)}
            onPress={() =>
              navigation.navigate("BookDetail", {
                bookId: book.id,
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
    paddingHorizontal: 12,
  },
});
