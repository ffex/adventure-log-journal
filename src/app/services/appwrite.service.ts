import { Injectable } from "@angular/core";
import { Client, Account, ID, Databases, Query, Storage, Functions, ExecutionMethod } from "appwrite";
import { environment } from "../../environments/environment";
import { Adventure } from "../data/adventure.model";
import { Character } from "../data/character.model";

@Injectable({
    providedIn: 'root',
  })
export class AppwriteService {
    private client: Client;
    private account: Account;
    private db: Databases;
    private storage: Storage;
    private functions: Functions;
    accountInfo: any;

    constructor() {
        this.client = new Client();
        this.client.setProject(environment.PROJECT_ID);

        this.account = new Account(this.client);
        this.db = new Databases(this.client);
        this.storage = new Storage(this.client);
        this.functions = new Functions(this.client);
    }

    loginAccount(email: string, password: string) {
        const promise = this.account.createEmailPasswordSession(email, password);
        return promise;
    }
    
    logoutAccount() {
        const promise = this.account.deleteSessions();
        return promise;
    }

    isLoggedIn() {
        const promise = this.account.get().then((accountInfo) => {
            this.accountInfo = accountInfo;
            return true
        }).catch(() => false);
        return promise;
    }

    getAccountInfo() {
        return this.accountInfo ? this.accountInfo : null;
    }

    saveAdventure(adventure: Adventure) {
        console.log(adventure);
        const promise = this.db.createDocument(environment.ADVENTURE_DB_ID, environment.ADVENTURE_COLLECTION_ID, ID.unique(), adventure);
        return promise;
    }

    getAdventures() {
        const promise = this.db.listDocuments(environment.ADVENTURE_DB_ID, environment.ADVENTURE_COLLECTION_ID);
        return promise;
    }

    getAdventure(id: string) {
        const promise = this.db.getDocument(environment.ADVENTURE_DB_ID, environment.ADVENTURE_COLLECTION_ID, id);
        return promise;
    }

    getCharacter(id: string) {
        const promise = this.db.getDocument(environment.ADVENTURE_DB_ID, environment.CHARACTER_COLLECTION_ID, id);
        return promise;
    }

    saveCharacter(character: Character) {
        console.log(character);
        const promise = this.db.createDocument(environment.ADVENTURE_DB_ID, environment.CHARACTER_COLLECTION_ID, ID.unique(), character);
        return promise;
    }

    getCharacters(adventureId: string) {
        console.log(adventureId);
        const promise = this.db.listDocuments(environment.ADVENTURE_DB_ID, environment.CHARACTER_COLLECTION_ID, [Query.equal('adventure', adventureId)]);
        return promise;
    }

    getTranscripts(adventureId: string) {
        const promise = this.db.listDocuments(environment.ADVENTURE_DB_ID, environment.TRANSCRIPT_COLLECTION_ID, [Query.equal('adventure', adventureId)]);
        return promise;
    }

    uploadTranscript(file:any) {
        const promise = this.storage.createFile(environment.BUCKET_ID, ID.unique(), file);
        return promise;
    }

    saveTranscript(fileID: string, name: string, adventure: string) {
        console.log("Saving Transcript")
        const promise = this.functions.createExecution(
            environment.FUNCTION_CREATE_NEW_TRANSCRIPT_ID, 
            undefined,
            true,
            '/' + fileID + "?name=" + name + "&adventure=" + adventure,
            ExecutionMethod.POST);
        return promise;
    }

    getTranscript(id: string) {
        const promise = this.db.getDocument(environment.ADVENTURE_DB_ID, environment.TRANSCRIPT_COLLECTION_ID, id);
        return promise;
    }

    generateJournal(transcriptId: string) {
        const promise = this.functions.createExecution(
            environment.FUNCTION_GENERATE_JOURNAL_ID, 
            undefined,
            true,
            '/' + transcriptId,
            ExecutionMethod.POST);
        return promise;
    }


    saveSpeaker(speakers: any[]) {
        const speaker = {
            speaker: speakers[0].speaker,
            character: speakers[0].character
        }
        console.log(speaker);
        const promise = this.db.createDocument(environment.ADVENTURE_DB_ID, environment.SPEAKER_COLLECTION_ID, ID.unique(), speaker);
        return promise;
    }

    getJournalDays(adventureId: string) {
        const promise = this.db.listDocuments(environment.ADVENTURE_DB_ID, environment.JOURNAL_DAY_COLLECTION_ID, [Query.equal('adventure', adventureId)]);
        return promise;
    }
}
