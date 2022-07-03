<template>
	<view>
		<view>
			<!-- 头部分类栏 -->
			<view class="carts_top">
				<view class="carts_top_item" :class="index == mykey ? 'carts_top_item_active' : ''" v-for="(item, index) in tabList" :key="item.id" @click="setKey(index)">
					<text>{{ item.title }}</text>
					<text class="num" v-show="Num[index]">{{ Num[index] }}</text>
				</view>
			</view>
		</view>
		<!-- swipper 栏 -->
		<swiper ref="mySwipper" :interval="3000" :duration="500" :current="mykey" @change="changeCurrent" style="{ height: '300' + 'px' }">
			<swiper-item class="swipperItem" v-for="(item, index) in tabList" :key="item.id">
				<view class="swiper-item"><CartsDetailsList :shopkey="index" @getHeightAndChange="getHeightAndChange"></CartsDetailsList></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import CartsDetailsList from '../../components/CartsDetailsList/CartsDetailsList.vue';
import { ref, reactive, getCurrentInstance, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
	components: {
		CartsDetailsList
	},
	setup() {
		let mykey = ref(0);
		const store = useStore();
		const tabList = reactive([
			{
				id: 1,
				title: '待发货',
				cartsId: 1
			},
			{
				id: 2,
				title: '已发货',
				cartsId: 2
			},
			{
				id: 3,
				title: '已收货',
				cartsId: 3
			}
		]);

		const mySwipper = ref(null);
		const CartsHeight = reactive({
			0: 0,
			1: 0,
			2: 0
		});

		const Num = ref([0, 0, 0]);

		const setKey = key => {
			mykey.value = key;
			mySwipper.value.$el.style.height = CartsHeight[key] + 'px';
		};

		const changeCurrent = $event => {
			mykey.value = $event.detail.current;
			mySwipper.value.$el.style.height = CartsHeight[mykey.value] + 'px';
		};

		const getHeightAndChange = heightData => {
			console.log(heightData);
			if (heightData.onlyChange) {
				CartsHeight[heightData.status] = heightData.height == 0 ? 500 : heightData.height;
			} else {
				CartsHeight[heightData.status] = heightData.height == 0 ? 500 : heightData.height;
				mySwipper.value.$el.style.height = CartsHeight[mykey.value] + 'px';
			}
			Num.value[heightData.status] = heightData.num;
		};

		const getHeight = heightData => {
			console.log(heightData);

			if (heightData) {
				CartsHeight[heightData.status] = heightData.height;
			}
		};

		return {
			mykey,
			tabList,
			setKey,
			changeCurrent,
			mySwipper,
			getHeightAndChange,
			Num
		};
	},

	onLoad(option) {
		if (option.key) {
			this.mykey = option.key;
		}
	}
};
</script>

<style lang="scss">
.carts_top {
	display: flex;
	flex-direction: row;
	margin-bottom: 10rpx;
	.carts_top_item {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 70rpx;
		background-color: #eee;
		box-sizing: border-box;
		border-right: 1px solid #b8b8b8;
	}
	.carts_top_item:last-child {
		border-right: none;
	}
	.carts_top_item_active {
		border-bottom: 2px solid lightblue;
	}
}
.swipperItem {
	box-sizing: border-box;
	// border: 2px solid #b83e1f;
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
</style>
