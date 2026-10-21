import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
    event: CampusEvent;
    onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
    return (
        <article className="kart">
            {event.image && (
                <img 
                    src={event.image} 
                    alt={`${event.title} Afişi`} 
                    style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "4px", marginBottom: "1rem" }} 
                />
            )}
            <h3 style={{ marginTop: 0 }}>{event.title}</h3>
            <p>{event.category} &middot; {formatDate(event.date)}</p>
            <p>{event.location}</p>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onShowDetail(event.id); }}
            >
                Detayları gör &rarr;
            </a>
        </article>
    );
}

export default EventCard;