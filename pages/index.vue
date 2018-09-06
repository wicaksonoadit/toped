<template>
  <div id="app">
    <appHeader/>
    <div class="container content">
      <div class="input-group">
        <input type="text" placeholder="Input your number" v-model="userInput" @keyup.enter="process">
        <div class="btn btn-primary" @click="getAmount">
          CEK AMOUNT
        </div>
        <div class="btn btn-primary" @click="getRealNum">
          VALIDATION
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
  data () {
    return {
      userInput: ''
    }
  },
  methods: {
    process: function () {
      const ifMatch = this.getRealNum(this.userInput)
      if (ifMatch) {
        let amount = this.getAmount(ifMatch)
        console.log(amount)
      }
    },
    getRealNum: function (no) {
      const regex = /^(rp\.? ?)*(([0-9]+\.*)+)+(,?[0]{2})?$/gmi
      const ex = regex.exec(no)
      if (ex) {
        return ex[2].replace(/[^0-9 ]/g, "")
      }
      return false
    },
    rupiahCurrency: function (angka) {
      var rupiah = '';
      var angkarev = angka.toString().split('').reverse().join('');
      for(var i = 0; i < angkarev.length; i++) {
        if(i%3 == 0) {
          rupiah += angkarev.substr(i,3)+'.'
        }
      }
      return('Rp. '+rupiah.split('',rupiah.length-1).reverse().join(''))
    },
    getAmount: function (num) {
      const arr = this.$store.state.fractions
      let input = num
      let amount = []
      arr.forEach(item => {
        if (input >= item) {
          let count = Math.floor(input/item)
          input = input - (count*item)
          amount.push(count + 'x' + '' + item)
        }
      })

      if (input !== 0) {
        amount.push('sisa' + '' + input)
      }

      return amount
    }
  }
}
</script>

<style>

</style>

