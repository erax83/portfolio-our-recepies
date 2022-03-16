<template>
  <div>
    <div>
      <h1>Search</h1>
    </div>
    <form action="" method="post" @submit.prevent="test()">
      <div class="form-group">
        <label for=""> <b>Title: </b></label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors && errors.title }"
          v-model="searchWord"
        />
        <div class="invalid-feedback" v-if="errors && errors.title">
          {{ errors.title.msg }}
        </div>
      </div>

      <input class="button" type="submit" value="Submit" />
      <!-- <nuxt-link to="/recepies">Back to Recepies</nuxt-link> -->
    </form>

    <hr />
    <div>
      <h3>Results</h3>
    </div>

    <div class="alert alert-success" v-if="$route.params.created == 'yes'">
      Record added successfully
    </div>
    <div class="alert alert-success" v-if="$route.params.deleted == 'yes'">
      Record deleted successfully
    </div>

    <div class="list-group" v-if="recepies.length">
      <div v-for="recepie in this.recepies" :key="recepie._id">
        <nuxt-link :to="'/recepies/' + recepie._id">
          {{ recepie.title }}</nuxt-link
        >
      </div>
    </div>

    <!-- <div v-else>No records found.</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchWord: "",
      recepies: [],
    };
  },
  methods: {
    async test() {
      const data = await this.$axios.$get(
        "/api/searchRecepies/" + this.searchWord
      );
      await console.log(data);
      this.recepies = data;
    },
  },
};
</script>
