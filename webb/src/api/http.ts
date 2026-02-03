export async function http<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
    }

    //for Delete / 204 responses
    if (res.status === 204) {
        return undefined as T;
    }

    return res.json() as Promise<T>;
}