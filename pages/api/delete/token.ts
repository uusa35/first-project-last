// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use server'
import type { NextApiRequest, NextApiResponse } from 'next';
// import Cookies from 'cookies'
import { cookies } from 'next/headers'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV === 'production', });
  // cookies.set('token', undefined);
  cookies().delete('token')
  res.status(200).json({ is_auth: false, token: undefined });
}
