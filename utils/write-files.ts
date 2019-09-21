import * as fs from "fs";
import {Parser} from "json2csv"

export default class WriteFiles {
  public static writeJSONAndSCV(filename: string, data: any, callback?): void {
    fs.writeFile(
      `${filename}.json`,
      JSON.stringify(data, null, 2),
      callback ? callback() : () => console.log(`${filename}.json saved`));
    fs.writeFile(
      `${filename}.csv`,
      convertJsonToCsv(data),
      callback ? callback() : () => console.log(`${filename}.csv saved`));
  }
}

function convertJsonToCsv(dataObject: any): object {
  const json2csvParser = new Parser(Object.keys(dataObject[0]));
  return json2csvParser.parse(dataObject)
}
