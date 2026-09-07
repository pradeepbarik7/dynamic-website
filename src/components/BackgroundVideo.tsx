import { useEffect, useRef } from 'react';

const LOCAL_VIDEO_SRC = '/hero-video.mp4';
const VIDEO_SRC =
  'https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/4358b699-1e8c-435d-8040-98ef418fb244-vx3_KnqTCO8QEC-THWBjMQ-output.mp4?x-kcdn-pid=112372';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Desktop Mouse Scrubbing Hook with smooth LERP and seek throttling
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

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        targetTimeRef.current = video.currentTime;
        lerpedTime = video.currentTime;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      // Calculate time delta relative to viewport width
      const timeOffset = (delta / window.innerWidth) * 0.9 * video.duration;
      let newTime = targetTimeRef.current + timeOffset;

      // Clamp between 0 and duration
      newTime = Math.max(0, Math.min(video.duration, newTime));
      targetTimeRef.current = newTime;

      if (!video.paused) {
        video.pause();
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Smooth continuous render loop
    const renderLoop = () => {
      if (video && video.duration && !isNaN(video.duration) && window.innerWidth >= 1024) {
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

    return () => {
      cancelAnimationFrame(animFrameId);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
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
        <source src={LOCAL_VIDEO_SRC} type="video/mp4" />
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
