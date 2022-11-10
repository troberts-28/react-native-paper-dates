import * as React from 'react'
import Color from 'color'

export function useLatest<T>(value: T) {
  const ref = React.useRef(value)
  ref.current = value
  return ref
}

export function useHeaderBackgroundColor() {
  return '#0B3C29'
}

export function useHeaderColorIsLight() {
  const background = '#0B3C29'
  return Color(background).isLight()
}

export function useHeaderTextColor() {
  const isLight = useHeaderColorIsLight()
  return !isLight ? '#CCE4D9' : '#3D3C3C'
}

export function useTextColorOnPrimary() {
  const isDark = !Color('#0B3C29').isLight()
  return isDark ? '#CCE4D9' : '#3D3C3C'
}

export function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, i) => start + i)
}

export function lightenBy(color: Color, ratio: number) {
  const lightness = color.lightness()
  return color.lightness(lightness + (100 - lightness) * ratio)
}

export function darkenBy(color: Color, ratio: number) {
  const lightness = color.lightness()
  return color.lightness(lightness - lightness * ratio)
}
