tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                glass: 'rgba(255, 255, 255, 0.55)',
                glassBorder: 'rgba(255, 255, 255, 0.65)',
            }
        }
    }
}

function openLightbox(src) {
    openMedia(src, 'image');
}

function openMedia(src, type) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');

    if (type === 'video') {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = src;
        lightboxVideo.play();
    } else {
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxVideo.style.display = 'none';
        lightboxImg.style.display = 'block';
        lightboxImg.src = src;
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    lightboxVideo.pause();
    lightboxVideo.src = '';
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

document.addEventListener('DOMContentLoaded', () => {
    const certImages = document.querySelectorAll('.cert-img');
    certImages.forEach(img => {
        img.addEventListener('click', () => {
            openMedia(img.src, 'image');
        });
    });

    // Auto-detect portrait images & videos in gallery and adjust grid span
    document.querySelectorAll('.gallery-item').forEach(item => {
        // Skip items that already have explicit span classes set manually
        if (item.classList.contains('gallery-tall') ||
            item.classList.contains('gallery-wide') ||
            item.classList.contains('gallery-full')) return;

        const img = item.querySelector('img');
        const video = item.querySelector('video');

        if (img) {
            const applyOrientation = () => {
                if (img.naturalHeight > img.naturalWidth) {
                    item.classList.add('gallery-portrait');
                }
            };
            if (img.complete && img.naturalWidth > 0) {
                applyOrientation();
            } else {
                img.addEventListener('load', applyOrientation);
            }
        }

        if (video) {
            const applyVideoOrientation = () => {
                if (video.videoHeight > video.videoWidth) {
                    item.classList.add('gallery-portrait');
                }
            };
            if (video.readyState >= 1 && video.videoWidth > 0) {
                applyVideoOrientation();
            } else {
                video.addEventListener('loadedmetadata', applyVideoOrientation);
            }
        }
    });
});
