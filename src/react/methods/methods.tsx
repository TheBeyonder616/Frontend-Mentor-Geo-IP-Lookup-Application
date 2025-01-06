import { API, ExtractedDataType, ErrorType } from "../config/config";

type DataType = {
  ip: string;
};

export default class Method {
  //?===========================================[Private]
  private static SIGNAL(timeout: number = API.TIME_OUT) {
    return { signal: AbortSignal.timeout(timeout) };
  }

  private static handleThrownError(err: unknown): string {
    return err instanceof Error ? err.message : "An unknown error occurred";
  }
  private static handleError(err: unknown): ErrorType {
    console.error("Error fetching JSON data:", err);
    if (err instanceof Error && err.message) {
      return { error: `Error: ${err.message}` };
    }
    return { error: "An unknown error occurred." };
  }

  private static extractData(data: ExtractedDataType): ExtractedDataType {
    const { isp, query, city, timezone, lat, lon } = data;
    if (!lat && !lon) {
      throw new Error(
        `The provided domain or IP does not have a valid location. Missing fields: ${
          lat ? "" : "latitude , "
        }${lon ? "" : "longitude"}`
      );
    }
    return { query, isp, city, timezone, lat, lon };
  }

  private static async getIPAddress(): Promise<string> {
    try {
      const response = await fetch(API.IP_URL, Method.SIGNAL());
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const { ip }: DataType = await response.json();
      return ip;
    } catch (err) {
      throw new Error(Method.handleThrownError(err));
    }
  }

  //?===========================================[PUBLIC]
  public static isValidIP(ip: string): boolean {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  }

  public static isValidDomain(domain: string): boolean {
    const domainRegex = /^(?!-)(?!.*--)([A-Za-z0-9-]{1,63}\.?)+[A-Za-z]{2,}$/;
    return domainRegex.test(domain);
  }

  public static async getJsonData(): Promise<ExtractedDataType | ErrorType> {
    try {
      const ipAddress = await Method.getIPAddress();
      if (!ipAddress) throw new Error("IP address not found");
      const response = await fetch(API.URL(ipAddress), Method.SIGNAL());
      if (!response.ok) throw new Error(`${response.status}`);
      const data = await response.json();
      const extractedData = Method.extractData(data);
      return extractedData;
    } catch (err) {
      return Method.handleError(err);
    }
  }

  public static async searchJsonData(
    ipAddressOrDomain: string
  ): Promise<ExtractedDataType | ErrorType> {
    try {
      const response = await fetch(API.URL(ipAddressOrDomain), Method.SIGNAL());
      if (!response.ok) throw new Error(`${response.status}`);
      const data = await response.json();
      const extractedData = Method.extractData(data);
      return extractedData;
    } catch (err) {
      return Method.handleError(err);
    }
  }
}
