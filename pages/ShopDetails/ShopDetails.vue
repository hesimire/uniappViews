<template>
	<view class="show_detail_top">
		<image :src="shop.imgUrl" mode="aspectFit"></image>

		<view class="box">
			<view class="shop_info">
				<text class="price">￥{{ shop.newPrice }}</text>
				<text class="name">{{ shop.name }}</text>
			</view>
			<view class="shop_voucher">
				<!-- <text>领券</text> -->
				<text>满1000减100</text>
				<text>满2000减300</text>
				<text>满3000减500</text>
			</view>

			<view class="shop_detail_center">
				<text>详细信息</text>
				<text>{{ shop.info }}</text>
			</view>
		</view>

		<view class="shop_butoom">
			<view class="shop_butoom_item" @click="toNav(1)">
				<image src="../../static/images/shouye.png" mode=""></image>
				<text>首页</text>
			</view>
			<view class="shop_butoom_item" @click="toNav(2)">
				<image src="../../static/images/gouwuche.png" mode=""></image>
				<text>客服</text>
			</view>
			<view class="shop_butoom_item" @click="toNav(3)">
				<image src="../../static/images/gouwuche.png" mode=""></image>
				<text>购物车</text>
			</view>
			<view class="shop_butoom_item shop_butoom_btn" @click="add({ data: this.shop, option: 'add' })"><text>加入购物车</text></view>
			<view class="shop_butoom_item shop_butoom_btn" @click="addToPay"><text>立即购买</text></view>
		</view>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			shop: {}
		};
	},
	methods: {
		...mapActions({
			add: 'optionToCart'
		}),
		toNav(key) {
			console.log(key);
			switch (key) {
				case 1:
					uni.switchTab({
						url: '/pages/index/index'
					});
					break;
				case 2:
					// uni.switchTab({
					// 	url:'/pages/cart/cart'
					// })
					uni.showToast({
						title: '客服小姐姐招募中',
						icon: 'loading'
					});

					break;
				case 3:
					uni.switchTab({
						url: '/pages/cart/cart'
					});
					break;
				default:
					break;
			}
		},
		addToPay() {
			// alert('立即购买');
			uni.showToast({
				title: '功能开发中',
				icon: 'error'
			});
		},
		addToCart() {}
	},

	onLoad(options) {
		this.shop = JSON.parse(options.shop);
		// console.log(this.shop);
	}
};
</script>

<style lang="scss">
.box {
	width: 94%;
	margin: auto;
	border-radius: 30rpx;
	border: 2px solid #eee;
	padding-bottom: 40rpx;
}

.show_detail_top {
	image {
		width: 750rpx;
		height: 600rpx;
		border-bottom: 4rpx solid #eee;
	}
	.shop_info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		// background-color: #eee;
		padding-left: 30rpx;
		margin-bottom: 20rpx;
		.price {
			color: red;
			font-size: 40rpx;
		}
		.name {
			font-weight: bold;
			font-size: 30rpx;
		}
	}
	.shop_voucher {
		padding-left: 30rpx;
		background-color: #eee;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		// &>(0) {
		// 	color: red;
		// }
		// text:nth-child(1) {
		// 	color: red;
		// }
		text {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16rpx;
			width: 150rpx;
			margin-right: 20rpx;
			color: red;
			// height: 100rpx;
			border: 1px solid red;
			// background: radial-gradient(circle at 0 51rpx, transparent 15rpx, #fe8864 6rpx) top left, linear-gradient(0.25turn, #fe8864, #fe5151),
			// 	radial-gradient(circle at 18rpx 51rpx, transparent 15rpx, #fe5151 16rpx) bottom right;
			// background-size: 17rpx 100rpx, 116rpx 100rpx, 17rpx 100rpx;
			// background-repeat: no-repeat;
			// background-position: 10rpx 0rpx, 26rpx 0rpx, 142rpx 0rpx;
		}
	}

	.shop_detail_center {
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		text:nth-child(1) {
			margin-top: 20rpx;
			font-weight: 400;
			color: red;
		}
		text:nth-child(2) {
			margin-top: 20rpx;
			font-weight: bold;
		}
	}

	.shop_butoom {
		position: absolute;
		height: 100rpx;
		bottom: 0%;
		width: 100%;
		display: flex;
		flex-direction: row;
		font-size: 12px;

		.shop_butoom_item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-basis: 100rpx;
		}
		.shop_butoom_btn {
			// align-self: flex-end;
			flex-grow: 1;
			// border: 1px solid #fff;
			background-color: #f00;
			box-sizing: border-box;
			color: #eee;
			font-size: 16px;
			border-right: 1px solid white;
			// flex-basis: 200rpx;
		}
		image {
			width: 40rpx;
			height: 40rpx;
		}
	}
}
</style>
