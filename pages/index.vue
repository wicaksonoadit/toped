<template>
  <div id="app">
    <appHeader/>
    <div class="container content">
      <div class="input-group">
        <input type="text" placeholder="Input your number">
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
  methods: {
    getRealNum: function (no) {
      const regex = /^(rp\.? ?)*(([0-9]+\.*)+)+(,?[0]{2})?$/gmi
      const str = 'Rp.15000'
      console.log(regex.exec(str)[2].replace(/[^0-9 ]/g, ""))
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

