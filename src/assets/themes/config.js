/** 控制页面上的主题，需要用js控制的 */
import blue from './blue/_variable.scss'
import golden from './golden/_variable.scss'
import green from './green/_variable.scss'
import pink from './pink/_variable.scss'
import red from './red/_variable.scss'

const config = {
  black: {
    name: 'black',
    title: '炫酷黑',
    themeColor: '#242427',
    backgroundImage:
      'http://p2.music.126.net/FFv3X-5m13Bi6kO5ObcAOQ==/109951164774795457.jpg?param=140y140'
  },
  red: {
    name: 'red',
    title: '官方红',
    // themeColor: '#C62F2F',
    themeColor: red.primaryColor,
    backgroundImage:
      'http://p2.music.126.net/TUBlMnKtrTmtyK3T0up3JA==/109951164712687908.jpg?param=140y140'
  },
  pink: {
    name: 'pink',
    title: '可爱粉',
    // themeColor: '#F899C0',
    themeColor: pink.primaryColor,
    backgroundImage:
      'https://p2.music.126.net/fFrFskt1Az8zMn-vqTZC-Q==/109951164787743080.jpg?param=130y130'
  },
  blue: {
    name: 'blue',
    title: '天际蓝',
    themeColor: blue.primaryColor,
    backgroundImage:
      'http://p1.music.126.net/Z-KNl3QOi8_IyTfrXN1V6A==/109951164174689863.jpg?param=140y140'
  },
  green: {
    name: 'green',
    title: '清晰绿',
    // themeColor: '#3EBA7A',
    themeColor: green.primaryColor,
    backgroundImage:
      'https://p2.music.126.net/faAU30i2QZC9NdJYedCY7g==/109951164788912295.jpg?param=130y130'
  },
  golden: {
    name: 'golden',
    title: '土豪金',
    // themeColor: '#D89F55',
    themeColor: green.primaryColor,
    backgroundImage:
      'http://p1.music.126.net/s_nE72pSqUguCHci7kvtnQ==/109951163369771772.jpg?param=140y140'
  }
}

export default config
