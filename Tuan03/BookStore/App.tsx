import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import BookCard from "./components/BookCard";
import CategoryChip from "./components/CategoryChip";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Header />
        <CategoryChip />
      </View>
      <View style={styles.bookGrid}>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
