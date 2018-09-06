# 開発ガイドライン

## レギュレーション

- 文字エンコーディング：UTF-8
- インデント：タブスペース１つ（半角スペース2個分） ※スペースと混在させない
- 改行コード - LF
- リソースへの参照パス：★★★★★★★★★★（ルート相対パスで記述 / 相対パスで記述 / 絶対パスで記述）※CSS内に記述する背景画像などは相対でOK

## フォルダ構成

- /develop-html/ にワークデータ一式あり。
- /develop-html/と同階層にあるファイル（gulpfile.js、package.json、README.mdなど）は編集不可とする。

## サーバーアップファイル

- /develop-html/ 内が作業環境のため、基本的にはこのフォルダの中のファイルをアップする。
- 下記は、/develop-html/内でサーバーアップ不要ファイルである。
  - /develop-html/ejs/ （フォルダごと一式）
  - /develop-html/sass/ （フォルダごと一式）

## 命名規則

- develop-html/sass/1.guideline.md
- develop-html/sass/2.selecter-naming.md

## CSSルール

- font-sizeの単位は rem（14px → 1.4rem）。
- line-heightは単位指定をしない（line-height: 1.5;）。
- ベンダープレフィックスはgulpが補完してくれるため不要。

## sass

フォルダ構成に関しては、下記を参照。
`develop-html/sass/1.guideline.md`

基本的には、/develop-html/sass/module/ に、各クラスごとに1ファイルを生成していますが、ヘッダー、フッター、ボタン、テーブル、テキストなどのパーツは、それぞれ1ファイルで複数クラスを管理することもあります。

## 画像について

- imgタグへwidth、height属性は挿入しない。

## 代替テキスト（alt属性）

- テキストが含まれている画像は、そのテキスト情報をそのまま記述。
- 複雑な図表はできるだけ概要を入れておく。
- 内容に意味が無い場合、もしくは前後に同じ内容のテキストがある場合は"空"でOK。

## ejsについて

ejsファイルからHTMLを生成していますので、HTMLを変更する場合は、元ファイルのejsを変更してください。
sassとcssの関係性と同様で、HTMLのみ変更しても、gulpが動いた瞬間にその変更は取り消され、先祖返りします。
headerとfooterはパーツ化して、管理しています。

## Javascriptについて

- 基本的には全て js/common.js へ、コメントを参考に記載。
- 「追加スペース」に関するコメントアウトは最後に削除可。

## ブレイクポイントについて

- ブレイクポイントは、js/common.js と sass/tools/mixins.scss の２箇所に設定しなければならない。
- common.js が忘れられやすいので注意する。

## Gulpについて

### Node.jsインストール作業時に参照するページ

(http://qiita.com/oreo3@github/items/622fd6a09d5c1593fee4)[http://qiita.com/oreo3@github/items/622fd6a09d5c1593fee4]
(http://www.task-notes.com/entry/20141130/1417319179)[http://www.task-notes.com/entry/20141130/1417319179]

### 汎用コマンド

インストールしているプラグイン一覧表示コマンド
`npm list --depth=0`

プラグインインストールコマンド
`npm install --save-dev プラグイン名``

プラグインアンインストールコマンド
`npm uninstall --save-dev プラグイン名``

gulp実行コマンド
`npm start`

gulpモジュールインストールコマンド
`npm install`

### Gitでのバージョン管理について

node_modulesフォルダは管理外とします。
グローバルの gitignoreファイル に node_modules/ と記述してください。
グローバルの gitignoreファイル の場所は /User/username/.gitignore_global です。
不可視ファイルなので、可視化できるようにしてください。

### インストール済みモジュール

- plumber     ：Sass等のコンパイルエラーが起きてもwatchを継続させる
- ejs         ：htmlテンプレートエンジン
- sass        ：sassのコンパイル
- autoprefixer：cssにプレフィックスを自動付与
- browserSync ：ライブリロード
- combineMq   ：複数箇所のメディアクエリを一つにまとめる
- notify      ：エラーを知らせる

### Gulp起動方法

- プロジェクトフォルダに package.json と gulpfile.js をコピペ。
- ターミナルでプロジェクトフォルダに移動して、npm install を実行。
- ターミナルで npm start を実行すると、gulpがスタート。
- 動作させた後は、ターミナルを触る必要はありません。
- ターミナルを終了させる場合は、ctrl + c 押して、
- exit でターミナルが終了する。

### ejsの使用方法

- 「***.ejs」は「***.html」にコンパイルされる。
- 「_***.ejs」という風に、先頭にアンダースコアをつけるとコンパイルされないので、他のhtmlファイルにincludeする為のファイル「テンプレートファイル」になる。
- 詳しい使用方法は「http://qiita.com/y_hokkey/items/31f1daa6cecb5f4ea4c9」を参照。

### browserSyncの使用方法

- gulpを起動させると、自動的にブラウザが開かれるので、後は、何もしなくていい。
- WordPressで使用したい場合は、gulpfile.js の48行目の baseDir の部分をコメントアウトして、proxy をアンコメントする。
- ターミナルに表示される、External URL がローカルサーバーのURL。
- このローカルサーバーにアクセスすれば、携帯でもローカルファイルを閲覧可能。

### autoprefixerの使用方法

- sassをコンパイルすると、自動でプレフィックスを付与するので、操作不要。
- プレフィックス対象ブラウザを変更したい場合は、オプションを変更することで可能。
  - 例：.pipe(autoprefixer({browsers: ['last 3 versions','ie >=10','android >=4.2']}))
	の場合、最新ブラウザから3つとie10以上とandroid4.2以上となる。
