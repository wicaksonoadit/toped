<template>
  <div id="app">
    <appHeader/>
    <div class="container content">
      <h3>Fill the input and get minimum number of rupiahs needed to make that amount</h3>
      <p>Hit Enter or click the button to get the results</p>
      <div class="input-group">
        <input type="text" placeholder="Input your ruphiah" v-model="userInput" @keyup.enter="results">
        <div class="btn btn-primary" @click="results">
          RESULTS
        </div>
      </div>
      <div class="results">
        <p>Please find the results below:</p>
        <p class="err" v-if="error.is_error">{{error.message}}</p>
        <ul v-else>
          <li v-for="(rp, index) in $store.state.minRp" :key="index" :class="[$store.state.leftRp && index === $store.state.minRp.length-1 ? 'leftrp':'']">{{rp}}</li>
        </ul>
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
  data () {
    return {
      userInput: '',
      error: {
        is_error: false,
        message: ''
      }
    }
  },
  methods: {
    results: function () {
      this.error.is_error = false
      const ifMatch = this.getRealNum(this.userInput)
      if (ifMatch) {
        let amount = this.getAmount(ifMatch)
        this.$store.commit('setMinRp', amount)
        console.log(amount)
      } else {
        this.error.message = 'Invalid input, please check your input'
        this.error.is_error = true
      }
    },
    getRealNum: function (no) {
      const regex = /^(rp\.? ?)*(([0-9]+\.*)+)+(,?[0]{2})?$/gmi // set rules
      const ex = regex.exec(no) // get match group
      if (ex) {
        return ex[2].replace(/[^0-9 ]/g, "") // filter only number
      }
      return false
    },
    rupiahCurrency: function (num) {
      var rp = '';
      var rev = num.toString().split('').reverse().join('') // reverse the string to add dot from the back
      for(var i = 0; i < rev.length; i++) {
        if(i%3 == 0) {
          rp += rev.substr(i,3)+'.' // add dot every 3 number from the back
        }
      }
      return('Rp'+rp.split('',rp.length-1).reverse().join('') + ',00')
    },
    getAmount: function (num) {
      this.$store.commit('setLeftRp', false)
      const listFractions = this.$store.state.fractions
      let amount = []
      listFractions.forEach(item => {
        if (num >= item) {
          let count = Math.floor(num/item) // Round a number downward to get the fractions multiplier
          num = num - (count*item) // from rounded number, find the rest of number
          amount.push(count + 'x' + ' ' + this.rupiahCurrency(item))
        }
      })

        if (num !== 0) {
          this.$store.commit('setLeftRp', true)
          amount.push('Left' + ' ' + this.rupiahCurrency(num))
      }

      return amount
    }
  }
}
</script>

<style>

</style>

