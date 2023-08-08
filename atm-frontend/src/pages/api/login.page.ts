import { NextApiRequest, NextApiResponse } from "next";
import URL from "@/components/url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
      credentials: "include",
    });

    const data: any = await response.json(); // Used 'any' for simplicity. You can replace it with a specific type later.

    if (!response.ok) {
      throw new Error(data.message || "Failed to post data to /login");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
