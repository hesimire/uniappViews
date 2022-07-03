<template>
	<view class="content">
		<!-- 首页轮播图 -->
		<swiper class="index-swipper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="item in swipperList" :key="item.id" @click="toOneShop(item.shop)">
				<view class="swiper-item"><image class="swipper-img" :src="item.swiperImgUrl"></image></view>
			</swiper-item>
		</swiper>
		<!-- 首页导航 -->
		<view class="index-recommend">
			<view class="recommend-item" v-for="item in recommendList" :key="item.id" @click="navToShop(item.cClass)">
				<view :class="item.icon"></view>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 首页推荐商品区域 -->
		<view class="index-hot">
			<view class="hot-title"><text>推荐商品</text></view>
			<goodList :goods="hotList"></goodList>
		</view>
		<view class="isMore" v-show="isOver"><text>暂无更多推荐商品</text></view>
	</view>
</template>

<script>
// import { ref }\
import goodList from '../../components/GoodList/GoodList.vue';
// import test from '../../components/test/test.vue'

export default {
	data() {
		return {
			swipperList: [],
			recommendList: [
				{
					id: 1,
					name: '小米手机',
					icon: 'iconfont icon-shouji',
					cClass: '手机'
				},
				{
					id: 2,
					name: '小米电脑',
					icon: 'iconfont icon-diannao_o',
					cClass: '电脑'
				},
				{
					id: 3,
					name: '小米电器',
					icon: 'iconfont icon-jiayongdianqi',
					cClass: '电饭锅'
				},
				{
					id: 4,
					name: '小米手表',
					icon: 'iconfont icon-zhinengshoubiao',
					cClass: '手表'
				}
			],
			hotList: [],
			hotListNum: 1,
			isOver: false
		};
	},
	components: {
		// 'good-list':goodList
		// test,
		goodList
	},
	onLoad() {
		uni.request({
			url: 'http://192.168.1.4:3001/shops/swiperData',
			method: 'GET',
			success: res => {
				console.log(res);
				this.swipperList = res.data.dataArr;
			},
			fail: err => {
				console.log(err);
			}
		});
		this.getHotList();
	},
	methods: {
		getHotList() {
			if (this.isOver) {
				return;
			} else {
				uni.request({
					url: 'http://192.168.1.4:3001/uniapp/hotList?hotListNum=' + this.hotListNum,
					method: 'GET',
					success: res => {
						// console.log(res);
						this.hotList = [...this.hotList, ...res.data.dataArr];
						this.hotListNum++;
						this.isOver = res.data.isOver;
					},
					fail: err => {
						console.log(err);
					}
				});
			}
		},
		navToShop(key) {
			console.log(key);
			uni.reLaunch({
				url: '../shop/shop?key=' + key
			});
		},
		toOneShop(item) {
			uni.navigateTo({
				url: '../ShopDetails/ShopDetails?shop=' + encodeURIComponent(JSON.stringify(item))
			});
		}
	},
	onReachBottom() {
		this.getHotList();
	},

	mounted() {
		// console.log(this.$api);
	}
};
</script>

<style lang="less">
.content {
	display: flex;
	flex-direction: column;
	// align-items: center;
	// justify-content: center;
	.index-swipper {
		width: 100%;
		height: 350rpx;
		.swiper-item {
			// image {
			// 	width: 100%;
			// 	height: 100%;
			// }
			.swipper-img {
				width: 100%;
			}
		}
	}
	.index-recommend {
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;
		.recommend-item {
			width: 25%;
			text-align: center;
			view {
				width: 120rpx;
				height: 120rpx;
				background-color: #b50e03;
				border-radius: 60rpx;
				margin: 16rpx auto;
				line-height: 120rpx;
				color: #fff;
				font-size: 60rpx;
			}
			.icon-diannao_o {
				font-size: 80rpx;
			}
			text {
				font-size: 30rpx;
			}
		}
	}

	.index-hot {
		background-color: #eee;
		margin-top: 10rpx;
		.hot-title {
			margin-top: 10rpx;
			padding: 28rpx 0;
			text-align: center;
			background-color: #fff;
			text {
				letter-spacing: 10rpx;
				font-size: 36rpx;
			}
		}
	}
}
.isMore {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50rpx;
	background-color: #eee;
}
</style>
