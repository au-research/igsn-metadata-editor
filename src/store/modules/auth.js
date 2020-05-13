const user = {
    namespaced: true,
    state: {
        status: '',
        token: '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
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
            return new Promise((resolve, reject) => {
                commit('logout')
                // delete axios.defaults.headers.common['Authorization']
                resolve()
              })
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