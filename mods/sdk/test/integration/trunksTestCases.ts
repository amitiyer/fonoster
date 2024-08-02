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
function createTrunksTestCases(expect) {
  const idBase = "trunks";

  return {
    api: "Trunks",
    cases: [
      {
        id: `${idBase}-00`,
        name: "should create a trunk",
        method: "createTrunk",
        request: {
          name: "My Trunk",
          inboundUri: `${Math.floor(Math.random() * (999 + 1)) + 1}.test.pstn.fonoster.io`
        },
        responseValidator: (response: { ref: string }) => {
          expect(response).has.property("ref");
        }
      },
      {
        id: `${idBase}-01`,
        name: "should get the trunk",
        method: "getTrunk",
        request: "{{ref}}",
        dependsOn: `${idBase}-00`,
        responseValidator: (response: { ref: string }) => {
          expect(response).has.property("ref");
          expect(response).has.property("name");
          expect(response).has.property("sendRegister");
          expect(response).has.property("inboundUri");
        }
      },
      {
        id: `${idBase}-02`,
        name: "should update the name of the trunk",
        method: "updateTrunk",
        request: {
          ref: "{{ref}}",
          name: "My New Trunk"
        },
        dependsOn: `${idBase}-00`,
        responseValidator: (response: { ref: string }) => {
          expect(response).has.property("ref");
        }
      },
      {
        id: `${idBase}-03`,
        name: "should list at least one trunk",
        method: "listTrunks",
        request: {
          pageSize: 10,
          pageToken: null
        },
        responseValidator: (response: {
          items: unknown[];
          nextPageToken: string;
        }) => {
          expect(response).has.property("items");
          expect(response).has.property("nextPageToken");
          expect(response.items.length).to.be.greaterThan(0);
          expect(response.items[0]).to.have.property("ref").to.not.be.null;
          expect(response.items[0]).to.have.property("name").to.not.be.null;
          expect(response.items[0]).to.have.property("inboundUri").to.not.be
            .null;
          expect(response.items[0]).to.have.property("sendRegister").to.not.be
            .null;
        }
      },
      {
        id: `${idBase}-04`,
        name: "should delete the trunk",
        method: "deleteTrunk",
        request: "{{ref}}",
        dependsOn: `${idBase}-00`,
        responseValidator: (response: { ref: string }) => {
          expect(response).has.property("ref");
        }
      },
      {
        id: `${idBase}-05`,
        name: "should fail to delete the trunk (not found)",
        method: "deleteTrunk",
        request: "{{ref}}",
        dependsOn: `${idBase}-00`,
        grpcCode: 5
      }
    ]
  };
}

export { createTrunksTestCases };
