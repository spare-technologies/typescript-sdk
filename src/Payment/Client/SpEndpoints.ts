export class SpEndpoints {
    public value: string;
    public static readonly CreateDomesticPayment = new SpEndpoints('/api/v1.0/payments/domestic/Create');
    public static readonly GetDomesticPayment = new SpEndpoints('/api/v1.0/payments/domestic/Get');
    public static readonly ListDomesticPayments = new SpEndpoints('/api/v1.0/payments/domestic/List');
    constructor(public Value: string) {
    this.value = Value
    }
}