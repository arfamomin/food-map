import { load, html } from 'cheerio'
import { PUBLIC_DEPLOY_PRIME_URL } from '$env/static/public';

const url = PUBLIC_DEPLOY_PRIME_URL
export async function GET(request) {
    const response = await fetch(url)
    const text = await response.text()
    const $ = load(text)

    let head = '';
    const stylesheetEls = $('link[rel="stylesheet"][href^="./_app"]')
    const svelteDevStylesheetEls = $('style[data-sveltekit]')

    function replacePath(s) {
        const replaced = s.replaceAll('./_app/', `${url}/_app/`)
        return replaced
    }

    stylesheetEls.each(function(i, el) {
        const h = $.html(el)
        head += `${replacePath(h)}\n`
    })

    svelteDevStylesheetEls.each((i, el) => {
        const html = $.html(el)
        head += `<style>${replacePath(html)}</style>\n`
    })

    return new Response(head)

}