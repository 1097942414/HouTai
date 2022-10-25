//接口统一管理
import requests from './requests.js'
// import mockRequest from './mockRequests.js'

//主页请求接口
export const getData = () => requests.get('/home/getData')

//用户管理请求接口，
//获取用户列表
export const getUserListApi = (params) => {
  // console.log(params);
  return requests.get('/user/getUserList', params)
}
//添加用户信息
export const addUserApi = (data) => {
  return requests.post('/user/addUserList', data)
}
//删除用户信息
export const delUserApi = (data) => {
  return requests.post('/user/delUserList', data)
}
//编辑用户信息
export const editUserApi = (data) => {
  return requests.post('/user/editUserList', data)
}
export const permissionApi = (data) => {
  console.log(data);
  return requests.post('/api/permission',data)
}

