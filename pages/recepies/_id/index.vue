<template>
  <div>
    <h1>Article Details</h1>

    <hr />

    <div v-if="$route.params.updated == 'yes'">Record updated successfully</div>

    <h2>{{ recepie.title }}</h2>

    <p>{{ recepie.ingredients }}</p>

    <p>{{ recepie.instructions }}</p>
    <p>
      Author:
      <nuxt-link :to="'/user/' + recepie.author_id" :key="recepie._id">
        {{ recepie.full_name }}
      </nuxt-link>
    </p>

    <hr />
    <div>
      <div>
        <nuxt-link
          v-if="$auth.loggedIn && $auth.user._id == recepie.authorId"
          :to="'/recepies/' + recepie._id + '/update'"
          >Update</nuxt-link
        >
        <button
          v-if="$auth.loggedIn && $auth.user._id == recepie.authorId"
          @click="deleteRecord()"
        >
          Delete
        </button>
        <nuxt-link v-if="$auth.loggedIn" to="/user/my-account"
          >Back to My Articles</nuxt-link
        >
      </div>
      <nuxt-link to="/recepies">Back to Recepies</nuxt-link>
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
  },
};
</script>
