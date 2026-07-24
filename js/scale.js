(function () {
    const DESIGN_WIDTH = 1800;
    const MAX_ZOOM = 1.8;
    const wrapper = document.getElementById('page-scale');
    if (!wrapper) return;

    function applyScale() {
        const w = window.innerWidth;

        if (w > DESIGN_WIDTH) {
            const ratio = Math.min(w / DESIGN_WIDTH, MAX_ZOOM);

            wrapper.style.width = DESIGN_WIDTH + 'px';
            wrapper.style.transformOrigin = 'top left';
            wrapper.style.transform = 'scale(' + ratio + ')';

            // Center horizontally using exact pixel math (no vw / margin:auto guessing)
            const scaledWidth = DESIGN_WIDTH * ratio;
            const offsetX = (w - scaledWidth) / 2;
            wrapper.style.marginLeft = offsetX + 'px';
            wrapper.style.marginRight = '0';

            // transform doesn't change layout height, so compensate the bottom
            // margin or the page height won't match what's visually rendered
            const scaledHeight = wrapper.getBoundingClientRect().height; // already reflects the scale
            const naturalHeight = scaledHeight / ratio;
            wrapper.style.marginBottom = (scaledHeight - naturalHeight) + 'px';
        } else {
            wrapper.style.width = '';
            wrapper.style.transform = '';
            wrapper.style.transformOrigin = '';
            wrapper.style.marginLeft = '';
            wrapper.style.marginRight = '';
            wrapper.style.marginBottom = '';
        }
    }

    applyScale();
    window.addEventListener('resize', applyScale);
    window.addEventListener('load', applyScale); // re-run once images have loaded and heights are accurate
})();