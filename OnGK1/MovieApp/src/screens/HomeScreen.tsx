import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Movie } from "../interfaces/Movie";
import MovieCard from "../components/MovieCard";

const HomeScreen = ({ navigation }: any) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTile, setIsTile] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(movies.map((m) => m.genre))];

  const handleSelect = (id: string) => {
    const movie = movies.find((movie) => movie.id === id);
    if (movie) navigation.navigate("Detail", { movie });
  };

  // const filterMovie: any = () => {
  //   return movies.filter((m) => m.genre.toLowerCase() === filter.toLowerCase());
  // };

  const filterMovie = useMemo(() => {
    return filter === "All"
      ? movies
      : movies.filter((m) => m.genre.toLowerCase() === filter.toLowerCase());
  }, [filter]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://697c4082889a1aecfeb1caab.mockapi.io/movies",
      );
      const data = await res.json();
      setMovies(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefresh(true);
    fetchData();
  };
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "500" }}>
          Movie App
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {categories.map((cate) => {
          const isSelect = filter === cate;
          return (
            <TouchableOpacity
              style={[
                {
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "gray",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                },
                isSelect && { borderColor: "red" },
              ]}
              onPress={() => setFilter(cate)}
            >
              <Text style={[{ color: "gray" }, isSelect && { color: "red" }]}>
                {cate}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View>
          <Text style={{ fontSize: 16, fontWeight: "400" }}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={() => setIsTile(!isTile)} />
        </View>
      </View>
      {isloading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={filterMovie}
          renderItem={({ item }) => {
            return (
              <MovieCard
                movie={item}
                layout={isTile ? "tile" : "row"}
                onSelect={() => handleSelect(item.id)}
              />
            );
          }}
          numColumns={isTile ? 2 : 1}
          key={isTile ? "tile" : "row"}
          columnWrapperStyle={isTile && { columnGap: 20 }}
          contentContainerStyle={{ gap: 10 }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
