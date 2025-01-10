"use client"
import Link from "next/link"
import { PrimaryButton } from "../components/PrimaryButton"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react"

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
  return (
    <Navbar
      maxWidth={"full"}
      className="text-white min-w-full h-12 shadow-md px-0 border border-b">
      <div className="container mx-0 flex justify-between items-center h-full px-0">
        <NavbarBrand>
          <Link href="/" className="text-xs font-extrabold text-secondary">
            👑 The People's Princess
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Link
            href="/resources"
            className="text-xs mr-2 hover:text-slate-400 text-black">
            Mutual Aid Resources
          </Link>

          <Link
            className="text-xs border text-white py-1 px-2 whitespace-nowrap  bg-secondary hover:bg-secondary-dark  border-secondary-light rounded-xl"
            href="/create-posting">
            Create new post +
          </Link>
        </NavbarContent>
      </div>
    </Navbar>
  )
}
