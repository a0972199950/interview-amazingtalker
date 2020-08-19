import { Request } from 'express'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

interface IPost {
  _id: string
  title: string
  content: string
  imageUrl: string
  creator: IUser
  createdAt: Date
  updatedAt: Date
}

interface IUser {
  _id: string
  name: string
  email: string
  password: string
  status: string
  posts: IPost[]
}

interface IUserInputData {
  email: string
  name: string
  password: string
}

interface IArgs {
  userInput: IUserInputData
}

const Validate = (target: Resolvers, name: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value

  descriptor.value = function(args: IArgs, req: Request) {
    const errors = []

    if (!isEmail(args.userInput.email)) {
      errors.push('email 必須是 email')
    }

    if (!isLength(args.userInput.password, { min: 3, max: 10 })) {
      errors.push('password 必須介於 3 到 10 個字元')
    }

    if (errors.length > 0) {
      const error = new Error('Invalid fields 0.0')
      error.data = errors
      throw error
    }

    return originalMethod.call(this, args, req)
  }

  return descriptor
}

class Resolvers {
  hello () {
    return 'Hello World!'
  }

  @Validate
  createUser (args: IArgs, req: Request): IUser {
    const { userInput } = args

    const newUser = {
      _id: 'userId',
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
      status: 'NEW',
      posts: []
    }

    return newUser
  }
}

export default new Resolvers()
