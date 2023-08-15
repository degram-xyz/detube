// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from '@vercel/edge-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paymentId, ids = [] } = req.body;
  await fetch('https://api.vercel.com/v1/edge-config/ecfg_j2bcrab70dm7klciie740bsuwm5x/items', {
    method: 'POST',
    body: {
      "items": [
        {
          "operation": "update",
          "key": "foo",
          "value": "bar"
        }
      ]
    },
  });
  res.status(200);
}
