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

# Station3

## SignUp

- [formik の使い方](https://reffect.co.jp/react/formik)
  - formik の基本的な使い方と yup について説明されている
- [formik の handleChange の Docs](https://formik.org/docs/api/formik#handlechange-e-reactchangeeventany--void)
  - input タグの name を formik の value 名と同じにしないといけない
    - この問題に気付くのに、30 分ぐらいかかった
- [formik とともに input された image をプレビューする方法](https://zenn.dev/msksgm/articles/20211112-react-formik-image-uploader)
  - `new FileReader()`を用いるのがポイントっぽい
- [input された image をプレビューする方法](https://zenn.dev/tsucchiiinoko/articles/8d0787b0c1ae8d)
  - `window.URL.createObjectURL(file)`ってのが肝らしい

## Upload Icon

- [axios リクエスト設定](https://axios-http.com/ja/docs/req_config)
  - API ドキュメントの header は`{headers: {Authorization: your_token}}`のように設定しなくてはならない
  - `data`に含めて送っても上手くいかない
    - この問題に気づくのに質問もしながら 1 日かかった
- [ディベロッパーツールの Netowrk パネル](https://ayudante.jp/column/2022-12-01/15-00/)
  - ネットワークパネルで通信時にどのようなデータがやり取りされているかを確認する事ができる
    - Request Headers は`{headers: {Authorization: your_token}}`で設定できる
- [formData の作り方と送信方法](https://cpoint-lab.co.jp/article/202003/14609/)
  - `const your_data = new FormData(); data.append('mail', 'example@example.com')`のように作成する
  - `axios({url: your_url, method: 'post', data: your_data, headers: {Authorization: your_token}})`のようにして送信する

# Station4

## MainPage

- axios を用いて、API と通信してレビュー一覧を取得
- isSignIn の実装
  - サインインしているかどうかを Redux と cookie で制御する

## Auth

- [Redux(リダックス)のインストール](https://redux.js.org/introduction/getting-started)
  - `yarn add @reduxjs/toolkit`
    - `yarn add react-redux`
      - `add @reduxjs/toolkit`をインストールしたら`react-redux`もインストールされるかもしれないので、不要かもしれない（逆の順番でインストールしたので、未検証）
- [react-cookie のインストール](https://yarnpkg.com/package/react-cookie)
  - `yarn add react-cookie`
- `store.js`と`authSlice.js`の作成
- 全ての元である`index.js`で`react-redux`と`react-cookie`を使うことを明記
  - `<Provider>`と`<CookiesProvider>`
- LogIn と SignUp で`cookie`と`authSlice`を用いて`token`を保持するようにした
  - `const dispatch = useDispatch();`と`const [cookies, setCookies, removeCookie] = useCookies();`で初期化
  - `setCookies("token", token)`と`dispatch(signIn())`で保持
  - 同様にログアウト処理も追加

## BEM (Block Element Modifier)

- [ゼロからわかる BEM 超入門(Zenn やっぷ)](https://zenn.dev/nagan/articles/dac6fa662f4dab)
- [BEM の基本概念とルール(CodeGrid)](https://www.codegrid.net/articles/bem-basic-1/)

# Station6

- リロードしてもログイン状態を保持できるようにするために`cookies`を利用した
  - こちらは Station4 で実装済み
- ヘッダーへのユーザ名表示には`cookies`を利用した
- ログインボタンは`Home.jsx`を参考に実装した
- ログイン済みの時のリダイレクトには`navigate()`を利用した
  - [TodoApp](https://github.com/4416kidr/railway-todo-app/blob/clean_working/src/pages/HomeTasks.jsx)
    - こちらを参考にリダイレクトまでの残り時間を表示するようにした
  - `navigate()`のような関数型の方が便利な場合もある
- ユーザー作成とログイン成功時のリダイレクトはすでに Station4 で実装済み
