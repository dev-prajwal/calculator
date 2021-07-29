<template>
  <div class="container">

      <h2 class="text-center py-3">Calculator</h2>

      <b-form-group label-cols="4" label-cols-lg="3" label="MSRP : " label-for="input-sm">
        <b-form-input v-model.number="msrp" placeholder="Enter MSRP" type="number" @change="addStore" ></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="3" label="Dealer Discount:" label-for="input-sm">
        <b-form-input v-model.number="dealer_discount_value" placeholder="Enter Dealer Discount" type="number"></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="3" label="Rebates:" label-for="input-sm">
        <b-form-input v-model.number="rebates" placeholder="Enter Rebates" type="number"></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="3" label="DOWN / DAS:" label-for="input-sm">
        <b-form-input v-model.number="down_das" placeholder="Enter Down / DAS" type="number" ></b-form-input>
      </b-form-group>         

      <b-form-group label-cols="4" label-cols-lg="3" label="Term:" label-for="input-sm">
        <b-form-select v-model="term" :options="options"></b-form-select>
      </b-form-group>     

      <b-form-group label-cols="4" label-cols-lg="3" label="Sale Price:" label-for="input-sm">
        <b-form-input v-model.number="sale_price_value" placeholder="Enter Sale Price" type="number"></b-form-input>
      </b-form-group> 
      
      <h2 class="text-right">Lease Payment: ${{ lease_payment }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msrp: 0,
      dealer_discount: 0,
      rebates: 0,
      down_das: 0,
      sale_price: 0,
      financed_amount: 0,
      money_factor: 0.000125,
      tax: 0.09,
      residual: 0.55,
      lease_payment: "",
      term: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: 12, text: "12" },
        { value: 24, text: "24" },
        { value: 36, text: "36" },
        { value: 48, text: "48" },
        { value: 60, text: "60" },
        { value: 72, text: "72" },
      ],
    };
  },

  methods: {
    calculate_all() {
      // let sale_price = Number(this.msrp) - (Number(this.rebates) + this.dealer_discount)
      this.sale_price =
        Number(this.msrp) - (Number(this.rebates) + this.dealer_discount);
      let residual_value = Number(this.msrp) * Number(this.residual);
      let financed_amount =
        Number(this.msrp) -
        Number(this.dealer_discount) -
        Number(this.rebates) -
        Number(this.down_das);
      let armortized = financed_amount - residual_value;
      let monthly_depreciation = armortized / Number(this.term);
      let monthly_interest =
        (financed_amount + residual_value) * this.money_factor;
      let monthly_tax = (monthly_depreciation + monthly_interest) * this.tax;
      this.lease_payment = (
        monthly_depreciation +
        monthly_interest +
        monthly_tax
      ).toFixed(2);
    },
    addStore() {
      this.$store.commit("setData", {
        msrp: this.msrp,
        dealer_discount: this.dealer_discount_value,
        rebates: this.rebates,
        down_das: this.down_das,
        sale_price: this.sale_price_value,
        term: this.term,
      });
    },
  },
  computed: {
    dealer_discount_value: {
      get: function () {
        return this.dealer_discount;
      },
      set: function (dealer_discount) {
        this.dealer_discount = Number(dealer_discount);
        this.sale_price = Number(this.msrp) - Number(this.rebates) + this.dealer_discount;
        this.calculate_all();
      },
    },
    sale_price_value: {
      get: function () {
        return this.sale_price;
      },
      set: function (sale_price) {
        var val = Number(this.msrp) - Number(sale_price) - Number(this.rebates);
        this.dealer_discount = val < 0 ? 0 : val;
        this.sale_price =
          Number(this.msrp) -
          (Number(this.dealer_discount) + Number(this.rebates));
        this.calculate_all();
      },
    },
  },
  watch: {
    msrp: function (val) {
      this.calculate_all();
    },
    rebates: function (val) {
      this.calculate_all();
    },
    down_das: function (val) {
      this.calculate_all();
    },
    term: function (val) {
      this.calculate_all();
    },
    sale_price: function (val) {
      this.calculate_all();
    },
  },
  mounted() {
    this.msrp = this.$store.state.payload.msrp;
    this.dealer_discount = this.$store.state.payload.dealer_discount;
    this.rebates = this.$store.state.payload.rebates;
    this.down_das = this.$store.state.payload.down_das;
    this.sale_price = this.$store.state.payload.sale_price;
    this.term = this.$store.state.payload.term;
  },
};
</script>

<style scoped>
.container {
  width: 600px;
  margin-top: 50px;
  margin-bottom: 100px;
}

</style>