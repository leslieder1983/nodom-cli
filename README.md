# nodom-cli

## 介绍
nodom的脚手架工具，使用一条命令即可搭建Nodom单页应用。  
nodom-cli预制了两种开发语言的支持：
* JavaScript
* TypeScript  

用户可自由选择语言环境。
## 使用
你需要确保你的本地Node版本>=14。  
可以使用下列方式新建你的Nodom应用:
### npm
首先需要全局安装nodom-cli
```js
npm install nodom-cli -g
```
待安装完成后,在目标路径下的命令行窗口内执行下列命令
```js
nodom create <app-name>
```



> app-name为项目名称  

随后依据提示完成新建流程即可。

如需提升依赖下载速度，可以设置淘宝镜像源：

```js
npm config set registry http://registry.npm.taobao.org/
```
### npx
如果支持npx,可以不安装`nodom-cli`,直接执行：  
```js
npx nodom-cli create <app-name>
```
## 开始
工具的使用方式为：
```
nodom <command> [option]
```
> <>表示为必填项， []表示为可选项  

可使用下列命令，来查看工具的使用方式、可用命令、可配置项。
```js
nodom
nodom -h
nodom --help
```
单条命令也可使用追加配置`-h`或`--help`来查看命令详情。  
如需查看当前nodom-cli的版本，执行`-V`命令：
```js
nodom -V
```

### nodom create
该命令用于创建Nodom项目。  
当目标路径已存在文件夹时，可配置`-f`或`--force`来强制覆盖目标文件夹。
```js
nodom create <app-name> -f
```

### nodom help
该命令来查看所选命令的详情。
```js
nodom help [command]
//command为命令名称
```

### 项目运行
nodom-cli提供了自动下载npm依赖的功能，如需手动下载依赖。在项目根路径下执行：
```js
npm i
```
### npm run serve
该命令提供了`webpack-dev-serve`的功能,适合开发环境，可用于快速开发应用程序。
在项目根目录下运行命令：
```js
npm run serve
```
即可启动服务,开发时只需保存代码，浏览器会自动刷新。
### npm run build
该命令会将项目打包，适合生成环境。用于项目部署时的打包。
在根目录下运行命令：
```js
npm run build
```
会将项目打包至`/dist`文件夹下，如果是前后端分离项目，将其拷贝至静态资源路径即可部署项目。
## 开发说明
nodom-cli内置了基本的开发支持，如需添加功能或修改，请手动修改`webpack.config.js`的配置。
### 图片资源
由于无法解析，字符串内的路径资源 
如需在模板代码内引用资源，可使用下列方式：  
由于静态资源会被拷贝至dist文件夹下，将资源放至`/public`内，模板代码内的路径引用对应的绝对路径即可成功。  
资源所处路径:
```js
/public/logo.png
```
模板内路径写法：
```html
<img id='logo'  src='public/logo.png' />
```