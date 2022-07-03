import {
	createStore
} from 'vuex'
import state from './state'
import getters from './getter'
import mutations from './mutation'
import actions from './action'

const store = createStore({
	state,
	getters,
	mutations,
	actions
})

export default store
