# diff

`git diff`を用いて2ファイルの差分を検出します。

<br/>

順序は以下の通りです。

1. `fixtures/`に解析後のjsonファイルを手動で配置
2. `npm run diff`を実行
   a. 解析後のjsonファイルから本文を抽出
   b. `git diff`を実行し差分を取得
   c. 差分を`fixtures/xxx/diff.ts`として出力
3. `npm run dev`を実行
   a. `script/parse-word-diff`内で`diff.ts`を読み込みFE表示用にparseします。
   b. parseした内容をハイライトして表示します。

内部で走る`git diff`は以下です。
空白を無視して単語単位で差分を取得します。
`--unified=9999`は差分と本文を全て表示するためにhunkサイズを大きくしています。

```
$ git diff --word-diff-regex='[^[:space:]]' --unified=9999
```

<br/><br/>

## To run

```bash
$ docker compose up -d git-diff # localhost:9999でアクセス
```

FEで読み込むdiffファイルは`src/script/parse-word-diff/index.ts`で選択してください。

<br/>

差分比較
どの2ファイルに対して差分取得するのかは`src/script/git-diff/exec.ts`で選択してください。

```bash
$ docker compose up -d git-diff
$ docker compose exec git-diff bash
$ npm run diff
```

<br/><br/>

## dir

- fixtures/
  - 差分比較の対象ファイル郡
  - 比較後の差分ファイルもここに出力されます
- src/
  - components/
    - FEコンポーネント
  - script/
    - git-diff/
      - 2ファイルに対してgit diffを実行し、差分を取得するスクリプト
    - lib/
    - parse-unified-format/
    - parse-word-diff/
      - git diffの結果をFE表示用にparseするスクリプト

<br/><br/>

## image

![スクリーンショット 2024-10-04 16 37 12](https://github.com/user-attachments/assets/3a6f581f-0b7b-4760-8dbe-9d5167d3336a)

<br/><br/>

## ref

https://www.gnu.org/software/diffutils/manual/diffutils.html#Output-Formats
