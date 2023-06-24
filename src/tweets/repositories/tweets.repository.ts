import { Tweet } from '../entities/tweet.entity';
import { Tweet as RawTweet } from '@prisma/client';
import { ITweetsRepository } from './tweets.interface.repository';
import { TweetMapper } from '../../prisma/prisma-tweet-mapper';
import { PrismaService } from 'src/prisma/prisma.service';

export class TweetsRepository implements ITweetsRepository {
  
  private prismaService = new PrismaService();

  async create(tweet: Tweet): Promise<Tweet | null> {
    const prismaTweet = TweetMapper.toPrisma(tweet);

    const raw = await this.prismaService.tweet.create({
      data: prismaTweet,
    });

    return TweetMapper.toDomain(raw);
  }

  async findById(tweetId: string): Promise<Tweet> {
    const raw = await this.prismaService.tweet.findFirst({
      where: {
        id: tweetId,
      },
    });

    if (!raw) return null;

    return TweetMapper.toDomain(raw);
  }

  async findMany(skip?: number, take?: number): Promise<Tweet[]> {
    let tweets: RawTweet[];

    if (take && skip) {
      tweets = await this.prismaService.tweet.findMany({
        take: take,
        skip: skip,
      });
    } else {
      if (take) {
        tweets = await this.prismaService.tweet.findMany({
          take: take,
        });
      } else if (skip) {
        tweets = await this.prismaService.tweet.findMany({
          skip: skip,
        });
      } else {
        tweets = await this.prismaService.tweet.findMany();
      }
    }

    return tweets.map((tweet) => {
      return TweetMapper.toDomain(tweet);
    });
  }

  async removeById(tweetId: string): Promise<void> {
    await this.prismaService.tweet.delete({
      where: {
        id: tweetId,
      },
    });
  }

  async save(tweet: Tweet): Promise<Tweet | null> {
    const prismaTweet = TweetMapper.toPrisma(tweet);

    const raw = await this.prismaService.tweet.update({
      where: {
        id: tweet.id
      },
      data: prismaTweet
    });

    return TweetMapper.toDomain(raw);
  }
  
}