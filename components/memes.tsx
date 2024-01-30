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
            <section className="gap-x-4 my-3 grid grid-cols-gallery auto-rows-[10px]">
                {actualMemes ? (
                    actualMemes.map((element) => (<MemeCard meme={element} />))
                ) : (
                    <h2>No meme</h2>
                )}
            </section>
        </Gallery>
    )
}