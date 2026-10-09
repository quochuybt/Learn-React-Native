import MovieCard from "../src/components/MovieCard";
import { Movie } from "../src/interfaces/Movie";
import { fireEvent, render } from "@testing-library/react-native";

describe("MovieCard", () => {
  const mockData: Movie = {
    id: "1",
    title: "Test",
    genre: "genre",
    year: 1900,
    rating: 8,
    poster: "image",
    isShowing: false,
  };
  describe("testtitle", () => {
    it("Hienthititle", async () => {
      const { getByText } = await render(
        <MovieCard movie={mockData} onSelect={jest.fn} />,
      );

      expect(getByText(/Test/)).toBeTruthy();
    });

    it("danhGia", async () => {
      const { getByText } = await render(
        <MovieCard movie={mockData} onSelect={jest.fn} />,
      );

      expect(getByText(/⭐\s*8\.0/)).toBeTruthy();
    });
  });

  describe("testlayout", () => {
    it("Hienthilayoutrow", async () => {
      const { getByText } = await render(
        <MovieCard movie={mockData} layout="row" onSelect={jest.fn} />,
      );

      expect(getByText(/genre/)).toBeTruthy();
    });

    it("Hienthilayouttile", async () => {
      const { queryByText } = await render(
        <MovieCard movie={mockData} layout="tile" onSelect={jest.fn} />,
      );

      expect(queryByText(/genre/)).toBeNull();
    });
  });

  describe("testfuntion", () => {
    it("click", async () => {
      const onSelect = jest.fn();
      const { getByText } = await render(
        <MovieCard movie={mockData} layout="row" onSelect={onSelect} />,
      );

      fireEvent.press(getByText("Test"));
      // Kiểm tra hàm được gọi đúng 1 lần
      expect(onSelect).toHaveBeenCalledTimes(1);

      // Kiểm tra tham số truyền vào là movie.id
      expect(onSelect).toHaveBeenCalledWith(mockData.id);
    });
  });
});
