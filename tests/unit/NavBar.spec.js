import { expect } from 'chai'
import { shallowMount, createLocalVue, config } from '@vue/test-utils'
import Vuex from 'vuex'
import sinon from 'sinon'
import NavBar from '@/components/NavBar.vue'

config.stubs["font-awesome-icon"] = true
config.stubs["router-link"] = true

const localVue = createLocalVue()
localVue.use(Vuex)

describe('NavBar.vue', () => {
    let store, isLoggedIn, hasRoleStub, logOut
    beforeEach(() => {
        isLoggedIn = sinon.stub()
        hasRoleStub = sinon.stub()
        logOut = sinon.spy()
        store = new Vuex.Store({
            getters: {
                isLoggedIn,
                hasRole: () => hasRoleStub
            },
            actions: { logOut }
        })
    })
    it('renders sign out when logged in', () => {
        isLoggedIn.returns(true)
        hasRoleStub.returns(true)
        const wrapper = shallowMount(NavBar, {store, localVue})
        expect(wrapper.text()).to.include("sign out")
    })
    it('renders sign in when logged out', () => {
        isLoggedIn.returns(false)
        hasRoleStub.returns(false)
        const wrapper = shallowMount(NavBar, {store, localVue})
        expect(wrapper.text()).to.include("sign in")
    })
    it('does not render admin links when hasrole is false', () => {
        isLoggedIn.returns(true)
        hasRoleStub.returns(false)
        const wrapper = shallowMount(NavBar, {store, localVue})
        expect(wrapper.text()).not.to.include("Prefs")
        expect(wrapper.text()).not.to.include("Shelters")
    })
    it('should dispatch logout when signout is called', () => {
        isLoggedIn.returns(true)
        hasRoleStub.returns(false)
        const wrapper = shallowMount(NavBar, {store, localVue})
        wrapper.vm.signout()
        sinon.assert.calledOnce(logOut);
    })
})
