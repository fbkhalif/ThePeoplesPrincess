import axios from "axios"
import { load } from "cheerio"

function parseGoal(goalStr) {
  // Convert to uppercase for consistency
  let str = goalStr.toUpperCase()
  // Set multiplier based on presence of 'K'
  let multiplier = 1
  if (str.includes("K")) {
    multiplier = 1000
    // Remove the 'K' from the string
    str = str.replace("K", "")
  }
  // Remove all characters except digits and the decimal point
  const numberPart = str.replace(/[^0-9.]/g, "")
  const value = parseFloat(numberPart)
  return value * multiplier
}
export async function GET(req) {
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
    // Extract static data
    const title = $(".p-campaign-title").text().trim()
    const description = $(".p-campaign-description").text().trim()
    const amountRaisedText = $(".progress-meter_progressBarHeading__Nxc77")
      .text()
      .trim()

    // Clean the amount raised and goal values (remove non-numeric characters)
    const rawGoalText = $(".progress-meter_circleGoalDonations__5gSh1").text()

    const goalTextPortion = rawGoalText.split("goal")[0].trim() // e.g. "$20K"
    const goalAmount = parseGoal(goalTextPortion)
    const progressText = $(
      ".progress-meter_circleProgressBar__UW05M .circle-goal-bar_text__kksyP"
    )
      .text()
      .trim()
    const progressPercentage = parseFloat(progressText.replace("%", ""))
    console.log(rawGoalText, progressPercentage)
    // Clean the amount raised value by removing non-numeric characters
    const amountRaised = parseFloat(amountRaisedText.replace(/[^\d.-]/g, ""))
    // Parse the goal amount using our helper function

    if (isNaN(amountRaised) || isNaN(goalAmount) || !title || !description) {
      throw new Error("Failed to parse fundraising data")
    }
    // Return the extracted data
    return new Response(
      JSON.stringify({
        title,
        description,
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
