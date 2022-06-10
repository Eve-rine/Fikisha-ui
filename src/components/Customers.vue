<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <!-- <v-btn text small @click="$router.back()">
          <v-icon left> mdi-arrow-left </v-icon>
          Back
        </v-btn> -->
        <v-spacer />
        <div class="ma-2">
          <v-btn
            class="indigo white--text"
            :to="{
              name: 'Add Customer',
            }"
          >
            <v-icon class="mr-2">mdi-plus</v-icon>Add Customer
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-data-table
          :items-per-page="5"
          :headers="headers"
          :items="customerList"
        >
        <template v-slot:[`item.ID`]="{ index }">
          <!-- <template v-slot:item.ID="{ index }"> -->
            <span>{{ index + 1 }}</span>
          </template>
         <template v-slot:[`item.name`]="{ item }">
        <span>{{item.name }}</span>
         </template>
        <template v-slot:[`item.email`]="{ item }">
        <span>{{item.email }}</span>
         </template>
        <template v-slot:[`item.location`]="{ item }">
        <span>{{item.email }}</span>
         </template>
        <template v-slot:[`item.action`]="{ item }">
            <v-menu open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="text-capitalize links"
                  text
                  v-bind="attrs"
                  v-on="on"
                  small
                  ><v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  @click="removeItem(item)"
                >
                  <v-icon color="error" size="">mdi-delete</v-icon>
                  Remove
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CustomerList",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Exam/studentRegistrations");
    });
  },
  data: () => ({
    routeParameter: "",
    headers: [
      { text: "#S/N", value: "ID" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Location", value: "location" },
      { text: "Actions", value: "action" },
    ],
  }),
  computed: {
    customerList() {
      return [];
    },
  },
  methods: {
    removeItem() {
    },
  },
};
</script>
<style scoped>
</style>