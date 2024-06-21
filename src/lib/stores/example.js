// example of how to fetch data from a netlify endpoint, using a fire dashboard dataset
import { readable } from 'svelte/store';
import { browser } from '$app/environment';
import fetch from '$lib/stores/fetch/fetchNetlify.js';

const dollarsStore = readable({
        isLoading: true,
        dollarsObj: [],
        dollarsTable: {}
    },
    set => {
        if (!browser) return;

        // the name of the netlify endpoint
        const route = 'dollars';

        fetch( route ).then( async( json ) => {  
            const dollarsObj = [];
            const dollarsTable = {
                header: [ 'Year', 'Total' ],
                keys: [ 'year', 'real' ]
            };        
            const years = json.default;
            const length = json.default.length - 1;

            // build all year objects
            years.forEach( y => {
                let yearObj = {};
                yearObj.year = y.year;
                yearObj.adjusted = y.adjusted;
                yearObj.simple = y.simple;
                yearObj.real = y.total;
                
                dollarsObj.push( yearObj );
            });
                    
            set({
                isLoading: false,
                dollarsObj,
                dollarsTable          
            });
        });
    }
);

export default dollarsStore;