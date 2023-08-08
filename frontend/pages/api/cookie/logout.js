import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const response = await fetch(
      "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/logout",
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete data to /logout");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
