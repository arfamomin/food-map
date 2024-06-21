<!--
 @component
 A styled list
 
 Generates an html list based on an array of data

 1. `data` an array of strings, which can contain html code. `REQUIRED`

Component works through the `data` array and outputs each the iteration of the array as a number, and then the contents of the string, respecting html code in the string if present.

-->
<script>   
    export let data = null;

</script>

<div class="fancy-list">
    {#each data as l, i }
    <div class="list-item">
        <div>{i + 1}</div>
        <div>
            <p class="small">{ @html l}</p>
        </div>
    </div>
    {/each}
</div>

<style lang="scss">
    .fancy-list {
        @media screen and ( max-width: 767px ){
            max-width: 340px;
        }
    }

    .list-item {
        display: flex;
        flex-grow: 0;
        margin-bottom: 8px;

        & > div:first-of-type {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25px;
            height: 25px; 
            margin-top: 4px;
            margin-right: 8px;
            background-color: var( --gray_600 );
            color: #fff;
            border-radius: 50%;
            flex-shrink: 0;
        }
    }

    .number {
        background-color: #993404;
        color: white;
        display: inline-block;
        width: 20px;
        text-align: center;
        border-radius: 50%;
        font-weight: 700;
    }
</style>