import { Tour } from "../interfaces/Tour";

export const groupByCity = (tours: Tour[]) => {
    const citys = [...new Set(tours.map(t=>t.city))]
    const list = citys.map((c) => {
        const data = tours.filter(t => t.city==c)
        .sort((a, b) =>
            new Date(a.departure).getTime() - new Date(b.departure).getTime());
        return {title:c, data:data}
    })
    return list.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function getSeatLabel(seats: number): string {
  if (seats <= 0) return "Hết chỗ";
  if (seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
}