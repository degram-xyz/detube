// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from '@vercel/edge-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paymentId, ids = [] } = req.body;
  // const body = JSON.stringify({
  //   "items": [
  //     {
  //       "operation": "update",
  //       "key": "foo",
  //       "value": "bar"
  //     }
  //   ]
  // });
  // await fetch('https://api.vercel.com/v1/edge-config/ecfg_j2bcrab70dm7klciie740bsuwm5x/items', {
  //   method: 'POST',
  //   body,
  // });
  res.status(200).json({
    foo: await get('foo')
  });
}
