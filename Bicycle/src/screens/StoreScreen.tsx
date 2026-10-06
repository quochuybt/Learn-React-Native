import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BicycleCard from "../components/BicycleCard";
import { Bicycle } from "../interfaces/Bicycle";
import { SafeAreaView } from "react-native-safe-area-context";

const bicycles: Bicycle[] = [
  {
    image: require("../../assets/blue.png"),
    title: "Pinarello",
    price: 1800,
  },
  {
    image: require("../../assets/red.png"),
    title: "Pina Mountain",
    price: 1700,
  },
  {
    image: require("../../assets/pink.png"),
    title: "Pina Bike",
    price: 1500,
  },
  {
    image: require("../../assets/nomal.png"),
    title: "Pinarello",
    price: 1350,
  },
  {
    image: require("../../assets/pink.png"),
    title: "Pinarello",
    price: 2700,
  },
  {
    image: require("../../assets/red.png"),
    title: "Pinarello",
    price: 1350,
  },
];

const categories = ["All", "Roadbike", "Mountain"];

const StoreScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View style={{ marginVertical: 40 }}>
        <Text style={{ fontSize: 20, color: "red", fontWeight: "600" }}>
          The world’s Best Bike
        </Text>
      </View>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                isSelected && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <FlatList
          data={bicycles}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 20,
          }}
          contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity>
                <BicycleCard
                  image={item.image}
                  title={item.title}
                  price={item.price}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f5a5a5",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryButtonActive: {
    borderColor: "#E95555",
  },
  categoryText: {
    fontSize: 14,
    color: "#BEB6B6",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#E95555",
    fontWeight: "600",
  },
});
