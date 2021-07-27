<template>
    <div class="container">
        <b-form-input
        v-model.number="msrp"
        placeholder="Enter MSRP"
        ></b-form-input>

        <b-form-input
        v-model.number="dealer_discount"
        placeholder="Enter Dealer Discount"
        ></b-form-input>

        <b-form-input
        v-model.number="rebates"
        placeholder="Enter Rebates"
        ></b-form-input>

        <b-form-input
        v-model.number="down_das"
        placeholder="Enter Down / DAS"
        ></b-form-input>

        <div>
            <div class="mt-3">Term: <strong>{{ term }}</strong></div>
            <b-form-select v-model="term" :options="options"></b-form-select>
            
        </div>

        <b-form-input
        v-model.number="sale_price"
        placeholder="Enter Sale Price"
        ></b-form-input>

        <b-form-input
        v-model.number="financed_amount"
        placeholder="Enter Financed Amount"
        ></b-form-input>

        <b-form-input
        v-model.number="money_factor"
        placeholder="Enter Money Factor"
        ></b-form-input>

        <b-form-input
        v-model.number="tax"
        placeholder="Enter Tax"
        ></b-form-input>

        <b-form-input
        v-model.number="residual"
        placeholder="Enter Residual"
        ></b-form-input>

        <b-form-input
        v-model.number="residual_value"
        placeholder="Enter Residual Value"
        ></b-form-input>

        <b-form-input
        v-model.number="amortized"
        placeholder="Enter Amortized"
        ></b-form-input>

        <b-form-input
        v-model.number="monthly_depreciation"
        placeholder="Enter Monthly Depreciation"
        ></b-form-input>

        <b-form-input
        v-model.number="monthly_interest"
        placeholder="Enter Monthly interest"
        ></b-form-input>

        <b-form-input
        v-model.number="monthly_tax"
        placeholder="Enter Monthly tax"
        ></b-form-input>

        <b-form-input
        v-model.number="lease_payment"
        placeholder="Enter Lease Payment"
        ></b-form-input>

        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msrp: '',dealer_discount: '',rebates:'',down_das:'',sale_price:'',financed_amount:'',
                term:'',money_factor:'',tax:'',residual:'',residual_value:'',amortized:'',monthly_depreciation:'',
                monthly_interest:'',monthly_tax:'',lease_payment:'',
                selected: null,
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
             }
        },
        watch: {
            sale_price: function (val) {
                this.dealer_discount_cal();
                this.financed_amt();
            },
            residual: function(val) {
              this.residual_val();
            },
            residual_value: function (val) {
              this.amortized_cal();
             
            },
            amortized: function (val) {
              this.monthly_depreciation_cal()
              this.monthly_interest_cal();
            },
            monthly_interest: function (val) {
              this.monthly_tax_cal()
            },
            monthly_tax: function (val) {
              this.lease_payment_cal()
            }
        }
    }
</script>

<style scoped>

.container {
    width: 600px;
}

</style>