# SCSS SMACSS BEM ガイドライン

## SMACSSについて

本プロジェクトは”SMACSS”の手法でHTML,CSSコーディングを行う。<br>
SMACSSでは、styleを以下のカテゴリに分けて記述する。

1. Base カテゴリ
2. Layout カテゴリ
3. Module カテゴリ
4. State カテゴリ
5. Theme カテゴリ
6. Tools カテゴリ

### 1. Base

本プロジェクトにおける、各要素のデフォルトのスタイルを定義する。

- sass/base/\_base.scss ----> 各要素のデフォルトスタイル
- sass/base/\_var.scss  ----> sassの変数を定義

### 2. Layout

header, footer など大枠のレイアウトのスタイルを定義する。<br>
Layoutカテゴリに属するセレクタには、必ず先頭に"l-"を付与する。<br>

- sass/layout/\_all.scss ----> 各要素のデフォルトスタイル

例：これらは_all.scssに記述する<br>
　　.l-wrapper<br>
　　.l-header<br>
　　.l-side<br>
　　.l-footer

### 3. Module

ページを構成するほとんどの要素がこのカテゴリに属する。<br>
再利用可能なモジュールと、そうでないモジュールの両方が該当する。<br>
セレクタの先頭に"m-"を付与する方法もあるが、省略する。<br>
モジュールの数は当然多くなる。<br>
1モジュールごと もしくは 同系統のモジュールをまとめて1つのscssファイルで定義する。

例）<br>
.text-box<br>
.text-photo-box<br>
これらを、 sass/module/text-box.scss　で定義<br>

.menu-list-2cols<br>
.menu-list-3cols<br>
これらを、 sass/module/menu-list.scss　で定義<br>

.footer-link<br>
.copyright<br>
これらを、 sass/module/footer.scss　で定義<br>

※scssファイルの分け方はあまり難しく考えずに、別のコーダーが容易に理解でき、推測できればOK

### 4. State

例えば、JavaScriptによる制御によって切り替わるような、状態を表すルールが該当する。<br>
Stateカテゴリに属するセレクタには、必ず先頭に"is-"を付与する。<br>
特定のレイアウトに依存しているものはレイアウト名を含めるようにする。<br>

例）<br>
JavaScriptでフォントサイズの大中小を切り替える際のフォントサイズの定義<br>
.is-large-font<br>
.is-small-font<br>

例）<br>
もともと表示状態の要素を非表示にする<br>
.is-hidden<br>

例）<br>
もともと表示状態の検索ボックスを非表示にする<br>
.is-searchbox-hidden<br>

### 5. Theme

今回のプロジェクトでは使用しない。

### 6. Tools

カテゴリ。<br>
- sass/tools/\_reset.scss   ----> 編集NG<br>
- sass/tools/\_mixins.scss  ----> 必要に応じて追記OK<br>
- sass/tools/\_helpers.scss ----> 必要に応じて追記OK<br>

## BEMについて

HTMLの各要素に付与するclass値の命名ルール。<br>
Block / Element / Modifier の頭文字を取っている。<br>

Block    ----> 構成のルートとなる要素。コンポーネントなどのコンテンツ項目（検索ボックスなど）<br>
Element  ----> Blockの子要素（構成要素）<br>
Modifier ----> BlockまたはElementから変化した状態を表す<br>

Block / Element / Modifier それぞれ複数単語になる場合、単語間の接続は `-` で行う。<br>

sassファイルは1Blockにつき1ファイルで作成する。逆に言うと1ファイル内に複数のBlockが定義されているのは違反である。<br>
ファイル名は Block名.scss とする。

### BEM記法

.block<br>
.block__element<br>
.block__element--modifier<br>
.block--modifier<br>
.block--modifier__element<br>

HTMLで書くと以下のようになる。<br>

```
<div class="block">
  <div class="block__element"></div>
  <div class="block__element block__element--modifier"></div>
</div>
<div class="block block--modifier">
  <div class="block__element block--modifier__element"></div>
</div>
```

実際の例<br>

```
<article class="article">
  <h2 class="article__title"></h2>
  <div class="article__body">
  <div class="article__body__photo"></div>
    <div class="article__body__text--latest"></div>
  </div>
</article>
```

#### elementはネストと親セレクタ名参照を使って定義する

例）<br>
article-list__article-title を定義した場合<br>

```
.article-list {
  width: 100%;

  &__article-title {
    font-size: 20px;
  }
}
```

#### Element内にさらにElementをネストして定義してはいけない

例）<br>
HTMLが以下の構造の場合<br>

```
<div class="article-list">
  <div class="article-list__article-title">
    タイトル
    <span class="article-list__article-subtitle">サブタイトル</span>
  </div>
</div>
````

これはOK<br>

```
.article-list {
  width: 100%;

  &__article-title {
    font-size: 20px;
  }

  &__article-subtitle {
    font-size: 16px;
  }
}
```

これはNG<br>

```
.article-list {
  width: 100%;

  &__article-title {
    font-size: 20px;

    &__article-subtitle {
      font-size: 16px;
    }
  }
}
```

#### Modifierはネストと親セレクタ名参照を使って定義する

例）<br>
article-title には文字色が赤いものとそうでないものがある場合<br>

```
.article-list {
  width: 100%;

  &__article-title {
    font-size: 20px;

    &--red {
      // この中身がどうなるかは後述. もちろんこのままでは何も機能しない.
    }
  }

  &__article-subtitle {
    font-size: 16px;
  }
}
```

#### Modifierはplaceholder selectorを使って差分のみ記述する

例）<br>
article-list__article-title--red は文字色が赤いだけで, その他のスタイルは全て article-list__article-title と共通であるとする場合<br>

```
.article-list {
  width: 100%;

  %__article-title {
    font-size: 20px;
  }

  &__article-title {
    @extend %__article-title;

    &--red {
      @extend %__article-title;
      color: red;
    }
  }

  &__article-subtitle {
    font-size: 16px;
  }
}
```

仮に --green や --blue が登場しても簡潔に記述できる。<br>

#### シングルクラスで記述する

#### Blockにはmarginを指定しない

#### 例外としてBlockとElementのマルチクラスのみ許容する
