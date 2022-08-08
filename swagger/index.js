import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
    info: {
        title: 'bscAPI',
        description: 'NodeJS routes for main Smart Chain operations'
    },
    definitions: {
        Wallet: {
            account: {
                address: "0x9D5FB1C7479FEb755D371c3b5AC26cF63591dAaf",
                privateKey: "0x3f8ea5c5944d1da2a95a92b7d30537a962a637a03c49498ec8e504b88b7ccc19"
            },
            wallet: {
                address: "0x9D5FB1C7479FEb755D371c3b5AC26cF63591dAaf",
                privateKey: "0x3f8ea5c5944d1da2a95a92b7d30537a962a637a03c49498ec8e504b88b7ccc19",
                index: 0
            },
            keystore: { $ref: '#/definitions/Keystore' }
        },
        Keystore: {
            version: 3,
            id: "dcde72d3-90a8-4aa6-b409-027388e4243e",
            address: "9d5fb1c7479feb755d371c3b5ac26cf63591daaf",
            crypto: {
                ciphertext: "860306fa50b31b2a263b1dc2127fc0071d76cdd71c875a097c7f5f36bd7efc88",
                cipherparams: {
                    iv: "7406bf01fd12807ab21b82f273bbbaa0"
                },
                cipher: "aes-128-ctr",
                kdf: "scrypt",
                kdfparams: {
                    dklen: 32,
                    salt: "fadcdee77bf3f63ca177e2bed01ffca36e3d5f9e758f4bb0ca62144ad99724a8",
                    n: 8192,
                    r: 8,
                    p: 1
                },
                mac: "3623f260aa9699423fc975d1239e5dec5ce3a00f0d70d3461fa387e0f39d5169"
            }
        },
        Balance: {
            balance: 'number'
        },
        tokenBalance: {
            tokenBalance: 'number'
        },
        transactionHash: {
            transactionHash: 'number'
        }
    },
    host: 'localhost:3000',
    // host: 'tangy-rightful-newsstand.glitch.me',
    schemes: ['http']
}

const outputFile = join(_dirname, 'output.json')
const endpointsFiles = [join(_dirname, '../server.js')]

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(
    ({ success }) => {
        console.log(`Generated: ${success}`)
    }
)
