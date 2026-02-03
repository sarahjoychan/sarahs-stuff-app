import { useNavigate } from "react-router-dom";

export default function UserHomePage() {
    const navigate = useNavigate();


    return (
        <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "system-ui" }}>
            <h1>User Home</h1>
            <p>You’re “logged in” (placeholder). Next we’ll require Auth0 to reach this page.</p>

        </div>
    );
}