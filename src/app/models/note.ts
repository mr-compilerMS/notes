export default class Note {
  constructor(
    public id: number = new Date().valueOf(),
    public title: string = '',
    public note: string = '',
    public urls: string[] = [],
    public tags: string[] = [],
    public favorite: boolean = false
  ) {}
}
