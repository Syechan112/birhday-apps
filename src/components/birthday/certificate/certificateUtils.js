export function getCertificateDetails(recipient, age) {
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' })
  const filenameName = recipient.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')

  return {
    formattedBirthDate: formatter.format(new Date(recipient.date)),
    issuedDate: formatter.format(today),
    certificateNumber: `BDAY-${today.getFullYear()}-${String(age.totalDays).padStart(5, '0')}`,
    filename: `birthday-certificate-${filenameName || 'birthday'}.png`,
  }
}
