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
import { OPENAI_API_KEY } from "./envs";
import {
  AssistantConfig,
  FilesKnowledgeBase,
  LanguageModelFactory,
  hangupToolDefinition,
  transferToolDefinition
} from ".";

function createLanguageModel(
  assistantConfig: AssistantConfig,
  knowledgeBase: FilesKnowledgeBase
) {
  const { languageModel: languageModelSettings, conversationSettings } =
    assistantConfig;

  return LanguageModelFactory.getLanguageModel(languageModelSettings.provider, {
    apiKey: OPENAI_API_KEY!,
    // @ts-expect-error don't know the model type here
    model: languageModelSettings.model,
    maxTokens: languageModelSettings.maxTokens,
    temperature: languageModelSettings.temperature,
    systemTemplate: conversationSettings.systemTemplate,
    knowledgeBase,
    tools: [
      ...languageModelSettings.tools,
      hangupToolDefinition,
      transferToolDefinition
    ]
  });
}

export { createLanguageModel };