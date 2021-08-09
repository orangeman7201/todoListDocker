<template>
  <div style="padding-left: 500px">
    <input type="radio" id="all" value="all" v-model="radioState">全て
    <input type="radio" id="working" value="working" v-model="radioState">作業中
    <input type="radio" id="finish" value="finish" v-model="radioState">完了

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th align="center">タスク</th>
        <th>状態</th>
      </tr>
      </thead>

      <thead>
        <tr v-for="todo in showInputTodos" :key="todo.id">
          <td>{{todo.id}}</td>
          <td>{{todo.task}}</td>
          <td>
            <button v-if="InputTodos[todo.id].state === 'working'" @click="changeState(todo.id)">作業中</button>
            <button v-else @click="changeState(todo.id)">完了</button>
          </td>
          <td><button @click="deleteItem(todo.id); updateId()">削除</button></td>
        </tr>
      </thead>
    </table>

    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo">
      <input type="submit" value="追加">
    </form>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        newTodo: '',
        radioState: 'all',
      }
    },
    computed: {
      InputTodos() {
        return this.$store.getters.inputTodos;
      },
      showInputTodos() {
        return this.$store.getters.filteredTodos;
      },
    },
    methods: {
      addTodo() {
        const Item = {id: '',task: this.newTodo, state: 'working'}
        this.$store.dispatch('addTodo', Item)
        this.newTodo = '';
        this.updateId();
      },
      deleteItem(index) {
        this.$store.dispatch('deleteItem', index)
      },
      changeRadioState(index) {
        this.$store.dispatch('changeRadioState', index)
      },
      changeState(index) {
        this.$store.dispatch('changeState', index)
      },
      updateId() {
        this.$store.dispatch('updateId')
      },
    },
    watch: {
      radioState: {
        handler() {
          this.$store.dispatch('changeRadioState', this.radioState);
        },
        deep:true
      }
    }
  }
</script>
