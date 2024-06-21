<script>
    export let data = null;
    export let activeCard = 0;
</script>

<section style="background-image:url({ data.image });" on:click="{ () => { activeCard++ } }" on:keyup={ (e) => { activeCard++ } }>
    <div>
        <h6>{ data.date }</h6>
        <h2>{ data.title }</h2>
        {#if data.copy != undefined }
        <p>{ data.copy }</p>
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
        background-position: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        div {
            display: table;
            width: fit-content;
            margin: 0 auto 8px auto;
            text-align: center;
            padding: 8px;
            border-radius: 5px;
            background-color: rgba( $color: #E2F0F3, $alpha: 0.85 );
            border: 4px solid var( --aqua_600 );
            box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
            -webkit-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
            -moz-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
        }

        h2 {
            padding: 4px;
            text-align: center;
        }

        p  {
            padding: 4px;
        }
    }
</style>