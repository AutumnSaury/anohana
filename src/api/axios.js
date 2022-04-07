import axios from 'axios'
import qs from 'qs'

export default {
  getAccessToken: async function (ak, sk) {
    const { data: { access_token: accessToken } } = await axios.get(
      '/3rd/bd-auth',
      {
        params: {
          grant_type: 'client_credentials',
          client_id: ak,
          client_secret: sk
        }
      }
    )
    return accessToken
  },

  sendPicture: async function (token, file) {
    return await axios.post(
      '/3rd/bd-plant',
      qs.stringify({
        image: file,
        baike_num: 3
      }),
      {
        params: {
          access_token: token
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  }
}
