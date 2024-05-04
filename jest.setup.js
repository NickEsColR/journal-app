import 'whatwg-fetch'

require('dotenv').config({
    path: '.env.test'
})

jest.mock('./src/helpers/getEnvs.js',()=> ({
    getEnvs: () => ({...process.env})
}))