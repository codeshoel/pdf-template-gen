import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@pdfme/ui';
import { Font } from '@pdfme/common';
import { 
    getFontsData, 
    getTemplate, 
    handleLoadTemplate, 
    generatePDF, 
    getPlugins, 
    isJsonString
 } from './helper';
// import '@pdfme/ui/dist/index.css';

const PdfEditor = () => {
    const uiRef = useRef(null);
    const ui = useRef(null);
  
    const [mode, setMode] = useState('form');
  
    const buildUi = () => {
      const template = getTemplate();
      let inputs = template.sampledata ?? [{}];
  
      // Your other initialization logic (similar to the buildUi function in your existing code)
  
      getFontsData().then((font) => {
        console.log(font)
        if (uiRef.current) {
          ui.current = new Form({
            domContainer: uiRef.current,
            template,
            inputs,
            // options: {
            //     font,
            //     // Other options
            //   },
            plugins: getPlugins(),
          });
        }
      });
    };
  
    useEffect(() => {
      buildUi();
    }, []);
  
    // Your other event handlers (similar to your existing code)
  
    return (
      <div>
        <div ref={uiRef} style={{ width: '100%', height: '600px' }} />
        {/* Add UI controls or buttons for additional functionalities */}


        <h1>Hello world...!</h1>

      </div>
    );
  };
  
  export default PdfEditor;
  
