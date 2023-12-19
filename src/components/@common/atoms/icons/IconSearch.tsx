import sizes from "../../../../styles/theme/sizes";

interface Props {
  width?: string | number;
  height?: string | number;
}

const IconSearch = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 27 27"
    >
      <rect
        x="13.3103"
        y="14.5673"
        width="1.77778"
        height="10.6667"
        rx="0.888889"
        transform="rotate(-45 13.3103 14.5673)"
        fill="currentColor"
      />
      <circle
        cx="10.1677"
        cy="10.1671"
        r="6.11111"
        transform="rotate(-45 10.1677 10.1671)"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="2"
      />
    </svg>
  );
};

IconSearch.defaultProps = {
  width: sizes.pixcel27,
  height: sizes.pixcel27,
};

export default IconSearch;
