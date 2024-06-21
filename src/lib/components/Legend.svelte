<!--
 @component
 A styled legend
 
 Generates an html legend based on inputs. 

 1. `data` an array of strings with hex code and label. Model off of default `REQUIRED`
 1. `label` have the legend label show. Default false

Component works through the `data` array and outputs each the iteration of the array as a dom element showing a colored box and a label. The elements are flexed horizontially.

-->
<script>   
    export let data = [
        {
            label: "Test",
            color: "#aaa"
        }
    ];
    export let label = false;

</script>

<div class="legend">
    {#if label }
    <p class="small">Legend:</p>
    {/if}

    <div>
        {#each data as l, i }
            <div class="legend-item">
                <div style="background-color:{ l.color }"></div>
                <div>
                    <p class="tiny">{ l.label }</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .legend {
        margin: 24px 0;
        @media screen and ( max-width: 767px ){
            max-width: 340px;
        }

        & > p {
            margin-bottom: 4px;
            font-weight: 600;
        }

        & > div {
            display: flex;
            align-items: center;
        }
    }

    .legend-item {
        display: flex;
        align-items: center;
        flex-grow: 0;
        margin-right: 20px;
        margin-bottom: 8px;

        & > div:first-of-type {
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }

        
    }

</style>