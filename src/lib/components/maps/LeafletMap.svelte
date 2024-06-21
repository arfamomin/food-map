<!--
 @component
 A wrapper around [Leaflet](https://leafletjs.com/).
 
Many props are simply passed right on through to Laeflet. Over time, we'll add the ones we need.

* `center`
* `zoom`

The component will dispatch a `loaded` event at the end of initalization, passing both the `map` object and the leaflet object within the `detail`

For example, to add a marker in the UK to map after it has loaded we can use the component like this:

  <LeafletMap on:loaded={e => {
    const { map, leaflet } = e.detail;
    leaflet.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }} />

-->

<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	import 'leaflet/dist/leaflet.css';

	export let center = [37.166111, -119.449444];
	export let zoom = 6;

	const dispatch = createEventDispatcher();
	let container;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			const map = leaflet.map(container).setView(center, zoom);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			dispatch('loaded', { map, leaflet });
		}
	});
</script>

<div class="leaflet-map" bind:this={container} />

<style lang="scss">
	.leaflet-map {
		min-height: 600px;
		position: relative;
		width: 100%;
	}
</style>
