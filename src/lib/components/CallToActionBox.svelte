<!--
 @component
 A styled container for funneling audience.
 
 Generates a styled container with a header, copy and a button that can be used to funnel readers to a specific page for purposes including comments, email feedback, signup for something, learn more, etc.  

 1. `header` header for the box. `REQUIRED`
 2. `copy` main text of the box; html ok. `REQUIRED`
 2. `linkUrl` url to send reader when clicking on button. `REQUIRED`
 2. `linkCopy` copy for the button. `REQUIRED`


Component generates a simple html aside element with a `header` and `copy` crafted to alert readers on something they should do to go deeper into our system somehow. When they click on the button, they would be sent to a specific url based on `linkUrl` for the purpose of funneling. The text on the button would be defined by `linkCopy`.

-->
<script>
    export let header = "Placeholder header";
    export let copy = "Placeholder text";
    export let linkUrl = "https://calmatters.org";
    export let linkCopy = "Go Somewhere";
</script>

<aside id="cta-box">
    <div>
        <h5>{ header }</h5>
        <p>{ @html copy }</p> 
    </div>
    <a href="{ linkUrl }" target="_blank" rel="noopener"><button class="small">{ linkCopy }</button></a>
</aside>

<style lang="scss">
    #cta-box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px 24px;
        margin: 20px 0;
        gap: 12px;
        border: 1px solid #ccc;

        h5 {
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
            text-decoration: none !important;
            color: #fff !important;
        }
    }

</style>