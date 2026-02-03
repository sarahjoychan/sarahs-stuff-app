import { useNavigate } from "react-router-dom";

type NavbarProps = {
    onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
    const navigate = useNavigate();

    return (
        <nav 
         style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            borderBottom: "1px solid #ddd",
            marginBottom: 24,
         }}
        >
            <div
                style={{ fontWeight: 600, cursor: "pointer" }}
                onClick={() => navigate("/user")}
            >
                My App
            </div>
        </nav>
    );
}