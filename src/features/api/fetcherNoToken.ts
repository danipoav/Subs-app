export const fetcherNoToken = async <T = any>(endpoint: String, options: RequestInit = {}): Promise<T> => {

    const url = 'https://k6icxtvsw3.execute-api.eu-west-3.amazonaws.com/api';

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