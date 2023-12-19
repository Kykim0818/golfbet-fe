import sizes from "../../../../styles/theme/sizes";

interface Props {
  width?: string | number;
  height?: string | number;
}

const IconClose = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
    >
      <rect
        width="20.3703"
        height="2.00153"
        rx="1.00077"
        transform="matrix(0.7018 0.712374 -0.7018 0.712374 5.40479 4)"
        fill="currentColor"
      />
      <rect
        width="20.3703"
        height="2.00153"
        rx="1.00077"
        transform="matrix(-0.7018 0.712374 -0.7018 -0.712374 20 5.48877)"
        fill="currentColor"
      />
    </svg>
  );
};

IconClose.defaultProps = {
  width: sizes.pixcel24,
  height: sizes.pixcel24,
};

export default IconClose;
