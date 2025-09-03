'use client';

import { useState, useEffect } from 'react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const response = await fetch('/api/spotify/now-playing');
        
        if (response.status === 204) {
          // No track currently playing
          setTrack(null);
          setIsPlaying(false);
          setError(null);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch track');
        }

        const data: SpotifyResponse = await response.json();
        setTrack(data.item);
        setIsPlaying(data.is_playing);
        setError(null);
      } catch (err) {
        setError('Failed to load Spotify data');
        console.error('Spotify API error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNowPlaying();
    
    // Refresh every 5 minutes (recently played doesn't need frequent updates)
    const interval = setInterval(fetchNowPlaying, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 bg-green-50">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Unable to load Spotify data</p>
          </div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">No recent tracks</p>
          </div>
        </div>
      </div>
    );
  }

  const albumImage = track.album.images[0]?.url;
  const artistNames = track.artists.map(artist => artist.name).join(', ');

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-green-50">
      <div className="flex items-center gap-3">
        {albumImage ? (
          <img 
            src={albumImage} 
            alt={`${track.album.name} album cover`}
            className="w-16 h-16 rounded object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-green-700">
              🎵 Recently Played
            </span>
          </div>
          
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
              by {artistNames}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {track.album.name}
            </p>
          </a>
        </div>
        
        <div className="flex-shrink-0">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.961-.597-.12-.418.18-.84.599-.96 4.56-1.021 8.52-.6 11.64 1.32.36.18.48.66.301 1.02v.12zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}