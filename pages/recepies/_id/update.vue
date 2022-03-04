<template>
  <div>
    <h1>Update Article</h1>
    <hr />

    <div class="row">
      <div>
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">Title</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.title }"
              v-model="title"
            />
            <div class="invalid-feedback" v-if="errors && errors.title">
              {{ errors.title.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Ingredients</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.ingredients }"
              v-model="ingredients"
            />
            <div class="invalid-feedback" v-if="errors && errors.ingredients">
              {{ errors.ingredients.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Instructions</label>
            <textarea
              cols="30"
              rows="4"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.instructions }"
              v-model="instructions"
            ></textarea>
            <div class="invalid-feedback" v-if="errors && errors.instructions">
              {{ errors.instructions.msg }}
            </div>
          </div>

          <input type="submit" value="Submit" />
          <nuxt-link :to="'/recepies/' + $route.params.id">Cancel</nuxt-link>
        </form>
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
  data() {
    return {
      errors: null,
      title: null,
      ingredients: null,
      instructions: null,
    };
  },
  mounted() {
    this.fillFormData();
  },
  methods: {
    fillFormData() {
      this.title = this.recepie.title;
      this.ingredients = this.recepie.ingredients;
      this.instructions = this.recepie.instructions;
    },
    submitForm() {
      this.$axios
        .put("/api/recepies/" + this.$route.params.id, {
          title: this.title,
          ingredients: this.ingredients,
          instructions: this.instructions,
        })
        .then((response) => {
          console.log(response);
          if (response.data._id) {
            this.$router.push({
              name: "recepies-id",
              params: { updated: "yes", id: this.$route.params.id },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>
