import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';
import { right, type Either } from '@/core/either';

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  InstructorId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

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

    return right({ answer });
  }
}