// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'
import { i18n } from '@/i18n.config'

type Data = {
    lang: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const cookies = new Cookies(req, res);
    const lang = cookies.get('lang');
    if (lang && lang !== 'undefined' && lang.length >= 1) {
        res.status(200).json({ lang });
    } else {
        res.status(200).json({ lang: i18n.defaultLocale });
    }
}
