import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export default {
  namespaced: true,
  state: {
    loginUser: {
      userName: '',
      userId: null,
    },
    isAuthenticated: false,
    users: [],
  },
  getters: {
    loginUser: (state) => state.loginUser,
    isAuthenticated: (state) => state.isAuthenticated,
    users: (state) => state.users,
  },
  mutations: {
    updateLoginUser(state, user) {
      state.loginUser = user;
    },
    resetLoginUser(state) {
      state.loginUser = {
        userName: '',
        userId: null,
      };
    },
    updateIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    updateUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async updateLoginUser({ commit }, param) {
      const res = await axios
        .post(`${BASE_URL}/login`, param)
        .then((resp) => resp)
        .catch((err) => err.response);
      console.log("ああああ");

      if (res.status === 200) {
        commit('updateLoginUser', res.data);
        commit('updateIsAuthenticated', true);
      } else {
        commit('resetLoginUser');
        commit('updateIsAuthenticated', false);
      }
    },
    async logout({ commit }) {
      await axios.post(`${BASE_URL}/logout`);
      commit('resetLoginUser');
      commit('updateIsAuthenticated', false);
    },
    async checkAuthenticated({ commit }) {
      const res = await axios
        .get(`${BASE_URL}/user`)
        .then((resp) => resp)
        .catch((err) => err.response);

      if (res.status === 200) {
        commit('updateLoginUser', res.data.user);
        commit('updateIsAuthenticated', true);
      } else {
        commit('resetLoginUser');
        commit('updateIsAuthenticated', false);
      }
    },
    async getAllUser({ commit }) {
      const users = await axios
        .get(`${BASE_URL}/user/all`)
        .then((res) => res.data);
      commit('updateUsers', users);
    },
  },
};
