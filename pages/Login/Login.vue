<template>
	<view class="Login_form">
		<view class="from_item">
			<text>账号</text>
			<input type="text" placeholder="请输入账号" v-model="formData.account" />
		</view>
		<view class="from_item">
			<text>密码</text>
			<input type="password" placeholder="请输入密码" v-model="formData.password" />
		</view>
		<button class="login_btn" @click="login" :disabled="btnDisable">登录/注册</button>
	</view>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
// import request from '../../api/index.js';
export default {
	name: 'Login',
	setup() {
		const store = useStore();
		const formData = reactive({
			account: '',
			password: ''
		});

		const btnDisable = computed(() => {
			return !(formData.account && formData.password);
		});

		const login = () => {
			uni.request({
				url: 'http://192.168.1.4:3001/uniapp/login',
				method: 'POST',
				data: formData,
				success: res => {
					// console.log(res);
					// this.swipperList = res.data.dataArr;
					if (res.statusCode == 200 && res.data.err_code == 0) {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							success: async () => {
								let result = await store.dispatch('setLogin', {
									option: 'add',
									data: res.data
								});
								if (result.err_code == 1) {
									uni.navigateBack({});
								}
							}
						});
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		};

		return {
			formData,
			login,
			btnDisable
		};
	}
};
</script>

<style lang="scss">
.Login_form {
	display: flex;
	flex-direction: column;
	.from_item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 100rpx;
		padding: 0 20rpx;
		text {
			margin: 0 20rpx;
		}
		input {
			border: 1px solid #eee;
			height: 80rpx;
			flex-grow: 1;
			padding-left: 20rpx;
		}
	}
	.login_btn {
		width: 90%;
		border-radius: 30rpx;
		color: white;
		background-color: #00b300;
	}
	.login_btn[disabled='true'] {
		background-color: #d3d3d3;
		color: black;
	}
}
</style>
