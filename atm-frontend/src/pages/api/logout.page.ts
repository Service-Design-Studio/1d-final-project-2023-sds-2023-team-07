import { NextApiRequest, NextApiResponse } from "next";
import URL from "@/components/url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const response = await fetch(`${URL}/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    const data: any = await response.json(); // Used 'any' for simplicity. Consider replacing with a specific type/interface if you know the response shape.

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete data to /logout");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
