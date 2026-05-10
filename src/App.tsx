/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Gift, Sparkles, Star, Cake, PartyPopper } from 'lucide-react';

const MESSAGES = [
  "Chúc Đan Thư tuổi mới luôn tràn đầy niềm vui, hạnh phúc và thành công rực rỡ!",
  "Mãi luôn xinh đẹp, rạng rỡ và giữ vững nụ cười toả nắng của mình nhé.",
  "Hy vọng mọi ước mơ của cậu đều sẽ trở thành hiện thực trong năm nay.",
  "Một người bạn tuyệt vời xứng đáng có một sinh nhật thật tuyệt vời!",
  "Chúc cậu luôn được yêu thương và gặp thật nhiều may mắn trong cuộc sống.",
];

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startCelebration = () => {
    setHasStarted(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff85a1', '#ffb3c1', '#ffc4d6']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff85a1', '#ffb3c1', '#ffc4d6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const nextMessage = () => {
    setCurrentStep((prev) => (prev + 1) % MESSAGES.length);
    triggerConfetti();
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] text-[#4a4a4a] font-sans selection:bg-pink-200 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <motion.div 
           animate={{ 
             y: [0, -20, 0],
             rotate: [0, 5, -5, 0]
           }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-20 left-[10%] opacity-20"
         >
           <Star size={40} className="text-pink-400" />
         </motion.div>
         <motion.div 
           animate={{ 
             y: [0, 20, 0],
             rotate: [0, -5, 5, 0]
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-20 right-[15%] opacity-20"
         >
           <Heart size={48} className="text-pink-300" fill="currentColor" />
         </motion.div>
         <motion.div 
           animate={{ 
             scale: [1, 1.1, 1],
           }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/2 left-[5%] opacity-15"
         >
           <Sparkles size={60} className="text-yellow-400" />
         </motion.div>
      </div>

      <main className="relative max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              className="text-center space-y-8"
              id="intro-section"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white p-8 rounded-full shadow-2xl shadow-pink-200/50 relative z-10"
                >
                  <Gift size={80} className="text-pink-500" />
                </motion.div>
                <motion.div 
                  className="absolute -inset-4 bg-pink-100 rounded-full blur-xl -z-10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800" id="main-title">
                  Chào Đan Thư!
                </h1>
                <p className="text-lg text-gray-500 max-w-md mx-auto italic">
                  Có một món quà nhỏ đang chờ đợi cậu ở đây...
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startCelebration}
                className="px-8 py-4 bg-pink-500 text-white rounded-full font-semibold shadow-lg shadow-pink-300/50 hover:bg-pink-600 transition-colors flex items-center gap-2 mx-auto"
                id="open-gift-btn"
              >
                Mở Quà <PartyPopper size={20} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center space-y-12"
              id="celebration-section"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                  className="inline-block"
                >
                  <Cake size={64} className="text-pink-500 mb-4" />
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 drop-shadow-sm" id="banner-text">
                  Sinh Nhật Vui Vẻ, Đan Thư!
                </h2>
                <h3 className="text-xl md:text-2xl font-sans font-medium text-gray-500" id="name-display">
                  được làm bởi TP
                </h3>
              </div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-pink-50 max-w-2xl mx-auto relative group"
                id="message-card"
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium"
                  >
                    {MESSAGES[currentStep]}
                  </motion.p>
                </AnimatePresence>
                
                <div className="absolute -top-4 -right-4 bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {currentStep + 1}
                </div>
              </motion.div>

              <div className="flex flex-col items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextMessage}
                  className="group px-8 py-4 bg-white border-2 border-pink-200 text-pink-500 rounded-full font-semibold hover:bg-pink-50 transition-all flex items-center gap-2"
                  id="next-wish-btn"
                >
                  Lời chúc tiếp theo <Heart size={18} className="group-hover:fill-pink-500 transition-colors" />
                </motion.button>

                <div className="flex gap-2" id="pagination-dots">
                  {MESSAGES.map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${currentStep === i ? 'w-6 bg-pink-400' : 'bg-pink-200'}`}
                    />
                  ))}
                </div>
              </div>

              <footer className="pt-12 text-gray-400 text-sm italic">
                lời chúc cứng như AI, thông cảm:))
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Playfair+Display:ital,wght@1,700&display=swap');
      `}</style>
    </div>
  );
}
