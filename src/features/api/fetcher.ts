export const fetcher = async (endpoint: String, options: RequestInit = {}) => {

    const url = 'http://localhost:8080/api';
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${url}/${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
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