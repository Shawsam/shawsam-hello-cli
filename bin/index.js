#!/usr/bin/env node

let fs = require("fs"), //文件模块
    path = process.cwd(), //路径
    shell = require("shelljs"); //用于执行shell命令的模块

let run = function(obj) {
    if (obj[0] === '-v') {
        console.log('version is 1.0.0');
    } else if (obj[0] === '-h') {
        console.log('Useage:');
        console.log('  -v --version [show version]');
    } else if (obj[0] === 'init') {
        shell.echo('初始化项目...');
        shell.rm('-rf', 'src')
        if (shell.exec('git clone https://github.com/Shawsam/TodoList.git src --quiet --progress').code !== 0){
            shell.echo('Error: 初始化失败');
            shell.exit(1);
        }else{
            shell.echo('初始化成功！');
        }
    } else {
        fs.readdir(path, function(err, files) {
            if (err) {
                return console.log(err);
            }
            for (let i = 0; i < files.length; i += 1) {
                console.log(files[i]);
            }
        });
    }
};
//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2));