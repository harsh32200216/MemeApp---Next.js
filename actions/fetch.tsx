export async function fetchMemes(after: string) {
    const uri = `https://www.reddit.com/r/memes.json?limit=20&after=${after}`;

    try {
        const response = await fetch(uri);

        if (!response.ok) {
            throw new Error(`Reddit API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return {
            children: data.data?.children || [],
            after: data.data?.after || null,
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