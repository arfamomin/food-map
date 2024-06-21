<!--
 @component
 A styled container for calling out somethign interesting.
 
 Generates a styled container with a header and copy that can be used to call out interesting context in a graphic. The callout can be collapsible, meaning if true will only show the header and the user will have to click on the box to reveal the contents inside. 

 1. `header` header for the box; summary if collapsible. `REQUIRED`
 2. `copy` contents of the box which would be collapsed if `collapsible` is true; html ok. `REQUIRED`
 2. `collapsible` determines whether copy should be hidden and be expanded on click. Defaults false. OPTIONAL


Component generates a simple html aside element with a header and copy for calling out interesting context. The container is styled to have a light gray background and appropriate padding and margins to fit well within a graphic dom flow. Having `collapsible` be true will, on load, show the box with a `header` as summary shown and a visual indicator that more can be expanded. Expanding will reveal `copy`.

-->
<script>
    export let header = "";
    export let copy = "";
    export let collapsible = false;
</script>

<aside id="note-box">
    {#if collapsible }
        <details>
            <summary>{ header }</summary>
            <div>
                <p>{ @html copy }</p> 
            </div>
        </details>
    {:else}
        <div>
            <h5>{ header }</h5>
            <p>{ @html copy }</p> 
        </div>
    {/if}
</aside>

<style lang="scss">
    #note-box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px 24px;
        margin: 20px 0;
        gap: 12px;
        cursor: pointer;
        background-color: #eee;

        summary, h5 {
            font-size: 20px;
            line-height: 24px;
            font-weight: 700;
            margin: 0;
            padding-bottom: 4px;
            font-family: "Source Sans Pro", sans-serif;
        }

        p {
            font-size: 16px;
            line-height: 24px;
            margin: 0;
        }

        a {
            text-transform: underline;
        }

    }

</style>