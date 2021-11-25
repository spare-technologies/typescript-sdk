const ECKey = require ('ec-key-patch');

export class EccSignatureManager {
    /***
     * Sign message
     * @param privateKey
     * @param data
     */
     static sign(privateKey: string, data: string): string {
        const key = new ECKey(privateKey, 'pem');
        return key.createSign('SHA256')
            .update(data)
            .sign('base64');
    }

    /**
     * Verify signature
     * @param publicKey
     * @param data
     * @param signature
     */
     static verify(publicKey: string, data: string, signature: string): boolean {
        const key = new ECKey(publicKey, 'pem');
        return key.createVerify('SHA256')
            .update(data)
            .verify(signature, 'base64');
    }
}
