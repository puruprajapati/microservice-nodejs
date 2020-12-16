export abstract class CustomError extends Error {
  abstract statusCode: number;

  // in constructor message parameter added so that throw new Error('sdfsfds) still works
  constructor(message: string) {
    super(message);

    // only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

// interface can be used to define schema of error message instead of abstract
// but use of interface cannot use instance of
