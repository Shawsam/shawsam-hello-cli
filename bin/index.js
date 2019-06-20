#!/usr/bin/env node

const program = require('commander');   //参数解析
const inquirer = require('inquirer');   //命令行询问交互
const shell = require("shelljs");       //执行shell命令的模块
const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const cwdpath = process.cwd();

program
    .version('1.0.2', '-v, --version')
    .command('init [name]')
    .description('项目初始化')
    .option('--debug','开启debug')
    .action((projectName,option) => {
    	console.log('');
    	console.log(chalk.red('TALK IS CHEAP, SHOW ME THE CODE.'));
    	console.log('');

    	let config, prompts = [];
    	config = _.assign({projectName},{debug:false},option)
        if(!config.projectName) {
              prompts.push({
                type: 'input',
                name: 'projectName',
                message: '请输入项目名',
                validate: function (input){
                    if(!input) {
                        return '项目名不能为空';
                    }else{
                    	const dir = path.resolve(cwdpath,input);
                        try{
                            const files = fs.readdirSync(dir);
                            if(files.length){
                                return '项目名重复';
                            }else{
                                return true;
                            }
                        }catch(err){
                            return true;
                        }
                    }
                    
                }
              })
        }
        
        if(!config.debug) {
              prompts.push({
                type: 'confirm',
                name: 'debug',
                message: '是否开启调试模式?'
              })
        }

        inquirer.prompt(prompts).then(function ({ projectName,debug }) {
            console.log('')
        	shell.echo('初始化...');
	        if (shell.exec(`git clone https://github.com/Shawsam/TodoList.git  ${projectName} --quiet --progress`).code !== 0){
	            shell.echo('Error: 初始化失败');
	            shell.exit(1);
	        }else{
	            shell.echo('初始化成功！');
	        }
        })
    }) 
    .on('--help', function() {
    	console.log('')
        console.log('Examples:')
        console.log('  $ shawsam-hello init')             //直接初始化  
        console.log('  $ shawsam-hello init projectName') //带项目名初始化
        console.log('  $ shawsam-hello init projectName --debug') //带项目名初始化并开启debug模式
    })

program.parse(process.argv)
