<template>
    <div class="layout">
        <!-- 头部 -->
        <LayoutHeader></LayoutHeader>
        <!-- 内容 -->
        <Content>
            <Sidebar slot="left"></Sidebar>
            <router-view slot="content"></router-view>
        </Content>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import LayoutHeader from "./LayoutHeader"
    import Content from "./Content"
    import Sidebar from "./Sidebar"
    @Component({
        components: { LayoutHeader, Content, Sidebar }
    })

    export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>

    .layout {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #f5f7f9;
    }
</style>
