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
import { struct } from "pb-util";
import { Application } from "../types";

function applicationWithEncodedStruct(application): Application {
  const decodeConfig = (property) => {
    return property && property.config ? struct.decode(property.config) : null;
  };

  const result = { ...application };

  if (application.textToSpeech) {
    result.textToSpeech = {
      ...application.textToSpeech,
      config: decodeConfig(application.textToSpeech)
    };
  }

  if (application.speechToText) {
    result.speechToText = {
      ...application.speechToText,
      config: decodeConfig(application.speechToText)
    };
  }

  if (application.conversation) {
    result.conversation = {
      ...application.conversation,
      config: decodeConfig(application.conversation)
    };
  }

  return result; // Return the modified object
}

export { applicationWithEncodedStruct };