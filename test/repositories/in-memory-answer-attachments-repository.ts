import type { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import type { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  public items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string) {
    const answersComments = this.items.filter(
      (item) => item.answerId.toString() === answerId
    )

    return answersComments;
  }

  async deleteManyByAnswerId(answerId: string) {
    const quesionAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId
    )

    this.items = quesionAttachments;
  }
}