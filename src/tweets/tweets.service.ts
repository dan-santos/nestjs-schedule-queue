import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { ITweetsRepository } from './repositories/tweets.interface.repository';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(private tweetsRepository: ITweetsRepository){}

  async create(createTweetDto: CreateTweetDto) {
    const tweet = new Tweet({
      message: createTweetDto.message,
    });

    return await this.tweetsRepository.create(tweet);
  }

  async findAll(skip?: number, take?: number) {
    return await this.tweetsRepository.findMany(skip, take);
  }

  async findOne(id: string) {
    return await this.tweetsRepository.findById(id);
  }

  async update(id: string, updateTweetDto: UpdateTweetDto) {
    const tweet = await this.tweetsRepository.findById(id);
    tweet.update(updateTweetDto.message);

    return await this.tweetsRepository.save(tweet);
  }

  async remove(id: string) {
    return await this.tweetsRepository.removeById(id);
  }
}
