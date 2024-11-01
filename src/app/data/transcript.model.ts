export class Transcript {
    $id: string | null = null;
    name: string | null = null;
    dateUpload: string | null = null;
    rawText: string | null = null;
    finalText: string | null = null;
    dateEndTranscription: string | null = null;
    fileUrl: string | null = null;
    isProcessing: boolean | null = null;
    assemblyAiTranscriptId: string | null = null;
    adventure: string | null = null;
    speakerCharacter: any[] = [];

    constructor(formValues: any) {
        this.$id = formValues.$id;
        this.name = formValues.name;
        this.dateUpload = formValues.dateUpload;
        this.rawText = formValues.rawText;
        this.finalText = formValues.finalText;
        this.dateEndTranscription = formValues.dateEndTranscription;
        this.fileUrl = formValues.fileUrl;
        this.isProcessing = formValues.isProcessing;
        this.assemblyAiTranscriptId = formValues.assemblyAiTranscriptId;
        this.adventure = formValues.adventureId;
        this.speakerCharacter = formValues.speakerCharacter;
    }
}
//TODO add DM, add here speakers.