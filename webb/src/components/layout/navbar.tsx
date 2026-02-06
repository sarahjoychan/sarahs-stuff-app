//import { useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const NavBar = () => {
    const { user } = useUser();

    return (
        <nav style={{ 
            padding: '10px 20px', 
            borderBottom: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <h2>My App</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span>Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
                {/* Clerk's UserButton includes logout and profile mangement*/}
                <UserButton />
            </div>
        </nav>
    );
};

export default NavBar;