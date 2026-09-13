import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check, X, ArrowRight, Shield } from 'lucide-react';
import { SHOP_ITEMS } from '../data/studioData';
import { ShopItem } from '../types';

export default function ShopSection() {
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [cartSuccess, setCartSuccess] = useState<string | null>(null);

  const handleAddToCart = (item: ShopItem) => {
    setCartSuccess(item.name);
    setTimeout(() => {
      setCartSuccess(null);
      setSelectedItem(null);
    }, 2000);
  };

  return (
    <section id="shop" className="relative z-10 w-full bg-black py-24 sm:py-32 px-6 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Mainframe Editions
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Studio Artifacts
            </h2>
            <p className="mt-4 text-neutral-400 text-base max-w-xl">
              Limited-run physical sculptures, curated editorial monographs, heavyweight studio apparel, and bespoke retail typefaces.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider self-start md:self-auto">
            [NUMBERED ARCHIVAL RELEASES — WORLDWIDE EXPEDITED SHIPPING]
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOP_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-neutral-950 border border-neutral-900 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer"
            >
              {/* Product Visual */}
              <div className="relative aspect-square overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                      item.status === 'Low Stock'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-black/60 text-white border border-neutral-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase mb-1">
                    {item.edition}
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-neutral-200 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-900">
                  <span className="text-base font-semibold text-white font-mono">{item.price}</span>
                  <span className="text-xs font-mono uppercase text-neutral-500 group-hover:text-white transition-colors">
                    Inspect Edition →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Detail / Cart Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="aspect-square rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-900">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                      {selectedItem.edition}
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight mb-2">
                      {selectedItem.name}
                    </h3>
                    <div className="text-xl font-mono font-semibold text-white mb-4">
                      {selectedItem.price}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                      {selectedItem.description}
                    </p>

                    <div className="space-y-1.5 border-t border-neutral-900 pt-3">
                      {selectedItem.details.map((detail, idx) => (
                        <div key={idx} className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-neutral-600" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    {cartSuccess ? (
                      <div className="py-3 px-4 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-2 text-sm font-medium">
                        <Check className="w-4 h-4" />
                        <span>Reserved to Studio Bag</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddToCart(selectedItem)}
                        className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Acquire Edition ({selectedItem.price})</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
