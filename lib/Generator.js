
const path = require('path')
const chalk = require('chalk')
const writeFile = require('./writeFile');
const fs = require('fs-extra');
const loading = require('./util/loading').wrapLoading;

class Generator {
    constructor(name, targetDir, language) {
        this.name = name;
        this.targetDir = targetDir;
        this.language = language;
    }

    async create() {
        return await loading(this.download.bind(this), 'Waiting to create project structure', this.language);
    }

    //生成目录结构
    async download(language) {
        const from = path.join(__dirname, '../template');
        const to = this.targetDir;
        //复制文件
        await writeFile(to, from);
        //差异化下载
        const babel = path.join(to, 'babel.config.js');
        fs.ensureFileSync(babel);
        await fs.copyFile(path.join(__dirname, `../diff/${language}.js`), babel);
        if (language === 'ts') {
            const tsconfig = path.join(to, 'tsconfig.json');
            fs.ensureFileSync(tsconfig);
            await fs.copyFile(path.join(__dirname, `../diff/tsconfig.json`), tsconfig);
            await writeFile(path.join(to,'src'),  path.join(__dirname, '../diff/src1'));
        }else{
            await writeFile(path.join(to,'src'),  path.join(__dirname, '../diff/src'));
        }
    }


}
module.exports = Generator;