document.querySelectorAll('[data-image-modal-open]').forEach((button) => {
    const dialog = document.getElementById(button.dataset.imageModalOpen);

    if (!dialog) {
        return;
    }

    button.addEventListener('click', () => dialog.showModal());
    dialog.querySelector('[data-image-modal-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
