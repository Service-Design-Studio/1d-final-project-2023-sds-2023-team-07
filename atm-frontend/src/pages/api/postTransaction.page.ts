import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import URL from "@/components/url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed, must be POST" });
    return;
  }

  const { atm_machine_id, user_id, transaction_type, amount } = req.body;

  if (!(atm_machine_id && user_id && transaction_type && amount)) {
    res
      .status(400)
      .json({ error: "Missing required parameters in request body" });
    return;
  }

  const body = JSON.stringify({
    atm_machine_id,
    user_id,
    transaction_type,
    amount,
  });

  try {
    const response = await fetch(`${URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: "Failed to create transaction" });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating transaction" });
  }
}
