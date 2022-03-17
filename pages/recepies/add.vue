<template>
  <div>
    <h1>Add New Recepie</h1>
    <hr />
    <div class="row">
      <div>
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for=""><b>Title</b></label>
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
            <label for=""><b>Ingredients</b></label>
            <p>
              <i> Use one ingredient and amount for every row, like this: </i>
            </p>
            <p>1 egg</p>
            <p>2 dl sugar</p>
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
          <br />
          <div class="form-group">
            <label for=""> <b>Instructions</b> </label>
            <p>
              <i>
                Use a number before every instruction. And start a new line
                after every instruction, like this:
              </i>
            </p>
            <p>1. Put milk and honey in a bowl.</p>
            <p>2. Add spices.</p>
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
          <br />
          <input class="button add" type="submit" value="Submit" />
          <nuxt-link to="/recepies"
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
          author_id: this.$auth.user._id,
          full_name: this.$auth.user.full_name,
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
