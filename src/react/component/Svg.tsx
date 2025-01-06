import { IconKeys } from "../config/config";

type PropsType = {
  id: IconKeys;
  alt: string;
  className: string;
};

/**
 * ?SVG Component to render an SVG icon.
 *
 * @param {PropsType} props - Component props.
 * @returns JSX.Element
 */
const Svg = ({ id, alt, className }: PropsType) => {
  return (
    <div className={`svg-container ${className}--container`}>
      <svg className="svg" aria-label={alt}>
        <use href={`/images/icons.svg#${id}`}></use>
      </svg>
    </div>
  );
};

export default Svg;
