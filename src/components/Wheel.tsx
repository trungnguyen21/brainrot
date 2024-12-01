import React, { useState, useRef } from 'react';
import { Volume2, Youtube, Dice6 } from 'lucide-react';
import { WheelSlot } from '../types/wheel';

interface WheelProps {
  onSpin: (selectedSlot: number) => void;
}

export const Wheel: React.FC<WheelProps> = ({ onSpin }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const previousRotation = useRef(0);

  const slots: WheelSlot[] = [
    { icon: <Dice6 className="w-6 h-6" />, label: "Empty" },
    { icon: <Youtube className="w-6 h-6" />, label: "YouTube" },
    { icon: <Dice6 className="w-6 h-6" />, label: "Empty" },
    { icon: <Youtube className="w-6 h-6" />, label: "YouTube" },
    { icon: <Dice6 className="w-6 h-6" />, label: "Empty" },
    { icon: <Youtube className="w-6 h-6" />, label: "YouTube" },
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const minSpins = 3; // Minimum number of full rotations
    const maxSpins = 5; // Maximum number of full rotations
    const randomSpins = minSpins + Math.random() * (maxSpins - minSpins);
    const baseAngle = 360 * randomSpins;
    const randomAngle = Math.floor(Math.random() * 360);
    const newRotation = previousRotation.current + baseAngle + randomAngle;
    
    previousRotation.current = newRotation;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const selectedSlot = Math.floor(((360 - (newRotation % 360)) / 60) % 6);
      onSpin(selectedSlot);
    }, 8000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        {/* Pointer triangle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 w-8 h-8 z-10">
          <div className="w-0 h-0 border-l-[1rem] border-r-[1rem] border-b-[2rem] border-l-transparent border-r-transparent border-b-indigo-600" style={{ transform: 'rotate(180deg)' }} />
        </div>
        
        {/* Wheel container */}
        <div 
          ref={wheelRef}
          className="relative w-80 h-80 rounded-full transition-all duration-[8000ms] cubic-bezier(0.32, 0.94, 0.60, 1)"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-white shadow-xl border-4 border-indigo-500" />
          
          {/* Slots */}
          {slots.map((slot, index) => (
            <div
              key={index}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${index * 60}deg)`,
                transformOrigin: '50% 50%',
              }}
            >
              {/* Slot content */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="flex flex-col items-center gap-2">
                  {slot.icon}
                  {/* <span className="text-sm font-medium text-gray-700">{slot.label}</span> */}
                </div>
              </div>
              
              {/* Divider lines */}
              <div className="absolute top-1/2 left-1/2 h-[50%] w-0.5 bg-indigo-300 origin-top" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>
    </div>
  );
};