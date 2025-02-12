import Constants from "@/data/Constants";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";

interface CodeEditorProps {
  codeResp: string;
  isReady: boolean;
}

function CodeEditor({ codeResp, isReady }: CodeEditorProps) {
  return (
    <div>
      {isReady ? (
        <Sandpack
          theme={nightOwl}
          template="react"
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showTabs: true,
            editorHeight: 600,
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          files={{
            "/App.js": {
              code: `${codeResp}`, // Säkerställ att koden här är korrekt och förväntad
            },
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          theme={nightOwl}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          files={{
            "/App.js": {
              code: `${codeResp}`,
              active: true,
            },
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: "600px" }} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
}

export default CodeEditor;
