import { Home, Briefcase, Users, Mail } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import MobileNav from "@/components/MobileNav"
import epilogLogo from "@/assets/epilog-logo.avif"

export default function Navigation() {
  const navItems = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "Services", href: "#services", icon: Briefcase },
    { name: "Clients", href: "#clients", icon: Users },
    { name: "Contact", href: "#contact", icon: Mail },
  ]

  return (
    <>
      {/* Logo */}
      <a 
        href="#hero" 
        className="fixed top-6 left-4 md:left-6 z-[60]"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth", block: "start" })
        }}
      >
        <img 
          src={epilogLogo} 
          alt="Epilog Creative" 
          className="h-8 md:h-10 w-auto"
        />
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavBar items={navItems} />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  )
}
