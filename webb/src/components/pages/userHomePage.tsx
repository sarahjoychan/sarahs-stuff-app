import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useApi } from '../../api/http';

export default function UserHomePage() {
    const { user, isLoaded } = useUser();
    const { fetchWithAuth } = useApi();
    const [dbUser, setDbUser] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await fetchWithAuth('/api/users/me');
                setDbUser(data);
                console.log('User synced to database', data);
            } catch (error) {
                console.error('Failed to fetch ')
            }
        }
        if (isLoaded && user) fetchUserData();
    }, [isLoaded, user]);

    if (!isLoaded) return (<div>Loading...</div>);

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "system-ui" }}>
            <h1>User Home</h1>
            <p>You’re “logged in” (placeholder). Next we’ll require Auth0 to reach this page.</p>

        </div>
    );
}