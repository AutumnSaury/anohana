<script setup>
import { reactive, ref } from 'vue'
import api from './api/axios.js'
import Swipe from './components/Swipe/SwipeContainer.vue'
import FRP from 'file-reader-promise'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const fileUploaded = ref(false)
const plants = reactive([])

async function acquireAccessToken () {
  if (cookies.isKey('accessToken')) {
    return cookies.get('accessToken')
  } else {
    const ak = prompt('Enter your API Key:')
    const sk = prompt('Enter your Secret Key:')
    const at = await api.getAccessToken(ak, sk)
    cookies.set('accessToken', at, '31d')
    return at
  }
}

async function updatePlantInfo (e) {
  const token = await acquireAccessToken()
  const filter = /data:image\/\w+;base64,/
  FRP.readAsDataURL(e.target.files[0]).then(async function (b64) {
    const processed = encodeURI(b64.replace(filter, ''))
    console.log((await api.sendPicture(token, processed)).data.result)
    const result = (await api.sendPicture(token, processed)).data.result
    plants.length = 0
    if (result.length === 1 && result[0].name === '非植物') {
      plants[0] = {
        name: '非植物',
        score: result[0].score,
        baike_info: {
          baike_url: '',
          image_url: 'src/assets/akkarin.png',
          description: '这张图片似乎并不包含植物相关的内容，至少度娘是这么想的。'
        }
      }
    } else {
      for (const k in result) {
        plants[k] = result[k]
        if (Object.keys(plants[k].baike_info).length === 0) {
          plants[k].baike_info = {
            baike_url: '',
            image_url: 'src/assets/akkarin.png',
            description: '百度百科没有该植物的词条，大概。'
          }
        }
        plants[k].baike_info.image_url = plants[k].baike_info.image_url.replace(/https:\/\/bkimg\.cdn\.bcebos\.com\/pic/, '/3rd/bd-bkimg')
      }
    }
    fileUploaded.value = true
  })
}
</script>

<template>
  <div id="root">
    <main>
      <div class="banner">
        <div class="titles">
          <div class="title">
            Anohana
          </div>
          <div class="subtitle">
            The Flower We Saw That Day
          </div>
        </div>
      </div>
      <div
        v-if="!fileUploaded"
        class="upload"
      >
        <input
          type="file"
          @change="updatePlantInfo"
        >
      </div>
      <Swipe
        v-else
        :plants="plants"
      />
    </main>

    <footer>
      <div>
        <a
          href="https://www.anohana.jp/"
          style="text-decoration: none"
        >Copyright Violation</a><span style="transform: rotate(180deg); display: inline-block">©</span>{{ new Date().getFullYear() }} by
        <a
          href="https://blog.autumnsaury.com/"
          style="text-decoration: none"
        >秋サンマ</a>
      </div>
      <div>前を向けばきっと会える。</div>
    </footer>
  </div>
</template>

<style scoped>
#root {
  display: flex;
  min-height: 100vh;
  align-items: baseline;
  flex-direction: column;
}

main,
footer {
  margin: 0 auto;
}

main {
  flex: 1;
}

footer {
  background: #38b25d url(src/assets/menma.png) no-repeat 35% 0;
  background-size: contain;
  width: 100%;
  padding: 25px 0;
  display: flex;
  flex-flow: column wrap;
}

footer * {
  text-align: center;
  color: white;
  font-size: 12px;
}

.banner {
  height: 45vh;
  width: 100vw;
  background: #38b25d url(src/assets/curve.svg) no-repeat center;
  z-index: -1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-bottom: -5vh;
}

.banner .titles {
  position: relative;
  margin: 0 auto;
}

.banner .titles .title {
  margin: 0 auto;
  color: white;
  text-align: center;
  font-size: 7vw;
  font-family: "Times New Roman", Times, serif;
  border-bottom: 3px white solid;
}

.banner .titles .subtitle {
  margin: 0 auto;
  color: white;
  text-align: center;
  font-size: 2vw;
  font-family: "Times New Roman", Times, serif;
}

.banner .titles::after {
  content: url("src/assets/forget-me-not.svg");
  mix-blend-mode: color-dodge;
  position: absolute;
  top: -10px;
  right: -10px;
}

.banner::before {
  content: "";
  background: #fff;
  width: 100%;
  position: absolute;
  bottom: -80px;
  right: 48%;
  height: 200px;
  transform: rotate(6deg);
}

.banner::after {
  content: "";
  background: #fff;
  width: 100%;
  position: absolute;
  bottom: -80px;
  left: 48%;
  height: 200px;
  transform: rotate(-6deg);
}

.upload {
  position: absolute;
  height: 7vw;
  width: 7vw;
  overflow: hidden;
  border-radius: 50%;
  background: #38b25d url(src/assets/upload.svg) no-repeat center center;
  background-size: 60%;
  right: 46.5vw;
  top: 45vh;
}

.upload input {
  position: absolute;
  top: 0;
  opacity: 0;
  font-size: 5vw;
}
</style>
