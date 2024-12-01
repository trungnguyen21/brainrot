import { YouTubeVideo } from '../config/videos';

interface WheelActionHandlers {
  onYouTube: (video: YouTubeVideo) => void;
}

export const getRandomVideo = (videos: YouTubeVideo[]): YouTubeVideo => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
};

export const handleWheelAction = (slotIndex: number, videos: YouTubeVideo[], handlers: WheelActionHandlers) => {
  switch (slotIndex) {
    case 0: // Max Volume
      // Set system volume to maximum
      break;
    case 1: // YouTube
      const randomVideo = getRandomVideo(videos);
      handlers.onYouTube(randomVideo);
      break;
    default:
      // Empty slots - do nothing
      break;
  }
};