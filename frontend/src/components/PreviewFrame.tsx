import { WebContainer } from '@webcontainer/api';
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Eye } from 'lucide-react';
import { PreviewFrameProps } from '../types/bolt';

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState("");

  async function main() {
    const installProcess = await webContainer.spawn('npm', ['install']);

    installProcess.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));

    await webContainer.spawn('npm', ['run', 'dev']);

    webContainer.on('server-ready', (port, url) => {
      console.log(url)
      console.log(port)
      setUrl(url);
    });
  }

  useEffect(() => {
    main()
  }, [])

  if (!url) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-6 bg-black/50 backdrop-blur-sm rounded-xl border border-gray-800/50">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
          <div className="relative bg-black rounded-full p-4">
            <Eye className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-gray-300 font-medium">Setting up preview...</p>
          <p className="text-sm text-gray-400">This might take a few moments</p>
        </div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl overflow-hidden border border-gray-800/50 bg-black/50 backdrop-blur-sm">
      <iframe 
        width="100%" 
        height="100%" 
        src={url}
        className="bg-white"
      />
    </div>
  );
}