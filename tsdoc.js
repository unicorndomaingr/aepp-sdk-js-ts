#!/usr/bin/env node
/*
 * ISC License (ISC)
 * Copyright (c) 2022 aeternity developers
 *
 *  Permission to use, copy, modify, and/or distribute this software for any
 *  purpose with or without fee is hereby granted, provided that the above
 *  copyright notice and this permission notice appear in all copies.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 *  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 *  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 *  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 *  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 *  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *  PERFORMANCE OF THIS SOFTWARE.
 */

'use strict'
const TypeDoc = require('typedoc')

async function main () {
  const app = new TypeDoc.Application()

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader())
  app.options.addReader(new TypeDoc.TypeDocReader())

  app.bootstrap({
    // typedoc options here
    entryPoints: ['src/index.ts'],
    tsconfig: './tsconfig.json',
    out: './docs/api-reference',
    name: 'api-reference',
    excludePrivate: true,
    githubPages: false,
    // ? delete next line if we also want the existing readme.md file to be copied in the docs
    readme: 'none',
    plugin: [
      // ? comment next line to export in html
      'typedoc-plugin-markdown',
      'typedoc-plugin-replace-text'
    ],
    replaceText: {
      inCodeCommentText: false,
      inCodeCommentTags: false,
      inIncludedFiles: true,
      replacements: [
        {
          pattern: /\[?\((docs)\//,
          replace: '(../docs/'
        }
      ]
    }
  })

  const project = app.convert()

  if (project) {
    // Project may not have converted correctly
    const outputDir = './docs/api-reference'

    // Rendered docs
    await app.generateDocs(project, outputDir)
    // Alternatively generate JSON output
    // ? uncomment if we also want the .json file
    // await app.generateJson(project, outputDir + '/documentation.json')
  }
}

main().catch(console.error)
