import store from "../../src/store";


describe("store.js", () => {

  it('actionsのaddTodo起動すると、addTodoが保持しているデータがStateに保存されることを確認するテスト', function() {
    //次のテストのため、あえてid: 1としている
    store.dispatch('addTodo', {id: 1, task: '米を研ぐ', state: 'working'})
    expect(store.state.todos.length).toBe(1)
  });


  it('actionsのupdateId起動すると、stateが保持しているデータのidが1から0になることを確認するテスト', function() {
    expect(store.state.todos[0].id).toBe(1)
    store.dispatch('updateId')
    expect(store.state.todos[0].id).toBe(0)
  });


  it('actionsのdeleteItemを起動すると、stateのtodosに保存されているデータが消えることを確認するテスト', function() {
    expect(store.state.todos.length).toBe(1)
    store.dispatch('deleteItem', 0)
    expect(store.state.todos.length).toBe(0)
  });


  it('actionsのchangeStateを起動すると、todosに保存されているデータのstateがworkingからfinishになることを確認するテスト', function() {
    ///state.todosにデータを持たせる処理
    store.dispatch('addTodo', {id: 0, task: '米を研ぐ', state: 'working'})
    ///以下テスト
    expect(store.state.todos[0].state).toBe('working')
    store.dispatch('changeState', 0)
    expect(store.state.todos[0].state).toBe('finish')
  });


  it('actionsのchangeRadioStateに"working"や"finish"を持たせて起動すると、radioStateがそれぞれに変更されることを確認するテスト', function() {
    store.dispatch('changeRadioState','working')
    expect(store.state.radioState).toBe('working')
    store.dispatch('changeRadioState','finish')
    expect(store.state.radioState).toBe('finish')
  });
  
  
  it('gettersのinputTodosのlengthが2であることを確認するテスト', function() {
    ///state.todosに2つ目のデータを持たせる処理
    store.dispatch('addTodo', {id: 0, task: '米を炊く', state: 'working'})
    ///以下テスト
    expect(store.getters.inputTodos.length).toBe(2)
  });


  it('radiostateが"finish","working","all"となったとき、gettersのfilteredTodosのlengthがそれぞれ1,1,2となることを確認するテスト', function() {
    ///1つ目のテスト(radiostate === 'finish')
    expect(store.getters.filteredTodos.length).toBe(1)
    ///2つ目のテスト(radiostate === 'working')
    store.dispatch('changeRadioState','working')
    expect(store.getters.filteredTodos.length).toBe(1)
    ///3つ目のテスト(radiostate === 'all')
    store.dispatch('changeRadioState','all')
    expect(store.getters.filteredTodos.length).toBe(2)
  });
});