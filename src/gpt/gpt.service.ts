import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { orthographyCheckUseCase } from './use-cases/orthography.use-case';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }
}
