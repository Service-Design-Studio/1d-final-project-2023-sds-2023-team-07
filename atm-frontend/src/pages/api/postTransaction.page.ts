import type { NextApiRequest, NextApiResponse } from "next";
import URL from "@/components/url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed, must be POST" });
    return;
  }

  const { atm_machine_id, amount, transaction_type } = req.body;

  if (!(atm_machine_id && transaction_type && typeof amount === "number")) {
    res
      .status(400)
      .json({ error: "Missing required parameters in request body" });
    return;
  }

  const body = JSON.stringify({
    atm_machine_id,
    amount,
    transaction_type,
  });

  // Extract cookie from the incoming request
  const userCookie = req.headers.cookie || "";

  try {
    const response = await fetch(`${URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCookie}`,
        Cookie: userCookie,
      },
      body,
      credentials: "include", // Ensures cookies are sent, important for cross-origin requests
    });

    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: "Failed to create transaction" });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating transaction" });
  }
}
