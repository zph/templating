# Generate HCL via Deno + Jinja

## Workflow

1. Create first draft of Terraform in HCL
1. Build templating off those
1. Use template dir
1. Run tf linter against the output to make sure it's valid

Use nunchuks (aja jinja in npm) https://github.com/mozilla/nunjucks?tab=readme-ov-file
Missing var handling is unreliable, use Ts type enforcement instead
instructive https://mozilla.github.io/nunjucks/api.html#custom-tags

Create custom filters to enforce tf practices (resource name vs alarm name conventions)

# Use a template directory with partials!
