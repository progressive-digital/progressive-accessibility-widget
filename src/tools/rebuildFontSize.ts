import { FONT_SIZE_SELECTORS, withinContentRoots } from "../enum/Selectors";

export default function rebuildFontSize(multiply:number = 1) {
    document
        .querySelectorAll(withinContentRoots(FONT_SIZE_SELECTORS).join(","))
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
