<script>
    //dependencies
    import { onMount } from 'svelte';
    import panzoom from 'panzoom';

    // stores
    import { instance, centerOn } from '$lib/stores/timeline';
    import windowWidthStore from "$lib/stores/windowWidth";

    // exports
    export let data = null;
    export let showMonths = false;
    export let activeCard = false;
    export let view = false;
    export let cardView = false;

    //const months = [ '', '', '', 'Apr', '', '', 'Jul', '', '', 'Oct', '', '', ]
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ]

    $: startYear = +data[1].year;
    $: endYear = +data[ data.length - 1 ].year;
    $: totalYears = endYear - startYear;
    $: pseudoYears = Array( totalYears + 1 ).fill( null );
    $: pseudoMonths = Array( 12 ).fill( null );

    onMount( () => {
        //panzoom
        const mount = document.querySelector( '.timeline' );
        const initialZoom = 1;
        const zoomLevelMin = 1;
        const zoomLevelMax = 1;
        $instance = panzoom( mount, {
            maxZoom: zoomLevelMax,
            initialZoom: initialZoom,
            minZoom: zoomLevelMin,
            bounds: true,
            boundsPadding: 1,
        });
        $instance.pause();
    });

    function handleClick(dIndex){
        activeCard = dIndex;

        if ( view == 'timeline' ){
            const target = document.querySelector( `.timeline__item[data-id="${ activeCard }"]` );
            const timeline = document.querySelector( `.timeline` );
            const interactiveWidth = document.querySelector( '.time-nav' ).offsetWidth
            centerOn( target, timeline, interactiveWidth, target.parentElement.attributes[1].value, target.parentElement );
        }
    }

</script>
<aside>
    <div 
        class="info-box shadow"
        on:click={ () => { cardView ? view = 'card' : view = 'timeline' } }
        on:keyup={ ()=>{} }
    >
        <p class="detail_tiny">{ data[ activeCard ].date }</p>
        <p><strong>{ data[ activeCard ].title }</strong></p>
        <p class="small">{ @html data[ activeCard ].copy }</p>
        <div>{ activeCard }</div>
    </div>
    <div class="timeline">
        
        {#each pseudoYears as y, i }
            <div class="timeline__container" style="{ !showMonths ? `margin-right:24px;` : ``}">
                <div class="timeline__year" data-id="{i}">
                    <div>
                        <h4>{ startYear + i }</h4>
                        <div class="marker"></div>
                    </div>
                    {#if ! showMonths }
                        {#each data as d, dIndex }
                            {#if d.year == startYear + i }
                                <div 
                                    class="timeline__item { activeCard == dIndex ? `shadow` : `` }" 
                                    data-id={ dIndex }
                                    on:click={ () => { handleClick(dIndex) } }
                                    on:keyup={ ()=>{} }
                                >
                                    <p>{ dIndex }</p>
                                </div>
                            {/if}
                        {/each}
                    {/if}
                </div>
                {#if showMonths }
                    {#each pseudoMonths as m, ii }
                        <div class="timeline__month">
                            <div>
                                <h6>{ months[ii] }</h6>
                                <div class="marker"></div>
                            </div>
                            {#each data as d, dIndex }
                                {#if d.year == startYear + i && d.month == ii + 1 }
                                    <div 
                                        class="timeline__item { activeCard == dIndex ? `shadow` : `` }" 
                                        data-id={ dIndex }
                                        on:click={ () => { handleClick(dIndex) } }
                                        on:keyup={ ()=>{} }
                                    >
                                        <p>{ dIndex }</p>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {/each}
                {/if}
            </div>    
        {/each}
    </div>
</aside>
<style lang="scss">
    aside {
        position: relative;
        width: 100%;
        height: 472px;
        margin: 0 auto;
        overflow: hidden;
        user-select: none;

        @media screen and ( max-width: 767px ){
            height: 472px;
        }
    }
    .shadow {
        box-shadow: 0px 0px 5px 5px rgba(10,129,159,0.25);
        -webkit-box-shadow: 0px 0px 5px 5px rgba(10,129,159,0.25);
        -moz-box-shadow: 0px 0px 5px 5px rgba(10,129,159,0.25);
    }
    .info-box {
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX( -50% );
        z-index: 100;
        width: 75%;
        min-height: 80px;
        padding: 12px;
        background-color: var( --gray_100 );
        border-radius: 2px;
        cursor: pointer;

        p:first-child {
            color: var( --aqua_600 );
            font-weight: 700;
            text-transform: uppercase;
        }

        p:last-child {
            color: var( --gray_500 );
            font-weight: 600;
        }

        div {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 20px;
            text-align: center;
            border-radius: 2px;
            background-color: var( --aqua_600 );
            color: var(--aqua_200);
            font-size: 14px;
        }
        
    }
    .timeline {
        position: absolute;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        top: 0;
        left: 0;
        min-width: 100%;
        height: 472px;
        background: radial-gradient(circle, transparent 20%, #212121 20%, #212121 80%, transparent 80%, transparent) 0% 0% / 20px 20px, radial-gradient(circle, transparent 20%, #212121 20%, #212121 80%, transparent 80%, transparent) 10px 10px / 20px 20px, linear-gradient(#272727 2px, transparent 2px) 0px -1px / 10px 10px, linear-gradient(90deg, #272727 2px, #212121 2px) -1px 0px / 10px 10px #212121;
        background-size: 20px 20px, 20px 20px, 10px 10px, 10px 10px;
        background-color: #212121;
        overflow: hidden;

        div {
            color: white;
        }

        &__item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            margin: 0 auto 24px auto;
            text-align: center;
            border-radius: 2px;
            background-color: var( --aqua_600 );
            cursor: pointer;
            
            p {
                color: var(--aqua_200);
            }
        }

        &__container {
            display: flex;
            height: 425px;

            & > div {
                display: flex;
                flex-direction: column;
            }
        }

        &__year {
            position: relative;

            & > div:first-child {
                position: relative;
                width: 50px;
                margin-bottom: 24px;
                text-align: center;

                .marker {
                    position: absolute;
                    top: -3px;
                    left: 18px;
                    width: 15px;
                    height: 1px;
                    background-color: var( --gray_500 );
                    transform: rotate(90deg);
                }
            }

            h4 {
                color: var( --gray_300 );
                font-size: 14px;
            }
        }

        &__month {
            & > div:first-child {
                position: relative;
                width: 50px;
                height: 20px;
                margin-bottom: 24px;
                text-align: center;

                .marker {
                    position: absolute;
                    top: -4px;
                    left: 20px;
                    width: 10px;
                    height: 1px;
                    background-color: var( --gray_500 );
                    transform: rotate(90deg);
                }
            }

           

            h6 {
                margin: 0 12px;
                color: var( --gray_400 );
                font-size: 10px;
                text-transform: uppercase;
            }
        }
    }
</style>