<script>
	import windowWidthStore from '$lib/stores/windowWidth.js';

	export let data = [];
	export let fill = [];
	export let source = null;
	export let sourceUrl = null;
	export let title = null;
	export let subhed = null;
	export let x = null;
	export let groupKeys = [];
	export let groupLabels = [];
	export let yClasses = [];
	export let barWidth = 10;

	$: isMobile = $windowWidthStore.isMobile;
	$: width = isMobile ? $windowWidthStore.width * 0.8 : 780;

	// adjust bar width
	isMobile ? barWidth = 5 : barWidth = barWidth;
	
	function upperFirst(str) {
		const [first, ...rest] = str.split('');
		return `${first.toUpperCase()}${rest.join('').toLowerCase()}`;
	}

	function findWidth( val ){
		return ( val / maxValue ) * 100;
	}

	// vars 
	const height = 400;
	const barsPerGroup = groupKeys.length;
	const groupWidth = ( ( barsPerGroup - 1) * barWidth ) + barsPerGroup;
	const maxValue = yClasses[ yClasses.length - 1 ];
</script>

<div class="d-multibar">
	<hr> 
	{#if title}
		<h4 class="chart-title">{title}</h4>
	{/if}

	{#if subhed }
		<p class="chart-subhed">{subhed}</p>
	{/if}

	<div class="d-multibar__legend">
		{#each groupKeys as k, i }
		<div class="d-multibar__legend-group">
			<div style="background-color:{ fill[i] }"></div>
			<div>{ groupLabels[i] }</div>
		</div>
		{/each}
	</div>

	<div class="d-multibar__chart" style="width:{width}px;">
		<div class="d-multibar__bars" style="height:{ height }px;">

			<div class="d-multibar__yaxis" style="height:{ height }px;">
				{#each yClasses as y, i }
				<div class="d-multibar__yaxis-group" style="top:{ `${ 20 * i  }` }%;">{ y }</div>
				{/each}
			</div>
	
			{#each data as d }
			<div class="d-multibar__bar-group" style="width:{ groupWidth }px;">
				{#each groupKeys as y, i }
				<div class="d-multibar__bar" style="width:{ barWidth }px;height:{ `${ findWidth( d[y] ) }` }%;background-color:{ fill[i] };"></div>
				{/each}
			</div>
			{/each}
		</div>
	
		<div class="d-multibar__xaxis">
			{#each data as d }
			<div class="d-multibar__xaxis-group" style="width:{ groupWidth }px;">{ d[x] }</div>
			{/each}
		</div>
	</div>

	
	
	
	{#if source}
		<p class="chart-source">
			Source:
			{#if sourceUrl}
				<a href={sourceUrl}>{ source }</a>
			{:else}
				{source}
			{/if}
		</p>
	{/if}
</div>

<style lang="scss">
	.d-multibar {
		margin: 2rem 0;

		hr {
			border-top: 4px solid var( --primary_v2 );
			margin: 1rem auto;
		}

		&__legend {
			display: flex;

			@media screen and ( max-width: 767px ){
				flex-wrap: wrap;
			}
		}

		&__legend-group {
			display: flex;
			align-items: center;
			margin-right: 20px;

			div:first-child {
				width: 15px;
				height: 15px;
				margin-right: 5px;
			}

			div:last-child {
				font-size: 0.75rem;
			}
		}

		&__chart {
			@media screen and ( max-width: 767px ){
				margin-left: 15px;
			}
		}

		&__bars {
			position: relative;
			display: flex;
			justify-content: space-between;
			flex-direction: row-reverse;
			transform: rotate( 180deg );
			border-top: 2px solid var( --grayscale_v3 );
			margin-top: 1.5rem;
		}

		&__bar-group {
			display: flex;
			flex-direction: row-reverse;
			height: 100%;

			@media screen and ( max-width: 767px ){
				width: 25px !important;
			}
		}

		&__bar {
			width: 10px;
			margin-right: 2px;
		}

		&__xaxis {
			display: flex;
			justify-content: space-between;
			text-align: center;
		}

		&__xaxis-group {
			font-size: 0.6rem;
		}

		&__yaxis {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: absolute;
			width: 2px;
			top: 0;
			right: 0;
			background-color: var( --grayscale_v3 );

			@media screen and ( max-width: 767px ){
				right: 0px;
			}

		}

		&__yaxis-group {
			position: absolute;
			left: 7px;
			margin-top: -10px;
			transform: rotate( 180deg );
			text-align: right;
			font-size: 0.6rem;

		}

		
	}
	.chart-title {
		font-weight: 700;
		text-align: center;
	}

	.chart-subhed {
		font-size: 0.85rem;
		line-height: 1.25rem;
	}

	.chart-source {
		font-size: 0.8em;
	}


</style>
