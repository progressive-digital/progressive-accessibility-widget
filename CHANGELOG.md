# Changelog

## 1.0.7 - 2026-11-03

- Exposed the menu as a named modal dialog (`role="dialog"`, `aria-modal`, `aria-labelledby`).
- Moved focus into the menu on open, kept Tab inside and returned focus to the opening button on close.
- Added Escape to close and kept `aria-expanded` / `aria-controls` on the menu button in sync.
- Made reset and close reachable by keyboard; Enter and Space now press all `role="button"` controls.
- Exposed tool and color states with `aria-pressed` and hid decorative SVG icons from screen readers.
- Added a visible focus indicator for panel controls and keyboard accessibility tests.

## 1.0.4 - 2026-08-12

- Added native light, dark and system color schemes.
- Added compatibility with Progressive Drupal's `data-pd-theme` preference.
- Exposed semantic `--asw-*` color properties for host branding.
- Made widget labels and SVG icons inherit accessible foreground colors.
- Added automated theme-contract and WCAG AA contrast tests.
- Removed an unused vulnerable build dependency and updated Webpack.
