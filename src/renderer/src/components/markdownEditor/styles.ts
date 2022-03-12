/** Customize global styles here */
import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';

const markdownEditorStyle = css`
  .container {
    max-width: 72rem;
    display: flex;
    display: block;
    /* margin: 0 auto; */
    width: 100%;
    transition: all 0.4s ease-in-out;
  }

  .milk {
    flex-grow: 1;
    transition: all 0.4s ease-in-out;
    flex-shrink: 2;
  }

  .twoSide {
    gap: 1.25rem;
    margin: 0;
    .code {
      margin: 1.25rem 0;
      width: unset;
      box-sizing: border-box;
      min-height: 30rem;
      padding: 3.125rem 0;
      border: 1px solid transparent;
      overflow: auto;
      flex: 1 1 40%;
      height: calc(100vh - 11.5rem + 8px);
    }
    .milk {
      width: 50%;
    }
    .milk > div > div > div {
      max-width: unset !important;
    }
  }

  .code {
    background: palette(surface);
    transition: all 0.4s ease-in-out, height 0s, padding 0s;
    border: none;
    width: 0;
    height: 0;
    flex: 0;
    box-shadow: 0px 1px 1px palette(shadow, 0.14), 0px 2px 1px palette(shadow, 0.12), 0px 1px 3px palette(shadow, 0.2);
    border-radius: var(--radius);
    color: palette(neutral, 0.87);
    font-size: 1rem;
    line-height: 1.25rem;
    overflow: hidden;
    padding: 0;

    ::selection {
      background: palette(secondary, 0.38) !important;
    }
    @mixin scrollbar;

    &.focus {
      outline: none;
      border: 1px solid palette(secondary);
    }
  }

  @mixin query 72rem {
    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }

  .ͼb {
    color: palette(secondary) !important;
    transition: color 0.4s ease-in-out;
  }

  .ͼ2 .cm-activeLine {
    background-color: rgba(var(--background), 1);
  }

  .cm-editor {
    & * {
      font-size: 12px;
      font-variant-ligatures: contextual;
    }
  }

  .cm-scroller {
    @mixin scrollbar row;
  }

  .cm-focused {
    outline: none !important;
  }

  .cm-gutters {
    background: palette(background, 0.5) !important;
    transition: background 0.4s ease-in-out;
    backdrop-filter: blur(5px);
  }

  .cm-activeLineGutter {
    background: palette(background, 0.5) !important;
    transition: background 0.4s ease-in-out;
  }

  .cm-content {
    min-width: 0rem !important;
  }

  .two-side .milkdown {
    max-width: unset !important;
  }

  /** code highlight */
  code[class*='language-'],
  pre[class*='language-'] {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    color: #90a4ae;
    background: #fafafa;
    font-size: 1em;
    line-height: 1.5em;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  code[class*='language-']::-moz-selection,
  pre[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection,
  pre[class*='language-'] ::-moz-selection {
    background: #cceae7;
    color: #263238;
  }

  code[class*='language-']::selection,
  pre[class*='language-']::selection,
  code[class*='language-'] ::selection,
  pre[class*='language-'] ::selection {
    background: #cceae7;
    color: #263238;
  }

  :not(pre) > code[class*='language-'] {
    white-space: normal;
    border-radius: 0.2em;
    padding: 0.1em;
  }

  pre[class*='language-'] {
    overflow: auto;
    position: relative;
    margin: 0.5em 0;
    padding: 1.25em 1em;
  }

  .language-css > code,
  .language-sass > code,
  .language-scss > code {
    color: #f76d47;
  }

  [class*='language-'] .namespace {
    opacity: 0.7;
  }

  .token.atrule {
    color: #7c4dff;
  }

  .token.attr-name {
    color: #39adb5;
  }

  .token.attr-value {
    color: #f6a434;
  }

  .token.attribute {
    color: #f6a434;
  }

  .token.boolean {
    color: #7c4dff;
  }

  .token.builtin {
    color: #39adb5;
  }

  .token.cdata {
    color: #39adb5;
  }

  .token.char {
    color: #39adb5;
  }

  .token.class {
    color: #39adb5;
  }

  .token.class-name {
    color: #6182b8;
  }

  .token.comment {
    color: #aabfc9;
  }

  .token.constant {
    color: #7c4dff;
  }

  .token.deleted {
    color: #e53935;
  }

  .token.doctype {
    color: #aabfc9;
  }

  .token.entity {
    color: #e53935;
  }

  .token.function {
    color: #7c4dff;
  }

  .token.hexcode {
    color: #f76d47;
  }

  .token.id {
    color: #7c4dff;
    font-weight: bold;
  }

  .token.important {
    color: #7c4dff;
    font-weight: bold;
  }

  .token.inserted {
    color: #39adb5;
  }

  .token.keyword {
    color: #7c4dff;
  }

  .token.number {
    color: #f76d47;
  }

  .token.operator {
    color: #39adb5;
  }

  .token.prolog {
    color: #aabfc9;
  }

  .token.property {
    color: #39adb5;
  }

  .token.pseudo-class {
    color: #f6a434;
  }

  .token.pseudo-element {
    color: #f6a434;
  }

  .token.punctuation {
    color: #39adb5;
  }

  .token.regex {
    color: #6182b8;
  }

  .token.selector {
    color: #e53935;
  }

  .token.string {
    color: #f6a434;
  }

  .token.symbol {
    color: #7c4dff;
  }

  .token.tag {
    color: #e53935;
  }

  .token.unit {
    color: #f76d47;
  }

  .token.url {
    color: #e53935;
  }

  .token.variable {
    color: #e53935;
  }

  /** Custom Configure for Leetecho */

  .ProseMirror {
    color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
    .list-item {
      ::marker {
        color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
      }
    }
  }

  .milkdown-menu {
    border: ${`1px solid ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`}!important;
    border-left: ${`1px solid ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`}!important;
    background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    .icon {
      color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK}!important;
    }
    .button {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    }
    ::-webkit-scrollbar {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER}!important;
    }
  }
  .milkdown {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif !important;
    outline: ${`3px solid ${COLOR_PALETTE.LEETECHO_WHITE}`}!important;
    .icon {
      color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
    }
    a {
      color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLUE}!important;
    }
    .blockquote {
      border-left-color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
    }
    code {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
      color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK}!important;
    }
  }
  .milkdown .editor {
    border-bottom-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    border-left-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    border-right-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    border-top-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;

    padding: 0px !important;
    max-width: unset !important;
    .icon {
      color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
    }
    a {
      color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLUE}!important;
    }
    .blockquote {
      border-left-color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
    }
    code {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
      color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK}!important;
    }
    .strong {
      color: ${COLOR_PALETTE.LEETECHO_BLACK}!important;
    }
    .code-fence {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
      margin: 0px !important;
    }
    table {
      border-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    }
    th {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    }
    hr {
      color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    }
    .heading {
      font-weight: bold;
    }
  }
`;

export default markdownEditorStyle;
