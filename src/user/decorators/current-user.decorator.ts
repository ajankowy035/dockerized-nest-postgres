import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  //inspect incoming request
  //context is a kind of a wraper around incoming request
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    //whatever return it's going to be an argument to a wraped up handler
    return request.currentUser;
  },
);
