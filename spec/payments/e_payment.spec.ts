import * as sdk from "../../dist"

import * as fs from 'fs'
import * as utils from 'util'
import * as path from 'path';
import {SpTestEnvironment} from "../testEnvironment/Models/SpTestEnvironment";
import {JsonSerializer, logError} from "typescript-json-serializer";
import {faker} from "@faker-js/faker";

import {isEmptyOrWhiteSpace, isNullOrUndefined, randomIntFromInterval} from "../testEnvironment/testHelpers";
import {SpClientSdkError} from "../../dist";

let paymentId: string | null | undefined = '';

let testEnvironment: SpTestEnvironment | null | undefined;

let client: sdk.SpPaymentClient

const readFile = utils.promisify(fs.readFile);

function getJsonEnvironment() {
    return readFile(path.join(process.cwd(), "spec/testEnvironment/testEnvironment.json"));
}

describe('Test Payment Api', () => {
    beforeEach(async () => {
        const serializer = new JsonSerializer({
            errorCallback: logError,
            nullishPolicy: {
                undefined: 'remove',
                null: 'remove'
            }
        })

        const json = await getJsonEnvironment();

        expect(isNullOrUndefined(json)).toBe(false)

        testEnvironment = (serializer.deserialize(json.toString(), SpTestEnvironment)) as SpTestEnvironment;

        expect(isNullOrUndefined(testEnvironment)).toBe(false)

        expect(isNullOrUndefined(testEnvironment.ecKeypair)).toBe(false)

        expect(isEmptyOrWhiteSpace(testEnvironment.ecKeypair.privateKey)).toBe(false)

        expect(isEmptyOrWhiteSpace(testEnvironment.ecKeypair.publicKey)).toBe(false)

        expect(isEmptyOrWhiteSpace(testEnvironment.appId)).toBe(false)

        expect(isEmptyOrWhiteSpace(testEnvironment.apiKey)).toBe(false)

        expect(isEmptyOrWhiteSpace(testEnvironment.serverPublicKey)).toBe(false)

        expect(isEmptyOrWhiteSpace(testEnvironment.baseUrl)).toBe(false)

        client = (testEnvironment?.proxy != null) ? new sdk.SpPaymentClient(
            {
                apiKey: testEnvironment?.apiKey ?? "",
                appId: testEnvironment?.appId ?? "",
                baseUrl: testEnvironment?.baseUrl ?? "",
                proxy: {
                    host: testEnvironment.proxy.host ?? '',
                    port: testEnvironment.proxy.port ?? 0,
                    username: testEnvironment.proxy.username,
                    password: testEnvironment.proxy.password
                }
            }
        ) : new sdk.SpPaymentClient(
            {
                apiKey: testEnvironment?.apiKey ?? "",
                appId: testEnvironment?.appId ?? "",
                baseUrl: testEnvironment?.baseUrl ?? ""
            })

    })


    it('should initialize payment client', function () {
        expect(isNullOrUndefined(client)).toBe(false)
    });

    it('should create payment and verify response signature', async function () {
        let payment = new sdk.SpDomesticPaymentRequest(Number(faker.finance.amount()), faker.commerce.productDescription());

        let paymentResponse = await client.CreateDomesticPayment(payment, sdk.SpEccSignatureManager.sign(testEnvironment?.ecKeypair?.privateKey ?? "", payment.toStableJson()));

        expect(isNullOrUndefined(paymentResponse)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.signature)).toBe(false)

        expect(sdk.SpEccSignatureManager.verify(testEnvironment?.serverPublicKey ?? "", paymentResponse.payment!.toStableJson(), paymentResponse.signature ?? "")).toBe(true)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.id)).toBe(false)

        expect(paymentResponse.payment?.amount == payment.amount).toBe(true)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.link)).toBe(false)

        if (testEnvironment?.debugMode == true) {
            console.log(paymentResponse.toJsonString(false))
        }

        paymentId = paymentResponse.payment?.id
    });

    it('should create payment with customer information', async function () {
        let payment = new sdk.SpDomesticPaymentRequest(Number(faker.finance.amount()), faker.commerce.productDescription());

        payment.customerInformation = new sdk.SpPaymentDebtorInformation(
            faker.name.firstName('male'),
            "example@example.com",
            faker.random.numeric(10),
            faker.random.alphaNumeric(10))


        payment.orderId = faker.random.alphaNumeric(20)

        let paymentResponse = await client.CreateDomesticPayment(payment, sdk.SpEccSignatureManager.sign(testEnvironment?.ecKeypair?.privateKey ?? "", payment.toStableJson()));

        expect(isNullOrUndefined(paymentResponse)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.signature)).toBe(false)

        expect(sdk.SpEccSignatureManager.verify(testEnvironment?.serverPublicKey ?? "", paymentResponse.payment!.toStableJson(), paymentResponse.signature ?? "")).toBe(true)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.id)).toBe(false)

        expect(paymentResponse.payment?.amount == payment.amount).toBe(true)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.link)).toBe(false)

        expect(paymentResponse.payment?.issuedFrom == sdk.SpPaymentSource.Api).toBe(true)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.currency)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.reference)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.createdAt)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.description)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.description)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.link)).toBe(false)

        expect(isNullOrUndefined(paymentResponse.payment?.debtor)).toBe(false)

        expect(isNullOrUndefined(paymentResponse.payment?.debtor?.account)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.debtor?.account?.id)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.debtor?.account?.customerReferenceId)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.debtor?.account?.email)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.payment?.debtor?.account?.phone)).toBe(false)

        expect(isNullOrUndefined(paymentResponse.payment?.issuer)).toBe(true)

        if (testEnvironment?.debugMode == true) {
            console.log(paymentResponse.toJsonString(false))
        }
    });


    it('should get payment', async function () {
        expect(paymentId == null || paymentId == '').toBe(false)
        let paymentResponse = await client.GetDomesticPayment(paymentId ?? "");

        expect(isNullOrUndefined(paymentResponse.data)).toBe(false)

        expect(isNullOrUndefined(paymentResponse.error)).toBe(true)

        expect(isEmptyOrWhiteSpace(paymentResponse.data?.id)).toBe(false)

        expect(isNullOrUndefined(paymentResponse.data?.amount)).toBe(false)

        expect(isEmptyOrWhiteSpace(paymentResponse.data?.reference)).toBe(false)

        if (testEnvironment?.debugMode == true) {
            console.log(paymentResponse.toJsonString(false))
        }
    });

    it('should list payments', async function () {
        let listDomesticPayments = await client.ListDomesticPayments(0, randomIntFromInterval(1, 500));

        expect(isNullOrUndefined(listDomesticPayments.error)).toBe(true)

        expect(isNullOrUndefined(listDomesticPayments.data)).toBe(false)

        if (listDomesticPayments.data!.length > 0) {
            listDomesticPayments.data?.forEach(value => {

                expect(isNullOrUndefined(value)).toBe(false)

                expect(isEmptyOrWhiteSpace(value.id)).toBe(false)

                expect(isEmptyOrWhiteSpace(value.reference)).toBe(false)

                expect(isNullOrUndefined(value.amount)).toBe(false)
            })

            if (testEnvironment?.debugMode == true) {
                console.log(listDomesticPayments.toJsonString(false))
            }
        }
    });

    it('should should set automatically pagination and list payments', async function () {
        let listDomesticPayments = await client.ListDomesticPayments();

        expect(isNullOrUndefined(listDomesticPayments.error)).toBe(true)

        expect(isNullOrUndefined(listDomesticPayments.data)).toBe(false)

        if (listDomesticPayments.data!.length > 0) {

            expect(listDomesticPayments.data!.length <= 100).toBe(true)

            listDomesticPayments.data?.forEach(value => {

                expect(isNullOrUndefined(value)).toBe(false)

                expect(isEmptyOrWhiteSpace(value.id)).toBe(false)

                expect(isEmptyOrWhiteSpace(value.reference)).toBe(false)

                expect(isNullOrUndefined(value.amount)).toBe(false)
            })

            if (testEnvironment?.debugMode == true) {
                console.log(listDomesticPayments.toJsonString(false))
            }
        }
    });
})
