<template>
  <div class="signin">
    <b-container>
      <b-row>
        <b-col>
          <b-card class="text-left mt-5" title="Signin">
            <p class="card-text pt-4">
              <b-form>
                <b-form-group id="emailGroup" label-for="email" label="メールアドレス">
                  <b-form-input id="email" type="email"></b-form-input>
                </b-form-group>
                <b-form-group id="groupGroup" label-for="group" label="グループ名">
                  <b-form-input id="group" type="text"></b-form-input>
                </b-form-group>
                <b-form-group id="passwordGroup" label-for="password" label="パスワード">
                  <b-form-input id="password" type="password"></b-form-input>
                </b-form-group>
                <b-button class="mt-4">Signin</b-button>
              </b-form>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>
export default {
  name: 'signin'
}

</script>


<style scoped>

</style>
