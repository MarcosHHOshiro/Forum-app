import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  })

  it("should be able to edit a question by id", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId("question-1"));

    inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: "question-1",
      title: "Edited Question Title",
      content: "Edited Question Content"
    });

    expect(inMemoryQuestionsRepository.items[0].title).toEqual("Edited Question Title");
    expect(inMemoryQuestionsRepository.items[0].content).toEqual("Edited Question Content");
  })

  it("should not be able to edit a question with wrong author id", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId("question-1"));

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "wrong-author-id",
      questionId: "question-1",
      title: "Edited Question Title",
      content: "Edited Question Content"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  })
})