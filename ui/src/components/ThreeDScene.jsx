import { Suspense } from 'react';

export default function ThreeDScene({ className = '' }) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="text-9xl mb-8 animate-float">🕉</div>
        <h2 className="font-cinzel text-3xl font-bold text-yellow-400 mb-4">Divine 3D Experience</h2>
        <p className="text-white/60 max-w-sm">Experience the spiritual essence of Khatushyam with sacred geometry and divine energy</p>
      </div>
    </div>
  );
}
