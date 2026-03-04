
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const YoutubeStyle = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 second baad data aayega
  }, []);

  return (
    <div style={{ width: "300px" }}>
      {loading ? (
        <>
          {/* Video Thumbnail */}
          <Skeleton height={180} />

          {/* Title */}
          <Skeleton width="70%" />

          {/* Channel Name */}
          <Skeleton width="40%" />
        </>
      ) : (
        <>
          <img
            src="https://via.placeholder.com/300x180"
            alt="video"
          />
          <h4>My YouTube Video</h4>
          <p>Channel Name</p>
        </>
      )}
    </div>
  );
};

export default YoutubeStyle;