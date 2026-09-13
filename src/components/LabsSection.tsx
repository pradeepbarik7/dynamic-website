import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, RefreshCw, Copy, Check, Sliders, Play, Volume2 } from 'lucide-react';
import { LAB_EXPERIMENTS } from '../data/studioData';

export default function LabsSection() {
  const [activeTab, setActiveTab] = useState<'kinetic' | 'particles' | 'chromatic'>('kinetic');

  // Kinetic Wave Canvas State
  const kineticCanvasRef = useRef<HTMLCanvasElement>(null);
  const [waveSpeed, setWaveSpeed] = useState(0.04);
  const [amplitude, setAmplitude] = useState(25);
  const [typedText, setTypedText] = useState('MAINFRAME LABS');

  // Particle Canvas State
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Chromatic Palette Generator State
  const [palette, setPalette] = useState([
    { hex: '#000000', name: 'Void Obsidian', ratio: '21:1' },
    { hex: '#10B981', name: 'Synthesized Emerald', ratio: '9.4:1' },
    { hex: '#34D399', name: 'Bioluminescent Mint', ratio: '12.2:1' },
    { hex: '#E5E7EB', name: 'Aerospace Aluminum', ratio: '16.8:1' },
    { hex: '#FFFFFF', name: 'Pure Lux White', ratio: '21:1' },
  ]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const generateNewPalette = () => {
    const mintVariations = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];
    const darkVariations = ['#050505', '#0A0A0A', '#121212', '#171717', '#262626'];
    const lightVariations = ['#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF'];

    setPalette([
      { hex: darkVariations[Math.floor(Math.random() * darkVariations.length)], name: 'Dark Substrate', ratio: '19.2:1' },
      { hex: mintVariations[Math.floor(Math.random() * mintVariations.length)], name: 'Harmonic Cyan', ratio: '11.5:1' },
      { hex: '#172554', name: 'Deep Cobalt', ratio: '8.1:1' },
      { hex: lightVariations[Math.floor(Math.random() * lightVariations.length)], name: 'Specular Gray', ratio: '14.6:1' },
      { hex: '#FFFFFF', name: 'Pure White', ratio: '21:1' },
    ]);
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Kinetic Wave Canvas Animation
  useEffect(() => {
    if (activeTab !== 'kinetic') return;
    const canvas = kineticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let step = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = 360;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 38px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const chars = typedText.split('');
      const charWidth = 24;
      const totalWidth = chars.length * charWidth;
      const startX = (canvas.width - totalWidth) / 2 + charWidth / 2;
      const centerY = canvas.height / 2;

      // Draw subtle grid lines
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw mathematical wave path
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = centerY + Math.sin(x * 0.015 + step) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw reactive glyphs
      chars.forEach((char, i) => {
        const x = startX + i * charWidth;
        const waveY = centerY + Math.sin(x * 0.015 + step) * amplitude;
        const angle = Math.cos(x * 0.015 + step) * 0.2;

        ctx.save();
        ctx.translate(x, waveY);
        ctx.rotate(angle);
        ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#34D399';
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });

      step += waveSpeed;
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [activeTab, typedText, waveSpeed, amplitude]);

  // Particle Constellation Animation
  useEffect(() => {
    if (activeTab !== 'particles') return;
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = 360);

    const mouse = { x: width / 2, y: height / 2, active: false };

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            p.x += dx * 0.02;
            p.y += dy * 0.02;
          }
        }

        // Draw connections
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * (1 - dist / 85)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981';
        ctx.fill();
      });

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [activeTab]);

  return (
    <section id="labs" className="relative z-10 w-full bg-black py-24 sm:py-32 px-6 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Mainframe Labs — Experimental R&D
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Computational Playground
            </h2>
            <p className="mt-4 text-neutral-400 text-base max-w-xl">
              Live interactive prototypes from our research lab exploring kinetic type, spatial physics, and algorithmic aesthetics.
            </p>
          </div>

          {/* Interactive Experiment Switcher */}
          <div className="flex bg-neutral-950 p-1.5 rounded-full border border-neutral-800 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('kinetic')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === 'kinetic'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              LAB-01: Kinetic Wave
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('particles')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === 'particles'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              LAB-02: Particles
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chromatic')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === 'chromatic'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              LAB-03: Chromatic Synth
            </button>
          </div>
        </div>

        {/* Interactive Experiment Sandbox Container */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl">
          {activeTab === 'kinetic' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-900">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Kinetic Wave Typography</h3>
                    <p className="text-xs font-mono text-neutral-400">Bézier glyph deformation with sinusoidal harmonics</p>
                  </div>
                </div>

                {/* Live Controls */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">Amplitude:</span>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={amplitude}
                      onChange={(e) => setAmplitude(Number(e.target.value))}
                      className="w-24 accent-emerald-400 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">Speed:</span>
                    <input
                      type="range"
                      min="0.01"
                      max="0.1"
                      step="0.01"
                      value={waveSpeed}
                      onChange={(e) => setWaveSpeed(Number(e.target.value))}
                      className="w-20 accent-emerald-400 cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value.toUpperCase())}
                    maxLength={18}
                    className="px-3 py-1 bg-black border border-neutral-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-neutral-600 w-36"
                    placeholder="Type custom text"
                  />
                </div>
              </div>

              {/* Canvas viewport */}
              <div className="w-full h-[360px] rounded-2xl overflow-hidden border border-neutral-900 bg-[#050505]">
                <canvas ref={kineticCanvasRef} className="w-full h-full block" />
              </div>
            </div>
          )}

          {activeTab === 'particles' && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-900">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Neural Particle Constellation</h3>
                    <p className="text-xs font-mono text-neutral-400">Move your cursor over canvas to warp gravitational attraction</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  60 FPS Real-time
                </span>
              </div>

              <div className="w-full h-[360px] rounded-2xl overflow-hidden border border-neutral-900 bg-[#050505] cursor-crosshair">
                <canvas ref={particleCanvasRef} className="w-full h-full block" />
              </div>
            </div>
          )}

          {activeTab === 'chromatic' && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-900">
                <div className="flex items-center gap-3">
                  <Sliders className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Algorithmic Chromatic Synthesizer</h3>
                    <p className="text-xs font-mono text-neutral-400">Harmonically calibrated perceptual contrast palettes</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={generateNewPalette}
                  className="px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Synthesize Next</span>
                </button>
              </div>

              {/* Color Swatch Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-[320px]">
                {palette.map((swatch, idx) => (
                  <div
                    key={idx}
                    onClick={() => copyToClipboard(swatch.hex)}
                    className="group relative rounded-2xl p-5 flex flex-col justify-between border border-neutral-800 transition-transform duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className="text-xs font-mono uppercase font-semibold px-2 py-1 rounded-md bg-black/40 backdrop-blur-md"
                        style={{ color: '#FFFFFF' }}
                      >
                        {swatch.ratio}
                      </span>
                      <span className="p-1 rounded bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedHex === swatch.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </span>
                    </div>

                    <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <div className="text-xs font-mono font-medium text-white truncate">
                        {swatch.name}
                      </div>
                      <div className="text-xs font-mono text-neutral-300 tracking-wider">
                        {swatch.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Experiment Cards Footer List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {LAB_EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-neutral-500 mb-2">
                  <span>{exp.code}</span>
                  <span className="text-emerald-400 font-medium">{exp.status}</span>
                </div>
                <h4 className="text-base font-medium text-white mb-1.5">{exp.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{exp.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-neutral-900">
                {exp.tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
