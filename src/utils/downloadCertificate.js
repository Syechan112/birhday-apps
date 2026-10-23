import { toPng } from 'html-to-image'

export async function downloadCertificate(element, filename) {
  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#ffffff',
    })

    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    link.click()
    link.remove()

    return { success: true }
  } catch (error) {
    console.error('Certificate export failed:', error)
    return { success: false, error }
  }
}