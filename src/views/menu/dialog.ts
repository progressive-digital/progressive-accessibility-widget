const FOCUSABLE = 'button, select, [role="button"][tabindex]';

let $opener: HTMLElement | null = null;

export function isMenuOpen($container: HTMLElement) {
    return $container.style.display !== "none";
}

export function openMenu($container: HTMLElement, opener?: HTMLElement) {
    $opener = opener ?? $opener;
    $container.style.display = "block";
    $opener?.setAttribute("aria-expanded", "true");
    $container.querySelector<HTMLElement>(".asw-menu")?.focus();
}

export function closeMenu($container: HTMLElement) {
    $container.style.display = "none";
    $opener?.setAttribute("aria-expanded", "false");
    $opener?.focus();
}

// Escape closes, Enter and Space press div buttons, Tab stays inside the dialog.
export function bindDialogKeys($container: HTMLElement, $menu: HTMLElement) {
    $menu.addEventListener("keydown", (event: KeyboardEvent) => {
        const target = event.target as HTMLElement;

        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu($container);
        } else if ((event.key === "Enter" || event.key === " ") && target.matches('[role="button"]')) {
            event.preventDefault();
            target.click();
        } else if (event.key === "Tab") {
            const items = Array.from($menu.querySelectorAll<HTMLElement>(FOCUSABLE))
                .filter(el => el.offsetParent !== null);
            const first = items[0];
            const last = items[items.length - 1];

            if (event.shiftKey && (target === first || target === $menu)) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && target === last) {
                event.preventDefault();
                first?.focus();
            }
        }
    });
}
