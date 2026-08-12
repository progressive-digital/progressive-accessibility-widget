# 👩‍🦽 Sienna: Accessibility Widget for Websites

![Banner Image](banner.png)

[![GitHub license](https://img.shields.io/github/license/progressive-digital/progressive-accessibility-widget)](https://github.com/progressive-digital/progressive-accessibility-widget/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/progressive-digital/progressive-accessibility-widget)](https://github.com/progressive-digital/progressive-accessibility-widget/releases)
[![GitHub issues](https://img.shields.io/github/issues/progressive-digital/progressive-accessibility-widget)](https://github.com/progressive-digital/progressive-accessibility-widget/issues)

Sienna: accessibility widget for websites. easy to install, just copy and paste the plugin. Fast performance with lightweight plugin (~30kb).

## 🎉 Getting Started
[View Demo](https://accessibility-widget.pages.dev)

[Install the plugin quickly with just a copy and paste](https://accessibility-widget.pages.dev/#setup)

## 🚀 Features

✅ **Multilingual Support**: Supports multiple languages to ensure a seamless user experience for all users.

✅ **Dyslexia Font**:  Dyslexia font to make reading easier for dyslexic users.

✅ **Adjustable Font Size and Highlighting Text**: Users can easily adjust the font size and highlight text to their liking, making it easier to read content.

✅ **Color Adjustments, Contrast, Saturation, and Monochrome**: Allows users to customize the color scheme of your website, making it easier for them to read and navigate.

✅ **Reading Guide, Stop Animations, and Big Cursor**: Helpful tools like a reading guide, the ability to stop animations, and a big cursor to make browsing your website easier for users with visual impairments.

## 📌 TODO

- Accessibility Profiles
- Screen Reader
- Voice Navigation
- Position of Button
- Inject Icon in code
- Support More Languages

## 🤝 Contributing
We welcome contributions from anyone who is interested in improving this. If you would like to contribute, please fork the repository and submit a pull request. ❤️

## 🎓 License
This Progressive fork is released under the GNU GPL v3 license; see `LICENSE`.

## For developers

### Light, dark and system themes

Sienna follows the operating-system color scheme by default. Hosts can make an
explicit choice on the `html` element:

```html
<html data-asw-theme="light">
<html data-asw-theme="dark">
```

Progressive Drupal's existing `data-pd-theme="light|dark|system"` contract is
supported directly. Every widget color is exposed as an `--asw-*` custom
property on `.asw-menu`, so a host can apply brand colors without overriding
the widget's internal selectors. Keep foreground/background pairs at WCAG AA
contrast when changing these variables.

For recalculation font size, you need to add `data-aws-breakpoints` to the body element.

```html
<body data-aws-breakpoints="{&quot;xs&quot;:&quot;all and (max-width: 575px)&quot;,&quot;md&quot;:&quot;all and (min-width: 576px) and (max-width: 991px)&quot;,&quot;lg&quot;:&quot;all and (min-width: 992px)&quot;}">
```
