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
import { useState } from "react"
const rows = [
  {
    key: "4",
    name: "MALAN Fire & Wind Storm Resources",
    url: "https://docs.google.com/spreadsheets/d/1KMk34XY5dsvVJjAoD2mQUVHYU_Ib6COz6jcGH5uJWDY/htmlview?sle=true",
    tags: ["resource list", "food"],
    info: "google sheets of info",
  },
  {
    key: "5",
    name: "Eaton Fire Go Fund Me",
    url: "https://sites.google.com/view/denacommunityrelief/go-fund-me?authuser=0",
    tags: ["eaton fire"],
    info: "relief list",
  },
  {
    key: "6",
    name: "Help LA Rebuild: Direct Aid",
    url: "https://docs.google.com/spreadsheets/d/1sW8N8dlP21jisoMSePIl4M2A-rQFCDV5uzPgwM_7ma8/edit",
    tags: ["gofundme", "family"],
    info: "direct aid info",
  },

  // Add more resources as needed
]
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
  return (
    <div className="container mx-auto p-4">
      <div className="text-center justify-center mb-8 mt-6">
        <h1 className="text-2xl text-center font-bold">Mutual Aid Resources</h1>
        <p className="text-slate-500 text-xs py-4 font-light md:px-20 lg:px-32 sm:px-4">
          Many, Many other Sites Have Compiled Resources for Mutual Aid. Here
          Are a Few of Them. As well as other resources.
        </p>
      </div>
      <Table className="min-w-full bg-white">
        <TableHeader className="bg-slate-200" columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              <TableCell>
                <a
                  className="text-secondary hover:text-secondary-200"
                  href={item.url}>
                  {item.name}
                </a>
              </TableCell>

              <TableCell className="text-xs text-slate-600">
                {item.info}
              </TableCell>
              <TableCell className="">
                {item.tags.map((tag) => (
                  <Chip
                    variant={"flat"}
                    size="sm"
                    color="primary"
                    className="ml-1"
                    key={tag}>
                    {tag}
                  </Chip>
                ))}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
