import sizes from "../../../../styles/theme/sizes";

interface Props {
  width?: string | number;
  height?: string | number;
}

const IconKakao = (props: Props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="22" height="22" fill="url(#patternKakao)" />
      <defs>
        <pattern
          id="patternKakao"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_2_32361" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_2_32361"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUFFQ0YwQjA2Nzk4QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NzExRTJFRjE0N0ExMUUzQjQwMEI2Njg5MjczQ0YzNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NzExRTJFRTE0N0ExMUUzQjQwMEI2Njg5MjczQ0YzNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDg4MDExNzQwNzIwNjgxMTgyMkFBRUNGMEIwNjc5OEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBRUNGMEIwNjc5OEMiLz4gPC9yZGY6RGVzY3Jp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"
        />
      </defs>
    </svg>
  );
};

IconKakao.defaultProps = {
  width: sizes.pixcel22,
  height: sizes.pixcel22,
};

export default IconKakao;
