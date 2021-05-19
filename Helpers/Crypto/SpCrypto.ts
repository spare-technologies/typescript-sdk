import {SpEcKeyPair} from "./SpEcKeyPair";
const ecc = require ('ec-key-patch');

export class SpCrypto {
    static GenerateKeyPair(): SpEcKeyPair {
        const model = new SpEcKeyPair(); 
        const key = ecc.createECKey('P-256');
        model.privateKey = key.toString('pem');
        model.publicKey = key.asPublicECKey().toString('pem');
        return model;
    }
}