const bodyParser = require("body-parser")
const express = require("express")
const cors = require('cors');
const app = express()

const compiler = require("compilex")
const options = { stats: true }
app.use(bodyParser.json())
app.use(cors());
compiler.init(options)
app.get('/delete', function(req, res){
    compiler.flush(function(){
        console.log('deleted');
    })
    res.send('files deleted')
})

app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    var envData = { OS: "linux" };
    try {

        if (lang == "Python") {
            if (!input) {
                var envData = { OS: "linux" };
                compiler.compilePython(envData, code, function (data) {
                    if (data) {
                        res.send(data)
                    } else {
                        res.send({ output: "error" })
                    };
                });
            } else {
                var envData = { OS: "linux" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data) {
                        res.send(data)
                    } else {
                        res.send({ output: "error" })
                    };
                });
            }
        }
    } catch (e) {
        console.log("Error: ", e);
    }
})
app.listen(5000, () => {
    console.log('Server started on port 5000');
});