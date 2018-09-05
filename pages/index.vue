<template>
  <div id="app">
    <appHeader/>
    <div class="container content">
      <div class="input-group">
        <input type="text" placeholder="Input your number">
        <div class="btn btn-primary" @click="getAmount">
          BUTTON
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import appHeader from '~/components/appHeader.vue'

export default {
  components: {
    appHeader
  },
  methods: {
    getRealNum: function (num) {

    },
    getAmount: function (num) {

      const arr = this.$store.state.fractions
      let input = 245000
      let amount = []

      arr.forEach(item => {
        if (input >= item) {
          let count = Math.floor(input/item)
          amount.push(count + 'x' + '' + item)
          input = input - (count*item)
        }
      })

      console.log(amount + 'ssia' + input)
    }
  }
}
</script>

<style>

</style>

