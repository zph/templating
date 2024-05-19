import * as template from 'npm:nunjucks';
import { snakeCase, kebabCase } from 'npm:change-case';

export const Templating = (directory: string = '.') => {
  /*
   * WARN: template warnings about missing values are ignored
   * unless they're thrown here.
   * RECOMMENDATION: use typescript types
  */
  const env = template.configure(directory, {throwOnUndefined: true})

  env.addFilter('to_resource', function (str: string) {
    if(!str) throw new Error('to_resource: str is empty');
    return snakeCase(str.toLowerCase());
  });

  env.addFilter('kebab_case', function (str: string) {
    if(!str) throw new Error('kebab_case: str is empty');
    return kebabCase(str.toLowerCase());
  });

  return {
    env,
    snakeCase,
    kebabCase,
    template,
    render: (tmpl: string, args: {[key: string]: any}) => env.render(tmpl, args)
  }
}
