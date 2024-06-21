<!--
 @component
 An input field that uses the Google Maps Autocomplete service.

 Dispatches `placeChanged` event with the following detail:
 * `formatted` - Formatted address string returned from API
 * `lat` - Latitude
 * `lng` - Longitude

-->

<script>
  import { createEventDispatcher, onMount } from 'svelte';
  export let googleMapsApiKey = 'AIzaSyAeWCRwTplGGApt2ezTvHjvL0rnmntGHws';
  export let placeholder = 'Type street address'

  const autocompleteOptions = {
    bounds: {
      east: -114.131211,
      north: 42.009518,
      west: -124.409591,
      south: 32.534156,
    },
    strictBounds: true,
  }

  const dispatch = createEventDispatcher()
  let inputElement;

  async function awaitGoogleObject() {
    let interval = null

    return new Promise((resolve, reject) => {
      interval = setInterval(() => {
        if (!google) return
        window.clearInterval(interval)
        resolve()
      }, 200)
    })
  }

  onMount(async () => {
    await awaitGoogleObject()
    const autocomplete = new google.maps.places.Autocomplete(inputElement, autocompleteOptions)
    
    autocomplete.addListener('place_changed', async () => {
      const place = autocomplete.getPlace()
      const formatted = place.formatted_address
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      dispatch('placeChanged', { formatted, lat, lng })
    })
    
    dispatch('ready')
  })
</script>

<div>
  <div class="input-container">
    <input type="text" bind:this={inputElement} {placeholder} />
    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.875 18H18.8875L18.5375 17.6625C19.7625 16.2375 20.5 14.3875 20.5 12.375C20.5 7.8875 16.8625 4.25 12.375 4.25C7.8875 4.25 4.25 7.8875 4.25 12.375C4.25 16.8625 7.8875 20.5 12.375 20.5C14.3875 20.5 16.2375 19.7625 17.6625 18.5375L18 18.8875V19.875L24.25 26.1125L26.1125 24.25L19.875 18V18ZM12.375 18C9.2625 18 6.75 15.4875 6.75 12.375C6.75 9.2625 9.2625 6.75 12.375 6.75C15.4875 6.75 18 9.2625 18 12.375C18 15.4875 15.4875 18 12.375 18Z" fill="#474644"></path>
    </svg>
  </div>
  <p class="privacy-notice">
    We do not store your address.
    <a href="https://calmatters.org/privacy-policy/" target="_top">
      Privacy Policy →
    </a>
  </p>
  <script src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`}></script>
</div>

<style lang="scss">
  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .input-container {
    position: relative;
    width: 100%;
  }
  input {
    border-color: rgb(17, 17, 17);
    border-radius: 2px; 
    border-width: .2px;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 20px;
    padding: 6px 0 6px 10px;
    padding-right: 35px;
    width: 100%;
  }

  svg {
    position: absolute;
    height: 20px;
    right: 10px;
    width: 20px;
  }

  .privacy-notice {
    font-style: italic;
    margin-bottom: 1rem;
    margin-top: .3rem;
  }
</style>