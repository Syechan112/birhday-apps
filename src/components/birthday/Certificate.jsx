import { forwardRef, useRef, useState } from 'react'
import { CheckCircle2, Download } from 'lucide-react'
import { Button } from '../common/Button'
import { downloadCertificate } from '../../utils/downloadCertificate'
import { CertificateContent } from './certificate/CertificateContent'
import { CertificateExport } from './certificate/CertificateExport'
import { getCertificateDetails } from './certificate/certificateUtils'

export const Certificate = forwardRef(function Certificate(
  { recipient, age, config },
  _ref,
) {
  const [exportState, setExportState] = useState('idle')
  const exportRef = useRef(null)
  const details = getCertificateDetails(recipient, age)

  const exportCertificate = async () => {
    if (!exportRef.current || exportState === 'loading') return

    setExportState('loading')
    try {
      const result = await downloadCertificate(exportRef.current, details.filename)
      setExportState(result.success ? 'success' : 'error')
    } catch {
      setExportState('error')
    }
  }

  return (
    <section className="w-full max-w-3xl">
      <div className="relative isolate overflow-hidden border-[10px] border-double border-amber-300 bg-[#fff8fa] p-6 text-center shadow-xl sm:p-12">
        <div className="pointer-events-none absolute inset-3 border border-rose-200" />
        <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full border-[18px] border-rose-100/80" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 size-40 rounded-full border-[18px] border-rose-100/80" />
        <CertificateContent recipient={recipient} age={age} config={config} details={details} />
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Button onClick={exportCertificate} disabled={exportState === 'loading'}>
          <Download size={18} />
          {exportState === 'loading' ? 'Menyiapkan PNG...' : 'Download Sertifikat'}
        </Button>
        {exportState === 'success' && (
          <p className="flex items-center gap-2 text-sm text-emerald-600">
            <CheckCircle2 size={16} />Sertifikat berhasil diunduh.
          </p>
        )}
        {exportState === 'error' && <p className="text-sm text-red-500">Ekspor gagal. Coba lagi.</p>}
      </div>

      <CertificateExport
        recipient={recipient}
        age={age}
        config={config}
        details={details}
        exportRef={exportRef}
      />
    </section>
  )
})
