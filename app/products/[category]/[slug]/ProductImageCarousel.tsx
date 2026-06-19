"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../../products.module.css";

export default function ProductImageCarousel({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={`product-carousel card ${styles.carousel}`}>
      <div className={styles.viewport}>
        <Image
          src={images[active]}
          alt={`${name} view ${active + 1}`}
          fill
          priority
          className={styles.imgCover}
        />
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() =>
            setActive((p) => (p - 1 + images.length) % images.length)
          }
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => setActive((p) => (p + 1) % images.length)}
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {/* <div className={styles.thumbGrid}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`${styles.thumb} ${i === active ? styles.thumbActive : ""}`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img}
              alt={`${name} thumbnail ${i + 1}`}
              fill
              sizes="80px"
              className={styles.imgCover}
            />
          </button>
        ))}
      </div> */}
    </div>
  );
}
