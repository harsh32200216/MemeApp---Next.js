import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const after = searchParams.get('after') || '';
    const limit = searchParams.get('limit') || '20';

    const uri = `https://reddit.com/r/memes.json?limit=${limit}&after=${after}`;

    try {
        console.log(`Fetching Reddit API: ${uri}`);
        const response = await fetch(uri, {
            headers: {
                'User-Agent': 'web:MemeApp:1.0 (by /u/Minute_Emergency8530)',
                'Accept': 'application/json',
                'Referer': 'https://www.reddit.com/',
                'Cache-Control': 'no-cache',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`Reddit API error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                {
                    error: `Reddit API error: ${response.status}`,
                    success: false
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        if (!data || !data.data) {
            return NextResponse.json(
                {
                    error: 'Invalid Reddit API response',
                    success: false
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            children: data.data.children || [],
            after: data.data.after || null,
            success: true
        });

    } catch (error) {
        console.error('Server fetch error:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch memes from Reddit',
                success: false
            },
            { status: 500 }
        );
    }
}