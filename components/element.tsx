"use client";

import { Meme } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { Item } from "react-photoswipe-gallery";

export interface MemeCardProps {
    meme: Meme;
}

export function MemeCard({ meme }: MemeCardProps) {
    const height = 300 * meme.data.thumbnail_height / meme.data.thumbnail_width;
    const span = Math.ceil(height / 10) + 1;
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const elementsSmall = ["150px", "140px", "4px", meme.data.thumbnail];
    const elementsLarge = ["295px", "280px", "8px", meme.data.url];
    const [elements, setElements] = useState(windowSize[0] < windowSize[1] ? elementsSmall : elementsLarge);

    const handleWindowResize = useCallback(() => {
        const newWindowSize = [window.innerWidth, window.innerHeight];
        setWindowSize(newWindowSize);
        console.log(elements == elementsLarge);
        if (newWindowSize[0] >= newWindowSize[1]) {
            setElements(elementsLarge);
        }
        else if (newWindowSize[0] < newWindowSize[1]) {
            setElements(elementsSmall);
        }
    }, [meme.data.url, meme.data.thumbnail]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    return meme.data.thumbnail.substring(meme.data.thumbnail.length - 4) == ".jpg" ? (
        <div
            key={meme.data.name}
            style={{
                width: `${elements[0]}`,
                gridRow: `span ${span}`,
                margin: `${elements[2]}`,
            }}
            className="bg-gray-900 flex justify-center items-center"
        >
            <div
                style={{
                    maxHeight: `${elements[1]}`,
                    maxWidth: `${elements[1]}`,
                }}
                className="overflow-hidden group"
            >
                <Item<HTMLImageElement>
                    original={meme.data.url}
                    thumbnail={meme.data.thumbnail}
                    width={meme.data.thumbnail_width * 4}
                    height={meme.data.thumbnail_height * 4}
                    alt={meme.data.author_fullname}
                    caption={meme.data.title}
                >
                    {({ ref, open }) => (
                        <img
                            style={{ cursor: 'pointer' }}
                            src={elements[3]}
                            ref={ref}
                            onClick={open}
                            className="group-hover:opacity-75"
                        />
                    )}
                </Item>
            </div>
        </div>
    ) : (
        <></>
    )
}