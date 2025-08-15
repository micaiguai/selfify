import dayjs from "dayjs";
import { Meta } from "../types";
import { resolve } from "path";
import { isFileExists } from "../utils";
import { writeFile } from "fs/promises";
import { definePlugin } from "../utils/definePlugin";

const file = resolve('LICENSE')

function getLicense(meta: Meta) {
  return `The MIT License (MIT)

Copyright (c) ${dayjs().year()} ${meta.author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`
}

export const licensePlugin = definePlugin({
  when: async() => await isFileExists(file),
  async exec(meta) {
    const license = getLicense(meta)
    await writeFile(file, license)
  }
}) 
