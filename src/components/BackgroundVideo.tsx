import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Compass } from 'lucide-react';

const LOCAL_VIDEO_SRC = '/hero-video.mp4';
const VIDEO_SRC =
  'https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/4358b699-1e8c-435d-8040-98ef418fb244-vx3_KnqTCO8QEC-THWBjMQ-output.mp4?x-kcdn-pid=112372';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Unified Mouse (Desktop) and Touch (Mobile) Scrubbing Hook with smooth LERP and seek throttling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animFrameId: number;
    let lerpedTime = video.currentTime || 0;
    let lastSeekTime = 0;

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };
    const handleSeeking = () => {
      isSeekingRef.current = true;
    };
    const handleLoadedMetadata = () => {
      targetTimeRef.current = video.currentTime;
      lerpedTime = video.currentTime;
    };

    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const onPointerMove = (clientX: number) => {
      if (!video || !video.duration || isNaN(video.duration)) return;

      setIsInteracting(true);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 1500);

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        targetTimeRef.current = video.currentTime;
        lerpedTime = video.currentTime;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      // Calculate time delta relative to viewport width
      const sensitivity = window.innerWidth < 1024 ? 1.4 : 0.9;
      const timeOffset = (delta / window.innerWidth) * sensitivity * video.duration;
      let newTime = targetTimeRef.current + timeOffset;

      // Clamp between 0 and duration
      newTime = Math.max(0, Math.min(video.duration, newTime));
      targetTimeRef.current = newTime;

      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    };

    // Desktop Mouse Handlers
    const handleMouseMove = (e: MouseEvent) => {
      onPointerMove(e.clientX);
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Mobile Touch Handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
        targetTimeRef.current = video.currentTime;
        lerpedTime = video.currentTime;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onPointerMove(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    // Smooth continuous render loop
    const renderLoop = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const target = targetTimeRef.current;
        const diff = target - lerpedTime;

        // Smoothly glide towards target with LERP
        if (Math.abs(diff) > 0.001) {
          lerpedTime += diff * 0.22;
        } else {
          lerpedTime = target;
        }

        // Throttle hardware decoder seeks so it never chokes
        const now = performance.now();
        const canSeek = (!video.seeking && !isSeekingRef.current) || (now - lastSeekTime > 60);

        if (Math.abs(video.currentTime - lerpedTime) > 0.015 && canSeek) {
          isSeekingRef.current = true;
          lastSeekTime = now;
          try {
            if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
              (video as any).fastSeek(lerpedTime);
            } else {
              video.currentTime = lerpedTime;
            }
          } catch {
            isSeekingRef.current = false;
          }
        }
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameId);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      id="hero-bg-video-container"
      className="absolute inset-0 lg:inset-y-0 lg:left-1/2 lg:right-0 lg:w-1/2 lg:h-full z-0 overflow-hidden bg-black"
    >
      {/* Mobile Dark Gradient Overlay to ensure text legibility while showing character */}
      <div className="block lg:hidden absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 pointer-events-none z-10" />
      <div className="block lg:hidden absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none z-10" />

      {/* Desktop Left Edge Blending Gradient */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none z-10" />
      <div className="hidden lg:block absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="w-full h-full object-cover object-center sm:object-right lg:object-center opacity-45 sm:opacity-60 lg:opacity-100 transition-opacity duration-700"
      >
        <source src={LOCAL_VIDEO_SRC} type="video/mp4" />
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Interactive 3D Scrub & Playback Status Pill */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs font-medium border border-neutral-700/60 backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer select-none"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-white fill-white" />
              <span className="hidden sm:inline">Play</span>
            </>
          )}
        </button>

        <div className="px-3 py-1.5 rounded-full bg-black/60 text-neutral-300 text-xs font-normal border border-neutral-700/60 backdrop-blur-md flex items-center gap-1.5 select-none">
          <Compass className={`w-3 h-3 ${isInteracting ? 'text-emerald-400 animate-spin' : 'text-neutral-400'}`} />
          <span className="hidden sm:inline">
            {isInteracting ? 'Scrubbing 3D Head' : 'Drag cursor to scrub'}
          </span>
          <span className="sm:hidden">
            {isInteracting ? 'Scrubbing' : 'Swipe to scrub'}
          </span>
        </div>
      </div>
    </div>
  );
}

