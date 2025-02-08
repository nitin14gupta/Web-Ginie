import { ParsedFile } from '@/types/bolt';

interface CompilationResult {
  html: string;
  css: string;
  js: string;
  errors: string[];
}

export class CompilerService {
  static async compile(files: ParsedFile[]): Promise<CompilationResult> {
    const errors: string[] = [];
    const compiledFiles = {
      html: '',
      css: '',
      js: '',
    };

    try {
      // Process HTML files
      const htmlFiles = files.filter(f => f.path.endsWith('.html'));
      if (htmlFiles.length > 0) {
        compiledFiles.html = htmlFiles[0].content;
      }

      // Process CSS files
      const cssFiles = files.filter(f => f.path.endsWith('.css'));
      compiledFiles.css = cssFiles.map(f => f.content).join('\n');

      // Process JavaScript/TypeScript files
      const jsFiles = files.filter(f => 
        f.path.endsWith('.js') || 
        f.path.endsWith('.jsx') || 
        f.path.endsWith('.ts') || 
        f.path.endsWith('.tsx')
      );

      // Basic TypeScript transpilation (you can add more sophisticated transpilation)
      const jsContent = jsFiles.map(f => {
        if (f.path.endsWith('.tsx') || f.path.endsWith('.jsx')) {
          // Remove JSX syntax for preview
          return f.content
            .replace(/import.*from.*[\n;]/g, '')
            .replace(/export\s+default\s+/g, '')
            .replace(/<>/g, '<React.Fragment>')
            .replace(/<\/>/g, '</React.Fragment>')
            .replace(/className=/g, 'class=');
        }
        return f.content;
      }).join('\n');

      compiledFiles.js = `
        try {
          ${jsContent}
        } catch (error) {
          console.error('Runtime error:', error);
        }
      `;

    } catch (error) {
      errors.push(`Compilation error: ${error instanceof Error ? error.message : String(error)}`);
    }

    return {
      ...compiledFiles,
      errors,
    };
  }

  static generatePreview(compilation: CompilationResult): string {
    const { html, css, js, errors } = compilation;

    // Create a basic HTML structure if none provided
    const defaultHtml = html || `
      <div id="root"></div>
      <div id="error-display"></div>
    `;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <style>
            /* Reset and base styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: system-ui, sans-serif; }
            #error-display { 
              position: fixed; 
              bottom: 0; 
              left: 0; 
              right: 0;
              padding: 1rem;
              background: #fee2e2;
              color: #dc2626;
              font-family: monospace;
              white-space: pre-wrap;
              display: none;
            }
            /* User styles */
            ${css}
          </style>
        </head>
        <body>
          ${defaultHtml}
          <script>
            // Error handling
            window.onerror = function(msg, url, line, col, error) {
              const errorDisplay = document.getElementById('error-display');
              errorDisplay.style.display = 'block';
              errorDisplay.textContent = \`Runtime Error: \${msg}\nLine: \${line}\nColumn: \${col}\`;
              return false;
            };

            // Console override for parent communication
            const originalConsole = { ...console };
            ['log', 'error', 'warn', 'info'].forEach(method => {
              console[method] = (...args) => {
                originalConsole[method](...args);
                window.parent.postMessage({
                  type: 'console',
                  method,
                  args: args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                  )
                }, '*');
              };
            });

            // Display compilation errors
            ${errors.length > 0 ? `
              const errorDisplay = document.getElementById('error-display');
              errorDisplay.style.display = 'block';
              errorDisplay.textContent = ${JSON.stringify(errors.join('\\n'))};
            ` : ''}

            // User code
            ${js}
          </script>
        </body>
      </html>
    `;
  }
} 