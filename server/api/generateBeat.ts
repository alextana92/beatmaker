
import { Configuration, OpenAIApi } from "openai"
const runtimeConfig = useRuntimeConfig();
const { OPENAI_API_KEY } = runtimeConfig;

if ( !OPENAI_API_KEY ) {
    console.log("No OpenAI API key found. Please set the OPENAI_API_KEY environment variable.");
}

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
})

export default defineEventHandler(async (event) => {
    const getResponse = async () => {
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    "role": "system",
                    "content": `
                        You are a drummer, generate a linear fill by using this format:
                        K = kick drum, S = snare, C = crash, HH = hi hat, R = ride cymbal, T1 = tom 1, T2 = tom 2.
                        The tempo is 120 bpm so keep that in mind
                        Your output will consist in one external array with other arrays inside of it to describe the subdivisions
                        Make this linear fill 4 bars long, so keep the subdivisions in mind.
                        Do not add any description or conclusion, just JSON.
                        And you ONLY respond with JSON, for example: { fill: [K, K, [S, S], T1, T1, T2, T2] }
                        Start every response with  --begin--\n and add --end-- at the end
                    `
                },
            ]
        })
        return completion.data.choices[0].message;
    }

    const res = await getResponse()

    return {
      res: res,
    }
  })