<template>
	<view class="me_top">
		<view class="me_top_head"><image src="../../static/images/wode.png" mode=""></image></view>
		<view class="me_top_info">
			<text v-if="user.isLogin">欢迎 &nbsp; &nbsp;{{ user.nickName }}</text>
			<text v-else>未登录</text>
		</view>
	</view>
	<view class="me_carts" v-if="user.isLogin">
		<view class="me_carts_text"><text>我的订单</text></view>
		<view class="me_carts_list">
			<view class="carts_list_item" @click="toCartsDetail(0)">
				<view class="list_item_left">
					<image src="../../static/images/daifahuo.png" mode=""></image>
					<text>待发货</text>
					<text class="num" v-show="doneSendCartsNum">{{ doneSendCartsNum }}</text>
				</view>
				<image src="../../static/images/gengduo.png" mode=""></image>
			</view>
			<view class="carts_list_item" @click="toCartsDetail(1)">
				<view class="list_item_left">
					<image src="../../static/images/yifahuo.png" mode=""></image>
					<text>已发货</text>
					<text class="num" v-show="hasSendCartsNum">{{ hasSendCartsNum }}</text>
				</view>
				<image src="../../static/images/gengduo.png" mode=""></image>
			</view>
			<view class="carts_list_item" @click="toCartsDetail(2)">
				<view class="list_item_left">
					<image src="../../static/images/yishouhuo.png" mode=""></image>
					<text>交易完成</text>
					<text class="num" v-show="hasOwnCartsNum">{{ hasOwnCartsNum }}</text>
				</view>
				<image src="../../static/images/gengduo.png" mode=""></image>
			</view>
			<view class="carts_list_item" @click="toCartsDetail(3)">
				<view class="list_item_left">
					<image src="../../static/images/zhanghao.png" mode=""></image>
					<text>修改信息</text>
				</view>
				<image src="../../static/images/gengduo.png" mode=""></image>
			</view>
			<view class="carts_list_item" @click="offLogin">
				<view class="list_item_left">
					<image src="../../static/images/tuichu.png" mode=""></image>
					<text>退出登录</text>
				</view>
				<image src="../../static/images/gengduo.png" mode=""></image>
			</view>
		</view>
	</view>
	<button class="login_btn" v-else @click="toLogin">登录</button>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
	setup() {
		const name = ref('用户001');
		const store = useStore();
		const user = store.state.user;
		let cartsStatus = ref(0);
		let doneSendCartsNum = ref(0);
		let hasSendCartsNum = ref(0);
		let hasOwnCartsNum = ref(0);
		// store.dispatch('getCartMoreList');
		// store.dispatch('getCartMoreList', { status: 2 });
		// store.dispatch('getCartMoreList', { status: 3 });

		const userId = store.state.user._id;

		const getNum = () => {
			console.log('userId:' + userId);
			uni.request({
				url: 'http://192.168.1.4:3001/carts/getCartMoreListNum',
				method: 'POST',
				data: {
					userId
				},
				success: res => {
					console.log(res);
					doneSendCartsNum.value = res.data.ListNum[0];
					hasSendCartsNum.value = res.data.ListNum[1];
					hasOwnCartsNum.value = res.data.ListNum[2];
				}
			});
		};
		console.log('me setup');
		getNum();

		const toLogin = () => {
			uni.navigateTo({
				url: '../Login/Login'
			});
		};

		const toCartsDetail = key => {
			console.log(key);
			switch (key) {
				case 0:
					uni.navigateTo({
						url: '../cartsDetails/cartsDetails?key=0'
					});
					break;
				case 1:
					uni.navigateTo({
						url: '../cartsDetails/cartsDetails?key=1'
					});
					break;
				case 2:
					uni.navigateTo({
						url: '../cartsDetails/cartsDetails?key=2'
					});
					break;
				case 3:
					uni.navigateTo({
						url: '../account/account'
					});
					break;
				default:
					break;
			}
		};

		const offLogin = () => {
			store.dispatch('setLogin', {
				option: 'sub'
			});
		};

		return {
			name,
			user,
			toLogin,
			offLogin,
			doneSendCartsNum,
			hasSendCartsNum,
			hasOwnCartsNum,
			toCartsDetail,
			store,
			getNum
		};
	},
	onShow() {
		if (this.user.isLogin) {
			uni.request({
				url: 'http://192.168.1.4:3001/carts/getCartMoreListNum',
				method: 'POST',
				data: {
					userId: this.user._id
				},
				success: res => {
					console.log(res);
					this.doneSendCartsNum = res.data.ListNum[0];
					this.hasSendCartsNum = res.data.ListNum[1];
					this.hasOwnCartsNum = res.data.ListNum[2];
				}
			});
		}
	}
};
</script>

<style lang="scss">
.me_top {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 40rpx 20rpx;
	height: 200rpx;
	background-color: black;
	color: white;
	background-image: url('../../static/images/gerenbg.png');
	background-repeat: no-repeat;
	background-size: 100%;
	.me_top_head {
		height: 100rpx;
		width: 100rpx;
		border: 2px solid #eee;
		border-radius: 50%;
		background-color: #eee;

		image {
			width: 100%;
			height: 100%;
		}
	}
	.me_top_info {
		margin-left: 30rpx;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
.me_carts {
	margin-top: 40rpx;
	.me_carts_list {
		display: flex;
		flex-direction: column;
	}

	.carts_list_item,
	.me_carts_text {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		// width: 100%;
		border-bottom: 1px solid #eee;
		margin: 0 30rpx;
		padding: 20rpx;
		font-size: 26rpx;
		image {
			width: 35rpx;
			height: 35rpx;
			margin-right: 20rpx;
		}

		.num {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 30rpx;
			height: 30rpx;
			margin-left: 10rpx;
			border: 1px solid red;
			border-radius: 50%;
		}
	}

	.list_item_left {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.me_carts_text {
		font-size: 30rpx;
	}

	.carts_list_item:active {
		transform: scale(1.01);
	}
}

.login_btn {
	margin-top: 60rpx;
	background-color: #00a500;
	color: #fff;
}
</style>
