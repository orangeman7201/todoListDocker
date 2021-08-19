import { shallowMount } from '@vue/test-utils';
import Component from '@/components/TodoDisplay.vue'

describe('Testing Display', () => {
    it('Propsで渡されたデータが正しく出力できるかのテスト', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          filteredTodos: [{id:0,　task:'米を研ぐ', state:'working'}]
        }
      })
      const display = wrapper.get('#display')
      expect(display.text()).toBe('米を研ぐ')
    }),
    it('ボタンを押したときIdを親に返せるかのテスト', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          filteredTodos: [{id:0,　task:'米を研ぐ', state:'working'}]
        }
      })
      const button = wrapper.get('#button')
      button.trigger('click')
      expect(wrapper.emitted('sendTaskState')[0][0]).toBe(0)
    })
})