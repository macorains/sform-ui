<template>
  <div class="help-sub2">
    <div class="container">
      <h3>
        フォーム項目編集画面
      </h3>
      <img
        src="sample.png"
        width="800"
        height="600"
      >
      <dl>
        <dt>項目名</dt>
        <dd>画面に表示するフォーム項目名</dd>
        <dt>項目ID</dt>
        <dd>内部でフォーム項目を識別するためのID（画面には表示されない）</dd>
        <dt>型</dt>
        <dd>フォーム項目の型を指定</dd>
        <dt>選択項目</dt>
        <dd>型がラジオボタン、チェックボックス、コンボボックスの場合に、選択項目を設定 「追加」ボタンクリックで項目を追加できる</dd>
        <dt>初期値</dt>
        <dd>フォーム項目の初期値を設定</dd>
        <dt>バリデーション</dt>
        <dd>フォーム入力内容のバリデーション（入力値検査）を設定</dd>
        <dt>数値範囲</dt>
        <dd>バリデーションが「数値のみ」の場合に、入力を許容する数値範囲を設定</dd>
        <dt>文字数範囲</dt>
        <dd>入力を許容する文字数の範囲を設定</dd>
        <dt>必須項目</dt>
        <dd>このフォーム項目を入力必須項目とする</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormColEdit'
}
</script>
