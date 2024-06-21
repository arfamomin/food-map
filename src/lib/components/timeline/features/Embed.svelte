<script>
    export let data = null;
    export let width = '100%';
</script>

<div class="embed" style="max-width:{ width };">
    { @html data }
</div>

<style lang="scss">   
    .embed {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 100%;

        @media screen and ( max-width: 767px ){
            width: 100% !important;
        }
    }  
</style>