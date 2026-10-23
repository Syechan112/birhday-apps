export function Input({
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  autoComplete,
  className = '',
  disabled = false,
  ...rest
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      disabled={disabled}
      className={`w-full rounded-lg border border-[#D7E4EC] bg-white px-4 py-2.5 text-base text-neutral-900 outline-none focus:border-[#3199DF] focus:ring-2 focus:ring-[#3199DF]/20 disabled:opacity-50 ${className}`}
      {...rest}
    />
  )
}
