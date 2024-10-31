export class Adventure {
    $id: string | null = null;
    title: string;
    startDate: string;
    numberOfPcs: number;
    constructor(formValues: any) {
        this.$id = formValues.$id;
        this.title = formValues.title;
        this.startDate = formValues.startDate;
        this.numberOfPcs = Number.parseInt(formValues.numberOfPcs) || 0;
    }
}
