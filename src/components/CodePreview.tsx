
import { useEffect, useRef } from "react";

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
      }
    }
  }, [code]);
  
  return (
    <div className="w-full h-[600px] bg-white border-t border-gray-200">
      <div className="flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-sm text-gray-500">Предварительный просмотр</div>
      </div>
      <iframe 
        ref={iframeRef}
        title="preview" 
        className="w-full h-[558px] border-none" 
        sandbox="allow-same-origin"
      />
    </div>
  );
};

export default CodePreview;
