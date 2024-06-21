<script>
	import Credits from "$lib/components/Credits.svelte";
    import Header from "$lib/components/Header.svelte";
	import Callout from "$lib/components/Callout.svelte";
	import CallToActionBox from "$lib/components/CallToActionBox.svelte";

    // template 
    $: activateCta = true; // do we want to have a "Call to Action" container to funnel readers somewhere else? 
    $: activateCallout = true; // do we want to have callout box to highlight interesting context in the graphic?
</script>

<main>
    
    <Header
        title="This is the headline for the graphic"
        copy="If there is any supporting context or other information that's important to know before digesting the graphic, this is where it goes."
    />

    <section>

        <!-- main contents of graphic here -->

        
        {#if activateCallout }
            <Callout 
                header="Callout box"
                copy="Sometimes we may want to have a prominent call out to add context or other interesting information as supplement to the graphic. This box could also be collapsible, showing only the header and then require a click on the container to expand this text you are reading."
                collapsible={ false }
            />
        {/if}

        {#if activateCta }
            <CallToActionBox 
                header="Do you have a news tip to share with us?"
                copy="Share confidential news tips or sensitive information to us through a secure channel."
                linkUrl="https://forms.gle/wXsJNXe1iqezmBEV9"
                linkCopy="Send a tip"
            />
        {/if}

    </section>

    <Credits
        credit="John Osborn D'Agostino, CalMatters"
        source="California Department of Awesome"
        note="No pixels were harmed in the creation of this example route."
    />

</main>

<style lang="scss">
    main {
        max-width: 780px; // most of the time, the graphic has to conform to the max width of the CMS content area, which is 780px
        margin: 0 auto;
    }
</style>