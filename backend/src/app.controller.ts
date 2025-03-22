import { Controller, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {
	@Get()
	ping(): string {
		return "pong";
	}

	@Post("chat")
	chat(@Res() res: Response) {
		new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
			res.json("Mensagem generica!").send(),
		);
	}
}
