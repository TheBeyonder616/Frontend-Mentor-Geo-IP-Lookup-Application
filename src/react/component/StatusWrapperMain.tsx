import { ErrorType, ExtractedDataType, ICON } from "../config/config";
import Svg from "./Svg";
import MapComponent from "./MapComponet";
import { useCallback } from "react";

type StatusWrapperProps = {
  isLoading: boolean;
  error: ErrorType | null;
  data: ExtractedDataType | null;
};

const StatusWrapperMain = ({ isLoading, error, data }: StatusWrapperProps) => {
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
      case !isLoading && error === null && data !== null:
        return <MapComponent lat={data.latitude} lng={data.longitude} />;
      case !isLoading && error !== null:
        return (
          <section className="main__error">
            <div className="main__error-message">
              <Svg
                id={ICON.ERROR}
                className={"main--error error"}
                alt={"Icon error"}
              />
              <p className="heading-p main--error">
                <strong className="strong">{error.error}</strong>
              </p>
            </div>
          </section>
        );
      default:
        return <></>;
    }
  }, [isLoading, error, data]);

  return content();
};

export default StatusWrapperMain;
