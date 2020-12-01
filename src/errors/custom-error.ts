export class CustomError {
	constructor(name: string, message: string, code: number) {
		this.name = name;
		this.message = message;
		this.code = code;
	}
  code: number;
  name: string;
  message: string;
}
 
export class ValidationError extends CustomError {
	constructor(message: string) {
		super('VALIDATION_ERROR', message, 400);
	}
}
 
export class ServerError extends CustomError {
	constructor(message: string) {
		super('SERVER_ERROR', message, 500);
	}
}

