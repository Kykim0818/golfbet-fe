import sizes from "../../../../styles/theme/sizes";

interface Props {
  width?: string | number;
  height?: string | number;
}

const IconInfo = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 22 22"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2ZM0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 8.86646C11.5523 8.86646 12 9.31417 12 9.86645L12 14.8665C12 15.4187 11.5523 15.8665 11 15.8665C10.4477 15.8665 10 15.4187 10 14.8665L10 9.86646C10 9.31417 10.4477 8.86646 11 8.86646Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 7C10 6.44772 10.4477 6 11 6H11.01C11.5623 6 12.01 6.44772 12.01 7C12.01 7.55228 11.5623 8 11.01 8H11C10.4477 8 10 7.55228 10 7Z"
        fill="currentColor"
      />
    </svg>
  );
};

IconInfo.defaultProps = {
  width: sizes.pixcel22,
  height: sizes.pixcel22,
};

export default IconInfo;
