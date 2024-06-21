<script>
	import { extent, max } from 'd3-array';
	import { axisLeft, axisBottom, axisTop } from 'd3-axis';
	import * as scale from 'd3-scale';
	import { select } from 'd3-selection';
	import { format } from 'd3-format';

	import windowWidthStore from '$lib/stores/windowWidth.js';

	export let data = [];
	export let fill = () => '#212121';
	export let stroke = () => 'none';
	export let source = null;
	export let sourceUrl = null;
	export let title = null;
	export let subhed = null;
	export let x = () => null;
	export let xScaleType = 'linear';
	export let xTickCount = 3;
	export let xTickFormat = null;
	export let yTickFormat = '~s'; // can also be a function
	export let y = () => null;
	export let yScaleType = 'linear';
	export let yTickCount = 4;
	export let xTickEvery = null;
	export let xBarPad = 0;
	export let yAxisPad = 0;
	export let xAxisPad = 0;
	export let flipBars = false;
	export let labels = false;
	export let mobile = false;

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
	$: barWidth = data.length > 0 ? Math.floor(effectiveWidth / (data.length + 1)) : 10;
	$: xExtent = extent(data, x);
	$: yExtent = [max(data, y), 0];
	$: xScale = scale[`scale${upperFirst(xScaleType)}`]()
		.domain( xScaleType === 'band' ? data.map(x) : xExtent )
		.range( [0, effectiveWidth] );
	$: yScale = flipBars ?
					scale[`scale${upperFirst(yScaleType)}`]()
						.domain(yExtent)
						.range([ effectiveHeight, 0 ]) :
					scale[`scale${upperFirst(yScaleType)}`]()
						.domain(yExtent)
						.range([0, effectiveHeight]);
	$: xAxis = xTickEvery ? 
			flipBars ? 
				axisTop()
					.scale(xScale)
					.tickFormat(xTickFormat)
					.ticks(xTickCount)
					.tickValues(xScale.domain().filter((d,i) => !(i % xTickEvery))) :
				axisBottom()
					.scale(xScale)
					.tickFormat(xTickFormat)
					.ticks(xTickCount)
					.tickValues(xScale.domain().filter((d,i) => !(i % xTickEvery))) :
			flipBars ? 
				axisTop()
					.scale(xScale)
					.tickFormat(xTickFormat)
					.ticks(xTickCount) :
				axisBottom()
					.scale(xScale)
					.tickFormat(xTickFormat)
					.ticks(xTickCount);	
	$: xAxisEl && select(xAxisEl)
					.call(xAxis)
					.call(g => g.select(".domain").remove())
					.selectAll("line")
					.attr("stroke","#ffffff");
	$: yAxis = axisLeft()
					.scale(yScale)
					.ticks(yTickCount)
					.tickSize(0)
					.tickFormat(d => {
						if (typeof yTickFormat !== 'function') {
							return format( yTickFormat )(d)
						} else {
							return yTickFormat(d)
						}
					});
	$: yAxisEl && select(yAxisEl)
					.call(yAxis)
					.call( g => g.select(".domain").remove());

</script>

<div class="bar-chart">
	{#if title}
		<h4 class="chart-title">{title}</h4>
	{/if}

	{#if subhed }
		<p class="chart-subhed">{subhed}</p>
	{/if}
	<svg {height} {width} viewbox={`0 0 ${width} ${height}`}>
		<g class="bars" transform={`translate(${xPadding + xBarPad } ${yPadding})`}>
			{#each data as d}
			<g class="rect-container">
				<rect
					data-x={x(d)}
					data-y={y(d)}
					stroke={stroke(d)}
					fill={fill(d)}
					x={xScale(x(d)) - barWidth / 2}
					y={ flipBars ?  yScale( y( d - effectiveHeight ) ) :  yScale( y( d ) )}
					height={ flipBars ? yScale(y(d)) :  effectiveHeight - yScale(y(d)) }
					width={barWidth}
				/>
				{#if labels }
				<text 
					y={ flipBars ?  yScale( y( d - effectiveHeight ) ) - 15 :  effectiveHeight - yScale(y(d)) < 20 ? yScale( y( d ) ) - 5 : yScale( y( d ) ) + 15 }
					x={ ( xScale( x(d) ) - barWidth / 2 ) + barWidth / ( mobile ? 10 : 4 ) }
					font-size={ mobile ? "10" : "14" }
					text-anchor="start"
					fill={ effectiveHeight - yScale(y(d)) < 20 ? '#fff' : '#212211' }
				>
				{y(d)}
				</text>
				{/if}
			
			</g>	
			{/each}
		</g>
		<g class="axis" bind:this={yAxisEl} transform={`translate(${xPadding - (barWidth / 2) + yAxisPad} ${yPadding})`} />
		<g class="axis" bind:this={xAxisEl} transform={`translate(${ xPadding + xAxisPad } ${ flipBars ? 17 : height - yPadding })`} />
		
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
	.bar-chart {
		margin: 2rem 0;

		hr {
			border-top: 4px solid var( --primary_v2 );
			margin: 1rem auto;
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
