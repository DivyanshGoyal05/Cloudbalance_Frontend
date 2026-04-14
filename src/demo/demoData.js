export const demoAccounts = [
  {
    id: 101,
    name: "Acme Retail Prod",
    accountId: "243517980012",
    provider: "AWS",
    region: "us-east-1",
    assignedTo: ["guest.demo"],
  },
  {
    id: 102,
    name: "Acme Analytics",
    accountId: "871225660041",
    provider: "AWS",
    region: "eu-west-1",
    assignedTo: ["guest.demo"],
  },
  {
    id: 103,
    name: "Acme Sandbox",
    accountId: "550931114287",
    provider: "AWS",
    region: "ap-south-1",
    assignedTo: ["guest.demo"],
  },
];

export const demoUsers = [
  {
    id: 1,
    username: "guest.demo",
    name: "Guest Demo",
    role: "ADMIN",
    assignedAccounts: demoAccounts.map((account) => account.accountId),
  },
  {
    id: 2,
    username: "ops.lead",
    name: "Operations Lead",
    role: "READONLY",
    assignedAccounts: [demoAccounts[0].accountId, demoAccounts[1].accountId],
  },
  {
    id: 3,
    username: "finance.owner",
    name: "Finance Owner",
    role: "CUSTOMER",
    assignedAccounts: [demoAccounts[2].accountId],
  },
];

export const demoAwsDataByAccount = {
  "243517980012": {
    ec2: [
      {
        id: "i-0412a1c2d0",
        type: "t3.large",
        state: "running",
        zone: "us-east-1a",
        publicIp: "52.18.120.44",
      },
      {
        id: "i-0919f54be8",
        type: "m6i.xlarge",
        state: "stopped",
        zone: "us-east-1c",
        publicIp: "-",
      },
    ],
    s3: [
      {
        name: "acme-retail-billing-archive",
        region: "us-east-1",
        objects: "18.2k",
        size: "248 GB",
      },
    ],
    rds: [
      {
        id: "retail-orders-db",
        type: "db.t4g.medium",
        engine: "PostgreSQL",
        status: "available",
      },
    ],
  },
  "871225660041": {
    ec2: [
      {
        id: "i-0be12478a2",
        type: "c6i.large",
        state: "running",
        zone: "eu-west-1b",
        publicIp: "18.201.91.32",
      },
    ],
    s3: [
      {
        name: "acme-analytics-lake",
        region: "eu-west-1",
        objects: "221k",
        size: "3.8 TB",
      },
    ],
    rds: [
      {
        id: "analytics-warehouse",
        type: "db.r6g.large",
        engine: "MySQL",
        status: "available",
      },
    ],
  },
  "550931114287": {
    ec2: [
      {
        id: "i-06fa77e11b",
        type: "t3.medium",
        state: "running",
        zone: "ap-south-1a",
        publicIp: "13.233.51.92",
      },
    ],
    s3: [
      {
        name: "acme-sandbox-artifacts",
        region: "ap-south-1",
        objects: "4.1k",
        size: "42 GB",
      },
    ],
    rds: [],
  },
};
