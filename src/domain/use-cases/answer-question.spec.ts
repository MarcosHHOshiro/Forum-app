import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import type { AnswersRepository } from "../repositories/answers-repository";
import type { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRepository = {
    create: async function (answer: Answer) {
        return;
    }
}

test("Create an answer", async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

    const answer = await answerQuestion.execute({
        questionId: "1",
        InstructorId: "1",
        content: "This is an answer to the question."
    });

    expect(answer).toEqual(expect.objectContaining({
        content: "This is an answer to the question."
    }));
})