<template>
  <div>
    <nav>
      <div class="top-nav" id="menu-links">
        <nuxt-link id="logo" to="/">Our Recepies</nuxt-link>
        <nuxt-link class="menu-item" to="/recepies">Recepies</nuxt-link>
        <nuxt-link class="menu-item" to="/recepies/search">Search</nuxt-link>
        <div v-if="!$auth.loggedIn">
          <nuxt-link class="menu-item" to="/user/register">Register</nuxt-link>

          <div class="nav-item">
            <nuxt-link class="menu-item" to="/user/login">Login</nuxt-link>
          </div>
        </div>
        <div v-if="$auth.loggedIn">
          <nuxt-link class="menu-item" to="/user/my-account"
            >My Account</nuxt-link
          >
          <div class="nav-item">
            <nuxt-link class="menu-item" to="/user/logout">Logout</nuxt-link>
          </div>
        </div>
      </div>
      <!-- <button v-if="showHamburgerIcon" id="x-icon" @click="myFunction()">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button> -->
      <button id="hamburger-icon" @click="myFunction()">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
    </nav>
    <!-- <nav>
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
    </nav> -->

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHamburgerIcon: true,
    };
  },
  mounted: function () {
    this.showHamburgerIcon = true;
    // this.$nextTick(function () {
    //   this.onResize();
    // });
    // window.addEventListener("resize", this.onResize);
    if (matchMedia("only screen and (min-width: 601px)").matches) {
      console.log("blä");
      var x = document.getElementById("menu-links");
      x.className = "top-nav";
    }
  },
  methods: {
    // onResize() {
    //   console.log("Resized");
    //   if (screen.width > 600) {
    //     var x = document.getElementById("menu-links");
    //     x.className = "top-nav";
    //   }
    // },
    myFunction() {
      console.log(this.showHamburgerIcon);
      var x = document.getElementById("menu-links");
      if (x.className === "top-nav") {
        x.className += " responsive";
      } else {
        x.className = "top-nav";
      }
      this.showHamburgerIcon = !this.showHamburgerIcon;
    },
  },
};
</script>

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
  position: sticky;
  width: 100%;
  top: 0px;
  overflow: hidden;
  background-color: #404040;
}

nav a {
  float: left;
  display: block;
  text-align: center;
  padding: 14px 16px;
  color: whitesmoke;
  text-decoration: none;
  font-size: 17px;
}

/* .responsive {
    padding-bottom: 10px;
} */

/* .responsive .menu-item {
  line-height: 0.4em;
} */

#x-icon,
#hamburger-icon {
  float: right;
  margin-right: 10px;
  margin-top: 22px;
  color: rgb(64, 64, 64);
}

#hamburger-icon:hover {
  cursor: pointer;
}

main {
  padding: 10px;
  color: #404040;
  line-height: 1.9em;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

textarea {
  max-width: 95%;
}

ul {
  list-style-type: none;
}

.top-nav {
  overflow: hidden;
}

.menu-item {
  margin-top: 8px;
}

.menu-item:hover {
  text-decoration: underline;
}

.ingredients-and-instructions {
  white-space: pre-line;
}

.button {
  border: none;
  padding: 6px 14px;
  color: whitesmoke;
  background: grey;
}

.button:hover {
  text-decoration: underline;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #404040;
}

a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 600px) {
  .menu-item {
    display: none;
  }
  /* .topnav #hamburger-menu {
    float: right;
    display: block;
  } */
  .top-nav a:not(:first-child) {
    display: none;
  }
  .top-nav.responsive {
    position: relative;
  }
  #x-icon,
  #hamburger-icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .top-nav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

@media screen and (min-width: 601px) {
  #hamburger-icon,
  #x-icon {
    display: none;
  }
}
</style>
