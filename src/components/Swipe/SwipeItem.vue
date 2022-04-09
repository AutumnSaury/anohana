<script setup>
import ProgressBar from '../ProgressBar.vue'
import akkarin from '../../../src/assets/akkarin.png'
import { reactive } from 'vue'

const props = defineProps({
  plant: {
    type: Object,
    required: true
  }
})

const plant = reactive(props.plant)
if (plant.name === '非植物') {
  plant.baike_info = {
    baike_url: window.location.href,
    image_url: akkarin,
    description: '这张图片似乎并不包含植物相关的内容，至少度娘是这么想的。'
  }
} else if (Object.keys(plant.baike_info).length === 0) {
  plant.baike_info = {
    baike_url: window.location.href,
    image_url: akkarin,
    description: '百度百科没有该植物的词条，大概。'
  }
}
plant.baike_info.image_url = plant.baike_info.image_url.replace(/https:\/\/bkimg\.cdn\.bcebos\.com\/pic/, '/3rd/bd-bkimg')
</script>

<template>
  <div class="section">
    <img
      :src="plant.baike_info.image_url"
      :alt="plant.name"
      class="icon"
    >
    <div class="name">
      {{ plant.name }}
    </div>
    <div class="score">
      <ProgressBar
        id="pg"
        :value="props.plant.score"
        :max="1"
        :color="'green'"
      />
      <span class="confidence">置信度: {{ (plant.score * 100).toFixed(1) }}%</span>
    </div>
    <div class="info">
      <div class="desc">
        {{ plant.baike_info.description }}
      </div>
      <div class="baike">
        <a
          :href="plant.baike_info.baike_url"
          class="bk_ref"
          title="度娘百科"
        >前往百度百科了解更多内容</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  background-color: #fff;
  height: auto;
  width: 20vw;
  border-radius: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  box-shadow: 0px 0px 7px 5px #ebebeb;
}

.section .icon {
  height: 18vh;
  width: 100%;
  border-radius: 20px 20px 0 0;
  object-fit: cover;
  margin: 0;
}

.section .name {
  font-weight: bold;
  font-size: 32px;
  margin: 10px auto 5px auto;
  text-align: center;
}

.section .name::before,
.section .name::after {
  content: url("../../assets/forget-me-not.svg");
  margin: 0 10px;
}

.section .score {
  display: inline-flex;
  flex-flow: column nowrap;
  width: 70%;
  margin: 5px auto;
  justify-content: space-around;
  margin-top: 10px;
  align-items: flex-end;
  position: relative;
}
.section .score * {
  display: inline-block;
  margin: 0 auto;
}

.section #pg {
  width: 100%;
}

.section .score .confidence {
  font-size: 12px;
  text-align: center;
}

.section .info {
  width: 18vw;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: baseline;
  margin: 0 auto;
  border-top: 1px solid lightgrey;
}

.section .info .desc {
  margin: 20px auto;
  font-size: 12px;
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  flex: 1;
}

.section .info .baike {
  padding: 10px 0;
  display: flex;
  margin: 0 auto;
  flex-flow: column nowarp;
  justify-content: center;
  border-top: 1px solid lightgrey;
  height: 30px;
}

.section .info .baike .bk_ref {
  width: 18vw;
  margin: auto;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  color: grey;
}

.section .info .baike .bk_ref::after {
  content: ">";
  margin-left: 10px;
}
</style>
