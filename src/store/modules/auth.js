const user = {
    namespaced: true,
    state: {
        token: null,
        user: null,
        refreshToken: null
    },
    mutations: {
        token(state, { token, refreshToken }) {
            state.token = token
            state.refreshToken = refreshToken
        },
        destroy(state) {
            state.token = ""
            state.refreshToken = ""
            state.user = {}
        },
        user(state, user) {
            state.user = user
        }
    },
    actions: {
        storeToken({ state, commit }, access) {
            commit('token', {
                token: access.token,
                refreshToken: access.refreshToken
            })
        },

        destroyToken({ commit }) {
            commit('destroy')
        },

        setUser({ commit }, user) {
            commit('user', {
                id: user.id,
                name: user.name ? user.name : user.email,
                email: user.email,
                allocations: user.allocations,
                dataCenters: user.dataCenters
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