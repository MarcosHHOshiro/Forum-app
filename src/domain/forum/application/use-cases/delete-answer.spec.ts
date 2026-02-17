import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  })

  it("should be able to delete a answer by id", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId("answer-1"));

    inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: "answer-1"
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  })

  it("should not be able to delete a answer with wrong author id", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId("answer-1"));

    inMemoryAnswersRepository.create(newAnswer);

    await expect(() => sut.execute({
      authorId: "wrong-author-id",
      answerId: "answer-1"
    })).rejects.toBeInstanceOf(Error);
  })
})