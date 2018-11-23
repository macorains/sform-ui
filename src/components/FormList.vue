<template>
  <div class="form_list">
    <div class="container">
    <h1>FormList</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">フォーム名</th>
          <th scope="col">タイトル</th>
          <th scope="col">状態</th>
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
    <b-button class="mt-4">Add Form</b-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'form_list'
}
</script>


<style scoped>

</style>
