"use client";

import { useState, useEffect } from "react";
import WikiActivityBox from "./WikiActivityBox";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
  is_playing: boolean;
  preview_url?: string;
}

interface SpotifyResponse {
  item: SpotifyTrack;
  is_playing: boolean;
  played_at?: string;
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const response = await fetch("/api/spotify/now-playing");

        if (response.status === 204) {
          setTrack(null);
          setError(null);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch track");
        }

        const data: SpotifyResponse = await response.json();
        setTrack(data.item);
        setError(null);
      } catch (err) {
        setError("Failed to load Spotify data");
        console.error("Spotify API error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <WikiActivityBox title="Recently played">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 animate-pulse border border-gray-300 bg-gray-200"></div>
          <div className="flex-1">
            <div className="mb-2 h-4 animate-pulse bg-gray-200"></div>
            <div className="h-3 w-2/3 animate-pulse bg-gray-200"></div>
          </div>
        </div>
      </WikiActivityBox>
    );
  }

  if (error) {
    return (
      <WikiActivityBox title="Recently played">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center border border-gray-300 bg-gray-200 text-xs font-semibold text-gray-600">
            N/A
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Unable to load Spotify data</p>
          </div>
        </div>
      </WikiActivityBox>
    );
  }

  if (!track) {
    return (
      <WikiActivityBox title="Recently played">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center border border-gray-300 bg-gray-200 text-xs font-semibold text-gray-600">
            N/A
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">No recent tracks</p>
          </div>
        </div>
      </WikiActivityBox>
    );
  }

  const albumImage = track.album.images[0]?.url;
  const artistNames = track.artists.map((artist) => artist.name).join(", ");

  return (
    <WikiActivityBox title="Recently played">
      <div className="flex items-center gap-3">
        {albumImage ? (
          <img
            src={albumImage}
            alt={`${track.album.name} album cover`}
            className="h-14 w-14 flex-shrink-0 border border-gray-300 object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-gray-300 bg-gray-200 text-xs font-semibold text-gray-600">
            N/A
          </div>
        )}

        <div className="flex-1 min-w-0">
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            <p className="font-medium text-sm text-gray-900 truncate">
              {track.name}
            </p>
            <p className="text-xs text-gray-600 truncate">
              {artistNames}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {track.album.name}
            </p>
          </a>
        </div>
      </div>
    </WikiActivityBox>
  );
}
