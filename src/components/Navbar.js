"use client"
import Link from "next/link"
import { PrimaryButton } from "../components/PrimaryButton"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { useState } from "react"
import { Menu, MenuIcon, XIcon } from "lucide-react"

const mutualAidResources = [
  { name: "Mutual Aid LA Network", url: "https://mutualaidla.org/" },
  { name: "COVID-19 Mutual Aid UK", url: "https://covidmutualaid.org/" },
  {
    name: "Mutual Aid Disaster Relief",
    url: "https://mutualaiddisasterrelief.org/",
  },
  { name: "National Mutual Aid Network", url: "https://www.mutualaidhub.org/" },
]

export function Navbar2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar
      maxWidth={"full"}
      onMenuOpenChange={setIsMenuOpen}
      size="small"
      className="text-white min-w-full h-12 px-0 border border-b">
      <NavbarContent className="container mx-auto flex justify-between items-center h-full p-0">
        {/* Brand */}
        <NavbarBrand>
          <Link href="/" className="text-xs font-extrabold text-secondary">
            👑 the people's princess
          </Link>
        </NavbarBrand>

        {/* Menu Toggle for Mobile */}
        <button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-2xl text-black focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <XIcon className="w-8" />
          ) : (
            <MenuIcon className="w-8" />
          )}
        </button>

        {/* Desktop Links */}
        <NavbarContent className="hidden sm:flex" justify="end">
          <Link
            href="/resources"
            className="text-xs mr-2 hover:text-slate-400 text-black whitespace-nowrap">
            Mutual Aid Resources
          </Link>
          <Link
            className="text-xs border max-w-32 text-white py-1 px-2 whitespace-nowrap bg-secondary hover:bg-secondary-dark border-secondary-light rounded-xl"
            href="/create-posting">
            Create New Post +
          </Link>
        </NavbarContent>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-12 left-0 w-full bg-white shadow-md border-t">
            <div className="flex flex-col items-start p-4 space-y-2">
              <Link
                href="/resources"
                className="text-xs hover:text-slate-400 text-black w-full">
                Mutual Aid Resources
              </Link>

              <Link
                className="text-xs border max-w-32 text-white py-1 px-2 whitespace-nowrap bg-secondary hover:bg-secondary-dark border-secondary-light rounded-xl w-full text-center"
                href="/create-posting">
                Create New Post +
              </Link>
            </div>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  )
}
