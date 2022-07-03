export default {
	user: {
		isLogin: false,
		_id: '',
		nickName: ''
	},

	carts: {
		// 总数量
		totalNum: 0,
		// 总价
		totalPrice: 0,
		shops: [
			// {
			// 	id: '',
			// 	name: '',
			// 	nowPrice: 199,
			// 	oldPrice: 199,
			// 	info: '',
			// 	num: 0
			// }
		]
	},
	// 1 未发货
	// 2 已发货
	// 3 已收货
	userCart: {
		doneSendCarts: [],
		hasSendCarts: [],
		hasOwnCarts: [],
		doneSendCartsHasChange: false, // 1
		hasSendCartsHasChange: false, // 2
		hasOwnCartsHasChange: false, // 3
	}
}
