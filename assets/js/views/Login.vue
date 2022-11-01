<template>
  <div id="login">
    <label>Login</label>
    <section class="registerSection">
      <div class="d-flex mb-2 inputContainer">
        <n-auto-complete
          :options="options"
          type="email"
          placeholder="Email"
          v-model:value="email"
          @keyup.enter="signIn(email, password)"
        ></n-auto-complete>
        <n-input
          type="password"
          show-password-on="click"
          placeholder="Password"
          v-model:value="password"
          @keyup.enter="signIn(email, password)"
        ></n-input>
      </div>
      <div class="w-100 d-flex flex-column buttonContainer">
        <n-button class="w-100" @click="signIn(email, password)">Sign in</n-button>
        <n-button class="w-100" @click="googleSignin()"
          ><span style="margin-right: 5px">Log in with </span>
          <i class="fa-brands fa-google" style="margin-right: 2px"></i
        ></n-button>

        <a class="mt-4" id="forgotPassword" @click="openLink()">Forgot password?</a>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import {
  NButton,
  NInput,
  useMessage,
  useLoadingBar,
  NCard,
  NSpace,
  darkTheme,
  NAutoComplete,
  NConfigProvider,
  useNotification,
} from "naive-ui";

export default {
  components: {
    NButton,
    NInput,
    NCard,
    NSpace,
    NAutoComplete,
    NConfigProvider,
  },
  data() {
    return {
      password: null,
      arr: [
        "Sign in to increase your productivity",
        "Connect with your favorite tools",
        "Expand your potential.",
      ],
    };
  },
  mounted() {
    window.$loadingbar = useLoadingBar();
    window.$message = useMessage();
    window.$notification = useNotification();
  },
  methods: {
    openLink() {
      window.open("https://developerplatform.net/forgotpassword", "_blank");
    },
    async googleSignin() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          this.email = "";
          this.password = "";
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
          await this.$store.dispatch("CREATE_ACCOUNT", result.user);
          await this.$store.dispatch("GET_PAGE_VISITS");
          await this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
          this.$router.push("/");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    signIn(email, password) {
      if (email === "" || password === null) {
        window.$message.error("Please fill in all fields");
        return;
      }
      window.$loadingbar.start();
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          window.$message.success("Successfully logged in.");
          await this.$store.dispatch("CREATE_ACCOUNT", user);
          await this.$store.dispatch("GET_PAGE_VISITS");
          await this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
          window.$loadingbar.finish();
          this.$router.push("/options");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === undefined) {
            window.$message.error("Report this error to admin: " + error);
            window.$loadingbar.error();
            return;
          }

          if (errorCode.includes("user-not-found")) {
            window.$message.error("User is not registered.");
            window.$loadingbar.error();
            return;
          } else if (errorCode.includes("wrong-password")) {
            window.$message.error("Wrong password.");
            window.$loadingbar.error();
            return;
          } else if (errorCode.includes("invalid-email")) {
            window.$message.error("Invalid email.");
            window.$loadingbar.error();
          } else {
            window.$message.error(errorMessage);
            window.$loadingbar.error();
          }
        });
    },
  },

  setup() {
    const valueRef = ref("");
    return {
      darkTheme,
      email: valueRef,
      options: computed(() => {
        return [
          "@gmail.com",
          "@yahoo.com",
          "@hotmail.com",
          "@outlook.com",
          "@apple.com",
        ].map((suffix) => {
          const prefix = valueRef.value.split("@")[0];
          return {
            label: prefix + suffix,
            value: prefix + suffix,
          };
        });
      }),
    };
  },
};
</script>

<style lang="scss">
body {
  width: 500px;
  height: 500px;
}
</style>
