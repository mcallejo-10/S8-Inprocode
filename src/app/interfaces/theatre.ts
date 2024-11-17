export interface Theatre {
    id?: number;
    name: string;
    address: string; 
    phone: string;
    seat_count: number;
    accessible: boolean;
    latitude?: number;
    longitude?: number;
}
