#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');
const rimraf = require('rimraf');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    req.on('error', () => {
      resolve(false);
    });

    req.setTimeout(5000, () => {
      req.abort();
      resolve(false);
    });
  });
}

async function main() {
  let projectName;
  while (!projectName) {
    projectName = await askQuestion('请输入项目名称 (Enter project name): ');
    if (!projectName) {
      console.log('项目名称不能为空，请重新输入。 (Project name cannot be empty. Please re-enter.)');
    }
  }

  let projectDescription = await askQuestion('请输入项目简介 (Enter project description): ');
  if (!projectDescription) {
    projectDescription = 'A new project created with fire-cat.';
  }

  rl.close();

  const githubUrl = 'https://github.com/firecatjs/fire-cat-started.git';
  const giteeUrl = 'https://gitee.com/firecat-team/fire-cat-started.git';

  const isGithubAccessible = await checkUrl(githubUrl.replace(/\.git$/, ''));
  const repoUrl = isGithubAccessible ? githubUrl : giteeUrl;

  // console.log(`使用仓库地址: ${repoUrl} (Using repository: ${repoUrl})`);

  try {
    // 克隆模板项目
    execSync(`git clone ${repoUrl} ${projectName}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('克隆仓库失败 (Failed to clone repository):', error.message);
    return;
  }

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
  console.log(`\n`);
  console.log(`cd ${projectName}`);
  console.log('npm install');
  console.log('npm run dev');
}

main().catch(err => {
  console.error(err);
  rl.close();
});
