import { useState } from "react"
import { Menu, X, Home, Briefcase, Users, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "Services", href: "#services", icon: Briefcase },
  { name: "Clients", href: "#clients", icon: Users },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-4 z-[60] p-2 bg-background/80 backdrop-blur-lg border border-border rounded-full shadow-lg md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[55] md:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-background border-l border-border shadow-xl z-[56] md:hidden"
            >
              <div className="flex flex-col gap-2 p-6 pt-20">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleClick(item.href)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-left",
                        "text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                      )}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
