<template>
  <div class="help-sub">
    <div class="container">
      <h3>
        転送タスク
      </h3>
      <img src="sample.png" width="800" height="600">
      <dl>
        <dt>No.</dt>
        <dd>設定したフォームのデータ受信時に実行するタスクの実行順序番号</dd>
        <dt>転送名</dt>
        <dd>転送タスク名</dd>
        <dt>転送タイプ</dt>
        <dd>
          転送の種別
          <ul>
            <li>Salesforce: SalesforceのAPIを通じてSalesforceにフォームから送られてきたデータを登録</li>
            <li>Mail: フォームからデータが送られてきた時にメールを送信</li>
          </ul>
        </dd>
        <dt>操作</dt>
        <dd>
          <ul>
            <li>編集</li>
            <li>削除</li>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TransferTask'
}
</script>
