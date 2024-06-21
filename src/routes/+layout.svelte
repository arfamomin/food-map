<script>
	import { dev } from '$app/environment';
	import '../cms.css'; // comment this if you are INJECTING INTO THE CMS
	import '../guide.css';

	// uncomment this if you are INJECTING INTO THE CMS
	/* if (dev) {
		import('../cms.css')
	} */

</script>

<main>
	<slot />
</main>

<style>
	main {
		padding-bottom: 1rem;
	}
</style>