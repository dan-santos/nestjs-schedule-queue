import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { ITweetsRepository } from './repositories/tweets.interface.repository';
import { TweetsRepository } from './repositories/tweets.repository';
import { TweetsCountService } from './tweets-count/tweets-count.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [TweetsController],
  providers: [
    TweetsService,
    {
      provide: ITweetsRepository,
      useClass: TweetsRepository
    },
    TweetsCountService
  ]
})
export class TweetsModule {}
