<script>
	import { extent, max } from 'd3-array';
	import { axisLeft, axisBottom } from 'd3-axis';
	import * as scale from 'd3-scale';
	import { select } from 'd3-selection';
	import { curveNatural, area, stack } from 'd3-shape';

	import windowWidthStore from '$lib/stores/windowWidth.js';

	export let data = [];
	export let stroke = 'black';
	export let strokeWidth = 2;
	export let source = null;
	export let sourceUrl = null;
	export let title = null;
	export let legend = null;
	export let x = () => null;
	export let xTickCount = 3;
	export let xTickFormat = null;
	export let xScaleType = 'time';
	export let y = () => null;
	export let yScaleType = 'linear';
	export let yTickCount = 4;
	export let yTickFormat = null;

	function upperFirst(str) {
		const [first, ...rest] = str.split('');
		return `${first.toUpperCase()}${rest.join('').toLowerCase()}`;
	}

	const yPadding = 17;
	const height = 400;
	const effectiveHeight = height - yPadding * 2;

	let xAxisEl;
	let yAxisEl;

	$: isMobile = $windowWidthStore.isMobile;
	$: width = isMobile ? $windowWidthStore.width * 0.9 : 780;
	$: xPadding = isMobile ? 30 : 40;
	$: effectiveWidth = width - xPadding * 2;
	$: xExtent = extent(data, x);
	$: yExtent = [max(data, y), 0];
	$: xScale = scale[`scale${upperFirst(xScaleType)}`]().domain(xExtent).range([0, effectiveWidth]);
	$: yScale = scale[`scale${upperFirst(yScaleType)}`]().domain(yExtent).range([0, effectiveHeight]).clamp(true);
	$: xAxis = axisBottom().scale(xScale).tickFormat(xTickFormat).ticks(xTickCount);
	$: xAxisEl && select(xAxisEl).call(xAxis).selectAll("line").attr("stroke","#ffffff");
	$: yAxis = axisLeft().scale(yScale).ticks(yTickCount).tickSize(0).tickFormat(yTickFormat);
	$: yAxisEl && select(yAxisEl).call(yAxis).call(g => g.select(".domain").remove());
	$: a = area()
		.x((d) => xScale(x(d)))
		.y1((d) => yScale(y(d)))
		.y0(yScale(0))
		.curve(curveNatural)
		.defined(y);

	const lastPoint = data[0];
</script>

<div class="container">
	
	{#if title}
		<p class="chart-title">{title}</p>
	{/if}

	<div class="chart-legend"><b style="color:#EC4F2E; font-size:10px; margin-right: 5px;">⬤</b> {legend}</div>
	<svg {height} {width} viewbox={`0 0 ${width} ${height}`}>	
		<g class="axis" bind:this={yAxisEl} transform={`translate(${xPadding - 5} ${yPadding})`} />
		<g class="axis" bind:this={xAxisEl} transform={`translate(${xPadding} ${height - yPadding})`} />
		<g class="area" transform={`translate(${xPadding} ${yPadding})`}>
			<path d={a(data)} fill="{stroke}" stroke-width={strokeWidth} />
			<circle 
				cy={yScale(lastPoint.percentage_class_1)}
				cx={xScale(lastPoint.date)} 
				fill="#EC4F2E" 
				r="4" 
			/>
		</g>
		<g style="display: none;">
			<!-- this is just to use the classes -->
			<g class="axis">
				<g class="domain" />
				<g class="tick" />
			</g>
		</g>
	</svg>
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
	.container {
		display: flex;
		flex-direction: column;
	}
	.chart-title {
		font-weight: 700;
		text-align: center;
		margin-bottom: 0;
	}

	.chart-source {
		font-size: 0.8em;
	}

	.chart-legend {
		font-size: 0.7em;
		color: var(--white);
		display: flex;
		align-items: center;
		margin: 0 auto;
	}

	svg {
		margin: 0 auto;
	}

	.drought-legend {
		text-align: center;
		font-size: 14px;
		margin: 0;
		span {
			margin-top: -3px;
			margin-right: 4px;
			padding: 0.5em;
			vertical-align: middle;
			background: var(--white);
			opacity: 15%;
			display: inline-block;
		}
	}
</style>
