interface DataObject {
    sentence: String,
    text: String,
    isFullWordSearch: Boolean,
    isCaseSensitive: Boolean,
}

export interface Data {
    dataObject: DataObject,
    errorMessage: String,
    textOccurrence: String,
    history: Array<DataObject>
}