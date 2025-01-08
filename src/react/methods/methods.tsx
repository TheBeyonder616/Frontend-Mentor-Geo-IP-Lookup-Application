import { API, ExtractedDataType, ErrorType } from "../config/config";

type IpDataType = {
  ip: string;
};

type DomainType = {
  Answer: Array<{ data: string }>;
};

type APIDataType = {
  ipAddress: string;
  cityName: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  timeZones: string[];
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
    if (err instanceof Error && err.message) {
      return { error: `Error: ${err.message}` };
    }
    return { error: "An unknown error occurred." };
  }

  private static extractData(
    data: APIDataType,
    isp: string = ""
  ): ExtractedDataType {
    const { longitude, latitude, ipAddress, timeZone, timeZones, cityName } =
      data;

    if (!latitude && !longitude) {
      throw new Error(
        `The provided domain or IP does not have a valid location. Missing fields: ${
          latitude ? "" : "latitude , "
        }${longitude ? "" : "longitude"}`
      );
    }

    const zone =
      timeZones && timeZone ? `${timeZones[0].split(",")[0]} ${timeZone}` : "";

    return {
      ipAddress,
      city: cityName,
      lat: latitude,
      long: longitude,
      isp: isp,
      timeZone: zone,
    };
  }

  private static async getIPAddress(): Promise<string> {
    try {
      const response = await fetch(API.IP_URL, Method.SIGNAL());
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const { ip }: IpDataType = await response.json();
      return ip;
    } catch (err) {
      throw new Error(Method.handleThrownError(err));
    }
  }

  private static async convertDomainToIpAddress(
    domain: string
  ): Promise<string> {
    try {
      const response = await fetch(API.DOMAIN_URL(domain), Method.SIGNAL());
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data: DomainType = await response.json();
      const { Answer } = data;
      if (!Answer || Answer.length === 0 || !Answer[0].data)
        throw new Error("No valid IP address found in the response.");
      return Answer[0].data;
    } catch (err) {
      throw new Error(Method.handleThrownError(err));
    }
  }

  private static async returnIpaddress(
    domainOrIpAddress: string
  ): Promise<string> {
    if (Method.isValidIP(domainOrIpAddress)) return domainOrIpAddress;
    return await Method.convertDomainToIpAddress(domainOrIpAddress);
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
      const ipAddress = await Method.returnIpaddress(ipAddressOrDomain);
      const response = await fetch(API.URL(ipAddress), Method.SIGNAL());
      if (!response.ok) throw new Error(`${response.status}`);
      const data = await response.json();
      const extractedData = Method.extractData(data);
      return extractedData;
    } catch (err) {
      return Method.handleError(err);
    }
  }
}
