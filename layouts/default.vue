<template>
  <div>
    <nav>
      <div id="navbarsExampleDefault">
        <ul id="menu-left">
          <li>
            <nuxt-link id="logo" to="/">Our Recepies</nuxt-link>
          </li>
          <li>
            <nuxt-link class="menu-item" to="/recepies">Recepies</nuxt-link>
          </li>
          <li>
            <nuxt-link class="menu-item" to="/recepies/search"
              >Search</nuxt-link
            >
          </li>
        </ul>

        <ul id="menu-right" v-if="!$auth.loggedIn">
          <li>
            <nuxt-link class="menu-item" to="/user/register"
              >Register</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link class="menu-item" to="/user/login">Login</nuxt-link>
          </li>
        </ul>

        <ul v-if="$auth.loggedIn">
          <li>
            <nuxt-link class="menu-item" to="/user/my-account"
              >My Account</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link class="menu-item" to="/user/logout">Logout</nuxt-link>
          </li>
          <li>
            <button class="icon" onclick="myFunction()">
              <font-awesome-icon :icon="['fas', 'bars']" />
            </button>
          </li>
        </ul>
        <button class="icon" onclick="myFunction()">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
    </nav>

    <main>
      <nuxt />
    </main>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nerko+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Spicy+Rice&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lily+Script+One&display=swap");

body {
  font-family: Helvetica;
  margin: 0;
}

#logo {
  font-family: "Lily Script One";
  font-size: 25px;
  /* color: salmon; */
}

nav {
  color: white;
  overflow: hidden;
  background-color: #404040;
}

nav a {
  float: left;
  /* display: block; */
  /* text-align: center; */
  padding: 14px 16px;
  color: whitesmoke;
  text-decoration: none;
  font-size: 17px;
}

nav a:hover {
  color: salmon;
}

nav a.active {
  color: orangered;
}

main {
    margin: 10px;
}

ul {
  list-style-type: none;
}

@media screen and (max-width: 600px) {
  .menu-item {
    display: none;
  }
  nav a.icon {
    float: right;
    display: block;
  }
}
</style>
