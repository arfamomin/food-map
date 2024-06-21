<script>
	import { extent, max, group } from 'd3-array';
	import * as Pancake from '@sveltejs/pancake';

  /** the data to chart, default expectation is each object has "x" and "y" keys */
	export let data = [];

	/** function to group data into distinct lines, is passed each data element */
	export let groupBy = null;
  /** function to determine the stroke, is passed the data series */
	export let stroke = () => '#c6a5cd';
  /** function to format x tick values */
	export let formatXTick = (t) => `${t}`;
  /** function to format y tick values */
	export let formatYTick = (t) => `${t}`;
  /** show grid lines */
	export let grid = true;
  /** array of sources, each must have "text" value, can have "href" value */
	export let sources = [{ text: 'TKTKTK', href: 'https://www.calmatters.org' }];
  /** function to access the x value on each data element */
	export let x = (d) => d.x;
  /** what should show up on the x axis */
	export let xTicks = null;
  /** function to access the y value on each data element */
	export let y = (d) => d.y;
  /** string to show on the y axis */
	export let yAxisLabel = 'TKTKTK';

	let transformed = [data.map((d) => ({ ...d, x: x(d), y: y(d) }))]
	$: xExtent = extent(data, x);
	$: isXDataDateType = typeof xExtent[0].getFullYear === 'function';
	$: yMax = max(data, y);
	$: {
		if (groupBy) {
			transformed = []
			const groupMap = group(data, groupBy)
			groupMap.forEach((values, key) => {
				const series = []
				values.forEach(d => {
					series.push({
						...d,
						x: x(d),
						y: y(d)
					})
				})
				transformed.push(series)
			})
		} else {
			transformed = [data.map((d) => ({ ...d, x: x(d), y: y(d) }))]
		}
	}

	$: {
		if (isXDataDateType) {
			console.error(`<BarChart /> has issues with dates, please try again with numbers such as a years`);
		}
	}
</script>

<div class="container">
	<div class="chart-container">
		<div class="chart">
			<div class="chart-heading">{yAxisLabel} ↑</div>
			<div class="background">
				<!-- <div class="pancake-chart-container"> -->
				<Pancake.Chart
					x1={xExtent[0]}
					x2={xExtent[1]}
					y1={0}
					y2={yMax}
				>
					<div class="y axis">
						<Pancake.Grid
							horizontal
							ticks={[Math.round(yMax / 2), Math.round(yMax / 10) * 10]}
							let:value
						>
							<span class="y label">{formatYTick(value)}</span>
							{#if grid}<span class="y tick" />{/if}
						</Pancake.Grid>
					</div>

					<div style="margin-left: 20px;">
						<div class="x axis">
							<Pancake.Grid vertical ticks={xTicks} let:value>
								<span class="x label">{formatXTick(value)}</span>
							</Pancake.Grid>
						</div>

						<Pancake.Svg>
							{#each transformed as series}
								<Pancake.SvgLine data={series} let:d>
									<path class="line" style={`--stroke: ${stroke(series)};`} {d}></path>
								</Pancake.SvgLine>
							{/each}
						</Pancake.Svg>
					</div>
				</Pancake.Chart>
			</div>
		</div>
	</div>
	<div class="chart-source">
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
	.chart-container {
		border: 1px solid rgba(255, 255, 255, 0.3);
		background-color: var(--grayscale_v3);
		color: white;
		padding: 1rem 1.5rem;
		max-width: 90vw;
		width: 100%;
	}
	.chart {
		position: relative;
		width: 100%;
		height: 340px;
		margin: 0 0 36px 0;
	}
	.chart-source {
		font-family: "Source Sans Pro", sans-serif;
		font-size: 14px;
		text-align: right;
		margin-top: 0.25rem;
	}
	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 3em 3em;
		box-sizing: border-box;
	}
	:global(.pancake-chart) {
		border-bottom: 1px solid var(--grayscale_v6);
	}
	.line {
		--stroke: #ffffff;
		fill: none;
		stroke: var(--stroke);
		stroke-width: 2px;
	}

	.chart-heading {
		color: white;
		font-family: "Source Sans Pro", sans-serif;
		position: absolute;
		z-index: 10;
	}
	.label {
		color: white;
		display: inline-block;
	}
	.x.label {
		margin-top: 250px;
		margin-left: -5px;
	}
	.y.label {
		margin-left: -3rem;
	}
	.tick {
		border-color: var(--grayscale_v6);
		border-style: solid;
		border-width: 0;
		display: block;
		opacity: 0.5;
	}
	.y.tick {
		border-top-width: 0.5px;
		margin-left: 0;
		width: 100%;
	}
	:global(.y.axis .pancake-grid-item) {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
</style>
