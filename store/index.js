let form_data = window.localStorage.getItem('form_data');



export const state = () => ({
    state: {
        form_data: form_data ? JSON.parse(form_data) : [],
        mspr: ''
    },



    mutations:{

        setmspr(state,payload) {
            state.mspr = payload
        },

      saveData(state){
        window.localStorage.setItem('form_data', JSON.stringify(state.form_data));
      },

      clearData(){

          window.localStorage.clear();

        this.commit('saveData');

      },


      


    }
    
  })