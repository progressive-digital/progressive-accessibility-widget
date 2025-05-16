export default function rebuildFontSize(multiply:number = 1) {
    document
        .querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span,blockquote,.asw-text")
        .forEach((el: HTMLElement) => {
            if(!el.classList.contains('material-icons') && !el.classList.contains('fa')) {
                if (Number(el.getAttribute('data-asw-orgFontSize') ?? 0)) {
                    el.style['font-size'] = '';
                }

                const orgFontSize = parseInt(window.getComputedStyle(el).getPropertyValue('font-size'));
                el.setAttribute('data-asw-orgFontSize', String(orgFontSize));

                el.style['font-size'] = orgFontSize * multiply + 'px';
            }
        });
}
