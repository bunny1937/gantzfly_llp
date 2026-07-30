const productFields = `
  id,
  "slug": slug.current,
  name,
  category,
  origin,
  productionArea,
  grade,
  shortDescription,
  description,
  packagingOptions,
  moq,
  moqUnit,
  quantityAvailable,
  pricePerUnit,
  hsCode,
  shelfLife,
  leadTime,
  certifications,
  tags,
  exportMarkets,
  exportPotential,
  valueAddition,
  featured,
  badge,
  "image": image.asset->url,
  "imageSecondary": imageSecondary.asset->url
`;

export const productBySlugQuery = `
*[
  _type == "product" &&
  category == $category &&
  slug.current == $slug
][0]{${productFields}}
`;

export const productsByCategoryQuery = `
*[
  _type == "product" &&
  category == $category
]{${productFields}}
`;

export const allProductsQuery = `
*[_type == "product"] | order(id asc){${productFields}}
`;
