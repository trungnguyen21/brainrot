import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface YouTubeModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export const YouTubeModal: React.FC<YouTubeModalProps> = ({ videoId, isOpen, onClose }) => {
  const [hasEnded, setHasEnded] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const loadYouTubeAPI = useCallback(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }
  }, [videoId]);

  const createPlayer = () => {
    const newPlayer = new window.YT.Player(`youtube-player-${videoId}`, {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
      },
      events: {
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            setHasEnded(true);
          }
        },
      },
    });
    setPlayer(newPlayer);
  };

  useEffect(() => {
    if (isOpen) {
      setHasEnded(false);
      loadYouTubeAPI();
    } else {
      setPlayer(null);
    }
  }, [isOpen, loadYouTubeAPI]);

  const handleClose = () => {
    if (hasEnded) {
      if (player) {
        player.destroy();
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-3xl relative">
        <button
          onClick={handleClose}
          disabled={!hasEnded}
          className={`absolute -top-4 -right-4 p-2 rounded-full transition-colors ${
            hasEnded 
              ? 'bg-red-500 hover:bg-red-600 cursor-pointer' 
              : 'bg-gray-800 cursor-not-allowed'
          } text-white`}
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="aspect-video">
          <div id={`youtube-player-${videoId}`} className="w-full h-full" />
        </div>
        {!hasEnded && (
          <p className="text-center mt-4 text-gray-600">
            You need to watch the whole video before closing 😈
          </p>
        )}
      </div>
    </div>
  );
};