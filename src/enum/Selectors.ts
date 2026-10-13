export const ALL_SELECTOR = ['', '*:not(.material-icons,.asw-menu,.asw-menu *)']

export const LINKS_SELECOTR = ["a[href]"];

export const HEADER_SELECTORS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', '.wsite-headline', '.wsite-content-title']

export const TEXT_SELECTORS = [...HEADER_SELECTORS , 'img', 'p', 'i', 'svg', 'a', 'button:not(.asw-btn)', 'label', 'li', 'ol'];

/**
 * Front-end content roots the tools are limited to.
 *
 * Drupal renders the page inside ".dialog-off-canvas-main-canvas" and modal
 * dialogs inside ".ui-dialog". Admin UI such as the toolbar, the Navigation
 * sidebar and the off-canvas settings tray lives outside these roots.
 */
export const CONTENT_ROOT_SELECTORS = ['.dialog-off-canvas-main-canvas', '.ui-dialog:not(.ui-dialog-off-canvas)'];

/**
 * Admin UI rendered inside the content roots (contextual links).
 */
export const ADMIN_UI_EXCLUSION = ':not(.contextual, .contextual *)';

export const FONT_SIZE_SELECTORS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'dl', 'dt', 'li', 'ol', 'th', 'td', 'span', 'blockquote', '.asw-text'];

/**
 * Scopes child selectors to the content roots and skips embedded admin UI.
 *
 * An empty child selector targets the content root itself.
 */
export function withinContentRoots(childSelectors: string[]): string[] {
    return CONTENT_ROOT_SELECTORS.flatMap(root => childSelectors.map(child => child ? `${root} ${child}${ADMIN_UI_EXCLUSION}` : root));
}
