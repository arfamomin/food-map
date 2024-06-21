<!--
 @component
 A styled credit section
 
 Generates a styled area at the bottom of the graphic with credit, source and notation text. 

 1. `credit` the people who helped create the graphic. `REQUIRED`
 2. `source` the source for any data used in the graphic; html ok. `REQUIRED`
 3. `note` if there is additional context or methodology required to source or explain the graphic; html ok. OPTIONAL

Component generates a simple container to structure how we inform readers who made the graphic, where we got the data used in the graphic and any other context required to understand how we used the data or the nature of the data itself. 

-->

<script>
  export let credit = '';
  export let source = '';
  export let note =  '';
</script>
<section class="credits">
    {#if note !== '' }
    <p class="small"><strong>Note:</strong> { @html note }</p>
    {/if}

    <ul>
      {#if source !== '' }
      <li><strong>Source:</strong> { @html source }</li>
      {/if}

      {#if credit !== '' }
      <li><strong>Credits:</strong> { credit }</li>
      {/if}
    </ul>
</section>

<style lang="scss">

.credits {
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px solid #ccc;

  p {
    font-style:italic;
    text-align:left;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 14px;
      margin: 0;
    }
  }
}

</style>