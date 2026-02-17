import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer, type AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeAnswer(
  overrides: Partial<AnswerProps> = {},
  id?: UniqueEntityId
) {
  const answer = Answer.create({
    questionId: new UniqueEntityId(),
    authorId: new UniqueEntityId(),
    content: faker.lorem.paragraphs(2),
    ...overrides
  }, id)

  return answer;
}