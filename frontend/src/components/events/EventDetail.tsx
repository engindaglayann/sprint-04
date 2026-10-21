import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
    event: CampusEvent;
    onBack: () => void;
    onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
    return (
        <section className="detay-grid">
            {event.image && (
                <div className="afis-alani">
                    <img 
                        src={event.image} 
                        alt="Afiş" 
                        style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }} 
                    />
                </div>
            )}
            <div className="kunye-alani">
                <dl className="kunye-listesi">
                    <dt>Tarih ve Saat</dt>
                    <dd>{formatDate(event.date)}, {event.time}</dd>
                    <dt>Yer</dt>
                    <dd>{event.location}</dd>
                    <dt>Kategori</dt>
                    <dd>{event.category}</dd>
                    <dt>Kontenjan</dt>
                    <dd>{event.capacity}</dd>
                </dl>
                <p>{event.description}</p>
                <br />
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onBack(); }} 
                    style={{ marginRight: "1rem", color: "var(--renk-ana)" }}
                >
                    &larr; Listeye dön
                </a>
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onEdit(event.id); }} 
                    style={{ color: "var(--renk-ana)", fontWeight: "bold" }}
                >
                    Bu etkinliği güncelle
                </a>
            </div>
        </section>
    );
}

export default EventDetail;
