<template>
  <v-container>
    <v-row>
            <v-col cols="12" md="6">
    <v-card flat>
      <v-card-title>
        Allocate Orders
      </v-card-title>
      <v-card-text>
              <v-card-text>
        <div class="mx-3">
          <v-form ref="loadingForm" v-model="isValid">
              <v-row>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-select
                        outlined
                        dense
                        v-model="formData.order_number"
                        :items="orders"
                        :item-text="(item) => item.description"
                        :item-value="(item) => item.id"
                        label="Select Order"
                        :rules="[rules.required]"
                      ></v-select>
                      </v-col>
                      <v-col md="12">
                        <v-select
                        outlined
                        dense
                        v-model="formData.fleet_id"
                        :items="vehicles"
                        :item-text="(item) => item.registration_number"
                        :item-value="(item) => item.id"
                        label="Select Fleet"
                        :rules="[rules.required]"
                      ></v-select>
                      </v-col>
                      <v-col>
                      <v-btn
                        @click="allocate"
                        class="mr-2"
                        elevation="0"
                        color="primary"
                      >
                        <span> Load </span>
                      </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
          </v-form>
        </div>
      </v-card-text>
      </v-card-text>
    </v-card>
    </v-col>
    <v-col cols="12" md="6">
    <v-card flat>
      <v-card-title>
        Dispatch Vehicles
      </v-card-title>
      <v-card-text>
        <div class="mx-3">
          <v-form ref="dispatchForm" v-model="isValid">
              <v-row>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-select
                        outlined
                        dense
                        v-model="dispatchForm.order_number"
                        :items="orders"
                        :item-text="(item) => item.description"
                        :item-value="(item) => item.id"
                        label="Select Order"
                        :rules="[rules.required]"
                        @change="getCustomer"
                      ></v-select>
                      </v-col>
                      <v-col md="12">
                        <v-select
                        outlined
                        dense
                        v-model="dispatchForm.fleet_id"
                        :items="vehicles"
                        :item-text="(item) => item.registration_number"
                        :item-value="(item) => item.id"
                        label="Select Fleet"
                        :rules="[rules.required]"
                      ></v-select>
                      </v-col>
                      <v-col>
                      <v-btn
                        @click="allocate"
                        class="mr-2"
                        elevation="0"
                        color="primary"
                      >
                        <span> Dispatch </span>
                      </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "userDashboard",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("getOrders");
      v.$store.dispatch("getVehicles");      
    });
  },
  data: () => ({
      rules: {
        required: (value) => !!value || 'Required.',
      },
      formData:{
        order_number:'',
        fleet_id:'',
        status:''
      },
      dispatchForm:{
        order_number:'',
        fleet_id:'',
        status:'',
        customer_id:''
      },
      isValid: true
  }),
  computed: {
    orders(){
      return this.$store.getters['orders']
    },
    vehicles(){
      return this.$store.getters['vehicles']
    }
  },
  methods: {
    allocate() {    
      if (!this.isValid) {
        this.$refs.loadingForm.validate()
      } else {
        this.formData.status= 'Loading'
        this.$store.dispatch('allocateOrder', { ...this.formData})
    }
    },
    dispatchOrders(){
      if (!this.isValid) {
        this.$refs.dispatchForm.validate()
      } else {
        this.formData.status= 'Loading'
        this.$store.dispatch('dispatchOrders', { ...this.dispatchForm})
    }
},
 getCustomer(){
   let selectedOrder = this.orders.filter(
          (a) => a.id === this.dispatchForm.order_number
        )
    this.dispatchForm.customer_id= selectedOrder[0].customer_id
 }
 
  },
};
</script>
<style scoped>
</style>