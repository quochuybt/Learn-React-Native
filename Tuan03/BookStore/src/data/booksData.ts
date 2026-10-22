import { Book } from "../interface/BookInterface";

export const BOOKS_DATA: Book[] = [
  {
    id: 1,
    source: require("../../assets/biasach.jpg"),
    title: "Săn cá thần",
    author: "Đặng Thiều Quang",
    price: 200000,
    discount: 20,
    category: "Văn học",
    description:
      "Một tác phẩm phiêu lưu đặc sắc của nhà văn Đặng Thiều Quang, đưa người đọc vào hành trình săn đuổi huyền thoại cá thần đầy bí ẩn tại những vùng núi cao hiểm trở.",
  },
  {
    id: 2,
    source: require("../../assets/biasach.jpg"),
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    price: 150000,
    discount: 10,
    category: "Thiếu nhi",
    description:
      "Tác phẩm văn học kinh điển của Việt Nam kể về chuyến đi phiêu lưu thử thách lòng dũng cảm, tình bạn và bài học đối nhân xử thế của chú Dế Mèn.",
  },
  {
    id: 3,
    source: require("../../assets/biasach.jpg"),
    title: "Số Đỏ",
    author: "Vũ Trọng Phụng",
    price: 180000,
    discount: 15,
    category: "Văn học",
    description:
      "Kiệt tác hiện thực trào phúng phản ánh xã hội tư sản thành thị Việt Nam thời kỳ Âu hóa qua cuộc đời đổi đời ngoạn mục của Xuân Tóc Đỏ.",
  },
  {
    id: 4,
    source: require("../../assets/biasach.jpg"),
    title: "Tuổi Thơ Dữ Dội",
    author: "Phùng Quán",
    price: 220000,
    discount: 21,
    category: "Lịch sử",
    description:
      "Bản hùng ca đầy cảm động và hào hùng về đội thiếu niên trinh sát trung đoàn Trần Cao Vân thời kháng chiến chống Pháp tại cố đô Huế.",
  },
  {
    id: 5,
    source: require("../../assets/biasach.jpg"),
    title: "Đất Rừng Phương Nam",
    author: "Đoàn Giỏi",
    price: 160000,
    discount: 11,
    category: "Văn học",
    description:
      "Bức tranh sinh động và kỳ thú về thiên nhiên hoang sơ, trù phú cùng con người nghĩa khí, phóng khoáng của vùng đất Nam Bộ.",
  },
  {
    id: 6,
    source: require("../../assets/biasach.jpg"),
    title: "Cánh Đồng Bất Tận",
    author: "Nguyễn Ngọc Tư",
    price: 175000,
    discount: 11,
    category: "Truyện ngắn",
    description:
      "Tuyển tập truyện ngắn mang đậm hơi thở đồng bằng châu thổ sông Cửu Long với những thân phận con người trôi dạt đầy ám ảnh.",
  },
  {
    id: 7,
    source: require("../../assets/biasach.jpg"),
    title: "Mắt Biếc",
    author: "Nguyễn Nhật Ánh",
    price: 190000,
    discount: 11,
    category: "Văn học",
    description:
      "Câu chuyện tình thơ mộng, da diết gắn liền với làng Đo Đo và đôi mắt trong veo man mác buồn của cô bạn thuở thiếu thời.",
  },
];

export const getBookById = (id: number): Book | undefined => {
  return BOOKS_DATA.find((book) => book.id === id);
};
