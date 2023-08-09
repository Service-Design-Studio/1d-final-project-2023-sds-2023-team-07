import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const response = await fetch(
      `https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to post data to /login");
    }

    // Check if there are any 'set-cookie' headers
    const backendCookies = response.headers.get("set-cookie");

    if (backendCookies) {
      res.setHeader("set-cookie", backendCookies); // Forward the cookies to the browser
    }

    res.status(200).json(data);
  } catch (error) {
    // 'any' is used to allow error.message access without type issues
    res.status(500).json({ message: error.message });
  }
}
