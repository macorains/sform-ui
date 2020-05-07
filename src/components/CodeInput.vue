<template>
  <div class="codeinput">
    <b-container>
      <b-row>
        <b-col>
          <b-card
            class="text-left mt-5"
            :title="$t('message.code_input')"
          >
            <p class="card-text pt-4">
              <b-form>
                <b-form-group
                  id="codeGroup"
                  label-for="code"
                  :label="$t('message.code_input_description')"
                >
                  <b-form-input
                    id="code"
                    v-model="code"
                    type="text"
                  />
                </b-form-group>
                <b-button
                  class="mt-4"
                  @click="send"
                >
                  {{ $t('message.send') }}
                </b-button>
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
  name: 'CodeInput',
  props: {
    serverUri: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      code: ''
    }
  },
  methods: {
    send: function (event) {
      console.log('!')
    }
  }
}
</script>
