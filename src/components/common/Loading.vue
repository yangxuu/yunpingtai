<template>
    <div>
        <div class="mark" v-if="$store.state.loading">
            <img src="http://files.cailiao.com/vue/lianlv/h5_1/images/loading2.gif" alt="">
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.mark{
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    /* background:rgba(255, 255, 255, 0.7); */
    background:rgba(0, 0, 0, 0.4);
    z-index: 999;
}
.mark img{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    transform: translate(-50%,-50%)
}
</style>


