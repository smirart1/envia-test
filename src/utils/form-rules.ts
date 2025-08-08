export const rules = {
  requiredZip: (v: string) => !!v || 'Ingresa el código postal',
  requiredCarrier: (v: string) => !!v || 'Selecciona una paquetería',
  requiredType: (v: string) => !!v || 'Selecciona un tipo de envío',
  requiredWeight: (v: string | number) => !!v || 'Especifica el peso',
  requiredHeight: (v: string | number) => !!v || 'Especifica la altura',
  requiredWidth: (v: string | number) => !!v || 'Especifica el ancho',
  requiredLength: (v: string | number) => !!v || 'Especifica el largo',
  validZip: (v: string) => /^\d{5}$/.test(v) || 'Ingresa un código postal válido de 5 dígitos',
}
