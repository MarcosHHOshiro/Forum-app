import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachment, type AnswerAttachmentProps } from "@/domain/forum/enterprise/entities/answer-attachment";

export function makeAnswerAttachments(
  overrides: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId
) {
  const answerattachments = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overrides
    }, id)

  return answerattachments;
}