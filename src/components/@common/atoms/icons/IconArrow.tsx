import sizes from "../../../../styles/theme/sizes";

interface Props {
  width?: string | number;
  height?: string | number;
}

const IconArrow = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2138 4.29966C16.6006 4.69388 16.5946 5.32701 16.2003 5.7138L9.91428 11.8813L16.2137 18.2995C16.6005 18.6937 16.5946 19.3268 16.2005 19.7137C15.8063 20.1005 15.1732 20.0946 14.7863 19.7005L7.78632 12.5685C7.60052 12.3792 7.49754 12.1238 7.50004 11.8586C7.50255 11.5933 7.61032 11.34 7.79965 11.1542L14.7997 4.2862C15.1939 3.89941 15.827 3.90543 16.2138 4.29966Z"
        fill="currentColor"
      />
    </svg>
  );
};

IconArrow.defaultProps = {
  width: sizes.pixcel24,
  height: sizes.pixcel24,
};

export default IconArrow;
