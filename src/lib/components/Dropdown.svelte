<!--
 @component
 A styled dropdown
 
 Generates a styled dropdown select component which returns to a reactive variable on the parent component a value that can be used for other purposes. 

 1. `optionSelected` the active value displayed on the dropdown. `REQUIRED`
 2. `data` an array of string values used to populate the dropdown. `REQUIRED`


Component generates a simple html select dropdown input. When changing the value, it sends that value back to the parent component so long as `optionSelected` has `bind:` when calling the dropdown component. A use case for this can be reviewed on the dashboards, where a dropdown component is used to navigate to different sections of the page.

-->
<script>
    export let optionSelected = "";
    export let data = "";
</script>

<div class="dropdown-select">
    <label for="select">Jump to topic:</label>
    <select id="select" bind:value={ optionSelected } on:change="{ (e) => optionSelected = e.target.value }">
        {#each data as option }
        <option value="{ option.value }">{ option.label }</option>
        {/each}
    </select>
</div>
  

<style lang="scss">
    .dropdown-select {
        position: relative;
        width: 300px;
        margin: 0 auto;
        
        label {
            display: block;
            margin-bottom: 5px;
            font-size: 18px;
            font-weight: 600;
            color: var( --gray_600 );
        }
        
        select {
            display: block;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #fff;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L3 7h10l-5 5z"/></svg>');
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 16px 16px;
            cursor: pointer;
        }
        
        select::-ms-expand {
            display: none;
        }
        
        select:hover {
            border-color: #aaa;
        }
        
        select:focus {
            border-color: #f4bb32;
            outline: none;
        }
    }

</style>
  