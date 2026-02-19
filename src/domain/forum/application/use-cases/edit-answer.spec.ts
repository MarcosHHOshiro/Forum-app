import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { makeAnswerAttachments } from "test/factories/make-answer-attachment";
import { makeQuestionAttachments } from "test/factories/make-question-attachment";

let inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository);
  })

  it("should be able to edit a answer by id", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId("answer-1"));

    await inMemoryAnswersRepository.create(newAnswer);

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: "answer-1",
      content: "Edited Answer Content",
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryAnswersRepository.items[0].content).toEqual("Edited Answer Content");
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it("should not be able to edit a answer with wrong author id", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId("answer-1"));

    inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "wrong-author-id",
      answerId: "answer-1",
      content: "Edited Answer Content",
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  })
})