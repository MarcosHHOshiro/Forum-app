import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  })

  it("should be able to edit a answer by id", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId("answer-1"));

    inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: "answer-1",
      content: "Edited Answer Content"
    });

    expect(inMemoryAnswersRepository.items[0].content).toEqual("Edited Answer Content");
  })

  it("should not be able to edit a answer with wrong author id", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId("answer-1"));

    inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "wrong-author-id",
      answerId: "answer-1",
      content: "Edited Answer Content"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  })
})