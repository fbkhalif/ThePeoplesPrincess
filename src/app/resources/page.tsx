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
import React, { useState, useEffect, useMemo } from "react"
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
    key: "categories",
    label: "CATEGORY",
  },
]
const categories = {
  "Essential Resources": "bg-red-100",
  "Monetary Aid": "bg-success-200",
  "Volunteer Opportunities": "bg-purple-200",
  "Health & Wellness": "bg-primary-200",
  "Disaster Relief": "bg-secondary-200",
  "Crowdsourced Listings": "bg-pink-200",
  Other: "bg-default-200",
}

const categoriesOptions = [
  { value: "Essential Resources", label: "⛑️ Essential Resources " },
  { value: "Monetary Aid", label: "💰 Monetary Aid" },
  { value: "Volunteer Opportunities", label: "🫰🏽 Volunteer Opportunities" },
  { value: "Health & Wellness", label: "🩺 Health & Wellness" },
  { value: "Disaster Relief", label: "🧯 Disaster Relief" },
  { value: "Crowdsourced Listings", label: "📋 Crowdsourced Listings" },
  { value: "Other", label: "Other" },
  //{ value: "All", label: "All" },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

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
  const filteredItems = useMemo(() => {
    return selectedCategory === "All"
      ? resources
      : resources.filter((item) =>
          item.categories.some((category) => category === selectedCategory)
        )
  }, [selectedCategory, resources])

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  const getCategoryLabel = (value) => {
    const category = categoriesOptions.find((option) => option.value === value)
    return category ? category.label : value
  }
  console.log(filteredItems, selectedCategory)
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
      <NavbarPostings
        categoriesOptions={categoriesOptions}
        selectedCategories={selectedCategory}
        filterItemsCategories={categoriesOptions}
        handleFilterChange={setSelectedCategory}
      />
      <Table
        classNames={{
          base: "min-w-full border-none mt-2 bg-white",
          table: "overflow-x-auto ",
          tr: "border-b",
        }}>
        <TableHeader
          className="bg-slate-50 border-none border-t-default-foreground"
          columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredItems}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <a
                  className="text-secondary text-xs hover:text-secondary-200"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer">
                  {item.name}
                </a>
              </TableCell>
              <TableCell className="text-xs max-h-32 overflow-scroll sm:max-h-24 text-slate-600">
                <div className="max-h-32 overflow-y-auto">{item.desc}</div>
              </TableCell>
              <TableCell className="sm:w-1/6">
                {item.categories &&
                  item.categories.length > 0 &&
                  item.categories[0] != "" && (
                    <div>
                      {item.categories.map((tag, index) => (
                        <Chip
                          variant="flat"
                          size="sm"
                          // color={categories[tag] || "default"}
                          classNames={{
                            base: `${categories[tag]} ml-1 border mb-1 text-[10px]`,
                            content: "color-black/25 text-black/50",
                          }}
                          key={tag}>
                          {getCategoryLabel(tag)}
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
