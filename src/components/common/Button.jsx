export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B4C8] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40'

  const variants = {
    primary:
      'bg-[#3199DF] px-6 py-3 text-white hover:bg-[#2588CC] active:bg-[#1E76B5]',
    secondary:
      'bg-[#E8F1F6] px-6 py-3 text-[#243746] hover:bg-[#D7E7F0] active:bg-[#C7DCE8]',
    outline:
      'border-2 border-[#91B4C8] bg-white px-6 py-3 text-neutral-950 hover:bg-[#F0F7FA] active:bg-[#E3EFF5]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}