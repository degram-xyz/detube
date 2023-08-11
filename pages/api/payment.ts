// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paymentId, ids = [] } = req.body;
  fs.writeFileSync(`downloads/${paymentId}`, `${ids.join(';')}`, 'utf8');
  res.status(200);
}
