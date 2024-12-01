import React, { useState } from 'react';
import { Wheel } from './components/Wheel';
import { YouTubeModal } from './components/YouTubeModal';
import { handleWheelAction } from './utils/wheelActions';
import { youtubeVideos } from './config/videos';

const App: React.FC = () => {
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  const handleSpinResult = (slotIndex: number) => {
    handleWheelAction(slotIndex, youtubeVideos, {
      onYouTube: (video) => {
        setSelectedVideoId(video.id);
        setCurrentVideoTitle(video.title);
        setIsYouTubeModalOpen(true);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">Wheel of (un)Fortune</h1>
      <Wheel onSpin={handleSpinResult} />
      {currentVideoTitle && (
        <p className="mt-4 text-lg text-indigo-700">
          Here is a little brainrot for you! 🧠🍿
        </p>
      )}
      <YouTubeModal
        videoId={selectedVideoId}
        isOpen={isYouTubeModalOpen}
        onClose={() => setIsYouTubeModalOpen(false)}
      />
    </div>
  );
};

export default App;