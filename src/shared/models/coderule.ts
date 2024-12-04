export class CodeConventionRule {
  constructor(
    public rulePattern: string,
    public ruleDescription: string,
    public languageName: string,
    public assignmentId: number,
    public languageId: number
  ) {}
}
