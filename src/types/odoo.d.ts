interface IContext {
  lang: string;
}

interface IPagination {
  fields?: string[];
  offset?: number;
  limit?: number;
  order?: string;
  context?: IContext;
}
