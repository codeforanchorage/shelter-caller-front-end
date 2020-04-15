//import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import sinon from 'sinon'
import Login from '@/views/Login.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login.vue', () => {
    let store, login, $router, wrapper
    beforeEach(() => {
        login = sinon.stub()
        store = new Vuex.Store({
            actions: { login }
        })
        $router = { push: sinon.spy() }
        wrapper = shallowMount(Login, {
            store,
            localVue,
            mocks:{$router}
        })
    })
    it('dispatch login on sendLogin with name and password', async () => {
        login.resolves()
        
        let e = {target: {
            reset: () => {}, querySelector: () => ({blur: () => {}})
        }}
        const loginData = {user: "a_user", password:"123"}
        wrapper.setData(loginData)
        await wrapper.vm.sendLogin(e)
        sinon.assert.calledOnce(login)
        sinon.assert.calledWith(login,  sinon.match.any, sinon.match(loginData))

    })
    it("should redirect to index page after succesful login", async () => {
        login.resolves()
        
        let e = {target: {
            reset: () => {}, querySelector: () => ({blur: () => {}})
        }}
        const loginData = {user: "a_user", password:"123"}
        wrapper.setData(loginData)
        await wrapper.vm.sendLogin(e)

        sinon.assert.calledOnce($router.push)
        sinon.assert.calledWith($router.push, '/')
    })
    it("should reset password when login fails", async () => {
        login.rejects()
        let reset = sinon.spy()
        let e = {target: {
            reset, querySelector: () => ({blur: () => {}})
        }}
        const loginData = {user: "a_user", password:"123"}
        wrapper.setData(loginData)
        await wrapper.vm.sendLogin(e)

        sinon.assert.calledOnce(reset)
        sinon.assert.notCalled($router.push)
    })
})