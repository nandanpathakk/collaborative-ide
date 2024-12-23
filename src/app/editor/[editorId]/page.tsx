"use client"
import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { lineNumbers } from "@codemirror/view";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { bracketMatching, foldGutter, foldKeymap } from "@codemirror/language";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { lintKeymap } from "@codemirror/lint";
import { history, historyKeymap } from "@codemirror/commands";
import { closeBrackets } from "@codemirror/autocomplete";

const customTheme = EditorView.theme({
  '&': {
    backgroundColor: '#282c34',
    height: '100vh',
    width: '100vw',
  },
  '.cm-content': {
    color: '#abb2bf',
    height: '100%',
    minHeight: '100%',
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '10px 0',
  },
  '.cm-cursor': {
    borderLeftColor: '#528bff',
  },
  '.cm-gutters': {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    border: 'none',
    paddingRight: '8px',
  },
  '.cm-activeLine': {
    backgroundColor: '#2c313a',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#2c313a',
  },
  '.cm-selectionMatch': {
    backgroundColor: '#3E4451',
  },
  '.cm-matchingBracket': {
    backgroundColor: '#515a6b',
    color: '#c5c8c6 !important',
  },
  '.cm-foldPlaceholder': {
    backgroundColor: '#2c313a',
    color: '#abb2bf',
    border: 'none',
  },
  '.cm-tooltip': {
    backgroundColor: '#282c34',
    border: '1px solid #181a1f',
    color: '#abb2bf',
  },
  '.cm-tooltip.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: '#2c313a',
      color: '#abb2bf',
    },
  },
});

const highlighting = HighlightStyle.define([
  { tag: tags.keyword, color: "#c678dd" },
  { tag: tags.comment, color: "#98c379", fontStyle: "italic" },
  { tag: tags.string, color: "#98c379" },
  { tag: tags.function(tags.variableName), color: "#61afef" },
  { tag: tags.number, color: "#d19a66" },
  { tag: tags.operator, color: "#56b6c2" },
  { tag: tags.className, color: "#e5c07b" },
  { tag: tags.definition(tags.variableName), color: "#e06c75" },
  { tag: tags.propertyName, color: "#61afef" },
  { tag: tags.typeName, color: "#e5c07b" },
  { tag: tags.bracket, color: "#abb2bf" },
  { tag: tags.meta, color: "#abb2bf" },
]);

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: '// Welcome to the enhanced editor!\n// Features:\n// - Autocompletion (Ctrl+Space)\n// - Code folding (Click gutter arrows)\n// - Search (Ctrl+F)\n// - Bracket matching and auto-closing\n// - Line numbers\n// - History (Undo/Redo)\n\nfunction example() {\n  const greeting = "Hello, world!";\n  console.log(greeting);\n  \n  // Try typing "console." to see autocompletion\n  // Try typing "(" or "{" to see bracket autocompletion\n  \n  const numbers = [1, 2, 3, 4, 5];\n  const doubled = numbers.map(num => {\n    return num * 2;\n  });\n  \n  return doubled;\n}',
      extensions: [
        // Basic editor setup
        lineNumbers(),
        history(),
        EditorView.lineWrapping,
        
        // Bracket handling
        bracketMatching(),
        closeBrackets(),
        highlightSelectionMatches(),
        
        // Language support
        javascript(),
        customTheme,
        syntaxHighlighting(highlighting),
        
        // Autocompletion
        autocompletion(),
        
        // Code folding
        foldGutter(),
        
        // Keymaps
        keymap.of([
          ...defaultKeymap,
          ...completionKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...searchKeymap,
        //   ...lintKeymap,
          indentWithTab,
        ]),
        
        // Editor update listener
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            update.view.requestMeasure();
          }
        }),
      ]
    });

    const view = new EditorView({
      state,
      parent: editorRef.current
    });

    return () => view.destroy();
  }, []);

  return (
    <div 
      ref={editorRef} 
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
};

export default Editor;