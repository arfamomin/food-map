<!--
 @component
 A styled table
 
 Generates a styled html table with pagination.

 1. `caption` Add a caption to the bottom of the table, mainly for methodology. OPTIONAL
 2. `columns` an array of strings used as the table header, from left column to right. `REQUIRED`
 3. `keys` an array of string used to match object keys located in the data, from left column to right. `REQUIRED`
 4. `currency` should we append dollar signs to columns not identified as year (this should be made to be more dynamic). Default is false. OPTIONAL
 5. `width` should we have a custom desktop table width. Leaving false makes table 100% width on desktop. Default is false. OPTIONAL
 6. `rows` an array of objects that contain data used to populate the table td element and requires alignment with the `keys` to work correctly. `REQUIRED`
 7. `itemsPerPage` how many rows to show on each page of the table. Default is 10. OPTIONAL
 8. `mobileHideColumns` an array of header names, aligned with `columns` parameter, to hide on mobile. OPTIONAL

Generates a paginated table based on parameters. Built-in functionality to track and change rows showed as "pages". 

REACTIVE VARIABLES

`isMobile` tracks whether the user is on a mobile-sized screen using the `windowWidth` store. 
`currentPage` tracks which page of rows is currently shown. Defaults to 1.
`minIndex` tracks which row to start with when showing rows on a "page". Defaults to index 0 of `rows` array. 
`maxIndex` tracks the last row to show on a "page". Defaults to `itemsPerPage` parameter.

FUNCTIONS

`handleButtonClick`:
- When a user clicks on one of the pagination buttons, figures out what page of rows to show.
1. `newPage` -int- new page of rows to show

-->
<script>
	// dependencies
	import windowWidthStore from '$lib/stores/windowWidth.js';
	import { onMount } from 'svelte';
	// exports
	export let caption = null; 			
	export let columns = null;			// column headers for th. can be different than keys
	export let keys = null;				// keys for objects in rows array to use. order of keys should be consistent with column
	export let currency = false;		// does the table contain currency
	export let width = false;			// custom width
	export let rows = [];				// data for rows of td
	export let itemsPerPage = 10;		// how many rows to show per page
	export let mobileHideColumns = []; // on mobile, hide these columns

	//vars
	const height 		= isMobile ? $windowWidthStore.height * 0.9 : 400;
    const totalPages 	= Math.ceil( rows.length / itemsPerPage );
	
	$: isMobile = $windowWidthStore.isMobile;
	$: columns === null && rows.length > 0 && (columns = Object.keys(rows[0]));
	$: currentPage = 1;
	$: minIndex = 0;
	$: maxIndex = itemsPerPage;

	isMobile ? width = 100 : width = width; 

    function handleButtonClick( newPage ) {
      	currentPage = newPage;
		minIndex 	= itemsPerPage * ( currentPage - 1 );
		maxIndex	= itemsPerPage * currentPage;
    }

</script>

<div style="height:{ height }px;width:{ width }%;">
	<table cellpadding="0" cellspacing="0">
		<thead>
			{#each columns as c, i }
				{#if isMobile }
					{#if mobileHideColumns.indexOf(i) == -1 }
						<th style="width:{ 100 / columns.length }%;">{c}</th>
					{/if}
				{:else}
					<th style="width:{ 100 / columns.length }%;">{c}</th>
				{/if}
			{/each}
		</thead>
		<tbody>
			{#each rows as row, i } 
				{#if i >= minIndex && i < maxIndex }
				<tr>
					{#each keys as k, ii }				
						{#if isMobile }
							{#if mobileHideColumns.indexOf(ii) == -1 }
								<td style="width:{ 100 / columns.length }%;">{ `${ k === 'year' ? row[k] : currency ? '$' + row[k].toLocaleString() : row[k].toLocaleString() }` }</td>
							{/if}
						{:else}
							<td style="width:{ 100 / columns.length }%;">{ `${ k === 'year' ? row[k] : currency ? '$' + row[k].toLocaleString() : row[k].toLocaleString() }` }</td>
						{/if}
					{/each}
				</tr>
				{/if}
			{/each}
		</tbody>
	</table>
	{#if totalPages > 1 }
	<div style="text-align:center;">
		<span id="pageInfo">Page { currentPage } of { totalPages }</span>
	</div>
	<div class="pagination">
		<button id="first" on:click={ () => { handleButtonClick( 1 ) } } on:keyup={()=>{}} >First</button>
		<button id="prev" on:click={ () => { handleButtonClick( Math.max( currentPage - 1, 1 ) ) } } on:keyup={()=>{}}>Prev</button>
		<button id="next" on:click={ () => { handleButtonClick( Math.min(currentPage + 1, totalPages ) ) } } on:keyup={()=>{}}>Next</button>
		<button id="last" on:click={ () => { handleButtonClick( totalPages ) } } on:keyup={()=>{}}>Last</button>
	</div>
	{/if}
</div>

<style lang="scss">

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 24px 0;

		button {
			margin: 0 8px;
			background-color: var( --tertiary_v3 );
			
			&:hover {
				background-color: var( --tertiary_v5 );
			}
			
		}
	}

	table {
      border-collapse: collapse;
      width: 100%;
	  
    }

    th,
    td {
    	border: 1px solid var( --gray_600 );
      	border-bottom: 1px solid var( --grayscale_v3 );
      	padding: 8px;
      	text-align: left;
		white-space: nowrap;
    }

    th {
      color: var( --tertiary_v7 );
	  border: 0;
	  white-space: nowrap;
    }


</style>
