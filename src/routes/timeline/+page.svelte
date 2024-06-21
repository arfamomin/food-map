<script>

    // stores
    import { timelineStore, isLoading, centerOn } from '$lib/stores/timeline';


    // components
    //import TimelineCardHalf from '$lib/components/timeline/TimelineCard_Half.svelte';
	//import TimelineCardThreeQuarters from '$lib/components/timeline/TimelineCard_ThreeQuarters.svelte';
	//import TimelineCardSplit from '$lib/components/timeline/TimelineCard_Split.svelte';
	import Timeline from '$lib/components/timeline/Timeline.svelte';
	import TimelineCardFullCenter from "$lib/components/timeline/TimelineCard_FullCenter.svelte";
	import TimelineCardTitle from "$lib/components/timeline/TimelineCard_Title.svelte";
	import TimelineCardFull from '$lib/components/timeline/TimelineCard_Full.svelte';

    $: view         = 'timeline';   // card or timeline
    $: activeCard   = 0;        // 0 is title
    $: cardView     = false;     // should we show timeline mode only

    function handleNavigation( next, timeline = false ){
        if ( timeline ){
            view = view == 'card' ? 'timeline' : 'card';
        }
        else {
            if ( next ){
                if ( activeCard == $timelineStore.length - 1 ){
                    return;
                }
                else {
                    activeCard++;
                }
            }
            else {
                if ( activeCard == 1 ){
                    return;
                }
                else {
                    activeCard--;
                }
            }
        }

        setTimeout( ()=> {
            if ( view == 'timeline' ){
                const target = document.querySelector( `.timeline__item[data-id="${ activeCard }"]` );
                const timeline = document.querySelector( `.timeline` );
                const interactiveWidth = document.querySelector( '.time-nav' ).offsetWidth
                centerOn( target, timeline, interactiveWidth, target.parentElement.attributes[1].value, target.parentElement );
            }
        }, 1 )
    }

</script>

<section>
    {#if $isLoading }
        <h1>Loading!</h1>
    {:else}
        {#if cardView }
            <div class="time-view">
                {#if activeCard > 0 }
                    <button on:click={ ()=>{ handleNavigation( false, true ) } }>{ view == 'card' ? 'Timeline' : 'Card' } View</button>
                {/if}
            </div>
        {/if}

        <div class="time-item">
            {#if view == 'card' }
                {#if $timelineStore[ activeCard ].template == 'title' }
                    <TimelineCardTitle data={ $timelineStore[ activeCard ] } bind:activeCard />
                {/if}
            
                {#if $timelineStore[ activeCard ].template == 'full' }
                    <TimelineCardFull data={ $timelineStore[ activeCard ] } />
                {/if}

                {#if $timelineStore[ activeCard ].template == 'fullCenter' }
                    <TimelineCardFullCenter data={ $timelineStore[ activeCard ] } />
                {/if}
            {/if}

            {#if view == 'timeline' }
                {#if $timelineStore[ activeCard ].template == 'title' }
                    <TimelineCardTitle data={ $timelineStore[ activeCard ] } bind:activeCard />
                {:else}
                    <Timeline 
                        showMonths={ false }
                        data={ $timelineStore } 
                        bind:activeCard
                        bind:view
                        bind:cardView
                    />
                {/if}
                
                
            {/if}
        </div>

        <div class="time-nav">
            <button class="secondary" style="visibility:{ activeCard > 1 ? `visible` : `hidden` };" on:click={ () => { handleNavigation( false ) } }>Previous</button>

            {#if activeCard > 0 }
                <h4><span>{ activeCard }</span> of <span>{ $timelineStore.length - 1 }</span></h4>
            {/if}

            <button class="secondary" style="visibility:{ activeCard < $timelineStore.length - 1 ? `visible` : `hidden` };" on:click={ () => { handleNavigation( true ) } }>Next</button>
        </div>
    {/if}
</section>

<style lang="scss">
    section {
        position: relative;
        max-width: 700px;
        min-height: 625px;
        margin: 24px auto;
        border-top: 2px solid var( --aqua_600 );
        border-bottom: 2px solid var( --aqua_600 );
        background-color: var( --aqua_100 );

        h1 {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate( -50%, -50% );
        }
    }

    .time-view {
        position: relative;
        width: 100%;
        height: 50px;

        button {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY( -50% );
            color: var( --gray_100 );
            background-color: var( --aqua_500 );

            &:hover {
                background-color: var( --aqua_600 );
            }
        }
    }

    .time-item {
        position: relative;
        width: 100%;
        height: 525px;
        overflow: hidden;

        @media screen and ( max-width: 767px ){
            min-height: inherit;
        }
    }

    .time-nav {
        position: absolute;
        display: flex;
        justify-content: space-between;
        bottom: 0;
        width: 100%;
        padding: 12px;

        button {
            margin: 0;
        }
    }

</style>