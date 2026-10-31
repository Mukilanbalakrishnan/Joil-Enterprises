import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Music,
  ChevronLeft,
  ChevronRight,
  X,
  Volume2,
  VolumeX,
  Package,
} from 'lucide-react';
import { VIDEOS_LIST } from '../../data/mockData';
import type { VideoItem } from '../../types';

export const VideosSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeReel, setActiveReel] = useState<VideoItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
      sliderRef.current.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
      sliderRef.current.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
    }
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedReels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Watch wholesale import reel: ${title} - Joli Enterprises`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Reel link copied to clipboard!');
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveReel(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="videos" className="py-20 sm:py-28 bg-[#FAF5EE] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* CENTERED EDITORIAL HEADER (Matching Reference Style) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-2xs text-xs font-black uppercase tracking-wider text-amber-800 font-['Outfit']">
            <span>Behind the Imports</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-[1.12]">
            Witness the Sourcing Journey
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal">
            Watch real 40ft container arrivals at our Chennai godown, overseas factory production inspections, and 24-hour retail dispatch processes.
          </p>
        </div>

        {/* 4-CARD REELS SLIDER CAROUSEL WITH ARROWS */}
        <div className="relative group/carousel">
          
          {/* Previous Arrow Button */}
          <button
            onClick={scrollLeft}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 text-neutral-800 shadow-[0_8px_25px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-neutral-950 hover:text-white cursor-pointer"
            aria-label="Previous reels"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 text-neutral-800 shadow-[0_8px_25px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-neutral-950 hover:text-white cursor-pointer"
            aria-label="Next reels"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slider Horizontal Track (Snap-x, 4 cards in view on desktop) */}
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {VIDEOS_LIST.map((reel) => {
              const isLiked = likedReels[reel.id];

              return (
                <div
                  key={reel.id}
                  onClick={() => setActiveReel(reel)}
                  className="shrink-0 w-[82%] xs:w-[70%] sm:w-[46%] lg:w-[calc(25%-18px)] snap-start group relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 select-none bg-neutral-950 border border-neutral-200/40"
                >
                  {/* Background Video Reel Thumbnail Image */}
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/90 pointer-events-none" />

                  {/* TOP-LEFT: AVATAR & HANDLE */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center font-black text-[10px] shadow-xs">
                      J
                    </div>
                    <span className="text-white text-xs font-bold tracking-tight">
                      {reel.handle || 'jolienterprises'}
                    </span>
                  </div>

                  {/* TOP-RIGHT: CATEGORY BADGE */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] uppercase font-bold text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      {reel.category.split(' ')[0]}
                    </span>
                  </div>

                  {/* CENTER: TRANSLUCENT PLAY BUTTON ICON */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-115 group-hover:bg-white group-hover:text-neutral-950">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* RIGHT-SIDE: SOCIAL ENGAGEMENT ICONS */}
                  <div className="absolute right-3.5 bottom-12 z-10 flex flex-col items-center gap-3.5 text-white">
                    {/* Like Action */}
                    <button
                      onClick={(e) => toggleLike(e, reel.id)}
                      className="flex flex-col items-center gap-1 group/btn cursor-pointer"
                      title="Like reel"
                    >
                      <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-transform group-hover/btn:scale-115">
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] font-bold font-mono">
                        {isLiked ? 'Liked' : reel.likes || '2.4K'}
                      </span>
                    </button>

                    {/* Comments Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveReel(reel);
                      }}
                      className="flex flex-col items-center gap-1 group/btn cursor-pointer"
                      title="Comments"
                    >
                      <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-transform group-hover/btn:scale-115">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[10px] font-bold font-mono">
                        {reel.comments || '184'}
                      </span>
                    </button>

                    {/* Share Action */}
                    <button
                      onClick={(e) => handleShare(e, reel.title)}
                      className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-115 cursor-pointer text-white"
                      title="Share reel"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* BOTTOM-LEFT: CAPTION & AUDIO CREDIT */}
                  <div className="absolute bottom-4 left-4 right-14 z-10 space-y-1.5 text-white">
                    <h3 className="text-xs sm:text-sm font-extrabold leading-snug line-clamp-2 drop-shadow-md font-['Outfit'] group-hover:text-amber-300 transition-colors">
                      {reel.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-300 font-medium">
                      <Music className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{reel.audio || 'Original Audio - jolienterprises'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FULLSCREEN / VERTICAL 9:16 REEL PLAYER MODAL */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-700/80 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                  J
                </div>
                <span className="text-xs font-bold">{activeReel.handle || 'jolienterprises'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-neutral-950 transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setActiveReel(null)}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-neutral-950 transition-colors cursor-pointer"
                  aria-label="Close reel player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Background / Simulation */}
            <div className="relative w-full h-full bg-neutral-950 flex items-center justify-center">
              {activeReel.videoUrl ? (
                <video
                  src={activeReel.videoUrl}
                  poster={activeReel.thumbnail}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={activeReel.thumbnail}
                  alt={activeReel.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
            </div>

            {/* Modal Bottom Caption & Details */}
            <div className="absolute bottom-5 left-5 right-5 z-20 text-white space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                {activeReel.category}
              </span>
              <h3 className="text-sm font-black leading-snug font-['Outfit']">
                {activeReel.title}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-2">
                {activeReel.description}
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  {activeReel.specs}
                </span>
                <span className="font-mono text-amber-300 font-bold">Chennai Godown</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
