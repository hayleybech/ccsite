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

document.querySelectorAll('[data-features-carousel]').forEach((carousel) => {
    const container = carousel.closest('[data-features-container]');
    const previousButton = container?.querySelector('[data-features-scroll="left"]');
    const nextButton = container?.querySelector('[data-features-scroll="right"]');
    const scrollbar = carousel.parentElement.querySelector('[data-features-scrollbar]');
    const thumb = scrollbar?.querySelector('[data-features-scrollbar-thumb]');

    if (!previousButton || !nextButton || !scrollbar || !thumb) {
        return;
    }

    const updateButtonStates = () => {
        const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
        const scrollProgress = maxScrollLeft > 0 ? carousel.scrollLeft / maxScrollLeft : 0;
        const thumbWidth = maxScrollLeft > 0 ? Math.max(10, (carousel.clientWidth / carousel.scrollWidth) * 100) : 100;

        previousButton.disabled = carousel.scrollLeft <= 1;
        nextButton.disabled = carousel.scrollLeft >= maxScrollLeft - 1;
        scrollbar.hidden = maxScrollLeft <= 0;
        scrollbar.setAttribute('aria-valuenow', String(Math.round(scrollProgress * 100)));
        thumb.style.width = `${thumbWidth}%`;
        thumb.style.left = `${scrollProgress * (100 - thumbWidth)}%`;
    };

    const scroll = (direction) => {
        const card = carousel.querySelector('article');

        if (!card) {
            return;
        }

        const cardGap = parseFloat(window.getComputedStyle(carousel).columnGap) || 0;

        carousel.scrollBy({
            left: direction * (card.getBoundingClientRect().width + cardGap),
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
    };

    previousButton.addEventListener('click', () => scroll(-1));
    nextButton.addEventListener('click', () => scroll(1));
    carousel.addEventListener('scroll', updateButtonStates, { passive: true });
    window.addEventListener('resize', updateButtonStates);

    let isDragging = false;
    let pointerOffset = 0;

    scrollbar.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) {
            return;
        }

        const trackRect = scrollbar.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();
        const pointerIsOnThumb = event.clientX >= thumbRect.left && event.clientX <= thumbRect.right;

        pointerOffset = pointerIsOnThumb ? event.clientX - thumbRect.left : thumbRect.width / 2;
        isDragging = true;
        scrollbar.classList.add('is-dragging');
        scrollbar.setPointerCapture(event.pointerId);

        const trackWidth = trackRect.width - thumbRect.width;

        if (trackWidth > 0) {
            const thumbLeft = Math.max(0, Math.min(trackWidth, event.clientX - trackRect.left - pointerOffset));
            carousel.scrollLeft = (thumbLeft / trackWidth) * (carousel.scrollWidth - carousel.clientWidth);
        }
    });

    scrollbar.addEventListener('pointermove', (event) => {
        if (!isDragging) {
            return;
        }

        const trackRect = scrollbar.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();
        const trackWidth = trackRect.width - thumbRect.width;

        if (trackWidth > 0) {
            const thumbLeft = Math.max(0, Math.min(trackWidth, event.clientX - trackRect.left - pointerOffset));
            carousel.scrollLeft = (thumbLeft / trackWidth) * (carousel.scrollWidth - carousel.clientWidth);
        }
    });

    const stopDragging = () => {
        isDragging = false;
        scrollbar.classList.remove('is-dragging');
    };

    scrollbar.addEventListener('pointerup', stopDragging);
    scrollbar.addEventListener('pointercancel', stopDragging);

    scrollbar.addEventListener('keydown', (event) => {
        const card = carousel.querySelector('article');
        const cardGap = parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
        const cardStep = card ? card.getBoundingClientRect().width + cardGap : carousel.clientWidth;

        switch (event.key) {
            case 'ArrowLeft':
                carousel.scrollBy({ left: -cardStep });
                break;
            case 'ArrowRight':
                carousel.scrollBy({ left: cardStep });
                break;
            case 'PageUp':
                carousel.scrollBy({ left: -carousel.clientWidth });
                break;
            case 'PageDown':
                carousel.scrollBy({ left: carousel.clientWidth });
                break;
            case 'Home':
                carousel.scrollTo({ left: 0 });
                break;
            case 'End':
                carousel.scrollTo({ left: carousel.scrollWidth });
                break;
            default:
                return;
        }

        event.preventDefault();
    });

    updateButtonStates();
});
