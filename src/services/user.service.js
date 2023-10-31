import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    // update,
    // changeScore
}

window.userService = userService


function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

// async function update({_id, score}) {
//     const user = await storageService.get('user', _id)
//     user.score = score
//     await storageService.put('user', user)

//     // const user = await httpService.put(`user/${_id}`, {_id, score})
//     // // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => (user.email === userCred.email) && (user.password===userCred.password))
    
    const user = await httpService.post('auth/login', userCred)

    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = utilService.getRandomObjectFromArray(colors).color
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }

function saveLocalUser(user) {
    user = {_id: user._id,email:user.email,fullname: user.fullname, imgUrl: user.imgUrl}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

const colors = [
    { color: '#baf3db', colorName: 'green', shade: 'subtle' }, { color: '#f8e6a0', colorName: 'yellow', shade: 'subtle' }, { color: '#ffe2bd', colorName: 'orange', shade: 'subtle' }, { color: '#ffd2cc', colorName: 'red', shade: 'subtle' }, { color: '#dfd8fd', colorName: 'purple', shade: 'subtle' },
    { color: '#4bce97', colorName: 'green', shade: '' }, { color: '#e2b203', colorName: 'yellow', shade: '' }, { color: '#faa53d', colorName: 'orange', shade: '' }, { color: '#f87462', colorName: 'red', shade: '' }, { color: '#9f8fef', colorName: 'purple', shade: '' },
    { color: '#1f845a', colorName: 'green', shade: 'bold' }, { color: '#946f00', colorName: 'yellow', shade: 'bold' }, { color: '#b65c02', colorName: 'orange', shade: 'bold' }, { color: '#ca3521', colorName: 'red', shade: 'bold' }, { color: '#6e5dc6', colorName: 'purple', shade: 'bold' },
    { color: '#cce0ff', colorName: 'blue', shade: 'subtle' }, { color: '#c1f0f5', colorName: 'sky', shade: 'subtle' }, { color: '#d3f1a7', colorName: 'lime', shade: 'subtle' }, { color: '#fdd0ec', colorName: 'pink', shade: 'subtle' }, { color: '#dcdfe4', colorName: 'black', shade: 'subtle' },
    { color: '#579dff', colorName: 'blue', shade: '' }, { color: '#60c6d2', colorName: 'sky', shade: '' }, { color: '#94c748', colorName: 'lime', shade: '' }, { color: '#e774bb', colorName: 'pink', shade: '' }, { color: '#8590a2', colorName: 'black', shade: '' },
    { color: '#0c66e4', colorName: 'blue', shade: 'bold' }, { color: '#1d7f8c', colorName: 'sky', shade: 'bold' }, { color: '#5b7f24', colorName: 'lime', shade: 'bold' }, { color: '#ae4787', colorName: 'pink', shade: 'bold' }, { color: '#626f86', colorName: 'black', shade: 'bold' }
]

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()