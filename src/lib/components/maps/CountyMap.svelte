<script context="module">
	import countiesTopo from '$lib/components/maps/ca-counties.json';
  import citiesTopo from '$lib/components/maps/ca-cities.json';
</script>

<script>
  import { geoMercator, geoPath } from 'd3';
  import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';


  /** function to fill each county, is passed the county GeoJSON object <p>Percent indicates share of population with access to a grocery store within a half mile radius. </p> */
  export let fill = county => 'rgba(0, 0, 0, 0)'
  export let legendText = `<b>Legend:</b></p>`
  export let legendSteps = [
    { fill: 'green', value: 20 },
    { fill: 'orange', value: 30 },
    { fill: 'red', value: 40 },
  ]
  /** should cities be put on the map, default is true */
  export let showCities = true
  /** array of sources, each must have "text" value, can have "href" value */
	export let sources = [{ text: 'U.S. Department of Agriculture', href: 'https://www.ers.usda.gov/data-products/food-access-research-atlas/' }];
  /** function to return text for tooltip, can be an HTML string */
  export let tooltip = county => county.properties.NAME



  let tooltipContent = 'Hover over a county for more information.'
  let width = 300
  $: height = width * 1;
  $: scaleWidthAdjustment = width > 500 ? 300 : 150
	$: projection = geoMercator()
		.scale((width + scaleWidthAdjustment) * 3)
		.center([-120, 37.25])
		.translate([width / 2, height / 2]);
	$: path = geoPath().projection(projection);

	const countiesFeatureCollection = topojson.feature(
		countiesTopo,
		countiesTopo.objects.cb_2015_california_county_20m
	);
  const citiesFeatureCollection = topojson.feature(
		citiesTopo,
		citiesTopo.objects.ne_10m_populated_places
	);

  onMount(() => {
    function setWidth() {
      width = Math.min(window.innerWidth * .85, 574)
    }

    setWidth()

    window.addEventListener('resize', () => setWidth())
  })
</script>

<div>
  <div class="map-container">
    <svg {width} {height} >
      <g class="counties" on:mouseexit={e => { tooltipContent = null }}>
        {#each countiesFeatureCollection.features as county}
          <path
            d={path(county)}
            style={`fill: ${fill(county)}; stroke: #555; stroke-width: 0.5px;`}
            on:mouseenter={e => {
              tooltipContent = tooltip(county)
            }}
          />
        {/each}
      </g>
      {#if showCities}
      <g class="cities">
        {#each citiesFeatureCollection.features as city}
        {@const location = projection(city.geometry.coordinates)}
          <g class="city" style={`transform: translate(${location[0]}, ${location[1]});`}>
            <circle fill="#212121" r="3" cx={location[0]} cy={location[1]}></circle>
            {#if city.properties.NAME === 'San Francisco'}
              <rect
                fill={fill({ properties: { NAME: 'San Francisco' }})}
                x={location[0] - 120}
                y={location[1] - 18}
                width="15"
                height="15"
                on:mouseenter={() => {
                  const sf = { properties: { NAME: 'San Francisco' }}
                  tooltipContent = tooltip(sf)
                }}
              />
            {/if}
            <text
              dx={location[0]}
              dy={location[1] - 5}
              text-anchor={['Fresno', 'San Bernardino', 'San Diego', 'San Jose'].includes(city.properties.NAME) ? 'start' : 'end'}
            >
              {city.properties.NAME}
            </text>
          </g>
        {/each}
      </g>
      {/if}
    </svg>
    {#if tooltipContent}
      <div class="tooltip">
        {@html tooltipContent}
      </div>
    {/if}
    <div class="legend">
      <div class="legend-text" style="white-space: pre-wrap;">
        {@html legendText}
    </div>
      {#if legendSteps}
        <div class="legend-steps">
          <ul>
            {#each legendSteps as step}
              <li>
                <span style={`--fill: ${step.fill};`}></span>
                {step.value}
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
  <div class="map-source">
		Source{#if sources.length > 1}s{/if}:
		{#each sources as source, i}
			{#if source.href}
				<a href={source.href}>{source.text}</a>
			{:else}
				{source.text}
			{/if}{#if i !== sources.length - 1},{/if}
		{/each}
	</div>
</div>

<style lang="scss">
  .map-container {
    position: relative;
    width: 100%;
  }
  path {
    fill: var(--fill);
    stroke: var(--grayscale_v8);
    stroke-width: 1px;
  }
  rect {
    cursor: pointer;
    pointer-events: all;
    stroke: var(--grayscale_v8);
    stroke-width: 1px;
  }
  .counties {
    path {
      cursor: pointer;
    }
    path:hover {
      fill-opacity: .75;
    }
  }
  .cities {
    pointer-events: none;

    text {
      font-family: "Source Sans Pro", sans-serif;
      font-size: 15px;
      font-weight: 700;
      fill: #212121;
      stroke-width: .5;
    }
  }

  .legend {
    bottom: 1rem;
    font-family: "Source Sans Pro", sans-serif;
    position: relative;

    @media screen and (min-width: 650px) {
      position: absolute;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    li {
      align-items: center;
      display: flex;
      margin: 0;
    }

    span {
      background-color: var(--fill);
      display: inline-block;
      height: 1rem;
      margin-right: .75rem;
      width: 1rem;
    }
  }
  .tooltip {
    font-family: "Source Sans Pro", sans-serif;
    max-width: 150px;
    position: absolute;
    right: 0rem;
    top: 2rem;
    width: 40%;

    @media screen and (min-width: 650px) {
      max-width: 200px;
    }
  }
  .map-source {
		font-family: "Source Sans Pro", sans-serif;
		font-size: 14px;
		text-align: right;
		margin-top: 0.25rem;
	}
</style>
