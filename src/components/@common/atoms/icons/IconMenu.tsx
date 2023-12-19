import sizes from "../../../../styles/theme/sizes";

interface Props {
  width?: string | number;
  height?: string | number;
}

const IconMenu = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
    >
      <rect x="3.5" y="5" width="17" height="2" rx="1" fill="currentColor" />
      <rect x="3.5" y="11" width="17" height="2" rx="1" fill="currentColor" />
      <rect x="3.5" y="17" width="17" height="2" rx="1" fill="currentColor" />
    </svg>
  );
};

IconMenu.defaultProps = {
  width: sizes.pixcel24,
  height: sizes.pixcel24,
};

export default IconMenu;
