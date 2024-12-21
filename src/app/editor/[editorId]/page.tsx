"use client"
import { useEffect, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { lineNumbers } from "@codemirror/view";
import { autocompletion } from "@codemirror/autocomplete";
import { foldGutter } from "@codemirror/fold"
import { autoCloseTags } from "@codemirror/lang-javascript";
import { defaultHighlightStyle } from "@codemirror/highlight"



const Editor = () => {  
    const editorRef = useRef<any>(null);

    useEffect(() => {
        const startState = EditorState.create({
            doc: "Hello there !!", 
            extensions: [
                basicSetup, 
                javascript(),
                keymap.of([...defaultKeymap, indentWithTab]),  
                oneDark,  
                lineNumbers(),
                autocompletion(),
                defaultHighlightStyle.fallback
            ]
        });

        const view = new EditorView({
            state: startState,
            parent: editorRef.current 
        });

        return () => {
            view.destroy();  
        };
    }, []);

    return <div ref={editorRef}></div>;
};

export default Editor;
