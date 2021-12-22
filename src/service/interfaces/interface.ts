// https://docs.github.com/en/graphql
export interface query {
  query: string;
  variables: {
    LOGIN: string;
  };
}

export interface userDetails {
  contributions: number[];
  name: string;
}

export interface contributionCount {
  contributionCount: number;
}

export interface week {
  contributionDays: contributionCount[];
}

export interface queryOption {
  username: string;
  hide_title?: boolean;
  custom_title?: string;
  colors: colors;
  area: boolean;
}

export interface colors {
  areaColor: string;
  bgColor: string;
  borderColor: string;
  color: string;
  lineColor: string;
  pointColor: string;
}

export interface graphArgs {
  height: number;
  width: number;
  colors: colors;
  title: string;
  line: Promise<string>;
}
