<template>
  <div
    v-if="loaded"
    class="hello"
  >
    <h1>{{ msg }}</h1>
    <b-button
      size="sm"
      @click="signin()"
    >
      サインイン
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      loaded: false,
      msg: 'Sform administration'
    }
  },
  mounted: function () {
    const token = localStorage.getItem('sformToken')
    if (token) {
      this.$http.get('/adminExistsCheck')
        .then(response => {
          if (response.data.result === false) {
            this.$router.push({ path: 'createadmin', params: {} })
          }
        })
      this.$data.loaded = true
    }
  },
  methods: {
    signin: function () {
      this.$router.push({ path: '/signin' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
