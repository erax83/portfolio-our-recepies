<template>
  <div>
    <div v-if="$route.params.updated == 'yes'">Record updated successfully</div>

    <h2>{{ recepie.title }}</h2>
    <hr />
    <h4>Ingredients</h4>
    <p class="ingredients-and-instructions">{{ recepie.ingredients }}</p>
    <h4>Instructions</h4>
    <p class="ingredients-and-instructions">{{ recepie.instructions }}</p>
    <p>
      <i>Author:</i>
      <nuxt-link :to="'/user/' + recepie.author_id" :key="recepie._id">
        {{ recepie.full_name }}
      </nuxt-link>
    </p>
    <hr />

    <div>
      <div>
        <div v-if="$auth.loggedIn && $auth.user._id == recepie.author_id">
          <nuxt-link :to="'/recepies/' + recepie._id + '/update'"
            ><button class="button update">Uppdate</button></nuxt-link
          >
          <button class="button delete" @click="deleteRecord()">Delete</button>
        </div>

        <!-- <button v-if="$auth.loggedIn" @click="addToFavourites()">
          Add to favourites
        </button> -->
        <font-awesome-icon :icon="['fas', 'angle-right']" />
        <nuxt-link v-if="$auth.loggedIn" to="/user/my-account"
          >My Recepies</nuxt-link
        >
        <br />
        <font-awesome-icon :icon="['fas', 'angle-right']" />
        <nuxt-link to="/recepies">Recepies</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData(context) {
    const { data } = await context.$axios.get(
      "/api/recepies/" + context.route.params.id
    );
    return {
      recepie: data,
    };
  },
  methods: {
    deleteRecord() {
      if (confirm("Are you sure?") === true) {
        this.$axios
          .delete("/api/recepies/" + this.$route.params.id)
          .then((response) => {
            if (response.data._id) {
              this.$router.push({
                name: "recepies",
                params: { deleted: "yes" },
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // addToFavourites() {
    //   console.log("author_id: " + this.$auth.user._id);
    //   this.$axios
    //     .post("/api/favourites", {
    //       author_id: this.$auth.user._id,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       if (response.data._id) {
    //         this.$router.push({
    //           name: "favourites",
    //           params: { created: "yes" },
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("inside error");
    //       console.log(error);
    //       if (error.response.data.errors) {
    //         this.errors = error.response.data.errors;
    //       }
    //     });
    // },
  },
};
</script>
