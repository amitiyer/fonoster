/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonoster
 *
 * This file is part of Fonoster
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Messages } from "@fonoster/common";
import { z } from "zod";
import { toolSchema } from "../tools/ToolSchema";
import { LANGUAGE_MODEL_PROVIDER } from "../types";

const conversationSettingsSchema = z.object({
  firstMessage: z.string(),
  systemTemplate: z.string(),
  goodbyeMessage: z.string(),
  systemErrorMessage: z.string(),
  initialDtmf: z
    .string()
    .regex(/^[0-9*#]+$/, { message: Messages.VALID_DTMF })
    .optional(),
  maxSpeechWaitTimeout: z
    .number()
    .int({ message: Messages.POSITIVE_INTEGER_MESSAGE })
    .positive({ message: Messages.POSITIVE_INTEGER_MESSAGE }),
  transferOptions: z
    .object({
      phoneNumber: z.string(),
      message: z.string(),
      timeout: z
        .number()
        .int({ message: Messages.POSITIVE_INTEGER_MESSAGE })
        .positive({ message: Messages.POSITIVE_INTEGER_MESSAGE })
        .optional()
    })
    .optional(),
  idleOptions: z
    .object({
      message: z.string(),
      timeout: z
        .number()
        .int({ message: Messages.POSITIVE_INTEGER_MESSAGE })
        .positive({ message: Messages.POSITIVE_INTEGER_MESSAGE }),
      maxTimeoutCount: z
        .number()
        .int({ message: Messages.POSITIVE_INTEGER_MESSAGE })
        .positive({ message: Messages.POSITIVE_INTEGER_MESSAGE })
    })
    .optional(),
  vad: z.object({
    pathToModel: z.string().optional(),
    activationThreshold: z.number(),
    deactivationThreshold: z.number(),
    debounceFrames: z
      .number()
      .int({ message: Messages.POSITIVE_INTEGER_MESSAGE })
      .positive({ message: Messages.POSITIVE_INTEGER_MESSAGE })
  })
});

const languageModelConfigSchema = z.object({
  provider: z.nativeEnum(LANGUAGE_MODEL_PROVIDER, {
    message: "Invalid language model provider."
  }),
  apiKey: z.string().optional(),
  model: z.string(),
  temperature: z.number(),
  maxTokens: z
    .number()
    .int({ message: Messages.POSITIVE_INTEGER_MESSAGE })
    .positive({ message: Messages.POSITIVE_INTEGER_MESSAGE }),
  baseUrl: z
    .string()
    .url({
      message: Messages.VALID_URL
    })
    .optional(),
  knowledgeBase: z.array(
    z.object({
      type: z.enum(["s3"]),
      title: z.string(),
      document: z.string().regex(/\.pdf$/, {
        message: "Document must be a pdf file."
      })
    })
  ),
  tools: z.array(toolSchema)
});

const assistantSchema = z.object({
  conversationSettings: conversationSettingsSchema,
  languageModel: languageModelConfigSchema
});

export {
  assistantSchema,
  conversationSettingsSchema,
  languageModelConfigSchema
};
