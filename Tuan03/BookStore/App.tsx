import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./src/components/Header";
import BookCard from "./src/components/BookCard";
import CategoryChip from "./src/components/CategoryChip";
import HomeScreen from "./src/screen/HomeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
