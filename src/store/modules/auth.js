import Keycloak from 'keycloak-js'

let keycloakOptions = {
    url: process.env.VUE_APP_KEYCLOAK_URL || 'https://test.auth.ardc.edu.au/auth',
    realm: process.env.VUE_APP_KEYCLOAK_REALM || 'ARDC',
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID || 'igsn-editor',
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
        user: {}
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

            // return new Promise((resolve, reject) => {
            //     keycloak.updateToken(70)
            //         .success((refreshed) => {
            //             if (refreshed) {
            //                 console.debug('Token refreshed' + refreshed);
            //             } else {
            //                 console.warn('Token not refreshed, valid for '
            //                     + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            //             }
            //             console.log('refreshed')
            //             resolve()
            //         })
            //         .error(() => {
            //             console.error('Failed to refresh token');
            //             reject()
            //         })
            //         .then(() => {
            //             console.log('here')
            //         })
            // })
        },
        login({ commit }, { username, password }) {
            commit('auth_request')
            return new Promise((resolve, reject) => {
                // TODO axios http call
                let token = "asdf"
                commit('auth_success', token)
                resolve()
                // set axios default headers for all requests
                // axios.defaults.headers.common['Authorization'] = token
            })
        },
        logout({ commit }) {
            // let keycloak = Keycloak(keycloakOptions);
            // keycloak.init().then(() => {
            if (keycloak && keycloak.logout == 'function') {
                window.keycloak.logout()
            }
            commit('logout')
            // })
            
            // console.log('here')
            // Keycloak.logout()
            // keycloak.logout().then((auth) => {
            //     console.log(auth)
            //     commit('logout')
            // })
            // return new Promise((resolve, reject) => {
            //     commit('logout')
            //     keycloak.logout().then(resolve())
            //     // delete axios.defaults.headers.common['Authorization']
            //     // resolve()
            // })
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