<template>
  <div class="form_edit">
    <div class="container">
    <h1>FormEdit</h1>

    <b-container class="text-left">
      <b-form-row>
        <b-col>
          <b-form-group id="formNameGroup" label-for="formName" label="フォーム名">
            <b-form-input id="formName" type="text"></b-form-input>
          </b-form-group>
          <b-form-group id="formTitleGroup" label-for="formTitle" label="フォームタイトル">
            <b-form-input id="formTitle" type="text"></b-form-input>
          </b-form-group>
          <b-form-group id="urlAfterCancelGroup" label-for="urlAfterCancel" label="キャンセル後遷移先URL">
            <b-form-input id="urlAfterCancel" type="text"></b-form-input>
          </b-form-group>
          <b-form-group id="urlAfterCompleteGroup" label-for="urlAfterComplete" label="完了後遷移先URL">
            <b-form-input id="urlAfterComplete" type="text"></b-form-input>
          </b-form-group>
          <b-form-group id="formInputHeaderGroup" label-for="formInputHeader" label="フォーム入力画面メッセージ">
            <b-form-textarea id="formInputHeader" :rows=3 :max-rows=10></b-form-textarea>
          </b-form-group>
          <b-form-group id="formConfirmHeaderGroup" label-for="formConfirmHeader" label="フォーム確認画面メッセージ">
            <b-form-textarea id="formConfirmHeader" :rows=3 :max-rows=10></b-form-textarea>
          </b-form-group>
          <b-form-group id="formCompleteTextGroup" label-for="formCompleteText" label="フォーム完了画面メッセージ">
            <b-form-textarea id="formCompleteText" :rows=3 :max-rows=10></b-form-textarea>
          </b-form-group>
          <b-form-group id="formStopTextGroup" label-for="formStopText" label="フォーム停止時メッセージ">
            <b-form-textarea id="formStopText" :rows=3 :max-rows=10></b-form-textarea>
          </b-form-group>
          <!-- フォーム項目設定 -->
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">項目名</th>
                <th scope="col">項目ID</th>
                <th scope="col">型</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>

          <!-- Transfer設定 -->
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">転送名</th>
                <th scope="col">転送タイプ</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-form-row>
    </b-container>


    <b-button class="mt-4">Cancel</b-button>
    <b-button class="mt-4">Save Change</b-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'form_edit'
}

</script>


<style scoped>

</style>
