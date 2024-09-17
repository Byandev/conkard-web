export function findFieldById(fields: any[], id: number | null) {
  return fields.find((item) => item.id === id);
}
