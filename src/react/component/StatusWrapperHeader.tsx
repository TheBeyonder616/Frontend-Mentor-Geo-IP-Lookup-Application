import Svg from "./Svg";
import {
  ErrorType,
  ExtractedDataType,
  ListDataType,
  ICON,
} from "../config/config";
import List from "./List";
import { DebouncedFunction } from "../hooks/useDebouncedCallback";
import { useCallback } from "react";
type StatusWrapperHeaderPropType = {
  data: ExtractedDataType | null;
  isLoading: boolean;
  error: ErrorType | null;
  debouncedReFetchData: DebouncedFunction<() => Promise<void>>;
};
const StatusWrapperHeader = ({
  data,
  isLoading,
  error,
  debouncedReFetchData,
}: StatusWrapperHeaderPropType) => {
  const ListData: ListDataType | null = data
    ? {
        "ip address": data.query,
        location: data.city,
        timeZone: data.timezone,
        isp: data.isp,
      }
    : null;

  const content = useCallback(() => {
    switch (true) {
      case isLoading:
        return (
          <Svg
            id={ICON.SPINNER}
            className={"header__spinner spinner"}
            alt={"Icon loading"}
          />
        );
      case !isLoading && error === null && ListData !== null:
        return <List object={ListData} />;
      case !isLoading && error !== null:
        return (
          <section className="header__error">
            <button className="btn btn--error" onClick={debouncedReFetchData}>
              Retry
            </button>
            <div className="header__error-message">
              <Svg id={ICON.ERROR} className={"error"} alt={"Icon error"} />
              <p className="heading-p heading--error">
                <strong className="strong">{error.error}</strong>
              </p>
            </div>
          </section>
        );

      default:
        return <></>;
    }
  }, [isLoading, error, ListData, debouncedReFetchData]);
  return content();
};

export default StatusWrapperHeader;
