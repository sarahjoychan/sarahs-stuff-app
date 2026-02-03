import { useEffect, useState } from "react";
import { userApi, type User } from "../../api/user";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setUsers(await userApi.list());
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const eTrim = email.trim();
        if (!eTrim) return;
        const nTrim = name.trim();
        if (!nTrim) return;

        try {
            const created = await userApi.create({
                email: eTrim,
                name: nTrim,
            });
            setUsers((prev) => [created, ...prev]);
            setEmail("");
            setName("");
        } catch (e) {
            setError((e as Error).message)
        }
    }

    return (
        <div style={{ maxWidth: 800, margin: "40px auto" }}>
            <h1>Admin * Users</h1>
            <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input 
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={(e) => (setEmail(e.target.value))}
                    style={{ flex: 2 }}
                />
                 <input 
                    placeholder="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ flex: 1 }}
                />
                <button type="submit">Create</button>
            </form>

            {error && <p style={{ color: "crimson" }}>{error}</p>}
            {loading && <p>Loading...</p>}

            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        <b>{u.email}</b> {u.name && `-${u.name}`}
                    </li>
                ))}
            </ul>
        </div>
    )
}