import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        You will get texts possibly with grammatical and orthographic errors,
        you must respond in JSON format,
        your task is to correct them and return information on the requests,
        also give a percentage of error-free words from the user.
        In case there are no errors, you must respond a congratulations message.

        Output example:
        {
          userScore: number, // ['error-free %']
          errors: string[], // ['error -> solution']
          message: string, // include emojis and text for congratulating the user
        }
        `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    max_tokens: 150,
    // no todos los modelos soportan esto:
    // response_format: {
    //   type: 'json_object',
    // },
  });

  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};
