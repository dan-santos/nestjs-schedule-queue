import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';

interface TweetProps {
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Tweet {
  private _id: string;
  private props: TweetProps;

  constructor(
    props: Replace<TweetProps, { createdAt?: Date, updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get message(): string {
    return this.props.message;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public update(message: string) {
    this.props.message = message;
    this.props.updatedAt = new Date();
  }
}
