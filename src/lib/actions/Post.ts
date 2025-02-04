import { redirect } from "next/navigation"

export async function createPost(formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    creatorName: formData.get("creatorName"),
    location: formData.get("location"),
    forSelf: formData.get("forSelf") === "true",
    imageUrl: formData.get("imageUrl") ?? "",
    gofundmeUrl: formData.get("gofundmeUrl") ?? "",
    amountRaised: formData.get("amountRaised") ?? 0,
    additionalLinks: formData.get("additionalLinks") ?? [],
    venmo: formData.get("venmo") ?? "",
    zelle: formData.get("zelle") ?? "",
  }
  console.log(data)
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to create post")
    }

    const newPost = await response.json()
    alert("Post created successfully!")
    redirect(`/`)
    // Redirect to the new post
  } catch (error) {
    console.error("Error creating post:", error)
  }
}
