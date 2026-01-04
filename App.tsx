
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Diagram from './components/Diagram';
import logo from './logo.png';

import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2,
  FastForward,
  Rewind,
  SkipBack,
  SkipForward
} from 'lucide-react';

const TOTAL_DURATION = 240; 

// Key protocol timestamps for step-by-step navigation
const PROTOCOL_STEPS = [
  0, 3, 5, 9, 11, 15, 17, 21, 23, 27, 29, 33, 35, 39, 41, 45, 47, 50, 56, 62, 
  65, 71, 77, 83, 89, 95, 97, 99, 101, 107, 113, 119, 125, 131, 137, 143, 149, 155, 
  161, 167, 173, 179, 185, 191, 197, 203, 209
];

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [viewBoxW, setViewBoxW] = useState(1800);
  const [viewBoxH, setViewBoxH] = useState(1993);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const lastSeekTimeRef = useRef<number>(0);

  const getAnimations = useCallback(() => {
    if (!containerRef.current) return [];
    return containerRef.current.getAnimations({ subtree: true });
  }, []);

  const syncTime = useCallback((time: number) => {
    const anims = getAnimations();
    anims.forEach(anim => {
      if (isFinite(time)) {
        anim.currentTime = time * 1000;
      }
    });
  }, [getAnimations]);

  const syncSpeed = useCallback((rate: number) => {
    const anims = getAnimations();
    anims.forEach(anim => {
      anim.playbackRate = rate;
    });
  }, [getAnimations]);

  const syncPlayState = useCallback((playing: boolean) => {
    const anims = getAnimations();
    anims.forEach(anim => {
      if (playing) anim.play(); else anim.pause();
    });
  }, [getAnimations]);

  useEffect(() => { syncSpeed(playbackRate); }, [playbackRate, syncSpeed]);
  useEffect(() => { syncPlayState(isPlaying); }, [isPlaying, syncPlayState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      syncTime(currentTime);
      syncSpeed(playbackRate);
      syncPlayState(isPlaying);
    }, 200); 
    return () => clearTimeout(timer);
  }, []);

  const animate = useCallback(() => {
    if (isPlaying) {
      if (Date.now() - lastSeekTimeRef.current > 300) {
        const anims = getAnimations();
        if (anims.length > 0) {
          const refAnim = anims.find(a => (a as any).id !== 'ignore') || anims[0];
          if (refAnim && refAnim.currentTime !== null) {
             const timeInSeconds = (refAnim.currentTime as number) / 1000;
             setCurrentTime(timeInSeconds % (TOTAL_DURATION + 0.1));
          }
        }
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isPlaying, getAnimations]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  const handleManualTimeChange = (newTime: number) => {
    const clamped = Math.min(Math.max(newTime, 0), TOTAL_DURATION);
    lastSeekTimeRef.current = Date.now();
    setCurrentTime(clamped);
    syncTime(clamped);
  };

  const handleSeek = (delta: number) => {
    handleManualTimeChange(currentTime + delta);
  };

  const jumpToNextStep = () => {
    const next = PROTOCOL_STEPS.find(s => s > currentTime + 0.5);
    if (next !== undefined) handleManualTimeChange(next);
  };

  const jumpToPrevStep = () => {
    const prev = [...PROTOCOL_STEPS].reverse().find(s => s < currentTime - 0.5);
    if (prev !== undefined) handleManualTimeChange(prev); else handleManualTimeChange(0);
  };

  const handleRestart = () => {
    lastSeekTimeRef.current = Date.now();
    setCurrentTime(0);
    syncTime(0);
    setIsPlaying(true);
    syncPlayState(true);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden font-sans select-none">
      
      {/* Zoom Controls Overlay - WIDTH */}
      <div className="fixed bottom-4 left-4 z-[110] bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-lg text-[10px] flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-slate-500 uppercase tracking-tighter">ViewWidth: {viewBoxW}px</label>
          <input 
            type="range" 
            min="600" max="3000" 
            value={viewBoxW} 
            onChange={(e) => setViewBoxW(Number(e.target.value))}
            className="w-32 h-1 accent-indigo-600 cursor-ew-resize opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Zoom Controls Overlay - HEIGHT */}
      <div className="fixed bottom-4 right-4 z-[110] bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-lg text-[10px] flex flex-col gap-2">
        <div className="flex flex-col gap-1 items-end">
          <label className="font-bold text-slate-500 uppercase tracking-tighter">ViewHeight: {viewBoxH}px</label>
          <input 
            type="range" 
            min="600" max="3000" 
            value={viewBoxH} 
            onChange={(e) => setViewBoxH(Number(e.target.value))}
            style={{ writingMode: 'vertical-lr' }}
            className="h-32 w-1 accent-indigo-600 appearance-auto cursor-ns-resize opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Header - Adjusted for centering and symbol removal */}
      <header className="shrink-0 bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between z-[105] min-h-[72px]">
        {/* Empty left spacer to maintain center alignment */}
        <div className="w-[200px] hidden md:block"></div>
        
        
        {/* Centered Heading */}
        {/*
        <div className="flex-grow text-center">
          <h1 className="text-sm md:text-lg font-black text-slate-800 tracking-tight leading-none uppercase">Interactive 5G Call Flow Visualizer</h1>
          <h2 className="text-[12px] md:text-[14px] font-black text-slate-700 tracking-widest uppercase">Chandhar Research Labs Pvt. Ltd.</h2>
        </div> */}
        
        <div className="flex-grow flex items-center justify-center gap-3">
          {/* Logo */}
          <img
              src={logo}
              alt="Chandhar Research Labs Logo"
              className="h-20 w-auto object-contain"
          />
          {/* Text */}
          <div className="text-center">
            <h1 className="text-xs sm:text-sm md:text-lg font-black text-slate-800 tracking-tight leading-none uppercase">
              Interactive 5G Call Flow Visualizer
            </h1>
            <h2 className="text-[10px] sm:text-[12px] md:text-[14px] font-black text-slate-700 tracking-widest uppercase text-center">
              Chandhar Research Labs Pvt. Ltd.
            </h2>
          </div>
        </div>
                

        {/* Timers on Right */}
        
      </header>

      {/* Diagram Container */}
      <main className="flex-grow overflow-x-hidden overflow-y-auto relative bg-white custom-scrollbar">
        <div className="w-full flex justify-center py-4">
          <div
            ref={containerRef}
            className="relative w-full max-w-full overflow-x-auto"
          >
            <Diagram width={viewBoxW} height={viewBoxH} />
          </div>
        </div>
      </main>
{*/
      
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[120] w-[90%] max-w-2xl hidden md:block">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-6">
          
          
          <div className="w-full group">
            <div className="flex justify-between mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>0s</span>
              <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Scrub to Forward/Backward</span>
              <span>{TOTAL_DURATION}s</span>
            </div>
            <div className="relative flex items-center h-4">
              <input 
                type="range" 
                min="0" 
                max={TOTAL_DURATION} 
                step="0.1"
                value={currentTime}
                onChange={(e) => handleManualTimeChange(Number(e.target.value))}
                className="timeline-slider w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 z-10"
              />
              <div 
                className="absolute top-1/2 left-0 h-1.5 bg-indigo-600 rounded-lg -translate-y-1/2 pointer-events-none transition-all duration-100"
                style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-1.5">
              <button onClick={jumpToPrevStep} className="action-btn-small" title="Previous Step">
                <SkipBack size={14} />
              </button>
              <button onClick={() => handleSeek(-5)} className="action-btn-small" title="Back 5s">
                <Rewind size={14} />
              </button>
            </div>

            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
              </button>
              <button onClick={handleRestart} className="p-3 text-slate-400 hover:text-indigo-600 transition-colors" title="Restart">
                <RotateCcw size={20} className="stroke-[2.5px]" />
              </button>
            </div> 

            
            <div className="flex items-center gap-1.5">
              <button onClick={() => handleSeek(5)} className="action-btn-small" title="Forward 5s">
                <FastForward size={14} />
              </button>
              <button onClick={jumpToNextStep} className="action-btn-small" title="Next Step">
                <SkipForward size={14} />
              </button>
            </div>
          </div> 

          
          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Slow Down / Fasten</span>
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                {[0.5, 1, 2, 5].map((rate) => (
                  <button 
                    key={rate} 
                    onClick={() => setPlaybackRate(rate)} 
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${playbackRate === rate ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
               <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Active Connection</span>
            </div>
          </div>
        </div>*
      </div> */}

      <style>{`
        .action-btn-small {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          padding: 10px;
          color: #64748b;
          transition: all 0.2s;
        }
        .action-btn-small:hover { 
          background: white; 
          border-color: #e2e8f0; 
          color: #4f46e5;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .action-btn-small:active { transform: scale(0.95); }

        .timeline-slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: white;
          border: 3px solid #4f46e5;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
          transition: transform 0.1s;
        }
        .timeline-slider::-webkit-slider-thumb:hover { transform: scale(1.3); }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default App;
