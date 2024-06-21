import * as cheerio from 'cheerio'
import { PUBLIC_DEPLOY_PRIME_URL } from '$env/static/public';

const url = PUBLIC_DEPLOY_PRIME_URL
export async function GET(request) {
    const response = await fetch(url)
    const text = await response.text()
    const replaced = text.replaceAll('./_app/', `${url}/_app/`)
    const $ = cheerio.load(replaced)
    const div = $('#svelte')

    return new Response(`<div id="svelte">${div.html()}</div>`)
}