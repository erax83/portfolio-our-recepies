<template>
  <div>
    <h1>My Account</h1>

    <hr />

    <div class="card">
      <div class="card-body">
        <h4>{{ this.$auth.user.full_name }}</h4>
        <div><strong>Email:</strong> {{ this.$auth.user.email }}</div>
        <nuxt-link to="/user/logout">Logout</nuxt-link>
      </div>
    </div>

    <hr />
    <div>
      <h1>Articles</h1>
      <nuxt-link to="/recepies/add">Add New</nuxt-link>
    </div>
    <hr />

    <div v-if="$route.params.created == 'yes'">Record added successfully</div>
    <div v-if="$route.params.deleted == 'yes'">Record deleted successfully</div>

    <div v-if="recepies.length">
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
    console.log("Testinggg: " + context.app.$auth.user._id);
    const { data } = await context.$axios.get(
      "/api/userRecepies/" + context.app.$auth.user._id
    );
    return {
      recepies: data,
    };
  },
};
</script>
