<template>
  <div class="hello">
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
      msg: 'Sform administration'
    }
  },
  created: function () {
    const token = localStorage.getItem('sformToken')
    if (!token) {
      location.href = process.env.VUE_APP_API_URL + '/jwt'
    }
    this.$http.defaults.headers.common['X-Auth-Token'] = token

    this.$http.get('/adminExistsCheck')
      .then(response => {
        if (response.data.result === false) {
          this.$router.push({ path: 'createadmin', params: {} })
        }
      })
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
