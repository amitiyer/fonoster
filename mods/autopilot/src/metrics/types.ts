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
type VendorInfo = {
  stt: string;
  tts: string;
  inference: string;
};

type TurnMetrics = {
  sttLatencyMs: number; // Time from VOICE_STOPPED to STT response
  inferenceLatencyMs: number; // Time from LLM request to response
  ttsLatencyMs: number; // Time from TTS request to first audio chunk
  userInput: string; // Text recognized by STT
  llmResponse: string; // Text generated by LLM
};

type ConversationMetrics = {
  turns: TurnMetrics[];
  averageLatencies: {
    sttLatencyMs: number;
    inferenceLatencyMs: number;
    ttsLatencyMs: number;
  };
  vendorInfo: VendorInfo;
};

export { ConversationMetrics, TurnMetrics, VendorInfo };