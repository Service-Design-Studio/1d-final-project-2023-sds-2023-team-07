import { NextApiRequest, NextApiResponse } from "next";
import URL from "@/components/url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    // Extract cookie from the incoming request
    const userCookie = req.headers.cookie || "";

    try {
      // Use the cookie when making the external API request.
      const response = await fetch(`${URL}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Important for sending JSON data
          Authorization: `Bearer ${userCookie}`,
          Cookie: userCookie,
        },
        body: JSON.stringify(req.body), // Convert the request body to a JSON string
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
