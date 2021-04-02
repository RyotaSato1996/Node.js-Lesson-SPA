import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export default {
  state: {
    todoList: [],
  },
  getters: {
    todoList: (state) => state.todoList,
    completedTodoList: (state, getters) => {
      const { todoList } = getters;
      const completedTodoList = todoList.filter((v) => v.isCompleted);
      return completedTodoList;
    },
  },
  mutations: {
    updateTodoList(state, todoList) {
      state.todoList = todoList;
    },
  },
  actions: {
    async updateTodoList({ commit }) {
      const todoList = await axios
        .get(`${BASE_URL}/todo`)
        .then((res) => res.data);
      commit('updateTodoList', todoList);
    },
    async updateTodo({ dispatch }, todo) {
      await axios.put(`${BASE_URL}/todo/${todo.id}`, todo);
      dispatch('updateTodoList');
    },
    async addTodo({ dispatch }, todo) {
      await axios.post(`${BASE_URL}/todo`, todo);
      dispatch('updateTodoList');
    },
    async deleteTodo({ dispatch }, todo) {
      await axios.delete(`${BASE_URL}/todo/${todo.id}`, todo);
      dispatch('updateTodoList');
    },
  },
};
