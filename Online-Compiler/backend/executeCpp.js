const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { error } = require("console");
const { stdout, stderr } = require("process");

const outputPath = path.join(__dirname,"outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}


const executeCpp = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputPath,output_filename);
    
    return new Promise((resolve,reject) => {
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${output_filename}`, (error,stdout,stderr) => {
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject({stderr});
            }
            if(stdout){
                resolve(stdout);
            }
        })
    });
}


module.exports = {
    executeCpp
};