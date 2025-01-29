import axios, { AxiosRequestConfig } from "axios";

class ApiClient {
  public async DoRequest(
    method = "GET",
    endpoint: string,
    data = {},
    aditionalHeaders: any = {}
  ) {
    const baseUri = this.getBaseUri();
    const url = `${baseUri}${endpoint}`;

    const queryParams: { [key: string]: string } = {};

    const headers: any = {};
    headers["Content-Type"] = "application/json";
    headers.Accept = "application/json";

    for (const idx in aditionalHeaders) {
      headers[idx] = aditionalHeaders[idx];
    }

    const requestConfig: AxiosRequestConfig = {
      method,
      headers,
      url,
      data,
      params: queryParams,
    };

    const response = await axios(requestConfig);
    return response.data;
  }

  public getBaseUri(): string {
    return import.meta.env.VITE_API_URL ?? "";
  }
}

export default ApiClient;
