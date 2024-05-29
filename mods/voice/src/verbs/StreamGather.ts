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
import { GatherSource } from "./Gather";
import { Verb, VerbRequest } from "./Verb";

type StreamGatherOptions = {
  source: GatherSource;
};

class StreamGatherStream {
  stream: Stream;
  constructor() {
    this.stream = new Stream();
  }

  close() {
    this.stream.removeAllListeners();
  }

  on(event: "speech" | "digits", callback: (data: string) => void) {
    this.stream.on(event, (data) => {
      callback(data);
    });
  }

  emit(event: "speech" | "digits", data: string) {
    this.stream.emit(event, data);
  }
}

type StreamGatherRequest = VerbRequest & StreamGatherOptions;

class StreamGather extends Verb<StreamGatherRequest> {
  getValidationSchema(): z.Schema {
    return z.object({
      source: z.nativeEnum(GatherSource).optional()
    });
  }
}

export {
  StreamGather,
  StreamGatherRequest,
  StreamGatherStream,
  StreamGatherOptions
};