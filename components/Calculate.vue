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

        <b-form-group id="financed_amount" label="Financed Amount:" label-for="financed_amount">
          <b-form-input
          v-model.number="financed_amount"
          placeholder="Enter Financed Amount"
          type="number"
          disabled
          ></b-form-input>
        </b-form-group>

        
        <h4>Money Factor: 0.000125</h4>

        <h4>Tax: 0.09</h4>

        <h4>Residual: 0.55</h4>

        <b-form-group id="residual_value" label="Residual Value:" label-for="residual_value">
          <b-form-input
          v-model.number="residual_value"
          type="number"
          placeholder="Enter Residual Value"
          disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group id="amortized" label="Amortized:" label-for="amortized">
          <b-form-input
          v-model.number="amortized"
          type="number"
          placeholder="Enter Amortized"
          disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group id="monthly_depreciation" label="Monthly Depreciation:" label-for="monthly_depreciation">
          <b-form-input
          v-model.number="monthly_depreciation"
          type="number"
          placeholder="Enter Monthly Depreciation"
          disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group id="monthly_interest" label="Monthly interest:" label-for="monthly_interest">
          <b-form-input
          v-model.number="monthly_interest"
          type="number"
          placeholder="Enter Monthly interest"
          disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group id="monthly_tax" label="Monthly Tax:" label-for="monthly_tax">
          <b-form-input
          v-model.number="monthly_tax"
          type="number"
          placeholder="Enter Monthly tax"
          disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group id="lease_payment" label="Lease Payment:" label-for="lease_payment">
          <b-form-input
          v-model.number="lease_payment"
          placeholder="Enter Lease Payment"
          type="number"
          disabled
          ></b-form-input>
        </b-form-group>

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

            dealer_discount_cal() {
                let dd = Number(this.msrp) - Number(this.sale_price) - Number(this.rebates)
                this.dealer_discount = (dd > 0) ? dd : 0
                
            },
            financed_amt() {
              let fa = Number(this.sale_price) - Number(this.down_das)
              this.financed_amount = (fa > 0) ? fa : 0
            },
            residual_val() {
              let rv = Number(this.msrp) * this.residual
              console.log(rv)
              this.residual_value = (rv > 0) ? rv : 0
              console.log(this.term)
            },
            amortized_cal() {
              let am = Number(this.financed_amount) - Number(this.residual_value)
              this.amortized = (am > 0) ? am : 0
            },
            monthly_depreciation_cal() {
                let md = Number(this.amortized) / Number(this.term)
                this.monthly_depreciation = (md.toFixed(2) > 0) ? md : 0
             },
             monthly_interest_cal() {
                let mi = (Number(this.financed_amount) + Number(this.residual_value))* this.money_factor
                this.monthly_interest = (mi > 0) ? mi : 0
             },
             monthly_tax_cal() {
                let mt = ((this.monthly_depreciation) + (this.monthly_interest))* (this.tax)
                this.monthly_tax = (mt > 0) ? mt : 0
             },
             lease_payment_cal() {
               let lp = (this.monthly_depreciation) + (this.monthly_interest) + (this.monthly_tax)
               this.lease_payment = (lp > 0) ? Math.round(lp) : 0
               
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
            sale_price: function (val) {
                this.dealer_discount_cal();
                this.financed_amt();
                this.residual_val();
                this.amortized_cal();
                this.monthly_depreciation_cal()
                this.monthly_interest_cal();
                this.monthly_tax_cal()
                this.lease_payment_cal()
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
}

</style>