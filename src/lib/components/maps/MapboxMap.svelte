<!--
 @component
 A wrapper around [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/guides/) which handles updating the map when sources and/or layers change. Exposes the [Map object](https://docs.mapbox.com/mapbox-gl-js/api/map/) as the first argument passed to the `onMapLoad` prop.
 
Many props are simply passed right on through to Mapbox. Over time, we'll add the ones we need.

* `center` - center point of the map. if using maxBounds, this will be generated automatically based on bounds
* `dragRotate` - drag and rotate the map
* `interactive` - disable interactivity? true if static map
* `layers` - additional layers to add?
* `sources` - add a source line
* `styleUrl` - Mapbox style url
* `zoom` - initial zoom level. if using maxBounds, this will be generated automatically based on bounds
* `minZoom` - what is the highest zoom level. recommended level is 5
* `maxZoom` - what is the lowest zoom level. really depends on context, but default is 10
* `maxBounds` - lock the map bounds so user can't scroll past a certain point. If no, define as false. If you want to use the default bounds do nothing. Otherwise create your own bounds using the default as a starting point. Requires what the bounds southwestern and northeastern coords are. 
* `zoomControls` - show zoom controls?


There are a few props that we added on, all of which are optional:

* `source` - The text for data and source attribution
* `sourceUrl` - A URL to link the source text to

The component will dispatch a `load` event at the end of `map.on('load')`, passing the `map` object as the `detail`

-->

<script>
	import 'mapbox-gl/dist/mapbox-gl.css';
	import mapboxgl, { Map } from 'mapbox-gl';
	import { createEventDispatcher, afterUpdate, onMount } from 'svelte';

	export let center = [-119.449444, 37.166111];
	export let dragRotate = false;
	export let interactive = true;
	export let layers = [];
	export let source = null;
	export let sourceUrl = null;
	export let sources = [];
	export let styleUrl = 'mapbox://styles/calmattersnewsroom/ckyddpye206il14nv5wmtfr71?fresh=true';
	export let zoom = 5;
	export let minZoom = 5;
	export let maxZoom = 10;
	export let maxBounds = {
        sw: [-128.8999612997536, 33.847831959122985], // sw
        ne: [-110.67445921971893, 41.49206123722754], // ne
    };
	export let zoomControls = false;

	let container;
	let map;
	let mapHasLoaded = false;

	const dispatch = createEventDispatcher()

	mapboxgl.accessToken =
		'pk.eyJ1IjoiY2FsbWF0dGVyc25ld3Nyb29tIiwiYSI6ImNrdHVwcWV0NDIxdHQydm8yMDE3aW5kMjcifQ.I2CPsH-seVKAGkNlccJZoA';
	
	// https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addlayer
	function upsertLayer(layer) {
		if (!layer) return;
		const { id, filter, layout, paint } = layer
		const existing = map.getLayer(id)
		
		if (!existing) {
			try {
			map.addLayer(layer, 'settlement-minor-label');
			return 
			} catch (e) {
				debugger
			}
		}

		if (layout) {
			for (const property in layout) {
				map.setLayoutProperty(id, property, layout[property])
			}
		}

		if (paint) {
			for (const property in paint) {
				map.setPaintProperty(id, property, paint[property])
			}
		}
		
		try {
			map.setFilter(id, filter || null)
		} catch (e) {
			debugger
		}
	}

	function upsertSource(source) {
		if (!source) return;
		const { data, id, type, url } = source;
		const options = {
			data,
			type
		};

		if (url) {
			options.url = url;
		} else if (data) {
			options.data = data;
		}

		try {
			// https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addsource
			map.addSource(id, options);
		} catch (e) {
			if (e.message === 'There is already a source with this ID') {
				try {
					map.getSource(id).setData(data);
					return
				} catch (ee) {
					console.log('yo!', id, ee, options)
					debugger
				}
			}
		}
	}

	onMount(() => {
		if (!container) {
			console.log('bouncing early because container is false-y');
			return;
		}

		if (container instanceof HTMLDivElement !== true) {
			console.log('bouncing early because container is not an instance of an HTMLElement');
			debugger
			return;
		}

		// are there bounds? 
		if ( maxBounds ){
			const sw = new mapboxgl.LngLat( maxBounds.sw[0], maxBounds.sw[1] );
			const ne = new mapboxgl.LngLat( maxBounds.ne[0], maxBounds.ne[1] );
			maxBounds = new mapboxgl.LngLatBounds( sw, ne );
		}

		map = new Map({
			center,
			container,
			dragRotate,
			interactive,
			style: styleUrl,
			zoom,
			maxZoom,
			minZoom,
			maxBounds
		});

		if ( zoomControls ){
			map.addControl( new mapboxgl.NavigationControl() );
		}
		
		function handleLoad() {
			sources.forEach((source) => {
				if (source) upsertSource(source);
			});
			layers.forEach((layer) => {
				if (layer) upsertLayer(layer);
			});
			mapHasLoaded = true;
			dispatch('loaded', map)
		}

		function handleZoom() {
			const currentZoom = map.getZoom();
			console.log( zoom )
			zoom = currentZoom;
		}

		map.on('zoom', handleZoom);
		map.on('load', handleLoad);

		return () => {
			map.off('zoom', handleZoom);
			map.off('load', handleLoad);
			map.remove();
		};
	});

	afterUpdate(() => {
		if (!mapHasLoaded || !map) {
			console.log('afterUpdate in map but returning because no map');
			return;
		}
		sources.forEach((source) => {
			upsertSource(source);
		});
		layers.forEach((layer) => {
			upsertLayer(layer);
		});
	});
</script>

<div class="map-container">
	<div class="map" bind:this={container}>
		{#if map}
			<slot />
		{/if}
	</div>
	{#if source}
		<p class="chart-source">
			Source:
			{#if sourceUrl}
				<a href={sourceUrl}>{source}</a>
			{:else}
				{source}
			{/if}
		</p>
	{/if}
</div>

<style lang="scss">
	.map-container {
		height: 100%;
		position: relative;
		width: 100%;
	}

	.map {
		height: 100%;
		margin-bottom: 1rem;
		min-height: var(--min-height, 600px);
		width: 100%;
	}
</style>
