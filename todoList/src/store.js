import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    radioState: 'all'
  },
  getters: {
    inputTodos: state => {
      return state.todos;
    },
    filteredTodos: state => {
      if(state.radioState === 'all') {
        return state.todos;
      } else if (state.radioState === "working") {
        return state.todos.filter(todo => todo.state === 'working' )
      } else {
        return state.todos.filter(todo => todo.state === 'finish' )
      } 
    }
  },
  mutations: {
    addTodo(state, inputItem) {
      state.todos.push(inputItem);
    },
    changeRadioState(state, inputRadioState) {
      state.radioState = inputRadioState;
    },
    deleteItem(state, index) {
      state.todos.splice(index,1);
    },
    changeState(state, index) {
      if (state.todos[index].state === 'working') {
        state.todos[index].state = 'finish'
      } else if (state.todos[index].state === 'finish') {
        state.todos[index].state = 'working'
      }
    },
    updateId(state) {
      for(let idNum = 0; idNum < state.todos.length; idNum++) {
        state.todos[idNum].id = idNum;
      }
    }
  },
  actions: {
    addTodo(context, inputItem) {
      context.commit('addTodo', inputItem);
    },
    changeRadioState(context, inputRadioState) {
      context.commit('changeRadioState', inputRadioState);
    },
    deleteItem(context, index) {
      context.commit('deleteItem', index);
    },
    changeState(context, index) {
      context.commit('changeState', index);
    },
    updateId(context) {
      context.commit('updateId');
    },
  }
})