export class JournalDay {
    $id: string;
    text: string;

    constructor(data: any) {
        this.$id = data.$id;
        this.text = data.text;
    }
}
