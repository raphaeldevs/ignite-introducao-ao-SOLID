import { Response, Request } from "express";
import { User } from "modules/users/model/User";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body as Pick<User, "name" | "email">;

    try {
      const createdUser = this.createUserUseCase.execute({ name, email });

      return response.status(201).json(createdUser);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }
}

export { CreateUserController };
