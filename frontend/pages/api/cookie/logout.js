import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }
  console.log("calling server");
  try {
    const response = await fetch(
      `https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/logout`,
      {
        method: "DELETE",
        credentials: "include", // This will ensure cookies are sent with the request
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to log out");
    }

    // If you need to remove a specific cookie, you can set its value to empty
    // and set the `Max-Age` attribute to 0. Here's an example for a cookie named 'authToken':
    res.setHeader(
      "Set-Cookie",
      "_your_app_session=; Max-Age=0; Path=/; HttpOnly"
    );

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
