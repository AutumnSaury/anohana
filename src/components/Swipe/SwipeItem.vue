<script setup>
import ProgressBar from '../ProgressBar.vue'
import akkarin from '../../../src/assets/akkarin.png'
import { ref, computed } from 'vue'

const props = defineProps({
  plant: {
    type: Object,
    required: true
  }
})
const image = ref()
const pos = ref('')
const iconCls = ref('icon')

const plant = computed(() => {
  const temp = props.plant
  if (temp.name === '非植物') {
    temp.baike_info = {
      baike_url: window.location.href,
      image_url: akkarin,
      description: '这张图片似乎并不包含植物相关的内容，至少度娘是这么想的。'
    }
  } else if (Object.keys(temp.baike_info).length === 0) {
    temp.baike_info = {
      baike_url: window.location.href,
      image_url: akkarin,
      description: '百度百科没有该植物的词条，大概。'
    }
  }
  temp.baike_info.image_url = temp.baike_info.image_url.replace(/https:\/\/bkimg\.cdn\.bcebos\.com\/pic/, '/3rd/bd-bkimg')
  temp.urledImage = `url(${temp.baike_info.image_url})`
  return temp
})

function handleIconMove (e) {
  pos.value = `-${e.offsetX * 0.5}px -${image.value.naturalHeight / (window.innerHeight * 0.18) * e.offsetY / 2}px`
}

function handleIconHover () {
  iconCls.value = 'icon-zoomin'
}

function handleIconLeave () {
  iconCls.value = 'icon'
}

</script>

<template>
  <div class="section">
    <div
      :class="iconCls"
      @mousemove="handleIconMove"
      @mouseover.prevent="handleIconHover"
      @mouseleave="handleIconLeave"
    />
    <img
      v-show="false"
      ref="image"
      :src="plant.baike_info.image_url"
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
  box-shadow: 0px 0px 10px 0px #848484;
  min-width: 200px;
  max-width: 35vw;
}

.icon {
  height: 18vh;
  width: 100%;
  border-radius: 20px 20px 0 0;
  background-image: v-bind("plant.urledImage");
  background-size: cover;
  background-position: center;
  margin: 0;
}

.icon-zoomin {
  height: 18vh;
  width: 100%;
  border-radius: 20px 20px 0 0;
  margin: 0;
  background-image: v-bind("plant.urledImage");
  background-size: 150% auto;
  background-position: v-bind(pos);
}

.section .name {
  font-weight: bold;
  font-size: 2rem;
  margin: 10px auto 0;
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
  margin: 0 auto 5px;
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
  font-size: 0.75rem;
  text-align: center;
}

.section .info {
  width: 85%;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: baseline;
  margin: 0 auto;
  border-top: 1px solid lightgrey;
}

.section .info .desc {
  margin: 20px auto;
  font-size: 0.75rem;
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
  justify-content: center;
  border-top: 1px solid lightgrey;
  height: 30px;
  width: 100%;
}

.section .info .baike .bk_ref {
  width: 85%;
  margin: auto;
  text-decoration: none;
  text-align: center;
  font-size: 0.9rem;
  color: grey;
}

.section .info .baike .bk_ref::after {
  content: ">";
  margin-left: 10px;
}
</style>
