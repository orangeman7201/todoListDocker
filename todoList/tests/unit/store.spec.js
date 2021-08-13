import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TodoList from "../../src/components/TodoList";
import store from "../../src/store";


const localVue = createLocalVue();
localVue.use(Vuex);

describe("TodoList.vue", () => {
  let wrapper = shallowMount(TodoList, {store, localVue});

  it('入力されたデータのtaskプロパティがsubmit-buttonを押すと{{todo.task}}に出力されることを確認するテスト', function() {
    wrapper.find("#input").setValue('米を研ぐ');
    wrapper.find('#submit-button').trigger('submit');
    wrapper.vm.$nextTick(() => { 
      expect(wrapper.find('#display').exists()).toBe(true);
      wrapper.find('#delete-button').trigger('click');
    });
  });
  
  it('delete-buttonを押したとき{{todo.task}}の出力が消えることを確認するテスト', function() {
    ///storeのstate.todosにデータを持たせるため、#inputにデータを入力しsubmitを行う
    wrapper.find("#input").setValue('米を買う');
    wrapper.find('#submit-button').trigger('submit');

    ///以下テスト
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#display').exists()).toBe(true);
      wrapper.find('#delete-button').trigger('click');
      wrapper.vm.$nextTick(() => { 
      expect(wrapper.find('#display').exists()).toBe(false);
      });
    });
  });

  it('state-working-buttonを押すとstate-finish-buttonのが出力されることを確認するテスト', function() {
    ///storeのstate.todosにデータを持たせるため、#inputにデータを入力しsubmitを行う
    wrapper.find("#input").setValue('米を食べる');
    wrapper.find('#submit-button').trigger('submit');

    ///以下テスト
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#state-working-button').text()).toBe('作業中');
      wrapper.find('#state-working-button').trigger('click');
      wrapper.vm.$nextTick(() => { 
        expect(wrapper.find('#state-finish-button').text()).toBe('完了');
        wrapper.find('#delete-button').trigger('click');
      });
    });
  });

  it('radioButtonを押すと{{todo.task}}に出力されていたものが消えることを確認するテスト', function() {
    ///storeのstate.todosにデータを持たせるため、#inputにデータを入力しsubmitを行う
    wrapper.find("#input").setValue('米を炊く');
    wrapper.find('#submit-button').trigger('submit');
    ///以下テスト
    wrapper.vm.$nextTick(() => {
    expect(wrapper.find('#display').exists()).toBe(true);
    wrapper.find('#finish').trigger('click');
    wrapper.vm.$nextTick(() => { 
        expect(wrapper.find('#display').exists()).toBe(false);
      })
    })
  });
});