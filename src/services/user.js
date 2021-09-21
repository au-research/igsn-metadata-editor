import Keycloak from "keycloak-js";

let keycloakOptions = {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
    onLoad: "login-required",
};

const keycloak = Keycloak(keycloakOptions);

function getKcInstance() {
    return keycloak;
}

function initSSO() {
    return new Promise((resolve, reject) => {
        keycloak
        .init({ onLoad: "login-required" })
        .success((auth) => {
          resolve(keycloak)
        //   let access = {
        //     token: this.keycloak.token,
        //     refreshToken: this.keycloak.refreshToken
        //   };
        //   this.$store.dispatch("auth/loginSuccess", access);
        //   this.obtainUserInfo();
        })
        .error((e) => {
          console.error("Authenticated Failed", e);
          reject()
        });
    });
}

function logout() {
    return new Promise((resolve, reject) => {
        keycloak.logout()
    })
}

export {
    keycloak,
    initSSO,
    logout
}