import { Tweet } from '../entities/tweet.entity';

export abstract class ITweetsRepository {
  abstract create(tweet: Tweet): Promise<Tweet | null>;
  abstract findById(tweetId: string): Promise<Tweet | null>;
  abstract findMany(skip?: number, take?: number): Promise<Tweet[] | null>;
  abstract removeById(tweetId: string): Promise<void>;
  abstract save(tweet: Tweet): Promise<Tweet | null>;
}