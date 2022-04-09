<script setup>
import { reactive, ref } from 'vue'
import api from './api/axios.js'
import Swipe from './components/Swipe/SwipeContainer.vue'
import FRP from 'file-reader-promise'
import { useCookies } from 'vue3-cookies'
import './assets/menma.png'
import './assets/curve.svg'
import './assets/forget-me-not.svg'
import './assets/upload.svg'
import './assets/reload.svg'
import 'animate.css'

const { cookies } = useCookies()

const fileUploaded = ref(false)
const plants = reactive([])
const pic = ref('')
const bannerCls = reactive(['banner', 'banner-default'])

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

async function handlePicUpdate (e) {
  const token = await acquireAccessToken()
  const filter = /data:image\/\w+;base64,/
  FRP.readAsDataURL(e.target.files[0]).then(async function (b64) {
    pic.value = `url(${b64})`
    const processed = encodeURI(b64.replace(filter, ''))
    const result = (await api.sendPicture(token, processed)).data.result
    plants.length = 0
    for (const k in result) {
      plants[k] = result[k]
    }
    fileUploaded.value = true
    bannerCls[1] = 'banner-uploaded'
  })
}

function handleReload (e) {
  fileUploaded.value = false
  bannerCls[1] = 'banner-default'
}
</script>

<template>
  <div id="root">
    <main>
      <div :class="bannerCls">
        <div class="titles">
          <div class="title">
            Anohana
          </div>
          <div class="subtitle">
            The Flower We Saw That Day
          </div>
        </div>
      </div>
      <Transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__bounceOutUp"
      >
        <div
          v-show="!fileUploaded"
          class="upload"
        >
          <input
            type="file"
            accept="image/*"
            @change="handlePicUpdate"
          >
        </div>
      </Transition>
      <Swipe
        v-show="fileUploaded"
        :plants="plants"
      />
      <Transition
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <button
          v-show="fileUploaded"
          id="reload"
          @click="handleReload"
        />
      </Transition>
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
  width: 100vw;
  align-items: baseline;
  flex-direction: column;
  position:relative;
  overflow: hidden;
}

main,
footer {
  margin: 0 auto;
}

main {
  flex: 1;
}

footer {
  background: #38b25d url("./assets/menma.png") no-repeat 35% 0;
  background-size: contain;
  width: 100%;
  padding: 2vh 0;
  display: flex;
  flex-flow: column wrap;
}

footer * {
  text-align: center;
  color: white;
  font-size: 12px;
}

.banner {
  height: 50vh;
  width: 100vw;
  z-index: -1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-bottom: -5vh;
}

.banner-default {
  background-image: url("./assets/curve.svg"), linear-gradient(135deg, #8bdaa3, #38b25d);
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
  background-size: 30em, contain;
}

.banner-uploaded {
  background-image: url("./assets/curve.svg"), v-bind(pic);
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
  background-size: 30em, cover;
}

.banner .titles {
  position: relative;
  margin: 0 auto;
}

.banner .titles .title {
  margin: 0 auto;
  color: white;
  text-align: center;
  font-size: 7vmax;
  font-family: "Times New Roman", Times, serif;
  border-bottom: 3px white solid;
  text-shadow: 0px 2px 2px rgba(0,0,0,0.14) , 0px 3px 1px rgba(0,0,0,0.12) , 0px 1px 5px rgba(0,0,0,0.2);
}

.banner .titles .subtitle {
  margin: 0 auto;
  color: white;
  text-align: center;
  font-size: 2vmax;
  font-family: "Times New Roman", Times, serif;
  text-shadow: 0px 2px 2px rgba(0,0,0,0.14) , 0px 3px 1px rgba(0,0,0,0.12) , 0px 1px 5px rgba(0,0,0,0.2);
}

.banner .titles::after {
  content: url("./assets/forget-me-not.svg");
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
  background: #8bdaa3 url("./assets/upload.svg") no-repeat center center;
  background-size: 60%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}

.upload input {
  position: absolute;
  top: 0;
  opacity: 0;
  font-size: 5vw;
}

#reload {
  height: 4vmax;
  width: 4vmax;
  border-radius: 50%;
  border: none;
  background: #fff url('./assets/reload.svg') no-repeat center center;
  background-size: 50%;
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2) ;
  position: absolute;
  right: 2vw;
  bottom: 10vh;
}
</style>
