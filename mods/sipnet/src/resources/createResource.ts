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
import { GrpcErrorMessage, handleError } from "@fonoster/common";
import { getAccessKeyIdFromCall } from "@fonoster/identity";
import { getLogger } from "@fonoster/logger";
import { ServerInterceptingCall } from "@grpc/grpc-js";

const logger = getLogger({ service: "sipnet", filePath: __filename });

function createResource<T, R, U>(api: U, resource: string) {
  return async (
    call: { request: R },
    callback: (error?: GrpcErrorMessage, response?: T) => void
  ) => {
    const { request } = call;

    const accessKeyId = getAccessKeyIdFromCall(
      call as unknown as ServerInterceptingCall
    );

    logger.verbose(`call to create${resource}`, { request, accessKeyId });

    try {
      const response = await api[`create${resource}`]({
        ...request,
        extended: {
          accessKeyId
        }
      });

      callback(null, response);
    } catch (e) {
      handleError(e, callback);
    }
  };
}

export { createResource };
