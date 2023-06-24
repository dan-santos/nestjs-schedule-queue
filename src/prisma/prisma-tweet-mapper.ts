import { Tweet as RawTweet } from '@prisma/client';
import { Tweet } from '../tweets/entities/tweet.entity';

export class TweetMapper {
  static toDomain(raw: RawTweet): Tweet{
    const tweet = new Tweet({
      message: raw.message,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at
    }, raw.id);

    return tweet;
  }

  static toPrisma(model: Tweet): RawTweet {
    const tweet: RawTweet = {
      id: model.id,
      message: model.message,
      created_at: model.createdAt,
      updated_at: model.updatedAt
    };

    return tweet;
  }
}