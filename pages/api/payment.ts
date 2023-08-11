// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paymentId, ids = [] } = req.body;
  fs.appendFileSync(path.join(__dirname, '../../downloads', 'payments.txt'), 'fooooo\n', 'utf8');
  res.status(200);
}
