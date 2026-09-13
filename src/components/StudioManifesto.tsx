import { useState, useEffect } from 'react';
import { Globe, Clock, Compass, ShieldCheck } from 'lucide-react';

export default function StudioManifesto() {
  const [times, setTimes] = useState({
    tokyo: '',
    london: '',
    newyork: '',
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        tokyo: now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Tokyo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        london: now.toLocaleTimeString('en-US', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        newyork: now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      });
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-10 w-full bg-black py-28 sm:py-36 px-6 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Statement */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              The Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.12]">
            We operate at the threshold where{' '}
            <span className="text-neutral-400 italic font-serif">hyper-realistic 3D artistry</span>{' '}
            converges with computational rigor. We reject disposable design in favor of work that shifts culture.
          </h2>
        </div>

        {/* Global Studio Clocks & Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 border-t border-neutral-900">
          {/* Tokyo */}
          <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between h-64">
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-neutral-500 mb-4">
                <span>HUB 01 // TOKYO</span>
                <span className="text-emerald-400 font-medium">JST [UTC+9]</span>
              </div>
              <h3 className="text-2xl font-medium text-white">Shibuya Laboratory</h3>
              <p className="text-xs text-neutral-400 mt-2">
                3D Character Grooming, Facial Rigging & Hardware Design
              </p>
            </div>
            <div className="flex items-baseline justify-between pt-6 border-t border-neutral-900">
              <span className="text-3xl font-mono tracking-tight text-white">
                {times.tokyo || '19:42:10'}
              </span>
              <span className="text-xs font-mono text-neutral-500">OPEN</span>
            </div>
          </div>

          {/* London */}
          <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between h-64">
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-neutral-500 mb-4">
                <span>HUB 02 // LONDON</span>
                <span className="text-neutral-400 font-medium">GMT [UTC+0]</span>
              </div>
              <h3 className="text-2xl font-medium text-white">Shoreditch Studio</h3>
              <p className="text-xs text-neutral-400 mt-2">
                Brand Strategy, Spatial Architecture & Real-Time Shaders
              </p>
            </div>
            <div className="flex items-baseline justify-between pt-6 border-t border-neutral-900">
              <span className="text-3xl font-mono tracking-tight text-white">
                {times.london || '10:42:10'}
              </span>
              <span className="text-xs font-mono text-neutral-500">ACTIVE</span>
            </div>
          </div>

          {/* New York */}
          <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between h-64">
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-neutral-500 mb-4">
                <span>HUB 03 // NEW YORK</span>
                <span className="text-neutral-400 font-medium">EST [UTC-5]</span>
              </div>
              <h3 className="text-2xl font-medium text-white">SoHo Atelier</h3>
              <p className="text-xs text-neutral-400 mt-2">
                Cultural Campaigns, Editorial Monograph & Client Alliances
              </p>
            </div>
            <div className="flex items-baseline justify-between pt-6 border-t border-neutral-900">
              <span className="text-3xl font-mono tracking-tight text-white">
                {times.newyork || '05:42:10'}
              </span>
              <span className="text-xs font-mono text-neutral-500">STANDBY</span>
            </div>
          </div>
        </div>

        {/* Studio Numbers Proof of Craft */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-900">
            <div className="text-4xl sm:text-5xl font-normal tracking-tight text-white">18</div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-2">
              Global Design Pencils & Grand Prix
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-900">
            <div className="text-4xl sm:text-5xl font-normal tracking-tight text-white">52</div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-2">
              Global Product & Brand Launches
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-900">
            <div className="text-4xl sm:text-5xl font-normal tracking-tight text-white">0.00s</div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-2">
              Compromise on Craft
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-900">
            <div className="text-4xl sm:text-5xl font-normal tracking-tight text-white">100%</div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-2">
              Independent & Founder-Led
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
