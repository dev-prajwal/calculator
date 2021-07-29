<template>
    <div class="container">

        <b-form-group id="msrp" label="MSRP:" label-for="msrp">
          <b-form-input
          v-model.number="msrp"
          placeholder="Enter MSRP"
          type="number"
          @change="addStore"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="dealer_discount" label="Dealer Discount:" label-for="dealer_discount">
          <b-form-input
          v-model.number="dealer_discount"
          placeholder="Enter Dealer Discount"
          type="number"
          
          ></b-form-input>
        </b-form-group>

        <b-form-group id="rebates" label="Rebates:" label-for="rebates">
          <b-form-input
          v-model.number="rebates"
          placeholder="Enter Rebates"
          type="number"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="down_das" label="DOWN / DAS:" label-for="down_das">
          <b-form-input
          v-model.number="down_das"
          placeholder="Enter Down / DAS"
          type="number"
          ></b-form-input>
        </b-form-group>

        <div>
            <div class="mt-3">Term: <strong>{{ term }}</strong></div>
            <b-form-select v-model="term" :options="options"></b-form-select>
            
        </div>

        <b-form-group id="sale_price" label="Sale Price:" label-for="sale_price">
          <b-form-input
          v-model.number="sale_price"
          placeholder="Enter Sale Price"
          type="number"
          ></b-form-input>
        </b-form-group>

        
        <h4>Financed Amount: ${{financed_amount}}</h4>

        <h4>Money Factor: 0.000125</h4>

        <h4>Tax: 0.09</h4>

        <h4>Residual: 0.55</h4>

        <h4>Residual Value: ${{residual_value}}</h4>

        <h4>Amortized: ${{amortized}}</h4>

        <h4>Monthly Depreciation: ${{monthly_depreciation}}</h4>

        <h4>Monthly interest: ${{monthly_interest}}</h4>

        <h4>Monthly tax: ${{monthly_tax}}</h4>

        <h4>Lease Payment: ${{lease_payment}}</h4>


        <b-button variant="outline-primary" @click="addStore">SAVE</b-button>
        
    </div>
</template>

<script>

import { mapMutations } from 'vuex'

    export default {
        data() {
            return {
                msrp: '',dealer_discount: '',rebates:'',down_das:'',sale_price:'',financed_amount:'',
                money_factor: 0.000125,tax: 0.09,residual: 0.55,residual_value:'',amortized:'',monthly_depreciation:'',
                monthly_interest:'',monthly_tax:'',lease_payment:'',
                term: null,
                options: [
                { value: null, text: 'Please select an option' },
                { value: 12, text: '12' },
                { value: 24, text: '24' },
                { value: 36, text: '36' },
                { value: 48, text: '48' },
                { value: 60, text: '60' },
                { value: 72, text: '72' }
                ]
              
            }
        },
        
        methods: {

            calculate_all()
            {
              //dealer discount
              let dd = Number(this.msrp) - Number(this.sale_price) - Number(this.rebates)
              //this.dealer_discount = (dd > 0) ? dd : 0
              this.dealer_discount = dd

              //financed amount
              let fa = Number(this.sale_price) - Number(this.down_das)
              this.financed_amount = fa//(fa > 0) ? fa : 0

              //residual amount
              let rv = Number(this.msrp) * this.residual
              this.residual_value = rv//(rv > 0) ? rv : 0

              //amortized value
              let am = Number(this.financed_amount) - Number(this.residual_value)
              this.amortized = am//(am > 0) ? am : 0

              //monthly depreciation
              let md = Number(this.amortized) / Number(this.term)
              this.monthly_depreciation = md//(md.toFixed(2) > 0) ? md : 0

              //monthly intrest
              let mi = (Number(this.financed_amount) + Number(this.residual_value))* this.money_factor
              this.monthly_interest = mi//(mi > 0) ? mi : 0

              //monthly tax
              let mt = ((this.monthly_depreciation) + (this.monthly_interest))* (this.tax)
              this.monthly_tax = mt//(mt > 0) ? mt : 0

              //Lease Payment
              let lp = (this.monthly_depreciation) + (this.monthly_interest) + (this.monthly_tax)
              this.lease_payment =  Math.round(lp)//(lp > 0) ? Math.round(lp) : 0
            },
            
             addStore() {
               this.$store.commit('setData', {
                 msrp: this.msrp,
                 dealer_discount: this.dealer_discount,
                 rebates:this.rebates,
                 down_das:this.down_das,
                 sale_price:this.sale_price,                
                 term: this.term,
               })
             },
            
        },
        watch: {
            
            msrp: function (val) {
                this.calculate_all()
            },
            rebates: function (val) {
                this.calculate_all()
            },
            down_das: function (val) {
                this.calculate_all()
            },
            term: function (val) {
                this.calculate_all()
            },
            sale_price: function (val) {
                this.calculate_all()
            }
        },
        mounted() {
          this.msrp = this.$store.state.payload.msrp
          this.dealer_discount = this.$store.state.payload.dealer_discount
          this.rebates = this.$store.state.payload.rebates
          this.down_das = this.$store.state.payload.down_das
          this.sale_price = this.$store.state.payload.sale_price
          this.term = this.$store.state.payload.term
        }
    }
</script>

<style scoped>

.container {
    width: 600px;
    margin-top: 50px;
    margin-bottom: 100px;
}

</style>