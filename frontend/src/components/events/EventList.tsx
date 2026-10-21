import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
    events: CampusEvent[];
    onShowDetail: (id: string) => void;
    emptyText?: string;
}

function EventList({ events, onShowDetail, emptyText = "Bulunamadı" }: EventListProps) {
    if (events.length === 0) {
        return <p className="sonuc" style={{ marginBottom: "1rem", color: "#666" }}>{emptyText}</p>;
    }

    return (
        <section className="etkinlik-grid">
            {events.map((event) => (
                <EventCard 
                    key={event.id} 
                    event={event} 
                    onShowDetail={onShowDetail} 
                />
            ))}
        </section>
    );
}

export default EventList;