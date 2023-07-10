export interface INotebook {
    displayName: string,
    lastAccessedTime: string,
    sourceService: string,
    links: {
        oneNoteClientUrl: {
            href: string
        },

        oneNoteWebUrl: {
            href: string
        }
    }
}

