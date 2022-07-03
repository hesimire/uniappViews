<template>
	<view class="search_top"><input type="text" placeholder="请输入关键词搜索" class="search_top_input" v-model="keyWord" @blur="findSome" maxlength="20" /></view>
	<!-- <view class="search_type">
		<text @click="toActive(1)" :class="{ active: isActive == 1 }">销量</text>
		<text @click="toActive(2)" :class="{ active: isActive == 2 }">价格</text>
	</view> -->
	<view class="loadingImg" v-show="!list.length">
		<image src="../../static/images/jiazaizhong.png" mode=""></image>
		<text>加载中...</text>
	</view>
	<view class="search_List"><goodList :goods="list"></goodList></view>
	<view class="isMore" v-show="isOver"><text>暂无更多商品</text></view>
</template>

<script>
import goodList from '../../components/GoodList/GoodList.vue';
export default {
	name: 'shop',
	components: {
		goodList
	},
	data() {
		return {
			value: '',
			isOver: false,
			listNum: 1,
			listType: '',
			list: [],
			keyWord: '',
			search_type: '',
			isActive: 0,
			listChange: false
		};
	},
	onLoad(option) {
		console.log(option);
		if (option.key) {
			this.keyWord = option.key;
		}
	},
	mounted() {
		this.getList(this.keyWord);
	},
	methods: {
		getList() {
			if (this.listChange) {
				this.listNum = 1;
			}
			if (this.isOver) {
				return;
			} else {
				uni.request({
					url: 'http://192.168.1.4:3001/shops',
					method: 'GET',
					data: {
						ListNum: this.listNum,
						listType: this.keyWord
					},
					success: res => {
						// console.log(res);
						if (this.listChange) {
							this.list = [];
							this.listChange = false;
						}
						this.list = [...this.list, ...res.data.dataArr];
						this.listNum++;
						this.isOver = res.data.isOver;
					}
				});
			}
		},
		findSome() {
			this.listChange = true;
			this.getList();
		}
		// toActive(key) {
		// 	this.isActive = key;
		// }
	},

	onReachBottom() {
		this.getList();
	}
};
</script>

<style lang="scss">
.search_top {
	background-color: #eee;
	padding: 10rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.search_top_input {
		background-color: white;
		height: 70rpx;
		width: 90%;
		border: 1px solid #fff;
		border-radius: 36rpx;
		padding-left: 20px;
	}
}
.search_List {
	background-color: #eee;
}
.isMore {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50rpx;
	background-color: #eee;
}
.search_type {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 2px solid #eee;
		box-sizing: border-box;
		line-height: 80rpx;
	}
	text:nth-child(2) {
		border-right: none;
	}
	.active {
		color: red;
		border-bottom: 2px solid red;
	}
}
.loadingImg {
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
@keyframes loading {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
