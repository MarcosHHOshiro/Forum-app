import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { NotAllowedError } from "@/core/erros/errors/not-allowed-error";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  })

  it("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString()
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  })

  it("should not be able to delete another user answer comment", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId("other-author-id")
    })

    await inMemoryAnswerCommentsRepository.create(answerComment);

    const result = sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: "author-id"
    })

    expect((await result).isLeft()).toBe(true);
    expect((await result).value).toBeInstanceOf(NotAllowedError);
  })
})