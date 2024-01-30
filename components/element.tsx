"use client";

import { Meme } from "@/types";
import { Item } from "react-photoswipe-gallery";

export interface MemeCardProps {
    meme: Meme;
}

export function MemeCard({ meme }: MemeCardProps) {
    const height = 300 * meme.data.thumbnail_height / meme.data.thumbnail_width;
    const span = Math.ceil(height / 10) + 1;

    return meme.data.thumbnail.substring(meme.data.thumbnail.length - 4) == ".jpg" ? (
        <div
            key={meme.data.name}
            style={{
                width: 295,
                gridRow: `span ${span}`,
                margin: "8px 0"
            }}
            className="bg-gray-900 flex justify-center items-center"
        >
            <div className="overflow-hidden group">
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
                            src={meme.data.thumbnail}
                            height={meme.data.thumbnail_height*2}
                            width={meme.data.thumbnail_width*2}
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