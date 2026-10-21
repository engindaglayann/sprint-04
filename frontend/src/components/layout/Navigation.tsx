import type { PageName } from "../../types/page";

interface NavigationProps {
    current: PageName;
    onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
    const linkStyle = (isActive: boolean) => ({
        fontWeight: isActive ? "bold" : "normal",
        color: "#333", // Koyu gri metin rengi
        marginRight: "15px",
        textDecoration: "none"
    });

    return (
        <nav className="menu" style={{ padding: "10px 0", marginBottom: "20px", borderBottom: "1px solid #ddd" }}>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate("home"); }} 
                style={linkStyle(current === "home")}
            >
                Ana Sayfa
            </a>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate("events"); }} 
                style={linkStyle(current === "events")}
            >
                Etkinlikler
            </a>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate("add"); }} 
                style={linkStyle(current === "add")}
            >
                Ekle
            </a>
        </nav>
    );
}

export default Navigation;