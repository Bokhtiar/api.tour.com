declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        role: string;
      };
    }
  }
}

export type PaginationQueryType = {
  page?: number | 20;
  limit?: number | 0;
};

export type PaginateType = {
  page: number;
  limit: number;
  total_items: number;
};

type ErrorType = {
  field: string;
  message: string;
};

export interface IHttpErrorResponse {
  status: boolean;
  errors: ErrorType[];
}

export interface IHttpSuccessResponse {
  status: boolean;
  message?: string;
  token?: string;
  data?: any;
  paginate?: any;
}

  export interface IHeader {
    headers: {
      Authorization: string;
      api_key: string;
    };
  }

  export interface IHeaderWithoutToken {
    headers: {
      api_key: string;
    };
  }
  

