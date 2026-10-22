import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BOOKS_DATA } from "../data/booksData";
import BookCard from "../components/BookCard";
import { useWishlist } from "../hooks/useWishlist";

const CATEGORIES = [
  "Tất cả",
  "Văn học",
  "Lịch sử",
  "Thiếu nhi",
  "Truyện ngắn",
  "Kinh tế",
  "Tâm lý",
];

const CategoryScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const { isInWishlist, toggleWishlist } = useWishlist();

  const filteredBooks =
    selectedCategory === "Tất cả"
      ? BOOKS_DATA
      : BOOKS_DATA.filter((b) => b.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh mục sách</Text>
      </View>

      {/* Category Pills */}
      <View style={styles.categoryPillsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.pill,
                  isSelected && styles.pillActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.pillText,
                    isSelected && styles.pillTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Book list */}
      <ScrollView
        style={styles.bookList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bookListContent}
      >
        <Text style={styles.resultCount}>
          {filteredBooks.length} cuốn sách thuộc danh mục "{selectedCategory}"
        </Text>

        <View style={styles.grid}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isWishlisted={isInWishlist(book.id)}
              onToggleWishlist={() => toggleWishlist(book)}
              onPress={() =>
                navigation.navigate("BookDetail", {
                  bookId: book.id,
                  book: book,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
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
  categoryPillsContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#edf2f7",
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
  },
  pillActive: {
    backgroundColor: "#4058c9",
  },
  pillText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  pillTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  bookList: {
    flex: 1,
  },
  bookListContent: {
    padding: 16,
    paddingBottom: 24,
  },
  resultCount: {
    fontSize: 13,
    color: "#718096",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
