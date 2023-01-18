const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
	window.defferedPrompt = event;
	butInstall.style.visibility = 'visible';
});

butInstall.addEventListener('click', async () => {
	const promptEvent = window.defferedPrompt;

	if (!promptEvent) {
		return;
	}
	promptEvent.prompt();
	window.defferedPrompt = null;
	butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
	window.defferedPrompt = null;
});
