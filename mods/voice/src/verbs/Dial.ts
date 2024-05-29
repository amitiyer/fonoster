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
import { Stream } from "stream";
import { z } from "zod";
import { Verb, VerbRequest } from "./Verb";

enum RecordDirection {
  IN = "IN",
  OUT = "OUT",
  BOTH = "BOTH"
}

enum DialStatus {
  CANCEL = 0,
  ANSWER = 1,
  BUSY = 2,
  PROGRESS = 3,
  NOANSWER = 4
}

type DialOptions = {
  timeout?: number;
  recordDirection?: RecordDirection;
};

type DialRequest = VerbRequest &
  DialOptions & {
    destination: string;
  };

class Dial extends Verb<DialRequest> {
  getValidationSchema(): z.Schema {
    return z.object({
      destination: z.string(),
      timeout: z.number().int().positive().optional(),
      recordDirection: z.nativeEnum(RecordDirection).optional()
    });
  }
}

class DialStatusStream {
  stream: Stream;
  constructor() {
    this.stream = new Stream();
  }

  close() {
    this.stream.removeAllListeners();
  }

  on(callback: (data: DialStatus) => void) {
    this.stream.on("status", (data) => {
      callback(data);
    });
  }

  emit(status: DialStatus) {
    this.stream.emit("status", status);
  }
}

export {
  Dial,
  DialOptions,
  DialRequest,
  DialStatus,
  RecordDirection,
  DialStatusStream
};