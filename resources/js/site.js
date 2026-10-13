// This is all you.

document.querySelectorAll('[data-feature-tabs]').forEach((section) => {
    const tabs = Array.from(section.querySelectorAll('[data-feature-tab]'));

    if (tabs.length === 0) {
        return;
    }

    let activeIndex = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    let advanceTimer;

    const activateTab = (index) => {
        activeIndex = (index + tabs.length) % tabs.length;

        tabs.forEach((tab, tabIndex) => {
            const isActive = tabIndex === activeIndex;
            const panel = document.getElementById(tab.getAttribute('aria-controls'));
            const progress = tab.querySelector('[data-tab-progress]');

            tab.setAttribute('aria-selected', String(isActive));
            tab.tabIndex = isActive ? 0 : -1;

            if (panel) {
                panel.hidden = !isActive;
            }

            if (progress) {
                progress.classList.remove('is-active');

                if (isActive) {
                    requestAnimationFrame(() => {
                        if (activeIndex === tabIndex) {
                            progress.classList.add('is-active');
                        }
                    });
                }
            }
        });

        window.clearTimeout(advanceTimer);
        advanceTimer = window.setTimeout(() => activateTab(activeIndex + 1), 10000);
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(index));
        tab.addEventListener('keydown', (event) => {
            let nextIndex;

            if (event.key === 'ArrowRight') {
                nextIndex = (index + 1) % tabs.length;
            } else if (event.key === 'ArrowLeft') {
                nextIndex = (index + tabs.length - 1) % tabs.length;
            } else if (event.key === 'Home') {
                nextIndex = 0;
            } else if (event.key === 'End') {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            tabs[nextIndex].focus();
            activateTab(nextIndex);
        });
    });

    activateTab(activeIndex >= 0 ? activeIndex : 0);
});
