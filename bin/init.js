#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rimraf = require('rimraf');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  const projectName = await askQuestion('请输入项目名称 (Enter project name): ');
  const projectDescription = await askQuestion('请输入项目简介 (Enter project description): ');

  rl.close();

  // 克隆模板项目
  execSync(`git clone https://github.com/firecatjs/fire-cat-started.git ${projectName}`, { stdio: 'inherit' });

  const projectPath = path.join(process.cwd(), projectName);

  // 删除 .git 文件夹
  rimraf.sync(path.join(projectPath, '.git'));

  const packageJsonPath = path.join(projectPath, 'package.json');

  // 读取 package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // 修改 package.json 中的 name 和 description
  packageJson.name = projectName;
  packageJson.description = projectDescription;

  // 写回 package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('项目创建成功！ (Project created successfully!)');
  console.log(`cd ${projectName}`);
  console.log('npm install');
  console.log('npm run dev');
}

main().catch(err => {
  console.error(err);
  rl.close();
});