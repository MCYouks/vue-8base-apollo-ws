<template>
  <div class="about">
    <h1>This is a protected route.</h1>

    <div v-if="user">
      <p>ID: {{ user.id }}</p>
      <p>EMAIL: {{ user.email }}</p>
      <p>FRUITS: {{ fruits }}</p>
    </div>

    <span v-else>Loading...</span>
  </div>
</template>

<script>
import { api } from "@/8base";
import { CURRENT_USER_QUERY } from "@/utils/graphql";
import { useFruitSubscription } from "@/composables/useFruit.js";
import { useFruitsQuery } from "@/composables/useFruit.js";

export default {
  setup() {
    // Fruits Query API
    const { fruits } = useFruitsQuery();

    // Fruit Subscription API
    const { result } = useFruitSubscription({
      filter: {
        mutation_in: ["create", "update"]
      }
    });

    console.log({ result });

    return {
      // States
      fruits
    };
  },

  data() {
    return {
      user: undefined
    };
  },
  mounted() {
    /**
     * Queryies the authenticated users information from 8base.
     */
    api
      .query({
        query: CURRENT_USER_QUERY
      })
      .then(resp => {
        this.user = resp.data.user;
      });
  }
};
</script>
