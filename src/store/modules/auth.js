import Keycloak from 'keycloak-js'
import Vue from 'vue'

let keycloakOptions = {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
    onLoad: 'login-required'
}

let keycloak = Keycloak(keycloakOptions);
window.keycloak = keycloak;

const user = {
    namespaced: true,
    state: {
        status: '',
        token: keycloak.token,
        refreshToken: keycloak.refreshToken,
        user: {},
        options: keycloakOptions
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, { token, refreshToken }) {
            state.status = 'success'
            state.token = token
            state.refreshToken = refreshToken
        },
        auth_userInfo(state, info) {
            state.user = info
        },
        auth(state, user) {
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.user = ''
        },
    },
    actions: {
        initSSO({ commit }) {
            return new Promise((resolve, reject) => {
                keycloak.init({ onLoad: keycloakOptions.onLoad }).success((auth) => {
                    commit("auth_success", { token: keycloak.token, refreshToken: keycloak.refreshToken })
                    keycloak.loadUserInfo()
                        .success((user) => commit("auth_userInfo", user))
                    resolve()
                    window.keycloak = keycloak
                }).error(() => {
                    console.error("Authenticated Failed");
                });
            })
        },
        refresh({ commit }) {
            return keycloak.updateToken(1)
                .success((refreshed) => {
                    if (refreshed) {
                        console.log("Refreshed")
                    } else {
                        console.log("Token not refreshed");
                    }
                })
                .error((err) => console.error(err))
        },
        login({ commit }, { username, password }) {
            commit('auth_request')
            return new Promise((resolve, reject) => {
                let token = "asdf"
                commit('auth_success', token)
                resolve()
            })
        },
        logout({ commit }) {

            if (keycloak && keycloak.logout == 'function') {
                window.keycloak.logout()
            }
            commit('logout')
        }
    },
    getters: {
        isLoggedIn: (state) => {
            return !!state.token
        },
        user: (state) => {
            return state.user
        },
        token: (state) => {
            return state.token
        }
    }
}

export default user