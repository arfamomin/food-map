<!--
 @component
 A styled search box
 
 Generates a styled html search input that binds to a reactive variable on the parent component to do something there.  

 1. `searchTerm` the search term typed into the input field. `REQUIRED`
 2. `placeholder` placeholder text in the search box. `REQUIRED`

Component generates a simple search input where the user could type something into the box amd have that value then used to do something on the parent component. As the user types a term into the box, it changes the value and sends it back to a reactive variable on parent. `searchTerm` must have `bind:` where the search component is called for this to work. Example use case: Leg Like You 2023 uses the search component to filter legislators. 

-->
<script>
    export let searchTerm = '';
    export let placeholder= 'Search placeholder text';
</script>

<input type="text" placeholder="{ placeholder }" on:keyup={ e => { searchTerm = e.target.value } } value={ searchTerm }>

<style lang="scss">
input {
    width: 370px;
    height: 40px;
    padding-left: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    line-height: 20px;
    font-family: var( --font-family );

    @media screen and ( max-width: 820px ){
        width: 100%;	
    }

    &::placeholder {
        font-size: 14px;
        line-height: 20px;
    }
}
</style>