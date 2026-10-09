import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MovieCard from "../src/components/MovieCard";
import { Movie } from "../src/interfaces/Movie";

describe("MovieCard Component", () => {
  // Dữ liệu giả (mock data) để kiểm thử
  const mockMovie: Movie = {
    id: "1",
    title: "Mai",
    genre: "Tâm lý, Tình cảm",
    year: 2024,
    rating: 8,
    poster: "https://example.com/poster.jpg",
    isShowing: true,
  };

  /**
   * a. Test render: hiển thị đúng tên phim và điểm đánh giá đúng định dạng (vd: rating 8 → "⭐ 8.0")
   */
  describe("a. Test render", () => {
    it("hiển thị đúng tên phim và điểm đánh giá đúng định dạng (vd: rating 8 → ⭐ 8.0)", async () => {
      const onSelectMock = jest.fn();
      const { getByText } = await render(
        <MovieCard movie={mockMovie} onSelect={onSelectMock} />
      );

      // Hiển thị đúng tên phim
      expect(getByText("Mai")).toBeTruthy();

      // Hiển thị điểm đánh giá đúng định dạng (khớp cả "⭐8.0" lẫn "⭐ 8.0")
      expect(getByText(/⭐\s*8\.0/)).toBeTruthy();
    });
  });

  /**
   * b. Test layout: layout="row" có hiển thị thể loại; layout="tile" không hiển thị thể loại (queryByText(...) trả về null)
   */
  describe("b. Test layout", () => {
    it('layout="row" có hiển thị thể loại', async () => {
      const onSelectMock = jest.fn();
      const { getByText } = await render(
        <MovieCard movie={mockMovie} layout="row" onSelect={onSelectMock} />
      );

      // Có hiển thị thể loại phim
      expect(getByText(/Tâm lý, Tình cảm/)).toBeTruthy();
    });

    it('layout="tile" không hiển thị thể loại (queryByText(...) trả về null)', async () => {
      const onSelectMock = jest.fn();
      const { queryByText } = await render(
        <MovieCard movie={mockMovie} layout="tile" onSelect={onSelectMock} />
      );

      // Không hiển thị thể loại (queryByText trả về null)
      expect(queryByText(/Tâm lý, Tình cảm/)).toBeNull();
      expect(queryByText(/Thể loại/)).toBeNull();
    });
  });

  /**
   * c. Test trạng thái: isShowing: true hiển thị ✅, isShowing: false hiển thị ❌
   */
  describe("c. Test trạng thái", () => {
    it("isShowing: true hiển thị ✅", async () => {
      const onSelectMock = jest.fn();
      const showingMovie: Movie = { ...mockMovie, isShowing: true };
      const { getByText, queryByText } = await render(
        <MovieCard movie={showingMovie} onSelect={onSelectMock} />
      );

      expect(getByText(/✅/)).toBeTruthy();
      expect(queryByText(/❌/)).toBeNull();
    });

    it("isShowing: false hiển thị ❌", async () => {
      const onSelectMock = jest.fn();
      const notShowingMovie: Movie = { ...mockMovie, isShowing: false };
      const { getByText, queryByText } = await render(
        <MovieCard movie={notShowingMovie} onSelect={onSelectMock} />
      );

      expect(getByText(/❌/)).toBeTruthy();
      expect(queryByText(/✅/)).toBeNull();
    });
  });

  /**
   * d. Test sự kiện: fireEvent.press → hàm onSelect = jest.fn() được gọi đúng 1 lần với tham số là movie.id
   */
  describe("d. Test sự kiện", () => {
    it("fireEvent.press → hàm onSelect = jest.fn() được gọi đúng 1 lần với tham số là movie.id", async () => {
      const onSelectMock = jest.fn();
      const { getByText } = await render(
        <MovieCard movie={mockMovie} onSelect={onSelectMock} />
      );

      // Nhấn vào thẻ phim
      fireEvent.press(getByText("Mai"));

      // Kiểm tra hàm onSelect được gọi đúng 1 lần với tham số là movie.id
      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(onSelectMock).toHaveBeenCalledWith("1");
    });
  });
});
