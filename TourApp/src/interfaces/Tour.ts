export interface Tour{
    id:string;
    name:string;
    city:string;
    days:number;
    price:number;
    seats:number;
    departure:string;
    image:string;
    isFavorite:boolean;
}

export interface TourItemProps {
    tour: Tour, 
    compact?: boolean, 
    onPress: (tour: Tour) => void,
    onToggleFavorite: (id: string, next: boolean) => void;
}