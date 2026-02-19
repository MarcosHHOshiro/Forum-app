import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
  deleteManyByQuestionId(questionId: string): Promise<void>;
}