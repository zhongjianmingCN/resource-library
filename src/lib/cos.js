import COS from 'cos-js-sdk-v5'

export const cos = new COS({
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY
})

export async function uploadFile(file) {
  const Key = `uploads/${Date.now()}-${file.name}`
  const { Location } = await cos.putObject({
    Bucket: 'your-bucket-name',
    Region: 'ap-shanghai',
    Key,
    Body: file
  })
  return `https://${Location}`
}