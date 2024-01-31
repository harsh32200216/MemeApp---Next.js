"use client";

import { Meme } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./spinner";
import { fetchMemes } from "@/actions/fetch";
import { Memes } from "./memes";

export function LoadMore() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loaded, setLoaded] = useState("");
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            try {
                fetchMemes(loaded).then((res) => {
                    const newMemes = res.children;
                    setMemes((previousMemes: Meme[]) => [...previousMemes, ...newMemes]);
                    setLoaded(res.after);
                });
            }
            catch (error) {
                console.log("Error", error);
            }
        }
    }, [inView]);

    return (
        <>
            <Memes memes={memes} />
            <div
                className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
                ref={ref}
            >
                <Spinner />
            </div>
        </>
    )
}
