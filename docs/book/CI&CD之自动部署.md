---
title: CI/CD
author: 云上舟
date: "2022-05-09"
---

[[toc]]

## 前言
在开发过程中，如果项目采用的是CI/CD模式，那么需要开发者频繁的提交代码，合并到主干分支上。并将项目打包部署到服务器上，交付给**质量团队**或者 **用户**。在通过评审之后，他们将部署到生产环境。但由于编码、构建、集成、测试、交付、部署这些机械性的操作，需要团队持续不断地重复去实行，需要人力及时间成本，因此 **自动化部署工具** 便问世了。

## 什么是CI?
  Continuous Integration(CI)----持续集成，是一个开发行为，它要求开发者每天多次将代码集成到一个共享的仓库，每次提交都会被自动构建所检查，团队可因此提前检测出问题。
  
### CI有什么特点？
- 快速发现错误。每完成一点更新，就集成到主干，可以快速发现错误，定位错误也比较容易；
- 防止分支大幅偏离主干。如果不是经常集成，主干又在不断更新，会导致以后集成的难度变大，甚至难以集成。

## 什么是CD？
1. Continuous deployment (CD)----持续部署。通过自动化部署的手段将软件功能频繁的进行交付。
2. Continuous Delivery(CD)----持续交付。指频繁地将软件的新版本，交付给质量团队或者用户，以供评审。如果评审通过，代码就进入生产阶段。

### CD有什么特点？
- 代码通过评审以后，自动部署到生产环境。
- 代码在任何时刻都是可部署的，可以进入生产阶段。

## 自动化部署工具
  自动化部署工具简单来说，就是将繁杂的步骤写在一个文件中，只要配置好 指定分支、代码环境、目标地址等信息，再配置好哪些**操作**会触发自动部署即可。

