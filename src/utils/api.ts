import { baseUrl } from "./constants";

class Api {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private _getRes<T>(res: Response): Promise<T> {
    if (!res.ok) {
      throw new Error("Download error");
    }
    return res.json() as Promise<T>;
  }

  public getItems<T>(url: string): Promise<T> {
    return fetch(`${this._baseUrl}/${url}`).then((res) => this._getRes<T>(res));
  }
}

const api = new Api(baseUrl);

export default api;
