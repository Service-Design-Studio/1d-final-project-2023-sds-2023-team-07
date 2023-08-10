import { NextApiRequest, NextApiResponse } from "next";

export default async (req, res) => {
  if (req.method === "GET") {
    // Extract cookie from the incoming request
    const userCookie = req.headers.cookie;
    try {
      // Use the cookie when making the external API request.
      const response = await fetch(
        "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/is_logged",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userCookie}`, // Example: using cookie value as a Bearer token
            Cookie: userCookie, // Or you could forward the cookie directly, if the external API expects it
          },
          include: "credentials",
        }
      );

      // Check if the fetch request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (userCookie) {
        res.status(200).json({
          data: data,
          cookie: true,
        });
      } else {
        res.status(200).json({
          data: data,
          cookie: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
