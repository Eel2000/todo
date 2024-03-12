interface Date {
    getFormatted(): string;
}

Date.prototype.getFormatted = function (): string {
    return `${this.getDay()}/${this.getMonth()}/${this.getFullYear()}`
}