:::tip
读者可以按照个人喜好选择部署工具。
[21种常用自动化部署工具介绍](https://dzone.com/articles/21-automated-deployment-tools-you-should-know)。	
:::


## GitHub Actions介绍
  上述说明，持续集成由很多操作组成，比如拉取最新代码、运行测试、登录服务器、部署服务器等，GitHub 把这些操作统一称为 **Actions** ，并推出持续集成工具 ---- GitHub Actions。
 
## GitHub Actions 配置步骤
### 一、获取token
- 进入GitHub
- ->Settings
- ->Developer Settings
- ->Personal access tokens
- 申请`token`名字建议写成 `ACCESS_TOKEN`
- 勾选**workflow**,勾选**repo下的所有项**，以及**user下的所有项**，生成一个token,复制token值。
:::warning
注意：token在生成之后的那个页面可以看到。如果重新进入，或以后进入，则无法查看，只能通过再生成。
:::

### 二、为指定仓库授权
将上一步生成的`ACCESS_TOKEN`,设置在**指定仓库**的`Secrets`里，便能在脚本文件中使用。**目的**是为了拥有访问权限。
1. 登录GitHub
2. 点击进入需要**自动部署**的仓库
3. 在setting中找到**Secrets**
4. 点击**Secrets**子菜单下的**Actions**
5. 在页面右侧点击**New repository secret**
6. `note`名也设置为`ACCESS_TOKEN`，将`Personal access tokens`的`ACCESS_TOKEN`生成值放入。

### 三、 项目根目录创建Yml文件
:::tip
Yml是什么？
  我们集成 Github Action 的做法，就是在我们仓库的根目录下，创建一个 .github 文件夹，里面放一个 `*.yml` 文件——这个 Yml 文件就是我们配置 Github Action 所用的文件。
  它是一个非常容易地脚本语言，如果我们不会的话，也没啥大事继续往下看就成了。

参考文档：[五分钟学习 YML](https://link.zhihu.com/?target=https%3A//www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes)
:::

#### github仓库自动创建
- 进入github指定仓库页面
- 点击actions
- 选择基于项目的环境
- github会在你的项目根目录下创建.github/workflows/xxx.yml
- 点击`change`将会提交到分支上。
#### 手动创建yml
- 在项目的根目录创建`.github`目录
- 在`.github`目录下创建`workflows`目录
- 在`workflows`目录下创建需要执行的**自动部署**yml文件

## 如何配置yml文件？
在配置yml文件之前，先了解一些**基本概念**。

### 基本概念
- 一个yml文件由workflow、job、step、action四部分组成。
- workflow(工作流程)：持续集成一次运行的过程，就是一个 workflow。
- job(任务)：一个 workflow 由一个或者多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
- step(步骤)：每个 job 由多个 step 构成，一步步完成。
- action(动作)：每个 step 可以依次执行一个或者多个命令。
- 每个job的当前行首字母需要对齐, step 和 action 也是。否则会报`syntax`语法错误。

### 如何定义workflow
Workflow 的名称，Github 在存储库的 Action 页面上显示 Workflow 的名称。
如果我们省略 name，则 Github 会将其设置为相对于存储库根目录的工作流文件路径。
```yml
name: Greeting from Mona
```
### 如何定义workflow的触发器
触发 Workflow 执行的 event 名称，比如：每当我提交代码到 Github 上的时候，或者是每当我打 TAG 的时候。
```yml
// 单个事件
on: push

// 多个事件
on: [push,pull_request]
```
### 如何定义一个job?
- 每个 job 必须具有一个 id 与之关联。
- 以下的`my_first_job`和`my_second_job`就是`job_id`
- 配置的name将会显示在Github上
```yml
jobs:
  my_first_job:
    name: My first job
  my_second_job:
    name: My second job
```
### 如何定义job的依赖？job是否可以依赖于别的job的输出？
- `jobs.<job_id>.needs`
- needs可以表示job是否依赖于别的job-如果job失败，则会跳过所有需要该job的job。
```yml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```
### 如何定义 job 的运行环境?
- `job.<job_id>.runs-on`
- 指定运行job的**虚拟机系统**
- Github上可用的系统有:
		- windows-2019
		- ubuntu-20.04
		- ubuntu-18.04
		- ubuntu-16.04
		- macos-10.15
```yml
jobs:
  job1:
    runs-on: macos-10.15
  job2:
    runs-on: windows-2019
```

### 如何定义 step
1. commands: 命令行命令
2. setup tasks: 环境配置命令 （比如安装个Node环境、安装个Python环境）
3. action: 执行动作
```yml
# 定义 Workflow 的名字
name: Greeting from Mona

# 定义 Workflow 的触发器
on: push

# 定义 Workflow 的 job
jobs:
  # 定义 job 的 id
  my-job:
    # 定义 job 的 name
    name: My Job
    # 定义 job 的运行环境
    runs-on: ubuntu-latest
    # 定义 job 的运行步骤
    steps:
    # 定义 step 的名称
    - name: Print a greeting
      # 定义 step 的环境变量
      env:
        MY_VAR: Hi there! My name is
        FIRST_NAME: Mona
        MIDDLE_NAME: The
        LAST_NAME: Octocat
      # 运行指令：输出环境变量
      run: |
        echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```

:::warning
每个 step 都在自己的运行器环境中运行，并且可以访问工作空间和文件系统。因此， **step 之间不会保留对环境变量的更改**。
:::

### 如何定义action
- 每一个`-`后面跟的语句表示一个`action`
- 每一个`action`都有独立的`name`
- 每一个`action`可以多次`uses`安装各种包
```yml
steps:
  - name: 安装node
   uses: actions/setup-node@v2
  - name: Check out Git repository
   uses: actions/checkout@v2
```


### 怎么在命令行运行yml中的某一step
```yml
jobs.<job_id>.steps.run
```


## 业内常用的workflow

### 打版本标签 Create Tag Release

```yml
on:
  push:
    # Sequence of patterns matched against refs/tags
    tags:
      - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10
name: Create Release
jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@master
      - name: Create Release
        id: create_release
        uses: actions/create-release@latest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # This token is provided by Actions, you do not need to create your own token
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            Changes in this Release
            - First Change
            - Second Change
          draft: false
          prerelease: false

```

### 创建 Github Page 站点

```yml
name: github pages
    on:
      push:
        branches:
          - master # default branch
    jobs:
      deploy:
        runs-on: ubuntu-18.04
        steps:
          - uses: actions/checkout@v2
          - run: npm install
          - run: npm run docs:build
          - name: Deploy
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./docs-dist

```


### 本博客配置的push自动部署静态资源
```yml
# name 可以自定义
name: Deploy GitHub Pages

# 触发条件：在 push 到 main/master 分支后，新的 Github 项目 应该都是 main，而之前的项目一般都是 master
on:
  push:
    branches:
      - master

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：18.04版 Ubuntu
    runs-on: ubuntu-18.04
    steps:
      # 载入node环境
      - name: load node
        uses: actions/setup-node@v1
        with:
          node-version: "14.x"
           
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      
      # 生成静态文件
      - name: Build
        run: npm install && npm run build

      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }} # 也就是我们刚才生成的 secret
          BRANCH: gh-pages # 部署到 gh-pages 分支，因为 main 分支存放的一般是源码，而 gh-pages 分支则用来存放生成的静态文件
          FOLDER: docs/.vuepress/dist # vuepress 生成的静态文件存放的地方

```

### 多人协作开发，云端代码检测

```yml
name: Test
    
    on: [push, pull_request]
    
    jobs:
      lint:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v1
          with:
            node-version: '12.x'
    
        - name: Install dependencies
          uses: bahmutov/npm-install@v1
    
        - name: Run linter
          run: npm run lint
    
      test:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v1
          with:
            node-version: '12.x'
    
        - name: Install dependencies
          uses: bahmutov/npm-install@v1
    
        - name: Run test
          run: npm test
    
      build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v1
          with:
            node-version: '12.x'
    
        - name: Install dependencies
          uses: bahmutov/npm-install@v1
    
        - name: Build
          run: npm run build

```



## 总结
1. CI/CD是一种项目开发模式，它持续地将各分支集成到主干。再持续部署到服务器上，交付给质量团队或用户。
2. 自动化部署工具的出现，节省了团队的时间精力，它将编码、构建、集成、测试、交付、部署等一系列操作都**自动化**。
3. Github Actions 就是一款自动化部署工具。只要在项目根目录创建`.github/workflows/xxx.yml`，在yml配置流程。即可在特定操作（比如push）中触发。完成一系列**自动化**操作。

## 参考文章
1. [GitHub Actions的使用@知乎](https://zhuanlan.zhihu.com/p/164744104)
2. [手把手教会GitHub Actions@掘金](https://juejin.cn/post/6950799922178310152#heading-1)
3. [五分钟学习 YAML](https://link.zhihu.com/?target=https%3A//www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes)