import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Movie } from "../interfaces/Movie";
import MovieCard from "../components/MovieCard";

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setTile] = useState(false);
  const [search, setSearch] = useState("");
  const [movieFilter, setFilter] = useState("All");

  const categories = ["All", ...new Set(movies.map((m) => m.genre))];

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
      setRefreshing(false);
    }
  };

  const handleSelect = (id: string) => {
    const movie = movies.find((m) => m.id === id);
    if (movie) Alert.alert(movie.title);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const filterMovie = useMemo(() => {
    return movies.filter((m) => {
      const matchTitle = m.title.toLowerCase().includes(search.toLowerCase());
      const matchCate =
        movieFilter === "All"
          ? true
          : movieFilter.toLowerCase() === m.genre.toLowerCase();
      return matchCate && matchTitle;
    });
  }, [movieFilter, movies, search]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "400" }}>
          Movie App
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={() => setTile(!isTile)} />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {categories.map((cate) => {
          const isSelect = movieFilter === cate;
          return (
            <TouchableOpacity
              style={[
                {
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "gray",
                  paddingHorizontal: 20,
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
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20 }}>Tìm kiếm: </Text>
        <TextInput
          placeholder="Nhập tên phim ..."
          style={{
            borderColor: "gray",
            color: "gray",
            borderWidth: 1,
            borderRadius: 20,
            flex: 1,
            fontSize: 16,
          }}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={filterMovie}
          renderItem={({ item }) => {
            return (
              <MovieCard
                movie={item}
                layout={isTile ? "tile" : "row"}
                onSelect={handleSelect}
              />
            );
          }}
          numColumns={isTile ? 2 : 1}
          key={isTile ? "tile" : "row"}
          columnWrapperStyle={
            isTile && { justifyContent: "space-between", gap: 10 }
          }
          contentContainerStyle={{ padding: 10, gap: 10 }}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
