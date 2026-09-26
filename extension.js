console.log("Extension loaded")

function getTargets(elements, amount = 3) {
  const candidates = elements.filter(isVisible).slice(0, amount)

  return candidates.map(el => {
    const rect = el.getBoundingClientRect()

    return {
      x: rect.left + rect.width * 0.60,
      y: rect.top + rect.height * 0.10
    }
  })
}

const isVisible = (element) => {
  const rect = element.getBoundingClientRect()

  return rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom > 0 &&
    rect.top > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth
}

function markPoint(x, y) {
  const point = document.createElement('div')

  Object.assign(point.style, {
    position: 'fixed',
    left: `${x - 5}px`,
    top: `${y - 5}px`,
    width: '10px',
    height: '10px',
    background: 'red',
    borderRadius: '50%',
    zIndex: '99',
    pointerEvents: 'none'
  })

  document.body.appendChild(point)

  setTimeout(() => point.remove(), 400)
}

document.addEventListener('keydown', ev => {
  if (location.pathname !== '/results') return

  const contents = Array.from(document.querySelectorAll("#contents > ytd-video-renderer"))
  const targets = getTargets(contents)

  const index = Number(ev.key) - 1

  if (targets[index] == null) return

  const { x, y } = targets[index]

  // Just is for feedback visual
  // you can remove it if you want
  markPoint(x, y)

  const element_selected = document.elementFromPoint(x, y)

  if (element_selected instanceof HTMLElement) element_selected.click()
})
