import { CSSProperties } from "react";

export function FavoritesSVG({ style }: { style?: CSSProperties }) {
  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 4.22247C0 1.89046 1.89046 0 4.22247 0H12.6674C14.9994 0 16.8899 1.89046 16.8899 4.22247V17.8848C16.8899 19.6465 14.8595 20.6333 13.4743 19.5449L8.44494 15.5933L3.4156 19.5449C2.03036 20.6333 0 19.6465 0 17.8848V4.22247ZM4.22247 2.11123C3.05647 2.11123 2.11123 3.05647 2.11123 4.22247V17.8848L7.14057 13.9332C7.90613 13.3317 8.98375 13.3317 9.74931 13.9332L14.7786 17.8848V4.22247C14.7786 3.05647 13.8334 2.11123 12.6674 2.11123H4.22247Z"
        fill="#5C5CD6"
      />
    </svg>
  );
}
