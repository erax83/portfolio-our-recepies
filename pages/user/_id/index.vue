<template>
  <div>
    <div v-if="recepies.length">
      <h1>Recepies by {{ recepies[0].full_name }}</h1>
      <nuxt-link
        :to="'/recepies/' + recepie._id"
        v-for="recepie in recepies"
        :key="recepie._id"
      >
        {{ recepie.title }}
      </nuxt-link>
    </div>

    <div v-else>No records found.</div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData(context) {
    const { data } = await context.$axios.get(
      "/api/anotherUserRecepies/" + context.route.params.id
    );
    return {
      recepies: data,
    };
  },
};
</script>
