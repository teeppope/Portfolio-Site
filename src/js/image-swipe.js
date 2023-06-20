export default function imageSwipe() {
    const imageWrappers = document.querySelectorAll('.image-wrapper');

    let intersectionOptions = {
        threshold: 0.5,
        trackVisibility: true,
        delay: 150

    }

    function swipeImages(entries, observer) {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }

    let observer = new IntersectionObserver(swipeImages, intersectionOptions);

    imageWrappers.forEach((wrapper) => {
        observer.observe(wrapper);
    })
}