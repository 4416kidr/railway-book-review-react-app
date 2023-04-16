# Station1

## git と create-react-app

1. github.com で新規プロジェクトを作成する
2. `git clone` [リモートリンク(github.com)]
3. `yarn create react-app [プロジェクトのフォルダ名]`
   - [Create React App Getting Started](https://create-react-app.dev/docs/getting-started/#yarn)
   - [yarn で create-react-app をするには？](https://qiita.com/RyosukeSomeya/items/974d4308c194a804162a)
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
     - Zero-installs かどうかわかんなかったので、とりあえず`.pnp.*`が入っている下のものを選択した
     - この影響によって、branch を変えるごとに`yarn install`が必要となることに注意
5. `git add -A`
6. `git commit`
7. `git push`

## 各種パッケージのインストール

1. `yarn add react-router-dom`
2. `yarn add -D eslint`
   1. `.eslintrc.js`に`rules: { "react/jsx-uses-react": "off", "react/react-in-jsx-scope": "off", },`を追記
      1. `jsx`のエラーを解消
   2. `.eslintrc.js`に`settings: {react: {version: "detect",}}`を追記
      1. `warning`に対処
3. `yarn run eslint --init`

   ```
   You can also run this command directly using 'npm init @eslint/config'.
   ✔ How would you like to use ESLint? · problems
   ✔ What type of modules does your project use? · esm
   ✔ Which framework does your project use? · react
   ✔ Does your project use TypeScript? · No / Yes
   ✔ Where does your code run? · browser, node
   ✔ What format do you want your config file to be in? · JavaScript
   The config that you've selected requires the following dependencies:

   eslint-plugin-react@latest
   ✔ Would you like to install them now? · No / Yes
   ✔ Which package manager do you want to use? · yarn
   ```

4. `yarn add -D --exact prettier`
5. `yarn run -D eslint-config-prettier`
6. `yarn add -D eslint-config-react-app`
   - `.eslintrc.js`に`extends: ["react-app", "react-app/jest"]`を追記
     - `test is not defined`などのエラーに対処
   - [eslint-config-react-app(yarn)](https://yarnpkg.com/package/eslint-config-react-app)
     - readme をよく読むこと
7. `yarn add -D sass`
8. 各種設定

## Cypress の導入

1. `yarn add -D cypress`
   - [Installing Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
2. `yarn run cypress open`
   - [Opening the App](https://docs.cypress.io/guides/getting-started/opening-the-app)
3. `yarn add eslint-plugin-cypress --dev`
   - [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)
     - [Using ESlint? (Cypress)](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
   - `eslintrc.js`に`"extends: ["plugin:cypress/recommended"]"`を追記
4. 以下のサイトを参考にテストを実装
   - [Testing Your App (cypress)](https://docs.cypress.io/guides/end-to-end-testing/testing-your-app)
     - `cypress.config.js`の`baseUrl`とそれを用いた`cy.visit('/')`
   - [cypress の実装例](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__html-web-forms/cypress/e2e/logging-in-html-web-form-spec.cy.js)

## 周辺知識

- [.eslintrc の env について](https://zenn.dev/kimromi/articles/546923b7281dcb)
  - ざっくり説明すると、いろいろなグローバル変数を導入して、未定義エラーを出ないようにするもの
  - 公式ドキュメントへのリンクもある
- [ESLint Rules Reference](https://eslint.org/docs/latest/rules/)
  - `ESLint`で設定できるルールの一覧
- [JEST](https://jestjs.io/ja/)
  - `JEST`とは、js のテスティングフレームワーク
- [IDE Integration (Cypress)](https://docs.cypress.io/guides/tooling/IDE-integration#Triple-slash-directives)
  - Cypress の intellisense を表示する方法
  - これは`npm`で飲み用いることができるので、以下の方法を採用
- [cypress の intellisense を見る方法](https://qiita.com/TooFuu/items/32253fe1b6c82d49fc63)
  - intellisense を見る方法をいろいろ試して見つけたので、それを記事にしたもの

## intellisense の問題

- `jsconfig.json`というからファイルを作成したら、cypress の intellisense も表示されるようになった
  - おそらく、裏で暗示的に intellisense をインポートしてるんだろうな
  - [Visual Studio Code で Jest の入力補完（インテリセンス）が効かない時の対応方法](https://trialanderror.jp/jest-intellisense-not-working/)

# Station2

- 単体テストを作ろう

## jest

- `@types/jest`と`jest`をインストール
  - どちらも`yarn add --dev`
  - `@types/jest`は任意
- `@testing-library/*`は`create react app`によって最初から入っている
- それぞれのライブラリへのリンク
  - [@types/jest](https://yarnpkg.com/package/@types/jest#readme)
  - [JEST](https://jestjs.io/)
  - [Testing Library](https://testing-library.com/)

## 周辺知識

- [React 公式のテストユーティリティ](https://ja.reactjs.org/docs/test-utils.html)に`react-testing-library`の使用がおすすめされている
  - インターネット上に`react-test-renderer`を用いた情報もあるが、おそらく古い？

## 実装の参考

- [React で Testing Library/Jest を使ってテストを学ぼう](https://reffect.co.jp/react/react-test)
- [Jest で React をユニットテストしてみる](https://www.webopixel.net/javascript/1777.html)
