import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    //temp... this will become auth0
    function handleLogin() {
        //placeholder only...
        navigate("/user");
    }

    function createUser() {
        navigate("/user");
    }

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "system-ui" }}>
            <h1>Login</h1>
            <p>This is a placeholder login page. Next step is wiring Auth0</p>

            <div style={{ display: "flex", gap: 12 }}>
                <button onClick={handleLogin}>Log in</button>
                <button onClick={createUser}>Create Account</button>
            </div>
        </div>
    );
}