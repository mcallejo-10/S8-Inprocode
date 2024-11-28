export interface calendarEvent {
    id?: string;
    title: string;
    description: string;
    startAt: string | Date;
    endAt: string | Date;
    allDay: boolean;    
}
