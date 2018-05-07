/*

 ----------------------------------------------------------------------------
 | qewd-server-rest-examples:                                               |
 |     A basic set of REST APIs to test on your Docker qewd-server          |
 |                                                                          |
 | Copyright (c) 2017 M/Gateway Developments Ltd,                           |
 | Reigate, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

  20 December 2017

*/

module.exports = function(documentName, docSubName, showDetail, start, limit) {
  start = parseInt(start ? start : 0);
  limit = parseInt(limit ? limit : 0);

  var tempGlobal = this.db.use('CacheTemp', [process.pid,"Mindwave"]);
  //var metadata = this.db.use('CacheTemp', [process.pid,"metadata"]);

  // make sure the globals we use are cleaned up
  tempGlobal.delete();
  //metadata.delete();

  // do all the logic on the m side as it is much faster
  this.db.function({
    function: 'get^mindwave',
    arguments: [1,start,limit]
  });

  // get the results of the m function above
  var result = tempGlobal.getDocument();
  
  // do a deep clone of result to results so that the push of new
  // data works as intended
  var results = JSON.parse(JSON.stringify(result));

  // get the metadata and push it as an array element
  // we do this as a separate step so that qewd treats
  // result as an array (when it encounters a non-numeric
  // key it returns an object instead of an array)
  //results.push({"metadata": metadata.getDocument()});

  // remove the results of the m function as cleanup
  tempGlobal.delete();
  //metadata.delete();

  return results;
};
