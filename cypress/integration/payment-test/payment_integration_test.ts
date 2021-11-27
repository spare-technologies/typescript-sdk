import {SpPaymentClient} from "../../../src/Payment/Client/SpPaymentClient";
import {SpDomesticPayment} from "../../../src/Payment/Models/Payment/Domestic/SpDomesticPayment";
import "../../../src/Helpers/Extensions/SerilizableExtension.ts";
import {SpEccSignatureManager} from "../../../src/Helpers/Security/DigitalSignature/SpEccSignatureManager";

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


    const client = new SpPaymentClient(
        {
            ApiKey: "QVko+zOFSVPapUgCW11zZKJb5qfTx1fcopOqVHJ/Adw=",
            AppId: "bN/MAy/0xecdCVETLIKVl0I01qvbtsWOf9O6KaBM71w=",
            BaseUrl: "https://devpayment.tryspare.com"
        }
    )

    it('should initialize payment client', function () {
        expect(client).is.not.null
    });

    it('should create payment and verify response signature', async function () {
        let payment = new SpDomesticPayment(10.18, "Java sdk test");
        let value = await client.CreateDomesticPayment(payment, SpEccSignatureManager.sign(privateKey, payment.toStableJson()));
        expect(value.signature == null || value.signature == '' || value.signature == 'undefined').is.false
        expect(value.payment?.amount == payment.amount).is.true
        expect(value.payment?.link == null || value.payment?.link == '' || value.payment?.link == 'undefined').is.false
        expect(SpEccSignatureManager.verify(serverKey, value.payment!.toStableJson(), value.signature ?? "")).is.true
        paymentId = value.payment?.id
    });


    it('should get payment', async function () {
        expect(paymentId == null || paymentId == '').is.false
        let value = await client.GetDomesticPayment(paymentId ?? "");
        expect(value.data).is.not.null
        expect(value.error == null || value.error == 'undefined').is.true
        expect(value.data?.id == paymentId).is.true
        expect(value.data?.amount).is.not.null
    });

    it('should list payments', async function () {
        let value = await client.ListDomesticPayments(0, 10);
        expect(value.error == null || value.error == 'undefined').is.true
    });

})
