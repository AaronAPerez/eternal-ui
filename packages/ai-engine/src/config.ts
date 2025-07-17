import { z } from 'zod';

const ConfigSchema = z.object({
  openai: z.object({
    apiKey: z.string().min(1, 'OpenAI API key is required'),
    model: z.string().default('gpt-4-turbo-preview'),
    temperature: z.number().min(0).max(1).default(0.2),
    maxTokens: z.number().positive().default(4000)
  }),
  performance: z.object({
    enableCaching: z.boolean().default(true),
    cacheTimeout: z.number().positive().default(300000), // 5 minutes
    maxRetries: z.number().positive().default(3)
  }),
  analytics: z.object({
    enabled: z.boolean().default(true),
    endpoint: z.string().url().optional()
  })
});

export type Config = z.infer<typeof ConfigSchema>;

export const createConfig = (overrides: Partial<Config> = {}): Config => {
  const config = {
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.2'),
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '4000')
    },
    performance: {
      enableCaching: process.env.ENABLE_CACHING !== 'false',
      cacheTimeout: parseInt(process.env.CACHE_TIMEOUT || '300000'),
      maxRetries: parseInt(process.env.MAX_RETRIES || '3')
    },
    analytics: {
      enabled: process.env.ENABLE_ANALYTICS !== 'false',
      endpoint: process.env.ANALYTICS_ENDPOINT
    },
    ...overrides
  };

  return ConfigSchema.parse(config);
};