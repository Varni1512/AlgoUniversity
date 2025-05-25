const express = require("express");
const {generateFile} = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.get("/", (req,res) => {
    res.json({message: "Online Compiler"});
});

//online compiler
app.post("/run", async (req,res) => {
    const {language='cpp',code} = req.body;

    if(code === undefined){
        return res.status(400).json({success:false, error:"code is required"});
    }
    try {
        const filepath = generateFile(language,code);
        const output = await executeCpp(filepath);
        res.json({filepath, output});
    } catch (error) {
        console.error("Error is running code", error.message);
        return res.status(500).json({success:false, error: error.message});
    }
    
});

app.listen(8000, () => {
    console.log("Server is running on port 8000")
})