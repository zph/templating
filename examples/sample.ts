import Templating, {kebabCase} from "../mod.ts"

enum InstanceType {
  t3_micro = 't3.micro',
  t4g_medium = 't4g.medium',
}

enum AMI {
  ubuntu_focal = 'ami-00000000000000000',
  ubuntu_bionic = 'ami-00000000000000000',
  ubuntu_xenial = 'ami-00000000000000000',
  ubuntu_trusty = 'ami-00000000000000000',
  ubuntu_jammy = 'ami-00000000000000000',
  ubuntu_focal_arm64 = 'ami-00000000000000000',
  ubuntu_bionic_arm64 = 'ami-00000000000000000',
  ubuntu_xenial_arm64 = 'ami-00000000000000000',
  ubuntu_trusty_arm64 = 'ami-00000000000000000',
  ubuntu_jammy_arm64 = 'ami-00000000000000000',
}

enum AvailabilityZone {
  us_east_1a = 'us-east-1a',
  us_east_1b = 'us-east-1b',
  us_east_1c = 'us-east-1c',
  us_east_1d = 'us-east-1d',
  us_east_1e = 'us-east-1e',
  us_east_1f = 'us-east-1f',
}

const availabilityZoneByInt = (n: number): AvailabilityZone =>
  // Converting to zero indexed because server naming is 1 indexed
  Object.values(AvailabilityZone)[n % 6]

type TServer = {
  server_name: string,
  ami: AMI,
  disabled: boolean,
  environment: string,
  instance_type: InstanceType,
  availability_zone: AvailabilityZone,
  tags: {[key: string]: string},
}

const DefaultServer = {
  disabled: false,
  environment: 'production',
  instance_type: InstanceType.t4g_medium,
  tags: {},
}

const Server = (name: string, opts: Partial<TServer> = {}): TServer => {
  // Ensure naming standard
  if (kebabCase(name) !== name ) {
    throw new Error(`Invalid server name: ${name}.
    Try it as kebab case instead ${kebabCase(name)}`)
  }
  // Convert to zero indexed
  const finalSegment = parseInt(name.split('-').slice(-1)[0], 10) - 1
  const az = availabilityZoneByInt(finalSegment)
  if (!az) {
    throw new Error(`Unknown availability zone: ${finalSegment}`)
  }

  const baseServer = {
    server_name: kebabCase(name),
    ami: AMI.ubuntu_bionic,
    availability_zone: az,
  }

  return {
    ...DefaultServer,
    ...baseServer,
    ...opts,
  }
}

// TODO: enforce server name is kebab case via types
const server_names: { [key: string]: Partial<TServer> } = {
  "c-b-1": {
    instance_type: InstanceType.t3_micro,
    environment: 'production',
    tags: {},
  },
  "c-b-2": {},
  "c-b-3": {},
};

const main = () => {
  const template = new Templating('.')
  const args: {servers: TServer[]} = {
    servers: Object.entries(server_names).map(([name, opts]) => Server(name, opts)),
  }
  const hcl = template.render('sample.tf', args)
  console.log(hcl)
}

main()

