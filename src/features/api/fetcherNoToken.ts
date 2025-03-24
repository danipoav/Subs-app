export const fetcherNoToken = async <T = any>(endpoint: String, options: RequestInit = {}): Promise<T> => {

    const url = 'http://localhost:8080/api';

    try {
        const response = await fetch(`${url}/${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': "application/json",
            }
        })
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Error fetching API');
        }
    } catch (error) {
        console.log(`Error fetching on URL: ${endpoint}`, error)
        throw error;
    }

}