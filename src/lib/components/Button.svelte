<!--
 @component
 A styled button
 
 Has two props that can be used to dictate appearance based
 on [the styleguide for buttons](https://zeroheight.com/9f6eb9a46/p/34ad1f-button)

 1. `size` which can be "label", "compact", or "default"
 2. `variant` which can be any of the variants in the style guide, including spaces such as "translucent aqua"

 The default value for `size` is "default" and the default value for `variant` is "primary"

 If disabled prop is supplied it will also be passed through to the button

 Dispatches click events using the standard Svelte `on:click` directive
-->

<script>
  import { createEventDispatcher } from "svelte"

  function kebabCase(str) {
    const lower = str.toLowerCase()
    const kebab = lower.replaceAll(' ', '-')
    return kebab
  }

  export let disabled = false
  export let size = 'default'
  export let variant = 'primary'

  const dispatcher = createEventDispatcher()

  function dispatchOnClick(e) {
    dispatcher('click', e)
  }
</script>

<button
  class={`size-${kebabCase(size)} variant-${kebabCase(variant)}`}
  {disabled}
  on:click={dispatchOnClick}
>
  <slot>Default button text</slot>
</button>

<style>
  button {
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    text-transform: none;
  }

  .size-compact {
    font-size: 14px;
    font-weight: 600;
    height: 32px;
    line-height: 16px;
    padding: 8px 16px;
  }

  .size-default {
    font-size: 16px;
    font-weight: 600;
    height: 40px;
    line-height: 20px;
    padding: 10px 40px;
  }

  .size-label {
    border-radius: 2px;
    font-size: 12px;
    font-weight: 700;
    height: 20px;
    line-height: 16px;
    padding: 2px 16px;
    text-transform: uppercase;
  }

  .variant-primary {
    background-color: var(--aqua_500);
    border-color: var(--aqua_500);
    color: var(--gray_000);
  }

  .variant-primary:hover {
    background-color: var(--aqua_600);
  }

  .variant-secondary {
    background-color: var(--gray_000);
    border-color: var(--aqua_600);
    color: var(--aqua_600);
  }

  .variant-secondary:hover {
    background-color: var(--aqua_200);
  }

  .variant-tertiary-outline {
    background-color: var(--gray_000);
    border-color: var(--gray_300);
    color: var(--gray_500);
  }

  .variant-tertiary-solid {
    border-color: var(--gray_100);
    background-color: var(--gray_100);
    color: var(--gray_500);
  }

  .variant-tertiary-outline:hover,
  .variant-tertiary-solid:hover {
    background-color: var(--gray_200);
    border-color: var(--gray_200);
    color: var(--gray_500);
  }

  .variant-translucent-aqua {
    border-color: #DBE0E1;
    background-color: var(--aqua_100);
    color: var(--gray_500);
  }

  .variant-translucent-aqua:hover {
    background-color: var(--aqua_200);
    border-color: #B3CCD1;
    color: var(--gray_500);
  }

  .variant-translucent-purple {
    border-color: #E3DEE5;
    background-color: var(--purple_100);
    color: var(--gray_500);
  }

  .variant-translucent-purple:hover {
    background-color: var(--purple_200);
    border-color: var(--purple_300);
    color: var(--gray_500);
  }
</style>