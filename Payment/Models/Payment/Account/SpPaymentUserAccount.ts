import {SpUserAccount} from "./SpUserAccount";
import {SpUserPaymentBankAccount} from "./SpUserPaymentBankAccount";

export class SpPaymentUserAccount {
    public Account: SpUserAccount;
    public BankAccount: SpUserPaymentBankAccount;
    constructor() {
    }
}