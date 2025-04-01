export const fetcher = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = 'http://localhost:8080/api';
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${url}/${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...(options.headers || {})
            }
        });

        if (response.ok) {
            const contentType = response.headers.get("Content-Type");
            return contentType?.includes("application/json")
                ? (await response.json() as T)
                : (await response.text() as T);
        } else {
            const error = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(error.message || 'Error fetching API');
        }
    } catch (error) {
        console.error(`Error fetching on URL: ${endpoint}`, error);
        throw error;
    }
};
