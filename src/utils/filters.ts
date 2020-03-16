/**
 * 过滤
 */
import { zeroize } from './index'

/**
 * 格式化播放量等
 */
export function formatCount(n: string | number): string {
  const num: number = Number(n)
  let arr: Array<[number, string]> = [
    [100000000, '亿'],
    [10000, '万']
  ]
  for (let i = 0; i < arr.length; i++) {
    let dot: number = arr[i][0]
    if (num >= dot) {
      return parseInt(num / dot + '') + arr[i][1]
    }
  }
  return n + ''
}

/** 格式化时间、毫秒格式化为 xx:xx */
export function formatTime(
  /** 时间、毫秒  */
  timeMS: number
): string {
  let s = Math.floor(timeMS / 1000)
  let m = zeroize(Math.floor(s / 60))
  return m + ':' + zeroize(s % 60)
}
