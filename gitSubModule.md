> git Submodule 是一个很好的多项目使用共同类库的工具，他允许类库项目做为repository,子项目做为一个单独的git项目存在父项目中，子项目可以有自己的独立的commit，push，pull。而父项目以Submodule的形式包含子项目，父项目可以指定子项目header，父项目中会的提交信息包含Submodule的信息，再clone父项目的时候可以把Submodule初始化。 -- 来源互联网

1. 【增】给主仓库添加子项目：`git submodule add [子仓库地址] [子仓库下载到的文件夹名]`

2. 【改】当在子项目文件夹修改了文件，如果在父项目中直接`git add . && git commit -m`，会提示: `no changes added to commit`，所以结论是：`父项目不能提交子项目中的修改`

3. 【改】在主项目文件夹中修改了子项目内容，从父项目`cd`进子项目目录，在子项目目录下执行`git add . && git commit -m && git push`，结果是子项目远程仓库的确变了，但是父项目链接到子项目的header/hash/commit的记录值不对。这个时候如果需要父项目中的链接对，需要在父项目文件夹执行`git add . && git commit -m && git push`去更新父仓库记录的子仓库的commit值

4. 【改】用子仓库的项目地址，`clone`一份文件到本地文件夹，直接修改，然后提交到线上，最终引入当前项目为子项目的项目(主项目)中，对于子项目的commit是不对的。如果此刻到主项目中执行`git pull`，是不能拉下来子项目的修改的。【更新】可以在父项目中执行`git submodule foreach git pull`，就可以拉下来子项目的修改，如果此刻在父项目中执行`git checkout .`，是不能撤销本次拉下来的数据的；如果现在进入子项目文件夹，执行`git checkout .`，也是不能撤销本次拉下来的更新的。

5. 克隆一个带有子项目的仓库，可以加上参数`git clone [地址] --recursive`，就可以连子仓库一起克隆下来。或者先`clone`父仓库，在父仓库路径下执行`git submodule init && git submodule update`即可。







