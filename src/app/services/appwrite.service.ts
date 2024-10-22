import { Injectable } from "@angular/core";
import { Client, Account, ID } from "appwrite";

@Injectable({
    providedIn: 'root',
  })
export class AppwriteService {
    private client: Client;
    private account: Account;
    constructor() {
        this.client = new Client();
        this.client.setProject('67160f5e00316fe94a9a');

        this.account = new Account(this.client);
    }

    loginAccount(email: string, password: string) {
        const promise = this.account.createEmailPasswordSession(email, password);
        return promise;
    }
}
