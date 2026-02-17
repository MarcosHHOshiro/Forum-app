import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
  overrides: Partial<QuestionProps> = {},
  id?: UniqueEntityId
) {
  const question = Question.create({
    title: faker.lorem.sentence(),
    authorId: new UniqueEntityId(),
    content: faker.lorem.paragraphs(2),
    ...overrides
  }, id)

  return question;
}