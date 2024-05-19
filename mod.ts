import * as template from 'npm:nunjucks';
import { snakeCase, kebabCase } from 'npm:change-case';
export { snakeCase, kebabCase } from 'npm:change-case';

export default class Templating {
  env: template.Environment;

  constructor(directory: string = '.') {
    const env = template.configure(directory, {throwOnUndefined: true})
    env.addFilter('to_resource', function (str: string) {
      if(!str) throw new Error('to_resource: str is empty');
      return snakeCase(str.toLowerCase());
    });

    env.addFilter('kebab_case', function (str: string) {
      if(!str) throw new Error('kebab_case: str is empty');
      return kebabCase(str.toLowerCase());
    });

    this.env = env
  }

  addFilter(name: string, fn: (str: string) => string) {
    this.env.addFilter(name, fn);
  }

  render(templateName: string, data: {[key: string]: any}) {
    return this.env.render(templateName, data)
  }
}
