<!-- Page showing recepies from one author. -->
<template>
  <div>
    <div v-if="recepies.length">
      <h1>Recipes by {{ recepies[0].full_name }}</h1>
      <hr>
      <div v-for="recepie in recepies" :key="recepie._id">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
        <nuxt-link :to="'/recepies/' + recepie._id">
          {{ recepie.title }}</nuxt-link
        >
      </div>
    </div>

    <div v-else>No records found.</div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  // Fetching recepies from one author.
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
