import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const after = searchParams.get('after') || '';
    const limit = searchParams.get('limit') || '20';
    
    const uri = `https://www.reddit.com/r/memes.json?limit=${limit}&after=${after}`;
    
    try {
        const response = await fetch(uri, {
            headers: {
                'User-Agent': 'web:MemeApp:1.0 (by /u/harsh32200216)',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
            },
            // Add slight delay to avoid rate limiting
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