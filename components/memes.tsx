"use client";

import { Meme } from "@/types";
import { Gallery } from "react-photoswipe-gallery";
import { MemeCard } from "./element";

export interface MemeProps {
    memes: Meme[] | null;
}

export function Memes({ memes }: MemeProps) {
    const actualMemes = memes?.slice(1);
    return (
        <Gallery withCaption withDownloadButton>
            <section className="my-3 grid">
                {actualMemes ? (
                    actualMemes.map((element: Meme) => (<MemeCard key={element.data.name} meme={element} />))
                ) : (
                    <h2>No meme</h2>
                )}
            </section>
        </Gallery>
    )
}