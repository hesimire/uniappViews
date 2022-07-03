<script>
export default {
	onLaunch: function() {
		// console.log('App Launch');
		uni.getStorage({
			key: 'carts',
			success: res => {
				// console.log(res);
				this.$store.dispatch('setCarts', { data: res.data });
			}
		});

		uni.getStorage({
			key: 'user',
			success: res => {
				// console.log(res);
				this.$store.dispatch('setLoginL', { data: res.data });
			}
		});

		uni.getStorage({
			key: 'userCart',
			success: res => {
				// console.log(res);
				this.$store.dispatch('setEveryCarts', { data: res.data });
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import url(@/static/font/iconfont.css);
</style>
