<template>
	<view class="hot-list">
		<view class="hot-list-item" v-for="item in goods" :key="item._id" @click="toDetails(item)">
			<image :src="item.imgUrl" mode=""></image>
			<view class="hot-item-button">
				<view class="price">
					<text class="newprice">￥{{ item.newPrice }}</text>
					<text class="oldprice">￥{{ item.oldPrice }}</text>
				</view>
				<view class="name">
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'goodList',
	props: ['goods'],
	data() {
		return {};
	},
	onLoad() {
		console.log(goods);
	},
	methods: {
		toDetails(item) {
			uni.navigateTo({
				url: '../ShopDetails/ShopDetails?shop=' + encodeURIComponent(JSON.stringify(item))
			});
		}
	}
};
</script>

<style lang="scss">
.hot-list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 10rpx;
	justify-content: space-between;
	// align-items: flex-start;
	image {
		width: 320rpx;
		height: 320rpx;
	}
	.hot-list-item {
		box-sizing: border-box;
		padding: 20rpx;
		width: 49%;
		background-color: #fff;
		margin-bottom: 10rpx;
		.newprice {
			color: #b50e03;
		}
		.oldprice {
			color: #b6b5a8;
			text-decoration: line-through;
			margin-left: 10rpx;
			font-size: 20rpx;
		}
		.name {
		}
	}
}
</style>
