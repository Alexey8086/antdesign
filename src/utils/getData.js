import axios from "axios"

const config = {
    headers:{
        Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoib25lc3RhdHNfaG9zdCJ9.UQIufWTrha0jQco2S7pWj_sfgVxm1ELcnD8OhoKPpuw',
        Accept: 'application/json'
    }
  }





export const getData = async (limit, offset) => {
    const url = `https://api.onestats.pro/items/all?days=30&limit=${limit}&offset=${offset}`
    const data = await axios.get(url, config)

    return data
}