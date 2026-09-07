/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import BackgroundVideo from './components/BackgroundVideo';
import HeroContent from './components/HeroContent';

export default function App() {
  return (
    <div className="relative bg-black text-white font-sans selection:bg-neutral-800 selection:text-white antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      <Navbar />
      <BackgroundVideo />
      <HeroContent />
    </div>
  );
}
