terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "us-west-2"
}

{%- for i in servers %}
  {%- if not i.disabled %}

resource "aws_instance" "{{ i.server_name | lower}}" {
  ami           = "{{ i.ami | comment}}"
  instance_type = "t2.micro"

  tags = {
    Name = "{{ i.server_name | capitalize}}"
    Environment = "{{ i.environment | capitalize }}"
  }
}
  {%- endif %}
{%- endfor %}
