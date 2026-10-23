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
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40'

  const variants = {
    primary:
      'bg-pink-500 px-6 py-3 text-white hover:bg-pink-600 active:bg-pink-700',
    secondary:
      'bg-pink-50 px-6 py-3 text-pink-600 hover:bg-pink-100 active:bg-pink-200',
    outline:
      'bg-white px-6 py-3 text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50 active:bg-neutral-100',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}