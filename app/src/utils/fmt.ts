const lang = 'pt-BR'

export const fmt = {
  currency: (value: string): string =>
    new Intl.NumberFormat(lang, {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(value)),

  date: (value: string): string =>
    new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(
      new Date(value),
    ),
}
