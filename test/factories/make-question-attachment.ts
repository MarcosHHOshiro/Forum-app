import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment, type QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachments(
  overrides: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId
) {
  const questionattachments = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overrides
    }, id)

  return questionattachments;
}