import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import URL from "@/components/url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.status(405).json({ error: "Method not allowed, must be PATCH" });
    return;
  }

  const { user_id } = req.query;
  const { is_active } = req.body;

  if (!(user_id && is_active != null)) {
    // Here, we check is_active is not null because it can be 0
    res
      .status(400)
      .json({ error: "Missing required parameters in request body" });
    return;
  }

  const body = JSON.stringify({
    is_active,
  });

  try {
    const response = await fetch(`${URL}/users/${user_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      res.status(response.status).json({ error: "Failed to update user" });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating user" });
  }
}
