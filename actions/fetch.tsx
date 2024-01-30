export async function fetchMemes(after: string) {
    const uri = `https://www.reddit.com/r/memes.json?limit=1000&after=${after}`;

    try {
        const response = await fetch(uri);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.log("Error", error);
        return null;
    }
}