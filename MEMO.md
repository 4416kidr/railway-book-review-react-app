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

# Station7

## 行ったこと

- React-Paginate を導入した
- 一覧画面のみに`/profile`へのリンクを表示させるために`Header.jsx`から`header`タグを取り出した
- API を`Api.jsx`に切り出した

## 内容

- [React-Paginate の記述例（qiita.com）](https://qiita.com/togo_mentor/items/fe9f2c68ea824f5e5537)
  - 各プロパティに対する日本語の説明がある
- [React-Paginate のドキュメント（github.com）](https://github.com/AdeleD/react-paginate#readme)
  - pageCount のみ必須で、その他のプロパティは必要に応じて記述する
- [https://github.com/jsx-eslint/eslint-plugin-react/issues/3128](Configuration conflict)
  - 一旦`yarn.lock`を削除してから`yarn install`して初期化したら治った
    > ERROR in Plugin "react" was conflicted between "....\package.json » ./config/eslint.js » eslint-config-airbnb » C:\MyProject\node_modules\eslint-config-airbnb\rules\react-a11y.js" and "BaseConfig » C:\MyProject\node_modules\eslint-config-react-app\base.js".
- [undefined 値の判定方法](http://blog.tojiru.net/article/205007468.html)
  - `typeof a === "undefined"`が一般的らしい
  - `a == null`や`a === void 0`という方法もある
- [`<label htmlFor="">`](https://zenn.dev/kimura141899/articles/6e11e3a165460d)
  - `htmlFor=""`で`input`の`id`を指定すると`label`をクリックすると、その`input`にフォーカスが移る

## 学習用

- [bulletproof-react というサンプルプロジェクトが勉強になるらしい](https://zenn.dev/manalink_dev/articles/bulletproof-react-is-best-architecture)
  - [サンプルプロジェクト](https://github.com/alan2207/bulletproof-react)
- [コンポーネントをカスタムフックで提供してみた](https://engineering.linecorp.com/ja/blog/line-securities-frontend-3)
  - カスタムフックを使うまでの分離の過程を丁寧に説明しているサイト
- 概要
  ```
  export const getPosts = async () => {
    const result = await axios.get();
    return result.data;
  };
  ```

## API の切り出し

- まだかなり曖昧なため、さらなる学習が必要
- [カスタムフックの概要](https://qiita.com/cheez921/items/af5878b0c6db376dbaf0)
  - 自分独自のフックを作成できる
  - 描写とロジックの分離
  - コピペをする必要がなくなる
- [API を切り出す戦略](https://zenn.dev/sutamac/articles/27246dfe1b5a8e)

  - 3 つの層
  - Repository 層
    - API-Client を用いて API 通信の処理を実装
    ```
    const getPost = async () => {
      const response = await ApiClient.get();
      return response.data;
    }
    ```
  - Model: 受け取ったデータを整形する
  - API-Client: axios を用いて API 通信の共通処理を実装

    ```
    export const ApiClient = axios.create({baseURL, headers});
    // レスポンスのエラー判定処理
    ApiClient.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        switch(err?.response?.status) {
          case 401:
            break;
          default:
            console.log();
        }
        const errorMessage = (err.response?.data?.message || "").split(",");
        throw new Error(errorMessage);
      }

      //Token付与などのリクエスト処理の共通化
      ApiClient.interceptors.request.use(async (request) => {
        const accessToken = getAccessToken();
        request.headers["access-token] = accessToken
        return request;
      })
    )
    ```

- [カスタムフックの実例](https://zenn.dev/yuuuuta/articles/c1602dbf97c2ca)

  - サイトより一部抜粋
    - この場合`login.jsx`などで weatherData を加工して使いたいとなると、useState の問題で 2 回処理が必要となる
    - したがって、データが必要ならば、上に示した「API を切り出す戦略」のサイトを参考にすると良いかもしれない

  ```
  export const useWeatherData = () => {
    const apikey = process.env.REACT_APP_API_KEY;
    const [weatherData, setWeatherData] = useState();

    const getWeatherData = useCallback(
      async () => {
        await axios
          .get()
          .then((res) => {
            setWeatherData(res.data);
          })
          .catch(err => console.log(err));
      }, []
    );
    return {weatherData, setWeatherData, getWeatherData}
  }
  ```

- [axios にも使われている Promise を理解する](https://tech-blog.rakus.co.jp/entry/20220929/axios)
  - Promise は非同期処理の状態を監視するためのオブジェクト
    - pending, resolve, reject の 3 状態が存在する
    - Promise が resolve ならば`.then()`が実行され、reject ならば`.catch()`が実行される
    - axios は以下の２点を自動で行ってくれる
      - Promise のインスタンス化
      - resolve, reject への状態遷移

# Station 8

- 8/28 スタート
