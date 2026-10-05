// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event) => {
  const bike = await db.collection('bikes').doc(event.id).get()
  const fileID = bike.data.pic
  
  await db.collection('bikes').doc(event.id).remove()
  
  if (fileID && fileID.startsWith('cloud://')) {
        await cloud.deleteFile({ fileList: [fileID] })
    }

  return { success: true }
}