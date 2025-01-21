import axios from "axios"
import { load } from "cheerio"

export async function GET(req) {
  // Extract the campaign URL from the query parameters
  const { searchParams } = new URL(req.url)
  const widgetUrl = searchParams.get("url")

  if (!widgetUrl) {
    return new Response(
      JSON.stringify({ error: "Missing widget URL in query parameters" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  try {
    // Fetch the widget page HTML
    const response = await axios.get(widgetUrl)
    const html = response.data

    // Load the HTML response with Cheerio
    const $ = load(html)

    // Extract the data you're interested in from the widget (adjust selectors as needed)
    const amountRaisedText = $(".gfm-embed__amount").text().trim()
    const goalAmountText = $(".gfm-embed__goal").text().trim()

    // Clean the amount raised and goal values (remove non-numeric characters)
    const amountRaised = parseFloat(amountRaisedText.replace(/[^\d.-]/g, ""))
    const goalAmount = parseFloat(goalAmountText.replace(/[^\d.-]/g, ""))

    if (isNaN(amountRaised) || isNaN(goalAmount)) {
      throw new Error("Failed to parse fundraising data")
    }

    // Return the extracted data
    return new Response(
      JSON.stringify({
        amountRaised,
        goalAmount,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Error fetching GoFundMe widget:", error)
    return new Response(
      JSON.stringify({ error: "Failed to fetch widget data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
