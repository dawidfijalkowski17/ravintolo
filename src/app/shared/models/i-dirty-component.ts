export interface IDirtyComponent {
    checkIfDirty(): boolean;
    prepareMessageWhenDirty(): string | null;
}
