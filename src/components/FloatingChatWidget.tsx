import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./ChatInterface";
import { Button } from "./ui/button";

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Observe Hero section visibility
    const heroElement = document.querySelector('#hero-section');
    
    if (heroElement) {
      heroObserverRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsHeroVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      
      heroObserverRef.current.observe(heroElement);
    }

    // Listen for global open chat events
    const handleOpenChat = ((e: CustomEvent) => {
      setIsOpen(true);
      if (e.detail?.message) {
        // Trigger auto-send through ChatInterface
        const event = new CustomEvent('autoSendMessage', { detail: { message: e.detail.message } });
        window.dispatchEvent(event);
      }
    }) as EventListener;

    window.addEventListener('openChat', handleOpenChat);

    return () => {
      if (heroObserverRef.current) {
        heroObserverRef.current.disconnect();
      }
      window.removeEventListener('openChat', handleOpenChat);
    };
  }, []);

  // Don't show bubble when Hero is visible or when chat is open in Hero
  const showFloatingBubble = !isHeroVisible && !isOpen;

  return (
    <>
      {/* Floating Bubble Button */}
      <AnimatePresence>
        {showFloatingBubble && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-foreground text-background shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
            aria-label="Open chat with Epilog AI"
          >
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            <motion.div
              className="absolute inset-0 rounded-full bg-foreground/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] max-w-[400px] h-[600px] max-h-[calc(100vh-3rem)] md:w-[400px] rounded-2xl backdrop-blur-xl bg-background/95 border border-border shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(600px, calc(100vh - 3rem))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-normal tracking-tight">Chat with Epilog</h3>
                <span className="px-2 py-0.5 text-xs font-light bg-muted/50 rounded-full backdrop-blur-sm">
                  AI Assistant
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Subtext */}
            <div className="px-4 py-2 text-xs text-muted-foreground font-light border-b border-border/50 bg-muted/20">
              AI assistant • Human handoff available
            </div>

            {/* Chat Interface */}
            <div className="flex-1 overflow-hidden">
              <ChatInterface isFloating />
            </div>

            {/* Footer Disclaimer */}
            <div className="px-4 py-2 text-xs text-muted-foreground font-light text-center border-t border-border/50 bg-background/50">
              Responses are AI-generated. A human will follow up if needed.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatWidget;
