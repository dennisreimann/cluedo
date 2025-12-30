import { createApp } from 'vue';
import App from './App.vue';
import './styles.css';

function applySystemTheme() {
	try {
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');
		else document.documentElement.removeAttribute('data-theme');
	} catch (e) {
		// ignore
	}
}

applySystemTheme();
// listen for changes in system theme
if (window.matchMedia) {
	const mq = window.matchMedia('(prefers-color-scheme: dark)');
	mq.addEventListener?.('change', applySystemTheme);
	// fallback for older browsers
	mq.addListener?.(applySystemTheme as any);
}

createApp(App).mount('#app');
