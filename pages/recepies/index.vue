<template>
  <div>
    <div>
      <h1>Recepies</h1>
      <nuxt-link to="/recepies/add"
        ><button class="button add">Add New</button></nuxt-link
      >
    </div>
    <hr />

    <div v-if="$route.params.created == 'yes'">Record added successfully</div>
    <div v-if="$route.params.deleted == 'yes'">Record deleted successfully</div>

    <h3>Last added recepies</h3>
    <div class="list-group" v-if="recepies.length">
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
  async asyncData(context) {
    const { data } = await context.$axios.get("/api/recepies");
    return {
      recepies: data,
    };
  },
};
</script>
