import { Slug } from "./slug";

test("should be able to create a slug", () => {
  const slug = Slug.createFromText("My Slug")

  expect(slug.value).toBe("my-slug")
})