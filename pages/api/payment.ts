// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from '@vercel/edge-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paymentId, ids = [] } = req.body;
  const key = `payment_${paymentId}`;
  const payment = JSON.parse(await get(key));
  payment.isPayed = true;
  const body = JSON.stringify({
    "items": [
      {
        "operation": "update",
        "key": key,
        "value": JSON.stringify(payment),
      }
    ]
  });
  const response = await fetch('https://api.vercel.com/v1/edge-config/ecfg_j2bcrab70dm7klciie740bsuwm5x/items?teamId=team_w9RYKh8OIpPW35JwxcUWSK8X', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body,
  });
  console.log(`${response.status}: ${JSON.stringify(await response.json())}`);
  res.status(response.status).json(await response.json());
}
