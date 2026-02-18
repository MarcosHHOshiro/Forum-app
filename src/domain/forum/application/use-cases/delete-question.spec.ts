import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  })

  it("should be able to delete a question by id", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId("question-1"));

    inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: "question-1"
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  })

  it("should not be able to delete a question with wrong author id", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId("question-1"));

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "wrong-author-id",
      questionId: "question-1"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  })
})