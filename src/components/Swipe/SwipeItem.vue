<script setup>
import ProgressBar from '../ProgressBar.vue'
import akkarin from '../../../src/assets/akkarin.png'
import { ref, computed } from 'vue'

const props = defineProps({
  plant: {
    type: Object,
    required: true
  },
  contract: {
    type: Boolean,
    required: false,
    default: false
  }
})
const image = ref()
const pos = ref('')

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
  pos.value = `-${e.offsetX / 2}px -${image.value.naturalHeight * (e.target.clientWidth / image.value.naturalWidth) * 1.5 / e.target.clientHeight * e.offsetY / 2}px`
}
</script>

<template>
  <div :class="{ section: true, 'section-contract': props.contract }">
    <div
      :class="{ icon: true, 'icon-contract': props.contract }"
      @mousemove="handleIconMove"
    />
    <img
      v-show="false"
      ref="image"
      :src="plant.baike_info.image_url"
    >
    <div :class="{ name: true, 'name-contract': props.contract }">
      {{ plant.name }}
    </div>
    <div class="score">
      <ProgressBar
        id="pg"
        :value="plant.score"
        :max="1"
        :color="'green'"
      />
      <span class="confidence">置信度: {{ (plant.score * 100).toFixed(1) }}%</span>
    </div>
    <div :class="{ info: true, 'info-contract': props.contract }">
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
  height: 259px;
  width: 30vw;
  padding-top: 18vh;
  border-radius: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  box-shadow: 0px 0px 10px 0px #848484;
  min-width: 200px;
  max-width: 35vw;
  transition: 0.5s all ease;
  position: relative;
}

.section-contract {
  height: calc(3vmax + 45px);
  padding-top: 3vmax;
  width: 15vw;
}

.icon {
  height: 18vh;
  width: 100%;
  border-radius: 20px 20px 0 0;
  background-image: v-bind("plant.urledImage");
  background-color: #fff;
  background-size: 100%;
  background-position: center;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s all ease;
}

.icon-contract {
  height: 6vmax;
  width: 6vmax;
  border-radius: 50%;
  top: -3vmax;
  left: calc(100% / 2 - 3vmax);
  background-size: 100% !important;
  background-position: center !important;
}

.icon:hover {
  background-size: 150%;
  background-position: v-bind(pos);
}

.section .name {
  font-weight: bold;
  font-size: 2rem;
  margin: 10px auto 0;
  text-align: center;
  transition: 0.5s font-size ease;
  white-space: nowrap;
}

.name-contract {
  font-size: 1rem !important;
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
  height: 172px;
  display: flex;
  overflow: hidden;
  flex-flow: column nowrap;
  align-items: baseline;
  margin: 0 auto;
  border-top: 1px solid lightgrey;
  transition: 1s height ease, 0.5s opacity ease;
}

.info-contract {
  height: 0 !important;
  opacity: 0;
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
