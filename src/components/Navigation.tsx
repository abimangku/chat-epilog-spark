import { Home, Briefcase, Users, Mail } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function Navigation() {
  const navItems = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "Services", href: "#services", icon: Briefcase },
    { name: "Clients", href: "#clients", icon: Users },
    { name: "Contact", href: "#contact", icon: Mail },
  ]

  return <NavBar items={navItems} />
}
