import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function GET() {
  try {
    const apiKey = env.YOUTUBE_API_KEY;
    const channelId = env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      console.error('YouTube credentials check:', { 
        hasApiKey: !!apiKey, 
        hasChannelId: !!channelId 
      });
      throw new Error('Missing YouTube API credentials');
    }

    // First, try to get channel uploads playlist
    let uploadsPlaylistId;
    
    // If channelId starts with UC, convert to UU for uploads playlist
    if (channelId.startsWith('UC')) {
      uploadsPlaylistId = 'UU' + channelId.substring(2);
    } else {
      // Get channel details to find uploads playlist
      const channelResponse = await fetch(
        `${YOUTUBE_API_URL}/channels?key=${apiKey}&id=${channelId}&part=contentDetails`
      );
      
      if (channelResponse.ok) {
        const channelData = await channelResponse.json();
        uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      }
    }

    // Get the latest video from uploads playlist
    const response = await fetch(
      `${YOUTUBE_API_URL}/playlistItems?key=${apiKey}&playlistId=${uploadsPlaylistId}&part=snippet&order=date&maxResults=1`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API error:', response.status, errorText);
      throw new Error(`Failed to fetch YouTube data: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return new NextResponse(null, { status: 204 });
    }

    const video = data.items[0];
    const videoId = video.snippet.resourceId.videoId;
    
    // Get additional video details (views, duration, etc.)
    const videoDetailsResponse = await fetch(
      `${YOUTUBE_API_URL}/videos?key=${apiKey}&id=${videoId}&part=statistics,contentDetails`,
      {
        next: { revalidate: 3600 }
      }
    );

    let videoDetails = null;
    if (videoDetailsResponse.ok) {
      const detailsData = await videoDetailsResponse.json();
      videoDetails = detailsData.items?.[0];
    }

    return NextResponse.json({
      id: videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      viewCount: videoDetails?.statistics?.viewCount || null,
      duration: videoDetails?.contentDetails?.duration || null,
    });

  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube data' },
      { status: 500 }
    );
  }
}