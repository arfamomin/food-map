<script>
    //components
	import Copy from "./features/Copy.svelte";
    import Embed from "./features/Embed.svelte";
	import Image from "./features/Image.svelte";

    export let data = null;

</script>

<section>
    <div>
        <div class="header">
            <h6>{ data.date }</h6>
            <h2>{ data.title }</h2>
        </div>

       <div class="body">
        {#if data.embed != undefined || data.embed == "" }
            <Embed data={ data.embed } width="75%" />
        {/if} 
        
        {#if data.image != undefined || data.image == "" }
            <Image 
                image={ data.image } 
                alt={ data.alt } 
                caption={ data.caption } 
                captionAdjust={ data.captionAdjust != undefined ? data.captionAdjust : 0 }
            />
        {/if} 

        {#if data.copy != undefined }
            <Copy data={ data.copy } />
        {/if}
       </div>

    </div>
</section>

<style lang="scss">
    @import 'styles/card.scss';

    section {
        width: 100%;
        height: 100%;
        
        h2 {
            margin: 0;
            padding-bottom: 4px;
        }

        div {
            width: 100%;
        }

    }
</style>