<template>
  <div>
    <div>
      <h1>Recepies</h1>
      <nuxt-link to="/recepies/add">Add New</nuxt-link>
    </div>
    <hr />

    <div v-if="$route.params.created == 'yes'">Record added successfully</div>
    <div v-if="$route.params.deleted == 'yes'">Record deleted successfully</div>

    <div class="list-group" v-if="recepies.length">
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
  async asyncData(context) {
    const { data } = await context.$axios.get("/api/recepies");
    return {
      recepies: data,
    };
  },
};
</script>
