---
title: Frida编译与魔改
tags: Frida
permalink: /post/frida-hide.html
date: 2025-11-30 23:56:11
---
# Frida编译与魔改

> 总觉得魔改个Frida方便些，网上说16版本稳定一些，但是我pixel6老是死机o(╥﹏╥)o
>
> 没办法，所以此次使用的Frida版本为17.4.0，ubuntu版本为24.04.02
>
> 如果有网络部分出现问题可以试试神奇的"魔法"

## 一、编译环境安装及测试

### 安装基础依赖

```bash
sudo apt install build-essential git python3-pip lib32stdc++-9-dev libc6-dev-i386 curl unzip
```

- `build-essential`: 包含 C/C++ 编译器 (gcc/g++) 和 `make` 等基础开发工具。

- `git`: 版本控制工具，用于从 GitHub 下载源码。

- `python3-pip`: Python 的包管理器，用于安装后续的 Python 依赖。

- `lib32stdc++-9-dev` & `libc6-dev-i386`: 32 位 C++ 标准库和 C 库的开发文件，交叉编译 32 位架构。（需要编译32位可以安装）

- `curl` & `unzip`: 用于下载和解压文件。

  

Python安装`lief`库
```bash
pip3 install lief --break-system-packages
```

- `--break-system-packages`可以在当前环境中强制安装 Python 包

### 下载源码

```bash
git clone --recurse-submodules -b 17.4.0 https://github.com/frida/frida
```

- `--recurse-submodules`: 这是编译 Frida 关键的参数之一。作用是克隆主项目的同时，自动下载所有这些被依赖的子项目。
- `-b 17.4.0`: `-b` 参数用来指定一个特定的版本。

### 查看对应的Node.js和NDK版本

```bash
autorun@autorun-VMware-Virtual-Platform: ~/frida/subprojects/frida-nodes$ cat package.json | grep node
	"node":">=16"
	"@types/node": "^22.13.16", 
	"ts-node": "^10.9.2",
	"install": "node scripts/install.js",
	"test": "node --loader ts-node/esm --expose-gc node_modules/mocha/bin/_mocha --extension ts test/*.ts", 
	"url": "https: //github. com/frida/frida-node.git",
	"url": "https://github. com/frida/frida-node/issues"

```

通过"node": ">=16"`，`"@types/node": "^22.13.16"，可以确定node版本为22，版本尽量靠近即可。

```bash
autorun@autorun-VMware-Virtual-Platform: ~/frida$ cat releng/env_android.py | grep NDK_REQUIRED
```

这个在网上没有找到，还是我一个个文档翻才找到的  **(◡ᴗ◡✿)**

虽然操作有点丑陋

通过NDK_REQUIED = 25，我们选择r25版本的NDK



### 安装对应的node.js和ndk

**安装node.js**

```bash
# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
# 安装 node12
nvm install 22.13
# 使用12版本
nvm use 22
# 验证node.js是否可用
node -v
```

**安装ndk r25**

具体版本可以去官网https://github.com/android/ndk/wiki/Unsupported-Downloads看看有哪些

```bash
# 创建文件夹，解压的ndk文件到时候放这里，位置自行选择
mkdir -p ~/Android/Sdk/ndk
# 下载
wget https://dl.google.com/android/repository/android-ndk-r25c-linux.zip
# 解压
unzip android-ndk-r25c-linux.zip -d ~/Android/Sdk/ndk

# 验证 NDK 是否可用
ndk-build --version

# 设置当前shell环境变量，如果要长期生效需要自己写进~/.bashrc中
export ANDROID_NDK_ROOT="$HOME/Android/Sdk/ndk/android-ndk-r25c"
export PATH=$ANDROID_NDK_ROOT:$PATH
```

###  编译测试

在Frida目录直接make，会列出支持的所有编译选项，也会自动下载编译链
尝试
```bash
./configure --host=android-arm64
make -j8
```
`-j8`中的8可以改为其它数字，意思是多线程运行数，注意不要超过CPU支持最大线程
如果能够顺利编译出Frida并顺利运行即代表环境依赖完备

编译结果一般在`frida/build/subprojects`中

###  ? ? ?

本来第一次莫名其妙的报了好多错，修了好久。

百度,必应,Google,ChatGPT,Stack Overflow都去过了。

好不容易搞好了。还重新搞了一遍，结果你告诉我一遍过?

果然编译前一定要看黄历  o(╥﹏╥)o



## 二、去特征

#### Florida

这里采用的是https://github.com/Ylarod/Florida的patch

先下载并解压其source.zip在自定义目录

最后好将`/frida-core`patch文件中的**ggbond**修改，以防针对性检测

执行patch，之后再进行编译

```bash
root@autorun-VMware-Virtual-Platform:/home/autorun/frida/build/subprojects/frida-core# git am /home/autorun/Florida-17.4.0/patches/frida-core/*.patch
root@autorun-VMware-Virtual-Platform:/home/autorun/frida/build/subprojects/frida-gum# git am /home/autorun/Florida-17.4.0/patches/frida-gum/*.patch
```
如出现报错如下
```bash
[257/299] Generating subprojects/frida...frida-data-agent with a custom command
python3: can't open file '/home/autorun/frida/build/subprojects/frida-core/src/../../../../frida/subprojects/frida-core/src/anti-anti-frida.py': [Errno 2] No such file or directory
python3: can't open file '/home/autorun/frida/build/subprojects/frida-core/src/../../../../frida/subprojects/frida-core/src/anti-anti-frida.py': [Errno 2] No such file or directory
python3: can't open file '/home/autorun/frida/build/subprojects/frida-core/src/../../../../frida/subprojects/frida-core/src/anti-anti-frida.py': [Errno 2] No such file or directory
python3: can't open file '/home/autorun/frida/build/subprojects/frida-core/src/../../../../frida/subprojects/frida-core/src/anti-anti-frida.py': [Errno 2] No such file or directory
anti-anti-frida error. Code: 512
anti-anti-frida error. Code: 512
anti-anti-frida error. Code: 512
anti-anti-frida error. Code: 512
[299/299] Generating subprojects/frida...ect/frida-inject with a custom command
```

```bash
#执行这一句找出问题文件，并将这一句修改为“/../../../../subprojects/frida-core/src/anti-anti-frida.py”
grep -rn "/../../../../frida/subprojects/frida-core/src/anti-anti-frida.py"
```

再次编译即可









