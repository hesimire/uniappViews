<template>
	<view class="carts_list" v-if="hasShop">
		<text></text>
		<view class="carts_list_item" v-for="item in shops" :key="item._id">
			<view class="carts_list_img"><image :src="item.imgUrl" mode=""></image></view>
			<view class="carts_list_info">
				<text>{{ item.name }}</text>
				<text class="item_info">{{ item.info }}</text>
				<view class="item_price">
					<text>价格:￥{{ item.newPrice }} × {{ item.totalNum }}</text>
					<view class="item_option">
						<image src="../../static/images/jiahao.png" class="addClass" @click="addOne(item._id, item)"></image>
						<image src="../../static/images/jianhao.png" class="removeClass" @click="removeOne(item._id, item)"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="">{{ getText.name }}</view> -->
		<text class="totalPriceText">商品总价:{{ totalPrice }}</text>
		<button class="btn" @click="addCartOrders">立即结算</button>
	</view>

	<view class="noShops" v-else><image src="../../static/images/cart-null.png" mode=""></image></view>
</template>

<script>
import { mapState, useStore } from 'vuex';
// import { computed } from 'vue';

export default {
	setup() {
		const store = useStore();

		const addOne = (id, data) => {
			// console.log(id);
			store.dispatch('optionToCart', {
				option: 'add',
				data,
				_id: id
			});
		};
		const removeOne = (id, data) => {
			store.dispatch('optionToCart', {
				option: 'sub',
				data,
				_id: id
			});
		};

		const addCartOrders = () => {
			const isLogin = store.state.user.isLogin;
			if (!isLogin) {
				uni.showToast({
					icon: 'error',
					title: '请登录',
					success: () => {
						uni.navigateTo({
							url: '../Login/Login'
						});
					}
				});
			} else {
				const userId = store.state.user._id;
				const data = store.state.carts;

				uni.request({
					url: 'http://192.168.1.4:3001/carts/addCart',
					method: 'POST',
					data: {
						userId,
						data
					},
					success: res => {
						if (res.statusCode == 200 && res.data.err_code == 0) {
							uni.showToast({
								title: res.data.message,
								icon: 'success'
							});
							store.dispatch('remove_carts');
						}
					},
					fail: err => {
						uni.showToast({
							title: res.data.message,
							icon: 'error'
						});
					}
				});
			}
		};
		return {
			addOne,
			removeOne,
			addCartOrders
		};
	},
	computed: mapState({
		shops: state => state.carts.shops,
		totalNum: state => state.carts.totalNum,
		totalPrice: state => state.carts.totalPrice,
		hasShop: state => (state.carts.totalNum <= 0 ? false : true)
	})
};
</script>

<style lang="scss">
.carts_list {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.totalPriceText {
	font-size: 20px;
	color: red;
	margin: 10rpx 0;
}
.btn {
	width: 100%;
	background-color: #00ad00;
	color: white;
	box-sizing: border-box;
}
.btn:active {
	transform: scale(1.1);
}
.carts_list_item {
	border-bottom: 4rpx solid #eee;
	display: flex;
	flex-direction: row;
	align-items: center;

	image {
		width: 200rpx;
		height: 200rpx;
	}

	.carts_list_info {
		display: flex;
		flex-direction: column;
		// flex-grow: 1;

		.item_info {
			font-size: 14px;
			color: #bfbfbf;
			overflow: hidden;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			margin: 14rpx 0;
		}
		.item_price {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			color: red;
		}
		.item_option {
			image {
				width: 40rpx;
				height: 40rpx;
				cursor: pointer;
				margin-right: 20rpx;
				box-sizing: border-box;
			}
			image:active {
				border: 1px solid black;
				transform: scale(1.5);
			}
		}
	}
}
.noShops {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
