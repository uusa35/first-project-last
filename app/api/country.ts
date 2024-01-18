import { getCountryCookie } from "../actions"

export async function GET(request: Request) {
    const res = await fetch(`api/country`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const country = await getCountryCookie();
    return Response.json({ country })
}