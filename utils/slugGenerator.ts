export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function generateUniqueSlug(name: string, existingSlugs: string[]): string {
  let slug = generateSlug(name);
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(name)}-${counter}`;
    counter++;
  }
  
  return slug;
}
