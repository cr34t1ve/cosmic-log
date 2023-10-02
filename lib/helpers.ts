export function transformLabel(label: string) {
  const removeCamel = label.replace(/([A-Z])/g, ' $1');
  return removeCamel.charAt(0).toUpperCase() + removeCamel.slice(1);
}
