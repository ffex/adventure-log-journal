export class Character {
    $id: string | null = null;
    name: string;
    race: string;
    characterClass: string;
    adventure: string | null;

    constructor(formValues: any) {
        this.$id = formValues.$id;
        this.name = formValues.name;
        this.race = formValues.race;
        this.characterClass = formValues.characterClass;
        this.adventure = formValues.adventureId;
    }
}
