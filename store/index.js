export const state = () => ({
  fractions: [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50],
  minRp: [],
  leftRp: false
})

export const mutations = {
  setMinRp(state, data) {
    state.minRp = data
  },
  setLeftRp(state, data) {
    state.leftRp = data
  }
}

