<script>
    export let header = null;
    export let desc = null;
    export let data = null;
    export let key = 'key';
    export let value = 'value';
    export let note = null;
    export let rounding = null;
    export let percent = null;
    export let whereMaxValue = 0;

    $: maxWidth = 270;
    $: maxValue = data[ whereMaxValue ][ value ];

</script>

<div class="ranked-bar">
    {#if header }
    <h6>{ header }</h6>
    {/if}

    {#if desc }
    <p>{ desc }</p>
    {/if}

    {#each data as obj, i }
        {#if i < 5 }    
        <div class="ranked-bar__item">
            <p class="label tiny">{ obj[ key ] }</p>
            <div>
                <div class="ranked-bar__bar" style="width:{ ( ( obj[ value ] / maxValue ) * maxWidth ) }px;">
                    {#if percent }
                    <p 
                        class="tiny { ( obj[ value ] / maxValue ) <= 0.10 ? 'outside' : '' }" 
                        style="margin-right:{ ( obj[ value ] / maxValue ) <= 0.10 ? ( obj[ value ]?.toString().length * -24 ) : 4 }px;"
                    >
                        { Math.round( obj[ value ]  ) }%
                    </p>
                    
                    {:else}
                    <p 
                        class="tiny { ( obj[ value ] / maxValue ) <= 0.50 ? 'outside' : '' }" 
                        style="margin-right:{ ( obj[ value ] / maxValue ) <= 0.50 ? ( obj[ value ]?.toString().length * -8 ) : 4 }px;"
                    >
                        
                        
                        { rounding ? ( Math.round( ( obj[ value ] / rounding ) ) * rounding )?.toLocaleString() : obj[ value ]?.toLocaleString() }
                    </p>
                    
                    {/if}
                </div>
            </div>
        </div>
        {/if}
   {/each}

    {#if note }
    <p class="small"><em>{ note }</em></p>
    {/if}
</div>

<style lang="scss">
    .ranked-bar {
        margin-bottom: 12px;
        .label {
            width: 100px;
            flex-shrink: 0;
        }
        &__item {
            display: flex;
            align-items: center;
            width: 100%;
            margin: 12px 0;

            & > div {
                width: 270px;
            }
        }
        &__bar {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            height: 24px;
            background-color: var( --aqua_600 );

            p {
                margin-bottom: 4px;
                color: #eee;

                &.outside {
                    color: var( --gray_600 );
                    margin-right: -8px;
                }
            }
        }
    }
</style>