const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("accountBook").doc("b9b90696-e99b-40f4-b7c7-16f4dcf03b17").update({
      data: {
        
      }
    })
  } catch (e) {
    console.error(e)
  }
}