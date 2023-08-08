import URL from "@/components/url";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Extract cookie from the incoming request
    const userCookie = req.headers.cookie || "";

    try {
      // Use the cookie when making the external API request.
      const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          // If your backend expects the authentication data as a Bearer token in the Authorization header
          Authorization: `Bearer ${userCookie}`,
          // If the backend expects the cookie directly (this might be redundant if your backend only uses the Authorization header)
          Cookie: userCookie,
        },
        credentials: "include", // Ensures cookies are sent, important for cross-origin requests
      });

      // Check if the fetch request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
