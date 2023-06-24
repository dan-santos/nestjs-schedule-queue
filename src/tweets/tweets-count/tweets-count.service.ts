import { CACHE_MANAGER, CacheStore, } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TweetsService } from '../tweets.service';
import { TweetsRepository } from '../repositories/tweets.repository';

@Injectable()
export class TweetsCountService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: CacheStore
  ) {}

  private readonly logger = new Logger('Tweets-Count-CronJob');
  private limit = 10;
  private cacheTtl = 60 * 10;
  private tweetsRepository = new TweetsRepository();
  private tweetsService = new TweetsService(this.tweetsRepository);
  
  @Interval(5000)
  async countTweets() {
    let offset = await this.cacheManager.get<number>('tweet-offset');
    offset = offset === undefined ? 0 : offset;
    
    this.logger.warn(`Procurando por tweets com offset=${offset} e limite=${this.limit}...`);

    const tweets = await this.tweetsService.findAll(offset, this.limit);

    this.logger.warn(`${tweets.length} tweets encontrados.`);

    if(tweets.length === this.limit) {
      this.cacheManager.set('tweet-offset', offset + this.limit, { ttl: this.cacheTtl });
      this.logger.warn(`Achou mais ${this.limit} tweets.`);
    }
  }
}
