export const state = () => ({
  payload: 
  window.localStorage.getItem('form_data') ? JSON.parse(window.localStorage.getItem('form_data')) : {
  msrp: 0,
  dealer_discount: 0,
  rebates:0,
  down_das:0,
  sale_price:0,
  term:"60",
},
})

export const mutations = {
  setData(state, payload){
    state.payload = payload
    window.localStorage.setItem('form_data', JSON.stringify(state.payload));
  },
}