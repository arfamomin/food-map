<script>
    //components
	import Copy from "./features/Copy.svelte";
	import Image from "./features/Image.svelte";
    import Embed from "./features/Embed.svelte";

    export let data = null;
</script>

<section>
    <div>
        <h6>{ data.date }</h6>
        <h2>{ data.title }</h2>

        {#if data.copy != undefined }
            <Copy data={ data.copy } />
        {/if}

        {#if data.embed != undefined }
            <Embed data={ data.embed } />
        {/if}        

        {#if data.image != undefined }
            <Image 
                image={ data.image } 
                alt={ data.alt } 
                caption={ data.caption } 
            />
        {/if} 

    </div>
</section>

<style lang="scss">
    @import 'styles/card.scss';

    section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        h2 {
            margin-bottom: 12px;
        }

        div {
            max-width: 75%;
        }
    }
</style>