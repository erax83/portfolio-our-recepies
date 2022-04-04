<!-- Use account page with users own recepies.  --> 
<template>
  <div>
    <h1>{{ this.$auth.user.full_name }}</h1>

    <div>
      <div>
        <div><strong>Email:</strong> {{ this.$auth.user.email }}</div>
        <nuxt-link to="/user/logout"
          ><button class="button delete">Logout</button></nuxt-link
        >
      </div>
    </div>

    <hr />

    <h3>My Recipes</h3>
    <nuxt-link to="/recepies/add"
      ><button class="button add">Add New</button></nuxt-link
    >

    <div v-if="recepies.length">
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
  // Fetching users own recepies.
  async asyncData(context) {
    const { data } = await context.$axios.get(
      "/api/userRecepies/" + context.app.$auth.user._id
    );
    return {
      recepies: data,
    };
  },
};
</script>
