import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("Create an answer", () => {
    const answerQuestion = new AnswerQuestionUseCase();

    const answer = answerQuestion.execute({
        questionId: "1",
        InstructorId: "1",
        content: "This is an answer to the question."
    });

    expect(answer).toEqual(expect.objectContaining({
        content: "This is an answer to the question."
    }));
})