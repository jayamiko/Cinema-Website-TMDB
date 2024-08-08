import React, { useState } from "react";

function StarRating({ rating, setRating }) {
  const [hoveredStar, setHoveredStar] = useState(null);

  const totalStar = 5;
  const stars = Array.from({ length: totalStar }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => {
        const isFilled =
          rating >= star || (hoveredStar !== null && hoveredStar >= star);
        const starColor = isFilled ? "gold" : "gray";

        return (
          <span
            key={star}
            className="star cursor-pointer text-4xl"
            style={{
              color: starColor,
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
