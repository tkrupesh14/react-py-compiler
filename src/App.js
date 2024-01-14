import './App.css';
import React,{useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
// import { html } from '@codemirror/lang-html';

import { monokai } from '@uiw/codemirror-theme-monokai';
import { python } from '@codemirror/lang-python';



function App() {
  const [value, setValue] = React.useState("print('hello world')");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = useState();
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  const runCode = async () => {
    console.log("momo************************");
    let codeObj = {
        code: value,
        input: input,
        lang: "Python"
    };

    try {
        var oData = await fetch('http://localhost:5000/compile', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(codeObj)
        });

        var responseData = await oData.json();
        const newOutput = responseData.output;

        // Set the output to the state variable
        setOutput(newOutput);
        console.log(output);
    } catch (error) {
        console.error("Error:", error);
    }
};


// Call the function

  

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 mt-3 " >
            <button className="btn btn-success" onClick={runCode} style={{ display: 'block', marginLeft: 'auto', marginRight: '0' }} >Run</button>
            <CodeMirror theme={monokai} value={value} height="33rem" extensions={[python({ jsx: true })]} onChange={onChange} style={{ textAlign: 'left' }} className="form-control mt-2" id='code' />

          </div>
          <div className="col-md-4 mt-5">
            <div className="form-group">
              <lable className="form-label">Input</lable>
              <textarea name="" id="input" cols="30"onChange={(e)=> setInput(e.target.value)} rows="10" className="form-control" style={{ background: '#c2c2c2' }} value={input}></textarea>
              <lable className="form-label mt-3">Output</lable>
              <textarea name="" id="output" value={output} cols="30" rows="10" className="form-control bg-dark text-white " readOnly></textarea>
            </div>
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
