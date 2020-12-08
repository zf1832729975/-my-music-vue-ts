async function generateTheme(themeEl) {
  let styleStr = ''
  if (themeEl.tagName === 'LINK') {
    styleStr = await getCSSString(themeEl.href)
  } else if (themeEl.tagName === 'STYLE') {
    styleStr = themeEl.innerText
  } else {
    throw new Error('themeEl 不符合条件！')
  }
  console.log('styleStr : ', styleStr)
}

function getCSSString(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          reject(xhr)
        }
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}
