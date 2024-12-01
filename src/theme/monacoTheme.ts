import { colors } from './colors';

export const gruvboxTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: colors.fg1.slice(1) },
    { token: 'comment', foreground: colors.gray.slice(1), fontStyle: 'italic' },
    { token: 'keyword', foreground: colors.red.slice(1) },
    { token: 'string', foreground: colors.green.slice(1) },
    { token: 'number', foreground: colors.purple.slice(1) },
    { token: 'regexp', foreground: colors.purple.slice(1) },
    { token: 'type', foreground: colors.yellow.slice(1) },
    { token: 'function', foreground: colors.blue.slice(1) },
    { token: 'variable', foreground: colors.fg1.slice(1) },
    { token: 'constant', foreground: colors.purple.slice(1) },
    { token: 'parameter', foreground: colors.orange.slice(1) },
  ],
  colors: {
    'editor.background': colors.bg0,
    'editor.foreground': colors.fg1,
    'editor.lineHighlightBackground': colors.bg1,
    'editor.selectionBackground': colors.bg2,
    'editor.inactiveSelectionBackground': colors.bg1,
    'editorCursor.foreground': colors.fg0,
    'editorWhitespace.foreground': colors.bg2,
    'editorLineNumber.foreground': colors.bg4,
    'editorLineNumber.activeForeground': colors.yellow,
    'editor.selectionHighlightBackground': colors.bg2,
    'editorIndentGuide.background': colors.bg2,
    'editorIndentGuide.activeBackground': colors.bg3,
  },
};