/* Copyright 2021, Milkdown by Mirone. */


/// Read the image file as base64.
export const readImageAsBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        resolve({
          alt: file.name,
          src: reader.result ,
        })
      },
      false,
    )
    reader.readAsDataURL(file)
  })
}

/// The default uploader.
/// It will upload transform images to base64.
export const defaultUploader = async (files, schema) => {
  const imgs = []

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    if (!file)
      continue

    if (!file.type.includes('image'))
      continue

    imgs.push(file)
  }
  const { image } = schema.nodes
  if (!image)
    throw "missingNodeInSchema('image')"

  const data = await Promise.all(imgs.map(img => readImageAsBase64(img)))

  return data.map(({ alt, src }) => image.createAndFill({ src, alt , title:'salam', height:"100px", width:"100px" }) )
}