<template>
  <div class="help-sub2">
    <div class="container">
      <h3>
        フォーム一覧画面
      </h3>
      <img src="sample.png" width="800" height="600">
      <dl>
        <dt>ID</dt>
        <dd>フォームを識別するID。フォーム設置時にフォームを指定する際にはこのIDを使用する。</dd>
        <dt>フォーム名</dt>
        <dd>フォームの名称。フォーム画面には表示されない。</dd>
        <dt>タイトル</dt>
        <dd>フォームのタイトル。フォーム画面に表示される内容。</dd>
        <dt>ステータス</dt>
        <dd>
          フォームの状態を表示します。
          <ul>
            <li>無効：フォームが表示されない状態</li>
            <li>有効：フォームが表示される状態</li>
            <li>停止：フォームが停止状態で、メッセージが表示される状態</li>
          </ul>
        </dd>
        <dt>操作</dt>
        <dd>
          フォームに対する操作を行います。
          <ul>
            <li>編集：フォームの設定を編集します。</li>
            <li>削除：フォームを削除します。※フォームを削除すると、そのフォームで受け取ったデータも削除されます。</li>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormList'
}
</script>
