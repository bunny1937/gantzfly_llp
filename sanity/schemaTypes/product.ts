import { defineType, defineField } from "sanity";

const product = defineType({
  name: "product",
  title: "Product",
  type: "document",

  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
    }),

    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Spices", value: "spices" },
          { title: "Makhana", value: "makhana" },
          { title: "Dry Fruits", value: "dry-fruits" },
        ],
      },
    }),

    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
    }),

    defineField({
      name: "grade",
      title: "Grade",
      type: "string",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "packagingOptions",
      title: "Packaging Options",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "moq",
      title: "MOQ",
      type: "string",
    }),

    defineField({
      name: "moqUnit",
      title: "MOQ Unit",
      type: "string",
    }),

    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "exportMarkets",
      title: "Export Markets",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),

    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
  ],
});

export default product;
