export class Review {
  constructor(
    public id: number,
    public reviewStatus: string,
    public feedback: string,
    public reviewedAt: string
  ) {}
}
