"use client";

import { useState, useEffect } from "react";

const REFRESH_INTERVAL_MS = 30 * 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;
const HOURS_PER_DAY = 24;
const HOURS_PER_WEEK = 24 * 7;
const HOURS_PER_MONTH = 24 * 30;
const VIEWS_MILLION = 1_000_000;
const VIEWS_THOUSAND = 1_000;

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  url: string;
  viewCount: string | null;
  duration: string | null;
}

function formatViewCount(count: string | null): string {
  if (!count) return "";

  const num = parseInt(count);
  if (num >= VIEWS_MILLION) {
    return `${(num / VIEWS_MILLION).toFixed(1)}M views`;
  }
  if (num >= VIEWS_THOUSAND) {
    return `${(num / VIEWS_THOUSAND).toFixed(1)}K views`;
  }
  return `${num} views`;
}

function formatDuration(duration: string | null): string {
  if (!duration) return "";

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / MS_PER_HOUR);

  if (diffInHours < HOURS_PER_DAY) {
    return `${diffInHours} hours ago`;
  }
  if (diffInHours < HOURS_PER_WEEK) {
    const days = Math.floor(diffInHours / HOURS_PER_DAY);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (diffInHours < HOURS_PER_MONTH) {
    const weeks = Math.floor(diffInHours / HOURS_PER_WEEK);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  const months = Math.floor(diffInHours / HOURS_PER_MONTH);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function YouTubeLatestVideo() {
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const response = await fetch("/api/youtube/latest-video");

        if (response.status === 204) {
          setVideo(null);
          setError(null);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }

        const data: YouTubeVideo = await response.json();
        setVideo(data);
        setError(null);
      } catch (err) {
        setError("Failed to load YouTube data");
        console.error("YouTube API error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestVideo();
    const interval = setInterval(fetchLatestVideo, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 bg-red-50">
        <div className="flex items-center gap-3">
          <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
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
          <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Unable to load YouTube data</p>
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">No recent videos</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-red-50">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 relative">
          <img
            src={video.thumbnail}
            alt={`${video.title} thumbnail`}
            className="w-24 h-18 rounded object-cover"
          />
          {video.duration && (
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
              {formatDuration(video.duration)}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-red-700">
              📺 Latest Video
            </span>
          </div>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            <p className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">
              {video.title}
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
              {video.viewCount && (
                <span>{formatViewCount(video.viewCount)}</span>
              )}
              <span>•</span>
              <span>{formatTimeAgo(video.publishedAt)}</span>
            </div>
          </a>
        </div>

        <div className="flex-shrink-0 flex items-center">
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
