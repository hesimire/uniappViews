<template>
	<view class="">
		<!-- 列表模板 -->
		<view class="carts_list_item" v-for="(item, index) in dataList" :key="item._id" v-if="isLoding">
			<view class="carts_list_id">
				<text>订单号:</text>
				<text>{{ item._id }}</text>
			</view>
			<view class="carts_list_shops" v-for="element in item.carts.shops">
				<view class="carts_list_img"><image :src="element.imgUrl" mode=""></image></view>
				<view class="carts_list_info">
					<text>{{ element.name }}</text>
					<text class="item_info">{{ element.info }}</text>
					<view class="item_price">
						<text>价格:￥{{ element.newPrice }} × {{ element.totalNum }}</text>
					</view>
				</view>
			</view>

			<view class="carts_list_totalPrice">
				<view class="">
					<text>订单总价:</text>
					<text>{{ item.carts.totalPrice }}</text>
				</view>
				<text class="okBtn" v-if="item.status == 2" @click="hasSendedCart(item)">收货</text>
			</view>
		</view>

		<view class="loadingList" v-else>
			<image src="../../static/images/jiazaizhong.png" mode=""></image>
			<text>订单加载中...</text>
		</view>
	</view>
	<view class="nolist" v-show="noList">
		<image src="../../static/images/zanwudingdan.png" mode=""></image>
		<text>无订单</text>
	</view>
</template>

<script>
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useStore, mapState } from 'vuex';
export default {
	name: 'cartsDetails',
	props: ['shopkey'],
	emits: ['getHeightAndChange'],
	setup(props, { emit }) {
		// console.log(props.shopkey);
		const store = useStore();
		// let ListHeight = 0;
		console.log(props.shopkey);
		const userID = store.state.user._id;
		const isLoding = ref(false);
		const noList = ref(false);

		if (props.shopkey == 2) {
			const w1 = watch(
				() => store.state.userCart.hasSendCartsHasChange,
				(newValue, oldValue) => {
					console.log('changeKey3改变了', newValue);
					uni.request({
						url: 'http://192.168.1.4:3001/carts/getCartMoreListByStatus',
						method: 'POST',
						data: {
							userID,
							status: 3
						},
						success: async res => {
							console.log(res);
							let result = await store.dispatch('getCartMoreList', {
								data: res.data.dataArr,
								status: 3
							});

							if (result.err_code == 1) {
								let ListHeight = undefined;
								ListHeight = res.data.dataArr.reduce((pre, cur, index, arr) => {
									return pre + 115 + cur.carts.shops.length * 100;
								}, 0);
								emit('getHeightAndChange', {
									height: ListHeight,
									status: 2,
									onlyChange: true,
									num: res.data.dataArr.length
								});
							}
						}
					});
				}
			);
		}

		const dataList = computed(() => {
			switch (Number(props.shopkey) + 1) {
				case 1:
					return store.state.userCart.doneSendCarts;
					break;
				case 2:
					return store.state.userCart.hasSendCarts;
					break;
				case 3:
					return store.state.userCart.hasOwnCarts;
					break;
				default:
					break;
			}
		});

		const getList = key => {
			uni.request({
				url: 'http://192.168.1.4:3001/carts/getCartMoreListByStatus',
				method: 'POST',
				data: {
					userID,
					status: key + 1
				},
				success: async res => {
					setTimeout(async () => {
						let result = await store.dispatch('getCartMoreList', {
							data: res.data.dataArr,
							status: key + 1
						});

						if (result.err_code == 1) {
							getHeight(res.data.dataArr);
						}
						isLoding.value = true;

						if (res.data.dataArr.length == 0) noList.value = true;
					}, 500);
				}
			});
		};

		const getHeight = MydataList => {
			let ListHeight = undefined;
			ListHeight = MydataList.reduce((pre, cur, index, arr) => {
				return pre + 115 + cur.carts.shops.length * 102;
			}, 0);
			emit('getHeightAndChange', {
				height: ListHeight,
				status: props.shopkey,
				num: MydataList.length
			});
		};

		onMounted(() => {
			getList(props.shopkey);
		});

		const hasSendedCart = item => {
			uni.request({
				url: 'http://192.168.1.4:3001/carts/changeCarts',
				method: 'POST',
				data: {
					carts: item
				},
				success: res => {
					if (res.statusCode == 200 && res.data.err_code == 0) {
						console.log(res);
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							success: res => {
								store.dispatch('hasOwnCartsHasChange');
								getList(props.shopkey);
							}
						});
					}
				}
			});
		};
		return {
			// ListHeight,
			hasSendedCart,
			dataList,
			isLoding,
			noList
		};
	}
};
</script>

<style lang="scss">
.carts_list_item {
	margin-bottom: 25px;
	box-sizing: border-box;
}
.carts_list_shops {
	border-bottom: 2px solid #eee;
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
	.carts_list_img {
		height: 100px;
	}
	image {
		width: 200rpx;
		height: 100px;
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
.carts_list_id {
	height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-left: 50rpx;
	font-weight: bold;
	box-sizing: border-box;
}
.carts_list_totalPrice {
	height: 50px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	padding: 0 50rpx;
	box-sizing: border-box;
	.okBtn {
		border: 2px solid black;
		border-radius: 10rpx;
		padding: 5rpx 10rpx;
	}
	.okBtn:active {
		transform: scale(1.1);
	}
}

.loadingList {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 30rpx;
	image {
		width: 150rpx;
		height: 150rpx;
		animation: loading 0.8s infinite;
	}
}
.nolist {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 30rpx;
	image {
		width: 150rpx;
		height: 150rpx;
	}
}

@keyframes loading {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
