import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Movie } from "../interfaces/Movie";
import MovieCard from "../components/MovieCard";

const HomeScreen = ({ navigation }: any) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTile, setIsTile] = useState(false);
  const [selectCate, setSelectCate] = useState("All");
  const [search, setSearch] = useState("");
  const categories = ["All", ...new Set(movies.map((movie) => movie.genre))];

  const handleSelect = (id: string) => {
    const movie = movies.find((movie) => movie.id === id);
    if (movie) navigation.navigate("Detail", { movie });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
    fetchData();
  }, []);

  const movieFiter = useMemo(() => {
    return movies.filter((m) => {
      const matchTitle = m.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectCate === "All"
          ? true
          : m.genre.toLowerCase() === selectCate.toLowerCase();

      return matchTitle && matchCategory;
    });
  }, [selectCate, movies, search]);

  return (
    <SafeAreaView style={{ marginHorizontal: 10 }}>
      <View
        style={{
          paddingVertical: 20,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>
          Movie App
        </Text>
        <View style={{ gap: 10, flexDirection: "row" }}>
          <Text>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={() => setIsTile(!isTile)} />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {categories.map((item) => {
          const isSelect = item === selectCate;
          return (
            <TouchableOpacity
              style={[
                {
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "gray",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignItems: "center",
                },
                isSelect && { borderColor: "red" },
              ]}
              onPress={() => setSelectCate(item)}
            >
              <Text style={[{ color: "gray" }, isSelect && { color: "red" }]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Tìm kiếm: </Text>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
            color: "gray",
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
          placeholder="Nhập tên movie ..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={movieFiter}
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
          columnWrapperStyle={
            isTile ? { justifyContent: "space-between", gap: 10 } : undefined
          }
          contentContainerStyle={{ padding: 10, gap: 10 }}
          keyExtractor={(item) => item.id.toString()}
          key={isTile ? "grid" : "list"}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
