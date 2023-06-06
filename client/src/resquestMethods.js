import axios from 'axios'

const BASE_URL = "http://localhost:4400/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzNiZjI0MmM2YzkzYzU5MDg3NTYzYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NTUxMTgzN30.eMyGAHtE8yYR_TTohFZi8BLX7o-zDyKYwcdJYQOdMHw"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})