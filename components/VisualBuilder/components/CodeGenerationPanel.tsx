import { useCodeGenerator } from '@/lib/code-generation';

export function CodeGenerationPanel({ components }: { components: ComponentInstance[] }) {
  const {
    framework,
    setFramework,
    generatedCode,
    copyToClipboard,
    downloadFile
  } = useCodeGenerator(components);

  return (
    <div className="code-generation-panel">
      <div className="framework-selector">
        <select value={framework} onChange={(e) => setFramework(e.target.value)}>
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="html">HTML</option>
          <option value="svelte">Svelte</option>
        </select>
      </div>

      {generatedCode && (
        <div className="code-output">
          <pre><code>{generatedCode.code}</code></pre>
          <div className="code-actions">
            <button onClick={copyToClipboard}>Copy</button>
            <button onClick={downloadFile}>Download</button>
          </div>
        </div>
      )}
    </div>
  );
}