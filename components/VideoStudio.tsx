
import React, { useRef, useState, useEffect } from 'react';
import { ShoppingCart, Pause, Play, Loader2, Sparkles, ExternalLink, X, RotateCcw } from 'lucide-react';
import { detectObjectsInFrame } from '../services/geminiService';
import { DetectedObject } from '../types';

interface VideoStudioProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoStudio: React.FC<VideoStudioProps> = ({ videoUrl, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [objects, setObjects] = useState<DetectedObject[]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handlePlayPause = (e?: React.MouseEvent) => {
    // Prevent double triggers on touch
    if (e) e.stopPropagation();
    
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
        setObjects([]); 
      } else {
        videoRef.current.pause();
        setIsPaused(true);
        captureAndDetect();
      }
    }
  };

  const captureAndDetect = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsDetecting(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      const detected = await detectObjectsInFrame(base64Image);
      setObjects(detected);
    }
    setIsDetecting(false);
  };

  const resetDetection = () => {
    setObjects([]);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[60] bg-black flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0f0f0f] z-10">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-1.5 rounded-lg">
            <Play className="w-5 h-5 fill-white text-white" />
          </div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">MovieTube <span className="text-red-600">Studio</span></h1>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors bg-white/5 md:bg-transparent"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Video Area */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden touch-none" onClick={handlePlayPause}>
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          className="max-h-full max-w-full w-full h-auto"
          onPause={() => setIsPaused(true)}
          onPlay={() => {
            setIsPaused(false);
            setObjects([]);
          }}
        />
        
        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Object Overlays */}
        {isPaused && (
          <div className="absolute inset-0 pointer-events-none">
            {objects.map((obj, idx) => {
              const [ymin, xmin, ymax, xmax] = obj.box_2d;
              return (
                <div
                  key={idx}
                  className="absolute border-2 border-red-500 rounded-lg pointer-events-auto group animate-in fade-in zoom-in duration-300"
                  style={{
                    top: `${ymin / 10}%`,
                    left: `${xmin / 10}%`,
                    width: `${(xmax - xmin) / 10}%`,
                    height: `${(ymax - ymin) / 10}%`,
                    boxShadow: '0 0 25px rgba(239, 68, 68, 0.6), inset 0 0 20px rgba(239, 68, 68, 0.2)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute -top-10 left-0 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-100 group-hover:scale-110 transition-transform flex items-center gap-1">
                    {obj.name}
                  </div>
                  <a
                    href={obj.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] md:text-xs font-black px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all ring-4 ring-black/20"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    SHOP
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Detection Status Overlay */}
        {isDetecting && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-20">
            <div className="bg-[#1a1a1a] p-8 rounded-3xl flex flex-col items-center gap-5 shadow-2xl border border-white/10 mx-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-xl font-black mb-1">AI SCANNIG...</p>
                <p className="text-sm text-gray-400">Gemini is identifying products</p>
              </div>
            </div>
          </div>
        )}

        {/* Center Play/Pause/Scan Button */}
        {!isDetecting && (
          <button 
            onClick={handlePlayPause}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all backdrop-blur-md border border-white/20 shadow-2xl z-10 ${
              isPaused 
              ? 'bg-red-600/20 p-10 rounded-2xl opacity-0 md:opacity-100 scale-95' 
              : 'bg-white/10 hover:bg-white/20 p-8 rounded-full opacity-0'
            }`}
          >
            {isPaused ? (
              <RotateCcw className="w-12 h-12 text-white" />
            ) : (
              <Pause className="w-12 h-12 fill-white" />
            )}
          </button>
        )}
      </div>

      {/* Control Bar & Results (Mobile Optimised) */}
      <div className="p-4 md:p-6 bg-[#0f0f0f] border-t border-white/10 safe-area-bottom">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                 <Sparkles className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold md:text-base">AI Studio</p>
                 <p className="text-[11px] md:text-sm text-gray-400">Tap to pause and shop</p>
               </div>
            </div>

            {isPaused && !isDetecting && (
               <button 
                onClick={resetDetection}
                className="bg-white text-black font-bold px-4 py-2 rounded-full text-xs flex items-center gap-2 hover:bg-gray-200"
               >
                 <Play className="w-3 h-3 fill-black" /> Resume
               </button>
            )}
          </div>
          
          {objects.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {objects.map((o, i) => (
                 <a 
                   key={i} 
                   href={o.amazonUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex-shrink-0 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 flex items-center gap-2 transition-colors whitespace-nowrap"
                 >
                   <ShoppingCart className="w-3.5 h-3.5 text-red-500" />
                   {o.name}
                 </a>
               ))}
            </div>
          ) : (
            isPaused && !isDetecting && (
              <div className="text-center py-2">
                <p className="text-xs text-gray-500 italic">No items found in this scene. Try another frame.</p>
              </div>
            )
          )}
        </div>
      </div>

      {showDisclaimer && (
        <div className="bg-red-900/40 border-y border-red-500/50 p-2 text-center relative z-10">
          <p className="text-[9px] md:text-xs text-red-200 leading-tight">
            Product links are AI-based suggestions and may not match the exact item shown.
          </p>
          <button 
            onClick={() => setShowDisclaimer(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoStudio;
