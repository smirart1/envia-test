export const rules = {
  requiredZip: (v: string) => !!v || 'Ingresa el código postal',
  requiredCarrier: (v: string) => !!v || 'Selecciona una paquetería',
  requiredType: (v: string) => !!v || 'Selecciona un tipo de envío',
  requiredWeight: (v: string | number) => !!v || 'Especifica el peso',
  requiredHeight: (v: string | number) => !!v || 'Especifica la altura',
  requiredWidth: (v: string | number) => !!v || 'Especifica el ancho',
  requiredLength: (v: string | number) => !!v || 'Especifica el largo',
  requiredName: (v: string) => !!v || 'Ingresa el nombre',
  requiredPhone: (v: string) => !!v || 'Ingresa el teléfono',
  requiredStreet: (v: string) => !!v || 'Ingresa la calle',
  requiredNumber: (v: string | number) => !!v || 'Ingresa el número',
  requiredCity: (v: string) => !!v || 'Ingresa la ciudad',
  requiredState: (v: string) => !!v || 'Selecciona un estado',
  validZip: (v: string) => /^\d{5}$/.test(v) || 'Ingresa un código postal válido de 5 dígitos',
  validPhone: (v: string) =>
    /^\d{10}$/.test(v) || 'Ingresa un número de teléfono válido de 10 dígitos',
}
