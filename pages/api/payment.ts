// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAll } from '@vercel/edge-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paymentId, ids = [] } = req.body;
  const body = JSON.stringify({
    "items": [
      {
        "operation": "create",
        "key": "foo",
        "value": "bar"
      }
    ]
  });
  const response = await fetch('https://api.vercel.com/v1/edge-config/ecfg_j2bcrab70dm7klciie740bsuwm5x/items', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body,
  });
  console.log(`${response.status}: ${response.body}`);
  const items = await getAll();
  res.status(200).json(items);
}
