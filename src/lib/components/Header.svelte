<!--
 @component
 A styled header
 
 Generates a styled header for the graphic.

 1. `title` the headline. `REQUIRED`
 2. `copy` any supporting copy contextualizing the graphic. `REQUIRED`

Component generates a simple container with the `title` as an `h3` element and `copy` as a `p` tag with html support.

-->
<script>
    export let title = null;
    export let copy = null;
</script>

<section>
    
    <h3>{ title }</h3>
    <p>{ @html copy }</p>

</section>

<style lang="scss">

section {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 4px solid #ddd;
}

h3 {
    margin: 0;
    padding-bottom: 8px;
}
</style>