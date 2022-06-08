export class BasicItem {
    _id: string;
    title: string;
    description: string;

    constructor(id: string, title: string, description: string) {
        this._id = id || "";
        this.title = title || "";
        this.description = description || "";
    }

}