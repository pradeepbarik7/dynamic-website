import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/4358b699-1e8c-435d-8040-98ef418fb244-vx3_KnqTCO8QEC-THWBjMQ-output.mp4?x-kcdn-pid=112372';
const LOCAL_VIDEO_SRC = '/hero-video.mp4';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Desktop Mouse Scrubbing Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };
    video.addEventListener('seeked', handleSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        targetTimeRef.current = video.currentTime;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      // Update target scrub time based on (delta / window.innerWidth) * 0.8 * video.duration
      const timeOffset = (delta / window.innerWidth) * 0.8 * video.duration;
      let newTime = (targetTimeRef.current || video.currentTime) + timeOffset;

      // Clamp the time between 0 and duration
      newTime = Math.max(0, Math.min(video.duration, newTime));
      targetTimeRef.current = newTime;

      // Pause to scrub manually
      if (!video.paused) {
        video.pause();
      }

      try {
        video.currentTime = newTime;
      } catch {
        // Safe catch for fast scrubbing
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Mobile Autoplay Hook: Because scrubbing is disabled on mobile frames, trigger normal playback for screens < 1024 width
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkAndPlayMobile = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.loop = true;
        video.play().catch(() => {
          // Handled gracefully if browser restricts autoplay
        });
      } else {
        video.autoplay = false;
        video.pause();
      }
    };

    checkAndPlayMobile();
    window.addEventListener('resize', checkAndPlayMobile);

    return () => {
      window.removeEventListener('resize', checkAndPlayMobile);
    };
  }, []);

  return (
    <div
      id="hero-bg-video-container"
      className="order-last lg:order-none relative lg:absolute lg:inset-y-0 lg:left-1/2 lg:right-0 lg:w-1/2 lg:h-full lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto bg-black"
    >
      <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10" />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        loop
        className="w-full h-full object-cover object-center"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        <source src={LOCAL_VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
