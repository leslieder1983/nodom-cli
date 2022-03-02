const path = require('path')

// fs-extra 是对 fs 模块的扩展，支持 promise 语法
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./Generator')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const package = require('./util/default');
const ora = require('ora');
module.exports = async function (name, option) {
    const root = path.resolve(name);
    const appName = path.basename(root);

    //当前命令行选择的目录
    const cwd = process.cwd();
    //需要创建的目录地址
    const targetAir = path.join(cwd, name);

    if (fs.existsSync(targetAir)) {
        if (option.force) {
            console.log(`\r\n${chalk.yellow('Removing...')}`);
            await fs.remove(targetAir);
            console.log(`\r\n${chalk.green('Removed successfully')}`);
        } else {
            //Todo:询问用户是否确定覆盖
            let {
                action
            } = await inquirer.prompt([{
                name: 'action',
                type: 'list',
                message: `${chalk.yellow('Target directory already exists, Pick an action:')}`,
                choices: [{
                    name: 'Overwrite',
                    value: 'overwrite'
                }, {
                    name: 'Cancel',
                    value: false
                }]
            }])
            if (!action) {
                return;
            } else if (action === 'overwrite') {
                // 移除已存在的目录
                console.log(`\r\n${chalk.yellow('Removing...')}`);
                await fs.remove(targetAir);
                console.log(`\r\n${chalk.green('Removed successfully')}`);
            }
        }
    }
    //Todo ejs模板引擎渲染
    fs.ensureDirSync(name);
    //选择语言
    const {
        language
    } = await inquirer.prompt([{
        name: 'language',
        type: 'list',
        message: 'Choosing a programming language',
        choices: [{
            name: 'JavaScript',
            value: 'js'
        }, {
            name: 'TypeScript',
            value: 'ts'
        }],
    }]);
    if (!language) {
        return;
    }
    console.log(`\r\nCreating a new Nodom app in ${chalk.green(root)}.`);
    console.log();
    //package.json
    const packageJson = {
        name: appName,
        version: '0.1.0',
        private: true,
        scripts: package.scripts,
        dependencies: package.dependencies,
        devDependencies: language === 'js' ? package.js : package.ts
    };
    fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );
    process.chdir(root);

    // 创建项目
    const generator = new Generator(name, targetAir, language);

    // 开始创建项目
    await generator.create();
    const {
        dependence
    } = await inquirer.prompt([{
        name: 'dependence',
        type: 'confirm',
        message: 'Nodom-cli automatic download dependency?',
    }]);

    if (dependence) {
        console.log(`\r\n${chalk.magenta('Waiting to download NPM dependency,It may take some time...')}`);
        await install();
        console.log(`\r\n${chalk.green('NPM dependency download completed!')}`);
    }
    console.log(`\r\nSuccessfully created project ${chalk.cyan(appName)}`);
    console.log(`\r\n  cd ${chalk.cyan(appName)}`);
    console.log(`  ${chalk.cyan('npm run dev')}\r\n`);
}

async function install() {
    try {
        return new Promise((resolve, reject) => {
            let command = 'npm',
                args = ['install']

            const child = spawn(command, args, {
                stdio: 'inherit'
            })
            child.on('close', code => {
                if (code !== 0) {
                    reject({
                        command: `${command} ${args.join(' ')}`,
                    })
                    return;
                }
                resolve()
            })
        })
    } catch (rej) {
        console.log(rej)
    }
}