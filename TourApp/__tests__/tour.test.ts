import { groupByCity, formatDate, getSeatLabel } from "../src/utils/tour";
import { Tour } from "../src/interfaces/Tour";

describe("utils/tour", () => {
  describe("groupByCity", () => {
    const mockTours: Tour[] = [
      {
        id: "1",
        name: "Tour Hà Nội 2",
        city: "Hà Nội",
        days: 3,
        price: 2000000,
        seats: 5,
        departure: "2026-12-01",
        image: "https://example.com/1.jpg",
        isFavorite: false,
      },
      {
        id: "2",
        name: "Tour Đà Lạt 2",
        city: "Đà Lạt",
        days: 2,
        price: 1500000,
        seats: 0,
        departure: "2026-11-20",
        image: "https://example.com/2.jpg",
        isFavorite: true,
      },
      {
        id: "3",
        name: "Tour Đà Lạt 1",
        city: "Đà Lạt",
        days: 3,
        price: 2500000,
        seats: 2,
        departure: "2026-11-05",
        image: "https://example.com/3.jpg",
        isFavorite: false,
      },
      {
        id: "4",
        name: "Tour Hà Nội 1",
        city: "Hà Nội",
        days: 1,
        price: 1000000,
        seats: 4,
        departure: "2026-10-15",
        image: "https://example.com/4.jpg",
        isFavorite: false,
      },
      {
        id: "5",
        name: "Tour Đà Nẵng 1",
        city: "Đà Nẵng",
        days: 4,
        price: 3000000,
        seats: 10,
        departure: "2026-11-10",
        image: "https://example.com/5.jpg",
        isFavorite: false,
      },
    ];

    it("trả về đúng số nhóm và đúng thứ tự tên thành phố A → Z", () => {
      const groups = groupByCity(mockTours);
      // 3 nhóm thành phố theo thứ tự: Đà Lạt, Đà Nẵng, Hà Nội
      expect(groups).toHaveLength(3);
      expect(groups.map((g) => g.title)).toEqual(["Đà Lạt", "Đà Nẵng", "Hà Nội"]);
    });

    it("sắp xếp đúng thứ tự ngày departure tăng dần trong một nhóm", () => {
      const groups = groupByCity(mockTours);
      const daLatGroup = groups.find((g) => g.title === "Đà Lạt");
      expect(daLatGroup).toBeDefined();
      expect(daLatGroup?.data.map((t) => t.departure)).toEqual([
        "2026-11-05",
        "2026-11-20",
      ]);

      const haNoiGroup = groups.find((g) => g.title === "Hà Nội");
      expect(haNoiGroup).toBeDefined();
      expect(haNoiGroup?.data.map((t) => t.departure)).toEqual([
        "2026-10-15",
        "2026-12-01",
      ]);
    });
  });

  describe("formatDate", () => {
    it('định dạng "2026-11-05" thành "05/11/2026"', () => {
      expect(formatDate("2026-11-05")).toBe("05/11/2026");
    });
  });

  describe("getSeatLabel", () => {
    it("trả về đúng nhãn số chỗ với giá trị biên 0, 3, 4", () => {
      expect(getSeatLabel(0)).toBe("Hết chỗ");
      expect(getSeatLabel(3)).toBe("Chỉ còn 3 chỗ");
      expect(getSeatLabel(4)).toBe("Còn 4 chỗ");
    });
  });
});
