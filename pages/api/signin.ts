import type { NextApiRequest, NextApiResponse } from 'next';
import { DePlanClient } from "deplan-client";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
  const client = new DePlanClient('6eS5GaEaXooBRNk6sK1yGVE7WRvr41Sv68zY6odk9MTC');
  client.verifySignIn(req.body.message, req.body.signature, '7qUPhUmL6nNTWU7yMsWueR778SYbNhBU2B2tqddfns6j');
  res.status(200).json({ token: 'token' });
}
