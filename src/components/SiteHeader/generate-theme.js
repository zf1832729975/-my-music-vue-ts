// themeEl = document.getElementById('_theme_link')
// generateTheme(themeEl, '#3396fc', '#fc5531')

let cuStyle

/**
 * 生成主题
 * @param {*} themeEl 主题颜色的 el
 * @param {*} oldThemeColor 旧主题颜色
 * @param {*} newThemColor 新主意颜色
 */
export async function generateTheme(themeEl, oldThemeColor, newThemColor) {
  if (themeEl.tagName === 'LINK') {
    const styleStr = await getCSSString(themeEl.href)

    if (!cuStyle) {
      cuStyle = document.createElement('style')
      cuStyle.setAttribute('id', 'cu-style--' + parseInt(Math.random() * 1000))

      document.head.append(cuStyle)
    }

    cuStyle.innerText = styleStr.replace(
      new RegExp(oldThemeColor, 'ig'),
      newThemColor
    )
  } else if (themeEl.tagName === 'STYLE') {
    themeEl.innerText = themeEl.innerText.replace(
      new RegExp(oldThemeColor, 'ig'),
      newThemColor
    )
  } else {
    throw new Error('themeEl 不符合条件！')
  }
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
