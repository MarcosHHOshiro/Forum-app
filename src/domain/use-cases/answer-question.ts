import { Answer } from "../entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
    questionId: string;
    InstructorId: string;
    content: string;
}

export class AnswerQuestionUseCase {
    constructor(
        private answersRepository: AnswersRepository
    ) { }

    async execute({ questionId, InstructorId, content }: AnswerQuestionUseCaseRequest) {
        const answer = new Answer({
            content,
            questionId,
            authorId: InstructorId
        });

        await this.answersRepository.create(answer);

        return answer;
    }
}