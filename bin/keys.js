#!/usr/bin/env node

/*
 * ISC License (ISC)
 * Copyright 2018 aeternity developers
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

const program = require ('commander')
const prompt = require('prompt')
const fs = require('fs')
const Crypto = require('../lib/utils/crypto')

let promptSchema = {
  properties: {
    password: {
      type: 'string',
      description: 'Enter your password',
      hidden: true,
      required: true,
      replace: '*',
      conform: function (value) {
        return true;
      }
    }
  }
}

const extractReadableKeys = (dir) => {
  prompt.start()
  prompt.get(promptSchema, function (err, result) {
    let password = result.password
    let key = fs.readFileSync(`${dir}/key`)
    let pubKey = fs.readFileSync(`${dir}/key.pub`)
    let decrypted = Crypto.decryptPrivateKey(password, key)

    let privateHex = Buffer.from(decrypted).toString('hex')
    let decryptedPub = Crypto.decryptPubKey(password, pubKey)

    console.log(`Private key (hex): ${privateHex}`)
    console.log(`Public key (base check): ak\$${Crypto.encodeBase58Check(decryptedPub)}`)
  })
}

program
  .version ('0.1.0')
  .command ('decrypt <directory>')
  .description ('Decrypts public and private key to readable formats for testing purposes')
  .action (extractReadableKeys)

program.parse (process.argv)
if (program.args.length === 0) program.help ()
