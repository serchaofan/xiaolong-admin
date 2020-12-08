export default {
  namespaced: true,
  state: {
    namespace: 'default'
  },
  mutations: {
    changeNamespace(state, namespace) {
      state.namespace = namespace
    }
  }
}
