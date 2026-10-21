import type { Category, CampusEvent } from "../../types/campus-event";

interface EventFormProps {
    onSubmit: () => void;
    categories: Category[];
    initialData?: CampusEvent;
}

function EventForm({ onSubmit, categories, initialData }: EventFormProps) {
    return (
        <form className="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <label htmlFor="title">Etkinlik Adı</label>
            <input id="title" type="text" maxLength={80} defaultValue={initialData?.title || ""} />
            
            <label htmlFor="cat">Kategori</label>
            <select id="cat" defaultValue={initialData?.category || ""}>
                <option value="">Seçiniz</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <label htmlFor="date">Tarih</label>
            <input id="date" type="date" defaultValue={initialData?.date || ""} />

            <label htmlFor="desc">Açıklama</label>
            <textarea id="desc" rows={5} defaultValue={initialData?.description || ""}></textarea>
            
            <button type="submit">{initialData ? "Güncelle" : "Kaydet"}</button>
        </form>
    );
}

export default EventForm;