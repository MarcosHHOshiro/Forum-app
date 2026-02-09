import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
    questionId: string;
    InstructorId: string;
    content: string;
}

export class AnswerQuestionUseCase {
    execute({ questionId, InstructorId, content }: AnswerQuestionUseCaseRequest) {
        const answer = new Answer(content);

        return answer;
    }
}