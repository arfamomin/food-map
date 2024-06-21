import { dev } from '$app/environment';

async function fetchNetlify(u, p=null ) {
    const netlify = 'https://calmatters-fire-dashboard.netlify.app';
    const path = p !== null ? p : netlify + '/api/netlify'; // example netlify site url. you will want to change this and change the +server.js under the api/netlify/[endpoint] route
    const host = dev ? '/api/netlify' : path;
    const url = u.startsWith('/') ? u : `/${u}`;

    try {
        const response = await fetch(`${host}${url}`);
        const json = await response.json();
        return json
    } catch (e) {
        console.error(`${host}${url}`, e);
        debugger;
    }
}

export default fetchNetlify