<template>
	<view class="Login_form">
		<view class="from_item">
			<text>用户名称:</text>
			<input type="text" placeholder="请输入用户名称" v-model="formData.nickName" />
		</view>
		<view class="from_item">
			<text>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</text>
			<input type="text" placeholder="请输入账号" v-model="formData.account" />
		</view>
		<view class="from_item">
			<text>新&nbsp;&nbsp;密&nbsp;&nbsp;码:</text>
			<input type="password" placeholder="请输入密码" v-model="formData.password" />
		</view>

		<button class="login_btn" :disabled="btnDisable" @click="updata">修改信息</button>
	</view>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
// import request from '../../api/index.js';
export default {
	name: 'account',
	setup() {
		const store = useStore();
		const formData = reactive({
			account: '',
			password: '',
			nickName: ''
		});

		const userId = store.state.user._id;

		console.log(userId);

		const btnDisable = computed(() => {
			return !(formData.account && formData.password && formData.nickName);
		});

		const updata = () => {
			uni.showToast({
				icon: 'success',
				title: '124'
			});
			uni.request({
				url: 'http://192.168.1.4:3001/uniapp/update',
				method: 'POST',
				data: {
					userId,
					account: formData.account,
					password: formData.password,
					nickName: formData.nickName
				},
				success: async res => {
					if (res.statusCode == 200 && res.data.err_code == 0) {
						let result = await store.dispatch('setLogin', {
							option: 'add',
							data: res.data
						});
						uni.showToast({
							title: res.data.message,
							icon: 'success'
						});
						if (result.err_code == 1) {
							uni.navigateBack({});
						}
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		};

		return {
			formData,
			updata,
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
			width: 150rpx;
			display: flex;
			justify-content: space-between;
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
