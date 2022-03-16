<template>
  <div>
    <h1>{{ this.$auth.user.full_name }}</h1>

    <div class="card">
      <div class="card-body">
        <div><strong>Email:</strong> {{ this.$auth.user.email }}</div>
        <nuxt-link to="/user/logout"
          ><button class="button">Logout</button></nuxt-link
        >
      </div>
    </div>

    <hr />

    <h3>My Recepies</h3>
    <nuxt-link to="/recepies/add"
      ><button class="button">Add New</button></nuxt-link
    >

    <br />
    <div v-if="$route.params.created == 'yes'">Record added successfully</div>
    <div v-if="$route.params.deleted == 'yes'">Record deleted successfully</div>

    <div v-if="recepies.length">
      <div v-for="recepie in recepies" :key="recepie._id">
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
