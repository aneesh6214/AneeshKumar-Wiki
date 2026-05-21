"use client";

import SpotifyNowPlaying from "./SpotifyNowPlaying";
import YouTubeLatestVideo from "./YouTubeLatestVideo";

export default function HomeActivityGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <SpotifyNowPlaying />
      <YouTubeLatestVideo />
    </div>
  );
}
