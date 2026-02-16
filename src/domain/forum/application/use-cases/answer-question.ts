import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  InstructorId: string;
  content: string;
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ) { }

  async execute({
    questionId,
    InstructorId,
    content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(InstructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return { answer };
  }
}