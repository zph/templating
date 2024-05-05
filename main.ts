import * as template from 'npm:nunjucks';

// TODO: make sure throw works, it's not currently
// there are many issues in repo about this :-/
const env = template.configure('.', {throwOnUndefined: true})

env.addFilter('comment', function (str: string, character = '#') {
  if (str.startsWith(character)) {
    return str;
  } else {
    return `${character}${str}`;
  }
});

env.addFilter('uncomment', function (str: string, character = '#') {
  if (str.startsWith(character)) {
    return str.replaceAll(new RegExp(`^${character}`, 'g'), '');
  } else {
    return str;
  }
});

// deno-lint-ignore no-explicit-any
function render(tmpl: string, args: {[key: string]: any}) {
  return env.render(tmpl, args)
}

type Server = {
  server_name: string,
  ami: string,
  disabled: boolean,
  environment: string,
}

const DefaultServer = {
  disabled: false,
  environment: 'production',
}

const main = () => {
  const args: {servers: Server[]} = {
    servers: [
      {
        server_name: "c",
        ami: "a-111",
      },
      {
        server_name: "b",
        ami: "b-222",
        disabled: false,
      },
      {
        server_name: "b",
        ami: "c-222",
        disabled: true,
      },
    ].map(s => ({...DefaultServer, ...s }))
  }
  const hcl = render('sample.tf', args)
  console.log(hcl)
}

main()
