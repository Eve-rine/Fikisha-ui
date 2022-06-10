<template>
  <v-container>
    <v-card flat>
      <v-card-text>
        Dashboard
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "userDashboard",
  beforeRouteEnter(to, from, next) {
    next(() => {
    });
  },
  data: () => ({
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