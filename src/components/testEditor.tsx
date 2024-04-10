// PDFViewer.js
import React, { useEffect } from 'react';
import { PDFPageProxy } from 'pdfjs-dist';
import * as pdfjs from 'pdfjs-dist';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  useEffect(() => {
    const renderPdf = async () => {
      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page: PDFPageProxy | null = await pdf.getPage(pageNumber);

        if (page) {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas: HTMLCanvasElement | null = document.createElement('canvas');
          const context = canvas?.getContext('2d');

          if (canvas && context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport,
            };

            await page.render(renderContext).promise;

            document.body.appendChild(canvas);
          }
        }
      }
    };

    renderPdf();
  }, [pdfUrl]);

  return <div id="pdfViewer" />;
};

export default PDFViewer;
