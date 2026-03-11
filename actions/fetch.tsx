export async function fetchMemes(after: string) {
    // Call our own API route instead of Reddit directly
    const uri = `/api/memes?after=${after}&limit=20`;

    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store' // Ensure fresh data
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'API request failed');
        }
        
        return {
            children: data.children || [],
            after: data.after,
            success: true
        };
    }
    catch (error) {
        console.error("Client fetch error:", error);
        return {
            children: [],
            after: null,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}