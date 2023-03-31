# Start Project
1. github.comで新規プロジェクトを作成する
2. `git clone` [リモートリンク(github.com)]
3. `yarn create react-app [プロジェクトのフォルダ名]`
   - [Create React App Getting Started](https://create-react-app.dev/docs/getting-started/#yarn)
   - [yarnでcreate-react-appをするには？](https://qiita.com/RyosukeSomeya/items/974d4308c194a804162a)
     - おそらく`yarn`を使うなら、`npx create-react-app my-app`よりも良いはず
4. 以下の内容を`.gitignore`に追記する
    ```
    .pnp.*
    .yarn/*
    !.yarn/patches
    !.yarn/plugins
    !.yarn/releases
    !.yarn/sdks
    !.yarn/versions
    ```
   - [Which files should be gitignored?](https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored)
     - Zero-installsかどうかわかんなかったので、とりあえず`.pnp.*`が入っている下のものを選択した
     - この影響によって、branchを変えるごとに`yarn install`が必要となることに注意
5. `git add -A`
6. `git commit`
7. `git push`

