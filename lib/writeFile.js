const fs = require('fs-extra');
const {
    resolve
} = require('path');
const path = require('path')
/**
 * @param { copiedPath: String } (被复制文件的地址，相对地址)
 * @param { resultPath: String } (放置复制文件的地址，相对地址)
 */

module.exports = async function copyFile(copiedPath, resultPath) {
    let res = await fs.promises.readdir(resultPath)
        .then((files) => {
            return new Promise((res, rej) => {
                let pros = [];
                for (let i = 0; i < files.length; i++) {
                    let file=files[i];
                    pros.push(new Promise( async (resolve) => {
                        const to = path.join(copiedPath, file),
                            from = path.join(resultPath, file);
                        if (fs.statSync(from).isDirectory()) {
                            fs.ensureDirSync(to);
                            await copyFile(to, from);
                        } else {
                            fs.writeFileSync(to, fs.readFileSync(from))
                        }
                            resolve();
                    }));
                }
                Promise.all(pros).then(()=>{
                    res();
                })
            })
        })
        .catch((err) => {
            console.log(err);
        });

    return res;
}