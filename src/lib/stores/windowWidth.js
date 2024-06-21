import { readable } from 'svelte/store';
import { browser } from '$app/environment';

const mobileThreshold = 700;

const windowWidthStore = readable(
	{
		isMobile: null,
		width: null
	},
	(set) => {
		if (!browser) return;
		set({
			isMobile: window.innerWidth < mobileThreshold,
			width: window.innerWidth
		});

		function handleResize() {
			set({
				isMobile: window.innerWidth < mobileThreshold,
				width: window.innerWidth
			});
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}
);

export default windowWidthStore;
