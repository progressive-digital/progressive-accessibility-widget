import { renderMenu } from "../menu/menu";
import { isMenuOpen, openMenu, closeMenu } from "../menu/dialog";
import { ISeinnaSettings } from "../../sienna";
import translateMenu from "../menu/translateMenu";

export function renderWidget(options: ISeinnaSettings) {
    let menu;
    document.querySelectorAll(".asw-container")
    .forEach(widget => {
        if (!(widget instanceof HTMLElement)) {
            return;
        }

        const $btn: HTMLElement = widget.querySelector(".asw-menu-btn");
        $btn?.setAttribute("aria-controls", "asw-menu");

        $btn?.addEventListener("click", (event) => {
            event.preventDefault();

            if(!menu) {
                menu = renderMenu({
                    ...options,
                    container: document.body,
                });
            } else if(isMenuOpen(menu)) {
                closeMenu(menu);
                return;
            }
            openMenu(menu, $btn);
        });

        translateMenu(widget);
    });
}
