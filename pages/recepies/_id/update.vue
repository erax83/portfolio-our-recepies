<template>
  <div>
    <h1>Update Recepie</h1>
    <hr />

    <div class="row">
      <div>
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for=""> <b>Title</b> </label>
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
          <br />
          <div class="form-group">
            <label for=""><b>Ingredients</b> </label>
            <br />
            <textarea
              cols="45"
              rows="10"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.ingredients }"
              v-model="ingredients"
            ></textarea>
            <div class="invalid-feedback" v-if="errors && errors.ingredients">
              {{ errors.ingredients.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for=""> <b>Instructions</b> </label>
            <br />
            <textarea
              cols="45"
              rows="10"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.instructions }"
              v-model="instructions"
            ></textarea>
            <div class="invalid-feedback" v-if="errors && errors.instructions">
              {{ errors.instructions.msg }}
            </div>
          </div>

          <input class="button add" type="submit" value="Submit" />
          <nuxt-link :to="'/recepies/' + $route.params.id"
            ><button class="button delete">Cancel</button></nuxt-link
          >
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
