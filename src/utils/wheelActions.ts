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
    // nobody escapes the brainrot :DD
    case 2:
      break;
    default:
      const randomVideo = getRandomVideo(videos);
      handlers.onYouTube(randomVideo);
      // Empty slots - do nothing
      break;
  }
};