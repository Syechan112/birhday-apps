import { Award, Crown, Flower2, Sparkles } from 'lucide-react'

export function CertificateExport({ recipient, age, config, details, exportRef }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-[-20000px] top-0">
      <div
        ref={exportRef}
        className="relative box-border flex h-[1131px] w-[1600px] flex-col items-center justify-center overflow-hidden border-[12px] border-double border-[#e9ad70] bg-[#fff5f8] px-[100px] py-[65px] text-center font-serif text-stone-600"
      >
        <div className="absolute inset-[18px] border-2 border-[#f3bfd0]" />
        <div className="absolute inset-[30px] border border-[#e9ad70]" />
        <div className="absolute -left-[120px] -top-[170px] size-[400px] rounded-full border-[55px] border-[#f4b5ca] opacity-65" />
        <div className="absolute -bottom-[230px] -right-[150px] size-[500px] rounded-full border-[65px] border-[#ed91b1] opacity-55" />
        <Flower2 className="absolute right-[85px] top-[90px] size-[100px] text-[#d987a6]" strokeWidth={0.8} />
        <Flower2 className="absolute bottom-[80px] left-[85px] size-[100px] text-[#d987a6]" strokeWidth={0.8} />

        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <div className="flex size-[66px] items-center justify-center rounded-full border border-[#e9ad70] bg-[#fffafd] text-[#c65e89]">
            <Award size={42} strokeWidth={1.3} />
          </div>
          <Sparkles className="mt-3 text-[#d76a91]" size={24} />
          <p className="mt-3 font-sans text-[17px] font-bold uppercase tracking-[7px] text-[#b94e78]">{config.title}</p>
          <h2 className="mt-2 text-[78px] font-bold leading-[1.05] text-[#d84f80]">Certificate</h2>
          <p className="mt-2 font-sans text-[23px] tracking-[9px] text-stone-600">OF BIRTHDAY ACHIEVEMENT</p>
          <div className="mt-[22px] bg-[#d84f80] px-[55px] py-[13px] font-sans text-[16px] uppercase tracking-[3px] text-white">This certificate is proudly presented to</div>
          <h1 className="mt-[18px] max-w-[1300px] break-words text-[66px] leading-[1.1] text-[#d84f80]">{recipient.name}</h1>
          <div className="mt-[18px] h-0.5 w-[760px] bg-[#e9a6bf]" />
          <p className="mt-5 max-w-[1100px] font-sans text-[22px] leading-[1.5]">In celebration of <strong>{age.years} years</strong> of wonderful memories, meaningful moments, and a beautiful journey through life.</p>
          <div className="mt-[18px] flex items-center gap-3 border border-[#e7afc4] bg-[#fffafd] px-[30px] py-[11px] font-sans text-[16px] font-bold tracking-[2px] text-[#b94e78]">
            <Crown size={20} />{config.badge}
          </div>
          <div className="mt-[25px] grid w-[850px] grid-cols-2 border-y border-[#e9adbd] py-[18px] font-sans">
            <div className="border-r border-[#e9adbd] px-5"><p className="text-[13px] tracking-[4px] text-stone-400">TANGGAL LAHIR</p><p className="mt-2.5 text-[20px] font-bold">{details.formattedBirthDate}</p></div>
            <div className="px-5"><p className="text-[13px] tracking-[4px] text-stone-400">DITERBITKAN</p><p className="mt-2.5 text-[20px] font-bold">{details.issuedDate}</p></div>
          </div>
          <p className="mt-5 max-w-[1100px] text-[23px] italic text-[#c65e89]">“{config.closing}”</p>
          <p className="mt-4 font-sans text-[13px] tracking-[4px] text-stone-400">NO. {details.certificateNumber}</p>
        </div>
      </div>
    </div>
  )
}
