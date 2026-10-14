import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { CampusEvent, Category } from "./types/campus-event";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Filtre state'leri
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştirme fonksiyonu
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0,0);
  }

  // Dinamik Sekme Başlığı
  useEffect(() => {
    let title = "Ana Sayfa";
    if (page === "events") title = "Tüm Etkinlikler";
    if (page === "add") title = "Etkinlik Ekle";
    if (page === "update") title = "Etkinlik Güncelle";
    if (page === "detail" && selectedId) {
      const ev = findEventById(events, selectedId);
      if (ev) title = ev.title;
    }
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [page, selectedId]);

  // Ana sayfa için yaklaşan 2 etkinlik
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  // Etkinlikler sayfası için filtrelenmiş liste
  const filteredEvents = filterByCategory(searchEvents(events, searchText), category);
  
  // Tüm kategorileri dinamik çekme
  const allCategories = [...new Set(events.map(e => e.category))] as Category[];

  // Kart Çizim Fonksiyonu (JSX)
  function renderCard(event: CampusEvent) {
    const tarih = new Date(event.date).toLocaleDateString("tr-TR");
    return (
      <article className="kart" key={event.id}>
        {event.image && <img src={event.image} alt={event.title} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "4px", marginBottom: "1rem" }} />}
        <h3 style={{ marginTop: 0 }}>{event.title}</h3>
        <p>{event.category} &middot; {tarih}</p>
        <p>{event.location}</p>
        <a onClick={(e) => { e.preventDefault(); go("detail", event.id); }}>Detayları gör &rarr;</a>
      </article>
    );
  }

  // Detay sayfası için seçili etkinlik
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        <nav>
          <a onClick={(e) => { e.preventDefault(); go("home"); }} style={{ fontWeight: page === "home" ? "bold" : "normal" }}>Ana Sayfa</a>
          <a onClick={(e) => { e.preventDefault(); go("events"); }} style={{ fontWeight: page === "events" ? "bold" : "normal" }}>Etkinlikler</a>
          <a onClick={(e) => { e.preventDefault(); go("add"); }} style={{ fontWeight: page === "add" ? "bold" : "normal" }}>Ekle</a>
        </nav>
      </header>

      <main>
        {/* ANA SAYFA BLOĞU */}
        {page === "home" && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 etkinlik</h2>
            <section className="etkinlik-grid">
              {upcoming.map(renderCard)}
            </section>
            <br />
            <a onClick={(e) => { e.preventDefault(); go("events"); }} style={{ color: "var(--renk-ana)", fontWeight: "bold", cursor: "pointer" }}>Tüm etkinlikleri gör &rarr;</a>
          </>
        )}

        {/* ETKİNLİKLER (LİSTE) BLOĞU */}
        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input id="arama" type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select id="kategori-filtre" value={category} onChange={(e) => setCategory(e.target.value as Category | "")}>
                  <option value="">Tümü</option>
                  {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </form>
            <p style={{ marginBottom: "1rem", color: "#666" }}>
              {filteredEvents.length === 0 ? "Bulunamadı" : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-grid">
              {filteredEvents.map(renderCard)}
            </section>
          </>
        )}

        {/* DETAY BLOĞU */}
        {page === "detail" && (
          <>
            {!selected ? (
              <div className="hata-kutu">
                <p>Etkinlik bulunamadı.</p>
                <a onClick={() => go("events")} style={{ cursor: "pointer" }}>&larr; Listeye dön</a>
              </div>
            ) : (
              <>
                <h2>{selected.title}</h2>
                <section className="detay-grid">
                  {selected.image && (
                    <div className="afis-alani">
                      <img src={selected.image} alt="Afiş" style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }} />
                    </div>
                  )}
                  <div className="kunye-alani">
                    <dl className="kunye-listesi">
                      <dt>Tarih ve Saat</dt><dd>{new Date(selected.date).toLocaleDateString("tr-TR")}, {selected.time}</dd>
                      <dt>Yer</dt><dd>{selected.location}</dd>
                      <dt>Kategori</dt><dd>{selected.category}</dd>
                      <dt>Kontenjan</dt><dd>{selected.capacity}</dd>
                    </dl>
                    <p>{selected.description}</p>
                    <br />
                    <a onClick={() => go("events")} style={{ marginRight: "1rem", color: "var(--renk-ana)", cursor: "pointer" }}>&larr; Listeye dön</a>
                    <a onClick={() => go("update", selected.id)} style={{ color: "var(--renk-ana)", fontWeight: "bold", cursor: "pointer" }}>Bu etkinliği güncelle</a>
                  </div>
                </section>
              </>
            )}
          </>
        )}

        {/* EKLE / GÜNCELLE FORMU BLOĞU (Sadece Görünüm) */}
        {(page === "add" || page === "update") && (
          <>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Etkinlik Adı</label>
              <input id="title" type="text" maxLength={80} defaultValue={page === "update" && selected ? selected.title : ""} />
              
              <label htmlFor="cat">Kategori</label>
              <select id="cat" defaultValue={page === "update" && selected ? selected.category : ""}>
                <option value="">Seçiniz</option>
                {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <label htmlFor="date">Tarih</label>
              <input id="date" type="date" defaultValue={page === "update" && selected ? selected.date : ""} />

              <label htmlFor="desc">Açıklama</label>
              <textarea id="desc" rows={5} defaultValue={page === "update" && selected ? selected.description : ""}></textarea>
              
              <button type="submit">{page === "add" ? "Kaydet" : "Güncelle"}</button>
            </form>
          </>
        )}
      </main>
    </>
  );
}

export default App;