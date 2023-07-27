import URL from "@/components/url";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id } = req.query;

  if (user_id == null) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  // Build the URL
  const url = `${URL}/users/${user_id}`;

  try {
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      res.status(response.status).json({ error: "Failed to fetch user data" });
      return;
    }

    // Parse the response body as JSON
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
}
