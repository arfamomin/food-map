# Svelte template

An evolving template for graphics and interactive work. This should set you up with our styleguide variables, fonts, SCSS, as well as Netlify configuration.

## Developing

First, we use `nvm` to make sure we're all using the same Node version - right now we use version 16. If you already have nvm installed you should be able to select the correct version with `nvm use` inside the project directory.

Once you've created a project and installed dependencies with `npm install` start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# you can also expose server to other devices on this network, which is useful for mobile development
# can access through http://10.0.0.30:3000
npm run dev -- --open --host
```
## CSS

This template applies design guidance from [this documentation](https://zeroheight.com/9f6eb9a46/p/7663ab-typography/b/1167ec). Refer to `guide.css` inside the `src` folder to review all CSS variables, including color and typography.

### Layout (from design doc)

Baseline grids are a traditional aspect of print and web design, and they help ensure visual rhythm, hierarchy, and consistency across all products and layouts. We use a 4px baseline grid, meaning all elements are sized and spaced within increments of 4 pixels. The most common units of spacing are 4px, 8px, 16px, 32px, and 40px.

The 4px baseline grid provides the optimal balance between scalability across all screen sizes and dimensions, and granularity across a wide range of use cases.

### CSS Classes 
- `p.small`: references `body-03` from design doc. 
- `p.tiny`: references `body-04` from design doc. 
- `p.detail_huge`: references `details-01` from design doc. 
- `p.detail_large`: references `details-02` from design doc. 
- `p.detail_normal`: references `details-03` from design doc. 
- `p.detail_small`: references `details-04` from design doc. 
- `p.detail_tiny`: references `details-05` from design doc. 
- `button.large`: references `button-01` from design doc. 
- `button.small`: references `button-02` from design doc. 

### Configuring base CSS

There are two options for handling how the Svelte app will interact with the CMS: embed or injection. Based on that interaction, we'll need to configure a variable in `+layout.svelte`. 

1. Go to `+layout.svelte` inside the `src` folder.
2. Follow the instructions there depending on if you are injecting into the CMS or not.


## Things you should know!

### Fetching endpoints

The template is currently set to fetch netlify endpoints using the route `/api/netlify/[url]`. The `[url]` is a wildcard for the name of the endpoint you are accessing. For example, if I want the dollar damage data from the fire dashboard api, `url` would be "dollars".

But let's talk about the **how** to better understand the above. If you want to fetch data from a Netlify endpoint, these are the steps you must take to make that happen: 

1. You will first want to go into `/src/routes/api/netlify/[url]/+server.js` and change the `host` variable to the exact location where the endpoint is located. By default, the template uses `https://calmatters-api-fire-dashboard.netlify.app/.netlify/functions` as an example. (This assumes you have data stored in a svelte app somewhere and you are using NEtlify to host it as an endpoint using "functions").

2. Next, go to `/src/lib/stores/fetch/fetchNetlify.js` and change the `netlify` variable there to the url on netlify where this project will eventually be hosted. Basically, we're routing to that url if we're in production only. 

3. Finally, you can see an example of how fetch works in `/src/lib/stores/example.js`. What's happening here is when we import the file and use it, it will make a call to `fetchNetlify.js` file above to determine whether we are local or production. Then that file will access the `+server.js` file in #1 and, if successful, provide a json file of whatever data is being called, in this example the dollar damage dataset from the fire dashboard api. You can copy this file and modify as needed to call whichever data you want, but the key variable that needs to be changed is `route`, which is the name of the Netlify endpoint.

### Google Analytics event tracking

If there are any measurement needs for the app being built where we want to track user behavior, this template has GA event tracking built-in using a function located in the main `+page.svelte` page. The function, `gaLinkEvent` can be called as need and fed what will be the event label. For example, if I want an event triggered when I press button A, I would bind a function that would then call `gaLinkEvent('label')` to trigger event. 

What you need to do to configure?

1. Head on over to `+page.svelte` and find `gaLinkEvent`. Inside, you will see a number of variables that require modification.
    - `ec`: This will be the event category. I would give it a detailed project name, for example 2022 Voter Guide, not Voter Guide. 
    - `property`: For testing, use 6. For production, use 1.
    - `ea`: type of action, such as click, interaction, play, etc. 
    - `cid`: auto generate this over at https://ga-dev-tools.web.app/hit-builder/

2. If you want to test to make sure it worked, bind to a click event. If a pixel appears and there is a 200 OK response, you're good to go. But verify over on GA just to be sure cause we've been experiencing issues with the main property at least.


## Setting up preview injections

We have to set up testing of preview deploys for any project we "inject" into the CMS.

1. Create a `.env` in root of project and add `PUBLIC_DEPLOY_PRIME_URL=http://localhost:3000`
2. Profit


## Debugging failed builds

It's a bummer when something fails on Netlify. You can't SSH into the computer that ran the process, but you can use SvelteKit to replicate the process. Running these two commands should enable you to replicate (and hopefully fix) the issue.

1. `npm run build`
2. `npm run preview`
