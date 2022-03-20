<!-- Page for user login. -->
<template>
  <div>
    <h1>Login</h1>
    <hr />

    <div v-if="$route.params.registered == 'yes'">
      You have registered successfully
    </div>

    <div class="row">
      <div>
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">Email</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email"
            />
            <div class="invalid-feedback" v-if="errors && errors.email">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password"
            />
            <div class="invalid-feedback" v-if="errors && errors.password">
              {{ errors.password.msg }}
            </div>
          </div>

          <div class="alert alert-danger" v-if="login_error">
            {{ login_error }}
          </div>

          <input class="button add" type="submit" value="Login" />
          <nuxt-link to="/"><button class="button delete">Cancel</button></nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      errors: null,
      login_error: null,
      email: null,
      password: null,
      status: false,
    };
  },
  methods: {
    // Login with auth.
    submitForm() {
      this.$auth
        .loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message) {
            this.login_error = error.response.data.message;
          }
        });
    },
  },
};
</script>
