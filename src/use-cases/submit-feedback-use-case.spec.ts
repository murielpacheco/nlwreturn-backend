import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
   { create: createFeedbackSpy },
   { sendMail: sendMailSpy }
)

describe("Submit Feedback", () => {
   it("should be able to submit a feedback", async () => {

      await expect(submitFeedback.execute({
         type: "BUG",
         comment: "Comentário de bug",
         screenshot: "data:image:png;base64,test.jpg"
      })).resolves.not.toThrow()

      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalled();
   })

   

   it("shouldn't be able to create a feeedback without a type", async () => {

      await expect(submitFeedback.execute({
         type: "",
         comment: "Comentário de bug",
         screenshot: "data:image:png;base64,test.jpg"
      })).rejects.toThrow()
   })
   it("shouldn't be able to create a feeedback without a comment", async () => {

      await expect(submitFeedback.execute({
         type: "BUG",
         comment: "",
         screenshot: "data:image:png;base64,test.jpg"
      })).rejects.toThrow()
   })
   it("shouldn't be able to create a feeedback with a wrong screenshot format", async () => {

      await expect(submitFeedback.execute({
         type: "BUG",
         comment: "Bugs everywhere",
         screenshot: "test.jpg"
      })).rejects.toThrow()
   })
})