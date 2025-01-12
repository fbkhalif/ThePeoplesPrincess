"use client"
import Link from "next/link"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
} from "@nextui-org/react"
import { useState, useEffect } from "react"
import NavbarPostings from "../../components/NavbarPostings"

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "info",
    label: "INFO",
  },
  {
    key: "tags",
    label: "TAGS",
  },
]

export default function ResourcesPage() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResources() {
      const response = await fetch("/api/resources")
      if (response.ok) {
        const data = await response.json()
        setResources(data)
      } else {
        console.error("Failed to fetch resources")
      }
      setLoading(false)
    }

    fetchResources()
  }, [])

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <div className="container mx-auto p-4">
      <div className="text-center justify-center mb-8 mt-6">
        <h1 className="text-2xl text-center font-bold">Mutual Aid Resources</h1>
        <p className="text-slate-500 text-xs py-4 font-light md:px-20 lg:px-32 sm:px-4">
          This list is a compilation of links to Google Sheets containing
          <b> volunteering opportunities</b>, <b>donation sites</b>,{" "}
          <b>GoFundMe campaigns</b>, and <b>organizations</b> with mutual aid
          information. It serves as a comprehensive dump of resources to help
          individuals connect with ways to support communities in need. Feel
          free to add your own links to other resources.
        </p>
      </div>
      <NavbarPostings />
      <Table className="min-w-full border-none mt-2 bg-white">
        <TableHeader className="bg-slate-200" columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={resources}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <a
                  className="text-secondary hover:text-secondary-200"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer">
                  {item.name}
                </a>
              </TableCell>

              <TableCell className="text-xs text-slate-600">
                {item.desc}
              </TableCell>
              <TableCell className="">
                {item.tags && item.tags.length > 0 && item.tags[0] != "" && (
                  <div>
                    {item.tags.map((tag) => (
                      <Chip
                        variant="flat"
                        size="sm"
                        color="primary"
                        className="ml-1 mb-1 text-[10px]"
                        key={tag}>
                        {tag}
                      </Chip>
                    ))}
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
