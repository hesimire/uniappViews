export default {
	OPTION_TO_CART(state, payload) {
		const dataPush = {}
		const {
			option
		} = payload;

		console.log(payload.data);

		// 判断是否含有
		let found = state.carts.shops.findIndex((item) => {
			return item._id == payload.data._id;
		});
		console.log(found);

		switch (payload.option) {
			case 'add':
				// 复制数据
				for (let key in payload.data) {
					dataPush[key] = payload.data[key];
				}

				// 有货没有两种情况
				if (found == -1) {
					dataPush.totalNum = 1;
					dataPush.totalPrice = payload.data.newPrice;
					state.carts.shops.push(dataPush);
					state.carts.totalNum += 1;
					state.carts.totalPrice += payload.data.newPrice;
				} else {
					// console.log(totalPrice, state.carts.shops);
					state.carts.totalPrice += state.carts.shops[found].newPrice;
					state.carts.totalNum += 1;
					state.carts.shops[found].totalNum++;
				}

				uni.showToast({
					title: '添加成功',
					icon: 'success',
					duration: 1000
				})

				uni.setStorage({
					key: 'carts',
					data: state.carts,
					success: () => {
						console.log('保存成功');
					}
				})

				break;
			case 'sub':
				// 商品属性是否为1没有两种情况
				console.log(state.carts.shops[found].totalNum)
				if (state.carts.shops[found].totalNum == 1) {
					state.carts.totalNum -= 1;
					state.carts.totalPrice -= payload.data.newPrice;
					state.carts.shops.splice(found, 1)
				} else {
					state.carts.shops[found].totalNum -= 1;
					state.carts.totalNum -= 1;
					state.carts.totalPrice -= payload.data.newPrice;
				}
				uni.showToast({
					title: '删除成功',
					icon: 'success',
					duration: 1000
				})
				break;
			default:
				break;
		}

		uni.setStorage({
			key: 'carts',
			data: state.carts,
			success: () => {
				console.log('保存成功');
			}
		})

	},
	// 存储localstorage
	SET_CARTS(state, payload) {
		state.carts = payload.data;
	},
	// 存储
	SET_LOGINL(state, payload) {
		state.user = payload.data;
	},
	// 登录
	SET_LOGIN(state, payload) {
		switch (payload.option) {
			case 'add':
				state.user.isLogin = true;
				state.user.nickName = payload.data.nickName;
				state.user._id = payload.data._id;
				break;
			case 'sub':
				state.user.isLogin = false;
				state.user.nickName = '';
				state.user._id = '';
				uni.showToast({
					title: '退出登录',
					icon: 'success',
				});
				break;
			default:
				break;
		}
		uni.setStorage({
			key: 'user',
			data: state.user,
			success: () => {
				console.log('保存成功');
			}
		})
	},
	// 退出登录操作
	REMOVE_CARTS(state, payload) {
		state.carts.totalNum = 0;
		state.carts.totalPrice = 0;
		state.carts.shops.splice(0)
	},
	// 储存订单操作
	SET_EVERY_CARTS(state, payload) {
		console.log(payload);

		if (payload.status) {
			switch (payload.status) {
				case 1:
					state.userCart.doneSendCarts = payload.data;
					state.userCart.doneSendCartsHasChange = false;
					break;
				case 2:
					state.userCart.hasSendCarts = payload.data;
					state.userCart.hasSendCartsHasChange = false;
					break;
				case 3:
					state.userCart.hasOwnCarts = payload.data;
					state.userCart.hasOwnCartsHasChange = false;
					break;
				default:
					break;
			}
		}

		uni.setStorage({
			key: 'userCart',
			data: state.userCart,
			success: () => {
				// console.log('用户Carts列表保存成功');
			}
		})
	},
	// 储存订单操作localtion
	SET_EVERY_CARTSL(state, payload) {
		// console.log(payload.data);
		state.userCart.doneSendCarts = payload.data.doneSendCarts;
		state.userCart.hasSendCarts = payload.data.hasSendCarts;
		state.userCart.hasOwnCarts = payload.data.hasOwnCarts;
	},

	// 改变购物车状态
	hasOwnCartsHasChange(state, payload) {
		state.userCart.hasSendCartsHasChange = !state.userCart.hasSendCartsHasChange;
		state.userCart.hasOwnCartsHasChange = !state.userCart.hasOwnCartsHasChange;
	}

}
