#!/usr/bin/env node
//判断环境
const currentNodeVersion = process.versions.node;
const eng = currentNodeVersion.split('.');
const major = eng[0];
const packageJson = require('../package.json');

if (major < 14) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      `${packageJson.name} requires Node 14 or higher. \n` +
      'Please update your version of Node.'
  );
  process.exit(1);
}

// const program=require('commander');
const { program } = require('commander');
const chalk=require('chalk');
const figlet=require('figlet');
const { execSync } = require('child_process');
const semver = require('semver');
const spawn = require('cross-spawn');
const  https= require('https');
//命令行
let projectName;
program.command('create <app-name>')
.description('create a new Nodom project')
.option('-f, --force','overwrite target directory if it exist')
.action((name,options) =>{
  checkVersion()
  .catch(()=>{
    try {
      return execSync(`npm view ${projectName.name} version`).toString().trim();
    } catch (error) {
      return null;
    }
  })
  .then(latest=>{
    if(latest&&semver.lt(packageJson.version,latest)){
      console.log();
      console.error(
        chalk.yellow(
          `You are running \`${packageJson.name}\` ${packageJson.version}, which is behind the latest release (${latest}).\n\n` 
        )
      );
      console.log();
      console.log(
        'Please remove any global installs with one of the following commands:\n' +
          `- npm uninstall -g ${packageJson.name}\n` 
        
      );
      console.log();
    }
    //创建
    require('../lib/create')(name,options);
  })
})
//设置版本号
program.version(`v${packageJson.version}`)
.name('nodom')
.usage(`${chalk.green(`<command> [option]`)}`)



  // 监听 --help 执行
  program.on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('Nodom', {
        font: "Big",
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      }));

    // 新增说明信息
    console.log(`\r\n执行 ${chalk.cyan(`nodom <command> --help`)} 查看可使用命令细节\r\n`)
  })


program.parse(process.argv);

/**
 * 
 * @returns 检查版本
 */
function checkVersion(){
  return new Promise((resolve,reject)=>{
    require('https').get(`https://registry.npmjs.org/-/package/${packageJson.name}/dist-tags`,
    res=>{
      if(res.statusCode === 200){
        let body='';
        res.on('data',data=>{
          body+=data;
        });
        res.on('end',()=>{
          resolve(JSON.parse(body).latest);
        })
      }else{
        reject();
      }
    })
    .on('error',()=>{
      reject()
    })
  })
}