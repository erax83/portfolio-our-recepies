<template>
  <div>
    <h1>Add New Recepie</h1>
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
          <nuxt-link to="/recepies">Cancel</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      errors: null,
      title: null,
      ingredients: null,
      instructions: null,
    };
  },
  methods: {
    submitForm() {
      this.$axios
        .post("/api/recepies", {
          title: this.title,
          ingredients: this.ingredients,
          instructions: this.instructions,
        })
        .then((response) => {
          console.log(response);
          if (response.data._id) {
            this.$router.push({ name: "recepies", params: { created: "yes" } });
          }
        })
        .catch((error) => {
          console.log("inside error");
          console.log(error);
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>
