
const ora = require('ora');
// 添加加载动画
async function wrapLoading(fn, message, ...args) {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message,{
        prefixText:'',
        text:''
    });
    // 开始加载动画
    spinner.start();
    try {
        // 执行传入方法 fn
        await fn(...args);
        // 状态为修改为成功
        spinner.succeed();
        return Promise.resolve();
    } catch (error) {
        // 状态为修改为失败
        spinner.fail('Request failed, refetch ...');
        console.error(error);
    }
}
module.exports={
    wrapLoading
}