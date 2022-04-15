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
const reloadClass = ref('class')

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

function handleReloadHover () {
  reloadClass.value = 'reload-spin'
  setTimeout(() => { reloadClass.value = 'class' }, 500)
}
</script>

<template>
  <div id="root">
    <main>
      <div :class="bannerCls">
        <Transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div
            v-show="!fileUploaded"
            class="titles"
          >
            <div class="title">
              Anohana
            </div>
            <div class="subtitle">
              The Flower We Saw That Day
            </div>
          </div>
        </Transition>
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
      <Transition
        enter-active-class="animate__animated animate__fadeInUpBig"
        leave-active-class="animate__animated animate__fadeOutDownBig"
      >
        <Swipe
          v-if="fileUploaded"
          :plants="plants"
        />
      </Transition>
      <Transition
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <button
          v-show="fileUploaded"
          id="reload"
          :class="reloadClass"
          @click="handleReload"
          @mouseenter="handleReloadHover"
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
  height: 100vh;
  width: 100vw;
  align-items: baseline;
  flex-direction: column;
  position: relative;
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
  background: #fff url("./assets/menma.png") no-repeat 5vmin 0;
  background-size: contain;
  width: 100%;
  padding: 2vmin 0;
  display: flex;
  flex-flow: column wrap;
}

footer * {
  text-align: center;
  color: #8bdaa3;
  font-size: 12px;
}

.banner {
  height: 60vh;
  width: 100vw;
  z-index: -10;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-bottom: -25vh;
  border-radius: 0 0 60% 60%;
}

.banner-default {
  background-image: url("./assets/curve.svg"),
    linear-gradient(135deg, #8bdaa3, #38b25d);
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
  background-size: 30em, contain;
}

.banner-uploaded {
  background-image: v-bind(pic);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.banner .titles {
  position: relative;
  margin: 0 auto;
}

.banner .titles .title {
  margin: 0 auto;
  color: white;
  text-align: center;
  font-size: 8vmax;
  font-family: "Times New Roman", Times, serif;
  border-bottom: 3px white solid;
}

.banner .titles .subtitle {
  margin: 0 auto;
  color: white;
  text-align: center;
  font-size: 2vmax;
  font-family: "Times New Roman", Times, serif;
}

.banner .titles::after {
  content: url("./assets/forget-me-not.svg");
  mix-blend-mode: color-dodge;
  position: absolute;
  top: -10px;
  right: -10px;
}

.banner::after {
  content: "";
  background-color: rgba(255, 255, 255, 0.5);
  height: 10vh;
  width: 100vw;
  position: absolute;
  bottom: 0;
  border-radius: 50%;
}

.upload {
  position: absolute;
  height: 8vmax;
  width: 8vmax;
  overflow: hidden;
  border-radius: 50%;
  background: #8bdaa3 url("./assets/upload.svg") no-repeat center center;
  background-size: 60%;
  top: calc(50vh - 4vmax);
  left: calc(50vw - 4vmax);
  /* top: 50%;
  left: 50%;
  transform: translate(-50%,-50%); */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
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
  background: #fff url("./assets/reload.svg") no-repeat center center;
  background-size: 50%;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.14);
  position: absolute;
  right: 2vw;
  bottom: 10vh;
}

.reload-spin {
  animation: rotate 0.5s;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
