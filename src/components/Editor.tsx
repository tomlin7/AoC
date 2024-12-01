import Editor from "@monaco-editor/react";
import { gruvboxTheme } from "../theme/monacoTheme";

interface MonacooEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

export function MonacoEditor({ code, onChange }: MonacooEditorProps) {
  const beforeMount = (monaco: any) => {
    monaco.editor.defineTheme("gruvbox", gruvboxTheme);
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="gruvbox"
      value={code}
      onChange={onChange}
      beforeMount={beforeMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        automaticLayout: true,
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        padding: { top: 16, bottom: 16 },
      }}
    />
  );
}
