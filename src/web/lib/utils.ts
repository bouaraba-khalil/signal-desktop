export function localMapper(locale: string, object: any, property: string) {
  return object[`${property}_${locale}`];
}
