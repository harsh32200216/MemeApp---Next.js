"use client";

import { Meme } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./spinner";
import { fetchMemes } from "@/actions/fetch";
import { Memes } from "./memes";

export function LoadMore() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loaded, setLoaded] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef(false);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && !loadingRef.current && hasMore) {
            loadMoreMemes();
        }
    }, [inView, hasMore]);

    const loadMoreMemes = async () => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        setError(null);
        
        try {
            const result = await fetchMemes(loaded);
            
            if (!result.success) {
                setError(result.error || 'Failed to load memes');
                return;
            }
            
            if (result.children && result.children.length > 0) {
                setMemes((previousMemes: Meme[]) => [...previousMemes, ...result.children]);
                setLoaded(result.after || '');
                
                // If no after token, we've reached the end
                if (!result.after) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setError(errorMessage);
            console.error("LoadMore error:", error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    const retryLoad = () => {
        setError(null);
        loadMoreMemes();
    };

    return (
        <>
            <Memes memes={memes} />
            <div
                className="flex flex-col justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                ref={ref}
            >
                {error ? (
                    <div className="text-center">
                        <p className="text-red-500 mb-2">Error: {error}</p>
                        <button 
                            onClick={retryLoad}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                ) : loading ? (
                    <Spinner />
                ) : !hasMore ? (
                    <p className="text-gray-500">No more memes to load!</p>
                ) : (
                    <Spinner />
                )}
            </div>
        </>
    )
}
