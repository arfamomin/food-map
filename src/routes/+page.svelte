<script>
	// dependencies
	import { dev } from '$app/environment';
	// components
	import AddressLookup from '$lib/components/AddressLookup.svelte';
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import Button from '$lib/components/Button.svelte';
	import CallToActionBox from '$lib/components/CallToActionBox.svelte';
	import CountyMap from '$lib/components/maps/CountyMap.svelte';
	import LeafletMap from '$lib/components/maps/LeafletMap.svelte';
	import LineChart from '$lib/components/charts/LineChart.svelte';
	import MapboxMap from '$lib/components/maps/MapboxMap.svelte';
	import NoteBox from '$lib/components/Callout.svelte';
	import Table from '$lib/components/Table.svelte';
	import Header from '$lib/components/Header.svelte';
    import FancyList from "$lib/components/FancyList.svelte";
    import RankedBar from "$lib/components/charts/RankedBar.svelte";

	// stores
	import dollarsStore from '$lib/stores/example.js';
	import windowWidthStore from '$lib/stores/windowWidth.js';
	import Dropdown from '$lib/components/Dropdown.svelte';

	const data = [
		{
			type: 'bar',
			x: 2009,
			y: 32
		},
		{
			type: 'foo',
			x: 2010,
			y: 20
		},
		{
			type: 'foo',
			x: 2011,
			y: 20
		},
		{
			type: 'foo',
			x: 2012,
			y: 20
		},
		{
			type: 'bar',
			x: 2013,
			y: 68
		},
		{
			type: 'foo',
			x: 2014,
			y: 50
		}
	];

	const wcCoords = {
        sw: [-128.8999612997536, 33.847831959122985], // sw
        ne: [-110.67445921971893, 41.49206123722754], // ne
    };

	const list = [
		"A type of electrode that causes electrical current to leave a device. ",
        "In EV batteries, they are usually sheets of metal that store lithium oxide — lithium mixed with other metals — before the lithium is charged and travels to the anode.",
        "Seven companies make up 55% of global cathode production, predominantly in China but also in Japan. Although likely outdated, a U.S. International Trade Commission report from 2019 ranked the world's top cathode producers: <strong>China</strong> (324,200 tons), <strong>Japan</strong> (168,900 tons) and <strong>South Korea</strong> (51,200 tons).",
	]

	const ranked = [
        { key: "China", value: 65 },
        { key: "Other Countries", value: 20 },
        { key: "Finland", value: 10 },
        { key: "Belgium", value: 5 },
    ]

	let addressLookupPlace;
	let groupBy = null;


	// dropdown 
	const dropdownOptions = [
		{ value: "", label: "" },
		{ value: "accountability", label: "Accountability" },
		{ value: "water-ag", label: "Agricultural Water Use" },
		{ value: "aqueducts", label: "Aqueducts" },
		{ value: "well-completions", label: "Completed Groundwater Wells" },
		{ value: "drought", label: "Drought Duration" },
		{ value: "ground-water", label: "Groundwater Overview" },
		{ value: "well-rankings", label: "Groundwater Well Rankings" },
		{ value: "dry-wells", label: "Household Water Shortages" },
		{ value: "residential-use", label: "Household Water Use" },
		{ value: "percipitation", label: "Rain/Percipitation" },
		{ value: "reservoir", label: "Reservoir Levels" },
		{ value: "snow", label: "Snow Levels" },
		{ value: "subsidence", label: "Subsidence" },
		{ value: "water-conservation", label: "Urban Water Use" },

	];
	$: documentLoaded = false;
	$: optionSelected = "";

	function doSomethingWithDropdown( val ){
		const elem = document.getElementById( val );

		if ( elem ){
			elem.scrollIntoView( {
				behavior: 'smooth',
				block: 'start'
			});
		}
	}

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>

		<div>
			<Header
				title="Food access in California by county"
				copy="Only 51% of California residents have access to a grocery store within half a mile of their homes. Los Angeles ranks the lowest amongst major metropolitan areas in California."
			/>
		</div>
		<div>
			
		</div>

		<div style="display: flex; justify-content: center; margin-top: 20px;">
			<CountyMap
				fill={(county) => {
				const LAHALFSHARE = county.properties.LAHALFSHARE;

				if (LAHALFSHARE >= 0 && LAHALFSHARE < 20) return '#006d2c';
				else if (LAHALFSHARE >= 20 && LAHALFSHARE < 40) return '#2ca25f';
				else if (LAHALFSHARE >= 40 && LAHALFSHARE < 60) return '#66c2a4';
				else if (LAHALFSHARE >= 60 && LAHALFSHARE < 80) return '#b2e2e2';
				else if (LAHALFSHARE >= 80 && LAHALFSHARE <= 100) return '#edf8fb';
				else return '#FFFFFF'; // default color for counties outside defined ranges
			}}
			legendSteps={[
				{ fill: '#006d2c', value: '0-20%' },
				{ fill: '#2ca25f', value: '20-40%' },
				{ fill: '#66c2a4', value: '40-60%' },
				{ fill: '#b2e2e2', value: '60-80%' },
				{ fill: '#edf8fb', value: '80-100%' },
			]}
			tooltip={(county) => {
					const { NAME,LAHALFSHARE } = county.properties;
					return `<b>${NAME}</b><p> ${LAHALFSHARE}% of people have adequate access to a grocery store.</p>`;
				}}
			/>

	</section>

<style lang="scss">
	section {
		margin: 0 auto;
		max-width: 780px;
	}

	h1 {
		background-color: var(--primary);
		padding: 1rem;
	}

	h2 {
		margin-top: 1rem;
	}

	p {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	summary {
		font-family: "Source Sans Pro", sans-serif;
		font-weight: 700;
		margin-bottom: .5rem;
		margin-top: .5rem;

		a {
			color: inherit;
			text-decoration: none;
		}
	}

	li {
		font-family: "Source Sans Pro", sans-serif;
	}

	button {
		background: transparent;
		border: 1px solid black;
		border-radius: 0;
		cursor: pointer;
		display: inline-block;
		font-family: "Source Sans Pro", san-serif;
		font-size: 1.4rem;
	}

	textarea {
		height: 4rem;
		resize: none;
		width: 100%;
	}

	:global(.tooltip-bottom) {
		height: 0.25rem;
		width: 100%;
	}
</style>
