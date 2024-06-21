import { writable } from "svelte/store";
import jQuery from 'jquery';


export const instance = writable( false );
export const timelineStore = writable( false );
export const isLoading = writable( true );

// fetch data
async function fetchData(){
    try {
        const url = "https://calmatters-reparations-explainer.netlify.app/.netlify/functions/timeline";
        const response = await fetch(`${ url }`);
        const data = await response.json();
        timelineStore.set( data );         
        isLoading.set( false );          
    }
    catch(e){
        console.error( 'Fetch Error', e.message );
    }
}
fetchData();

// center timeline interface with current timeline item
export function centerOn( ui, timeline, width, parentID, parent ){
    const elemPos   = ui.offsetParent.offsetLeft - width / 2; 
    const max       = timeline.offsetWidth - width;     

    // make sure it's within the bounds of the timeline element before moving
    if ( timeline.offsetWidth - elemPos < width ){
        timeline.style.transform = `matrix(1,0,0,1,${ -Math.abs( max ) },0)`;     
    }
    else if ( ui.offsetParent.offsetLeft == 0 ){
        timeline.style.transform = `matrix(1,0,0,1,${ -Math.abs( 0 ) },0)`;
    }
    else if ( timeline.offsetWidth != width ){
        timeline.style.transform = `matrix(1,0,0,1,${ -Math.abs( elemPos ) },0)`;
    }

    colorYears( parentID );
}

function colorYears( target ){
    const years = jQuery( '.timeline__year' );

    // reset colors
    jQuery( '.timeline__year h4' ).css({
        color: '#CCCCCC'
    });

    //color to current
    years.each( (i) => {
        if ( i <= +target ){
            jQuery( `.timeline__year[data-id="${ i }"] h4` ).css({
                color: '#05B9D7'
            })
        }
    })

    
}

