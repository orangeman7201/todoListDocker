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
        <tr v-for="todo in showInputTodos" :key="todo.task">
          <td>{{todo.id}}</td>
          <td>{{todo.task}}</td>
          <td>
            <button v-if="unshowInputTodos[todo.id].state === 'working'" @click="changeState(todo.id)">作業中</button>
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
      unshowInputTodos:function() {
        return this.$store.getters.inputTodos;
      },
      showInputTodos:function() {
        const self = this;
        if(self.radioState === 'all') {
          return self.$store.getters.inputTodos;
        } else if (self.radioState === "working") {
          return self.$store.getters.inputTodos.filter(todo => todo.state === 'working' )
        } else {
          return self.$store.getters.inputTodos.filter(todo => todo.state === 'finish' )
        } 
      },
    },
    methods: {
      addTodo: function() {
        const Item = {id: '',task: this.newTodo, state: 'working'}
        this.unshowInputTodos.push(Item);
        this.newTodo = '';
        this.updateId();
      },
      deleteItem: function(index) {
        this.unshowInputTodos.splice(index,1)
      },
      changeState: function(index) {
        if (this.unshowInputTodos[index].state === 'working') {
          this.unshowInputTodos[index].state = 'finish'
        } else if (this.unshowInputTodos[index].state === 'finish') {
          this.unshowInputTodos[index].state = 'working'
        }
      },
      updateId: function() {
        for(let idNum = 0; idNum < this.unshowInputTodos.length; idNum++) {
          this.unshowInputTodos[idNum].id = idNum;
        }
      },
    },
  }
</script>
