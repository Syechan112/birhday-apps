import { cn } from '../../lib/utils'

export function BackgroundGradientAnimation({
  gradientBackgroundStart = 'rgb(255, 255, 255)',
  gradientBackgroundEnd = 'rgb(255, 255, 255)',
  firstColor = '49, 153, 223',
  secondColor = '145, 180, 200',
  thirdColor = '49, 153, 223',
  fourthColor = '145, 180, 200',
  fifthColor = '49, 153, 223',
  pointerColor = '49, 153, 223',
  size = '60%',
  blendingValue = 'normal',
  children,
  className,
  interactive = true,
}) {
  const baseStyle = {
    background: `linear-gradient(135deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
  }

  const orbStyle = (color) => ({
    background: `radial-gradient(circle, rgba(${color}, 0.12) 0%, rgba(${color}, 0.04) 42%, transparent 72%)`,
    mixBlendMode: blendingValue,
    width: size,
    height: size,
  })

  return (
    <div
      className={cn(
        'relative isolate min-h-screen w-full overflow-hidden bg-white p-3 sm:p-5 lg:p-7',
        className
      )}
      style={baseStyle}
    >
      <div
        className="pointer-events-none absolute inset-3 border border-[#91B4C8] sm:inset-5 lg:inset-7"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -right-24 -top-20 h-64 w-64 rounded-full sm:-right-32 sm:-top-32 sm:h-96 sm:w-96"
          style={orbStyle(firstColor)}
        />

        <div
          className="absolute -bottom-20 -left-24 h-64 w-64 rounded-full sm:-bottom-32 sm:-left-32 sm:h-96 sm:w-96"
          style={orbStyle(secondColor)}
        />

        <div className="absolute left-[9%] top-[9%] h-2 w-2 rounded-full bg-[#3199DF]" />
        <div className="absolute right-[17%] top-[16%] h-1.5 w-1.5 rounded-full bg-[#91B4C8]" />
        <div className="absolute left-[17%] top-[24%] h-1 w-1 rounded-full bg-[#3199DF]/60" />
        <div className="absolute bottom-[23%] right-[12%] h-2 w-2 rounded-full bg-[#91B4C8]" />
        <div className="absolute bottom-[12%] right-[27%] h-1.5 w-1.5 rounded-full bg-[#3199DF]/70" />

        <svg
          className="absolute right-[9%] top-[7%] h-8 w-8 text-[#3199DF] sm:right-[10%] sm:top-[10%] sm:h-12 sm:w-12"
          viewBox="0 0 48 48"
          fill="currentColor"
        >
          <path d="M24 0 27.5 19.5 48 24 27.5 27.5 24 48 20.5 27.5 0 24 20.5 19.5Z" />
        </svg>

        <svg
          className="absolute left-[7%] top-[35%] h-5 w-5 text-[#91B4C8] sm:left-[10%] sm:top-[32%] sm:h-7 sm:w-7"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M24 3v42M3 24h42" />
        </svg>

        <svg
          className="absolute bottom-[9%] left-[10%] h-7 w-7 text-[#91B4C8] sm:bottom-[14%] sm:left-[10%] sm:h-9 sm:w-9"
          viewBox="0 0 48 48"
          fill="currentColor"
        >
          <path d="M24 0 27.5 19.5 48 24 27.5 27.5 24 48 20.5 27.5 0 24 20.5 19.5Z" />
        </svg>

        <svg
          className="absolute bottom-[32%] right-[7%] h-6 w-6 rotate-12 text-[#3199DF] sm:bottom-[30%] sm:right-[10%] sm:h-8 sm:w-8"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="7" y="7" width="34" height="34" rx="2" />
        </svg>

        <div className="absolute right-[8%] top-[39%] grid grid-cols-3 gap-1.5 opacity-60 sm:right-[13%] sm:top-[38%]">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#91B4C8]" />
          ))}
        </div>

        <div className="absolute bottom-[37%] left-[8%] grid grid-cols-3 gap-1.5 opacity-60 sm:bottom-[35%] sm:left-[13%]">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#3199DF]" />
          ))}
        </div>

        <div className="absolute left-[20%] top-[15%] h-5 w-5 rounded-full border border-[#91B4C8] sm:left-[23%] sm:top-[13%] sm:h-7 sm:w-7" />

        <div className="absolute bottom-[17%] right-[18%] h-4 w-4 rounded-full border border-[#3199DF]/70 sm:bottom-[19%] sm:right-[22%] sm:h-6 sm:w-6" />

        <div className="absolute left-1/2 top-[6%] h-px w-12 -translate-x-1/2 bg-[#91B4C8] sm:w-20" />

        <div className="absolute bottom-[6%] left-1/2 h-px w-12 -translate-x-1/2 bg-[#91B4C8] sm:w-20" />
      </div>

      {interactive && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute right-0 top-0 h-72 w-72 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${pointerColor}, 0.06), transparent 70%)`,
            }}
          />
        </div>
      )}

      <div className="relative z-10 flex min-h-[calc(100vh-1.5rem)] flex-col sm:min-h-[calc(100vh-2.5rem)] lg:min-h-[calc(100vh-3.5rem)]">
        {children}
      </div>
    </div>
  )
}