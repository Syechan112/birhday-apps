
import { toPng } from 'html-to-image'

export async function downloadCertificate(element, filename) {
  if (!element) {
    return {
      success: false,
      error: new Error('Certificate element not found'),
    }
  }

  try {
    await document.fonts.ready

    const dataUrl = await toPng(element, {
      width: 1600,
      height: 1131,
      canvasWidth: 1600,
      canvasHeight: 1131,
      pixelRatio: 1,
      cacheBust: true,
      backgroundColor: '#fff5f8',
    })

    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    link.click()

    return { success: true }
  } catch (error) {
    console.error('Certificate export failed:', error)

    return {
      success: false,
      error,
    }
  }
}
