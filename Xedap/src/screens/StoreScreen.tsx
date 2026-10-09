import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bicycle } from "../interfaces/Bicycle";
import Card from "../components/Card";

const categories = ["All", "RoadBike", "Mountain"];

const StoreScreen = ({ navigation }: any) => {
  const [cateSelect, setCateSelect] = useState("All");
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://6abf0cdb06bcd2f20672695b.mockapi.io/bicycles",
      );
      const data = await res.json();
      setBicycles(data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ paddingVertical: 50 }}>
        <Text style={{ fontSize: 24, color: "#E94141", fontWeight: "600" }}>
          The world’s Best Bike
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {categories.map((cate) => {
          const isSelect = cate === cateSelect;
          return (
            <TouchableOpacity
              key={cate}
              style={{
                borderRadius: 10,
                borderColor: "#E9414187",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 4,
              }}
              onPress={() => setCateSelect(cate)}
            >
              <Text
                style={[
                  { fontSize: 20 },
                  isSelect ? { color: "#E94141" } : { color: "#BEB6B6" },
                ]}
              >
                {cate}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        style={{ marginTop: 30 }}
        data={bicycles}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("Detail", { item })}
            >
              <Card
                price={item.price}
                title={item.title}
                image={item.image}
                id={item.id}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center", gap: 20 }}
        contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({});
