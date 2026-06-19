export const productBySlugQuery = `
*[
  _type == "product" &&
  category == $category &&
  slug.current == $slug
][0]{
  id,
  "slug": slug.current,
  name,
  category,
  origin,
  grade,
  shortDescription,
  description,
  packagingOptions,
  moq,
  moqUnit,
  certifications,
  tags,
  exportMarkets,
  featured,
  badge,
  "image": image.asset->url
}
`;

export const productsByCategoryQuery = `
*[
  _type == "product" &&
  category == $category
]{
  id,
  "slug": slug.current,
  name,
  category,
  origin,
  grade,
  shortDescription,
  description,
  packagingOptions,
  moq,
  moqUnit,
  certifications,
  tags,
  exportMarkets,
  featured,
  badge,
  "image": image.asset->url
}
`;
