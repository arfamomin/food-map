<script>
    export let image = null;
    export let alt = null;
    export let caption = null;
    export let captionAdjust = 0;
</script>

<div class="image">
    <div
        style="background-image:url({ image });"
    >
    </div>
    <p class="detail_tiny" style="bottom:{ captionAdjust }px;">{ caption !== undefined ? caption : `` }</p>

</div>

<style lang="scss">   
    .image {
        position: relative;
        flex-grow: 1;
        width: 100%;
        min-height: 200px;
        margin-bottom: 4px;

        div {
            position: relative;
            width: 100%;
            height: 95%;
            background-position: center;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }

        p {
            color: var( --gray_400 );
            text-align: center;
        }
    }  
</style>