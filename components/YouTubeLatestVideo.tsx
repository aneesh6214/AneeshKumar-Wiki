"use client";

import { useState, useEffect } from "react";
import WikiActivityBox from "./WikiActivityBox";

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
      <WikiActivityBox title="Latest video">
        <div className="flex items-center gap-3">
          <div className="h-14 w-20 animate-pulse border border-gray-300 bg-gray-200"></div>
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
      <WikiActivityBox title="Latest video">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-20 items-center justify-center border border-gray-300 bg-gray-200 text-xs font-semibold text-gray-600">
            N/A
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Unable to load YouTube data</p>
          </div>
        </div>
      </WikiActivityBox>
    );
  }

  if (!video) {
    return (
      <WikiActivityBox title="Latest video">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-20 items-center justify-center border border-gray-300 bg-gray-200 text-xs font-semibold text-gray-600">
            N/A
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">No recent videos</p>
          </div>
        </div>
      </WikiActivityBox>
    );
  }

  return (
    <WikiActivityBox title="Latest video">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 relative">
          <img
            src={video.thumbnail}
            alt={`${video.title} thumbnail`}
            className="h-14 w-20 border border-gray-300 object-cover"
          />
          {video.duration && (
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 px-1 text-xs text-white">
              {formatDuration(video.duration)}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
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
              <span aria-hidden="true">|</span>
              <span>{formatTimeAgo(video.publishedAt)}</span>
            </div>
          </a>
        </div>
      </div>
    </WikiActivityBox>
  );
}
