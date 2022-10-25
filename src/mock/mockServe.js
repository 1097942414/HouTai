import Mock from 'mockjs'
import home from './home'
import user from './user'
import permission from './permission';

//请求延时3秒，模拟真实请求
Mock.setup(
  { timeout: 1000 }
)
//定义主页mock数据,对应各个接口模拟的数据
Mock.mock('/api/home/getData', home.getStatisticalData)
//定义用户管理mock数据,对应各个接口模拟的数据
Mock.mock('/api/user/addUserList','post',user.createUser) //添加
Mock.mock('/api/user/delUserList','post',user.deleteUser) //删除
Mock.mock('/api/user/editUserList','post',user.updateUser) //更新
Mock.mock(/api\/user\/getUserList/, 'get', user.getUserList) //获取用户列表
Mock.mock(/api\/permission/, 'post',permission.getMenu) //判断登录