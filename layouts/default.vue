<template>
  <div>
    <nav>
      <nuxt-link to="/">Express CRUD</nuxt-link>

      <div id="navbarsExampleDefault">
        <ul>
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/articles">Articles</nuxt-link>
          </li>
        </ul>

        <ul v-if="!$auth.loggedIn">
          <li>
            <nuxt-link to="/user/register">Register</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/user/login">Login</nuxt-link>
          </li>
        </ul>

        <ul v-if="$auth.loggedIn">
          <li>
            <nuxt-link to="/user/my-account">My Account</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/user/logout">Logout</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <div>
      <nuxt />
    </div>
  </div>
</template>
