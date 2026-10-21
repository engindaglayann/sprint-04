import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const allCategories = [...new Set(events.map(e => e.category))] as Category[];
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let pageTitle = "Ana Sayfa";
  if (page === "events") pageTitle = "Tüm Etkinlikler";
  if (page === "add") pageTitle = "Etkinlik Ekle";
  if (page === "update") pageTitle = "Etkinlik Güncelle";
  if (page === "detail" && selected) pageTitle = selected.title;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${pageTitle}`;
  }, [pageTitle]);

  return (
    <>
      <Header 
        title="Kampüs Etkinlikleri" 
        text={page === "home" ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." : undefined} 
      />
      <Navigation current={page} onNavigate={go} />
      
      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <br />
            <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }} style={{ color: "var(--renk-ana)", fontWeight: "bold" }}>
              Tüm etkinlikleri gör &rarr;
            </a>
          </>
        )}

        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter 
              searchText={searchText} category={category} categories={allCategories}
              onSearchChange={setSearchText} onCategoryChange={setCategory} 
            />
            <p style={{ marginBottom: "1rem", color: "#666" }}>
              {filtered.length === 0 ? "Bulunamadı" : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)} emptyText="" />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && (
          <>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <EventForm 
              categories={allCategories} 
              initialData={page === "update" ? selected : undefined} 
              onSubmit={() => { window.scrollTo(0,0); }} 
            />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;