import fs from 'fs';
import Handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseEmailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({
    file,
    variables,
  }: IParseEmailTemplate): Promise<string> {
    const template = await fs.promises.readFile(file, { encoding: 'utf-8' });
    const parseTemplate = Handlebars.compile(template);
    return parseTemplate(variables);
  }
}
