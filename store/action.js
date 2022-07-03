export default {
	// 添加购物车
	optionToCart({
		commit,
		state
	}, payload) {
		commit('OPTION_TO_CART', {
			option: payload.option,
			data: payload.data,
			_id: payload.data._id
		})
	},
	// 设置carts
	setCarts({
		commit
	}, payload) {
		commit('SET_CARTS', payload)
	},
	// 设置carts
	setLoginL({
		commit
	}, payload) {
		commit('SET_LOGINL', payload)
	},
	// 登录
	setLogin({
		commit
	}, payload) {
		if (payload.hasOwnProperty('data')) {
			commit('SET_LOGIN', {
				option: payload.option,
				data: payload.data,
			})
		} else {
			commit('SET_LOGIN', {
				option: payload.option,
				data: {},
			})
		}
		return Promise.resolve({
			err_code: 1
		})

	},

	// 购物车计算后清除
	remove_carts({
		commit
	}) {
		commit('REMOVE_CARTS')
	},

	// 获取各种订单列表
	getCartMoreList({
		state,
		commit
	}, payload) {
		commit('SET_EVERY_CARTS', payload);
		return Promise.resolve({
			err_code: 1
		})
	},


	// setEveryCarts
	setEveryCarts({
		commit
	}, payload) {
		commit('SET_EVERY_CARTSL', payload)
	},

	// doneSendCartsHasChange: false, // 1
	// hasSendCartsHasChange: false, // 2
	// hasOwnCartsHasChange: false, // 3
	// 收货后 状态改变
	hasOwnCartsHasChange({
		commit
	}) {
		commit('hasOwnCartsHasChange')
	}

}
