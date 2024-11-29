export interface calendarEvent {
    id: number;
    title: string;
    description: string;
    startAt: string | Date;
    endAt: string | Date;    
    color: string | null   
}

export interface apiResponse {
    error: boolean;
    status: number;
    body: calendarEvent[]
}