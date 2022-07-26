import * as sdk from "../../dist"

let paymentId: string | null | undefined = '';

describe('Test Payment Api', () => {
    const publicKey = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAELgkZ6SzzePHlQi/B6AdOXkfcAmvU
eUzre/FeCQrSDb+mG3QWVJEACGMHR2xCB2HnnDg94l/+jxWMomouVZZ5bQ==
-----END PUBLIC KEY-----`;

    const privateKey = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg84cklrBsv2lgsHJT
3eg7U3oL8AK7laFtzJcJW2PO4H2hRANCAAQuCRnpLPN48eVCL8HoB05eR9wCa9R5
TOt78V4JCtINv6YbdBZUkQAIYwdHbEIHYeecOD3iX/6PFYyiai5Vlnlt
-----END PRIVATE KEY-----`;

    const serverKey = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEZergpIl9cU89g/iV97ZLPSyPc7S3
Z5l3yXTuHXDTOnFwhHr/Pep8UFOl26Gbjxf0I84MjJFsqNsmUSfjdZTr7Q==
-----END PUBLIC KEY-----`;


    const client = new sdk.SpPaymentClient(
        {
            ApiKey: "QVko+zOFSVPapUgCW11zZKJb5qfTx1fcopOqVHJ/Adw=",
            AppId: "bN/MAy/0xecdCVETLIKVl0I01qvbtsWOf9O6KaBM71w=",
            BaseUrl: "https://payment.dev.tryspare.com"
        }
    )



    it('should initialize payment client', function () {
        expect(client).not.toBeNaN()
        expect(client).not.toBeNull()
        expect(client).not.toBeUndefined()
    });

    it('should create payment and verify response signature', async function () {
        let payment = new sdk.SpDomesticPayment(10.18, "Java sdk test");
        let value = await client.CreateDomesticPayment(payment, sdk.SpEccSignatureManager.sign(privateKey, payment.toStableJson()));
        expect(value.signature == null || value.signature == '' || value.signature == 'undefined').toBe(false)
        expect(value.payment?.amount == payment.amount).toBe(true)
        expect(value.payment?.link == null || value.payment?.link == '' || value.payment?.link == 'undefined').toBe(false)
        expect(sdk.SpEccSignatureManager.verify(serverKey, value.payment!.toStableJson(), value.signature ?? "")).toBe(true)
        paymentId = value.payment?.id
    });


    it('should get payment', async function () {
        expect(paymentId == null || paymentId == '').toBe(false)
        let value = await client.GetDomesticPayment(paymentId ?? "");
        expect(value.data).not.toBeNaN()
        expect(value.data).not.toBeUndefined()
        expect(value.data).not.toBeNull()

        expect(value.error == null || value.error == 'undefined').toBe(false)

        expect(value.data?.id == paymentId).toBe(false)
        expect(value.data?.amount).not.toBeUndefined()
        expect(value.data?.amount).not.toBeNull()
        expect(value.data?.amount).not.toBeNaN()
    });

    it('should list payments', async function () {
        let value = await client.ListDomesticPayments(0, 10);
        expect(value.error == null || value.error == 'undefined').toBe(true)
    });

})
