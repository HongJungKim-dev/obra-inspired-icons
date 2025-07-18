import * as React from "react";
import type { SVGProps } from "react";
const SvgPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.1739 6.81238C21.7026 6.2838 21.9997 5.56685 21.9998 4.81923C21.9999 4.07162 21.703 3.35459 21.1744 2.82588C20.6459 2.29717 19.9289 2.00009 19.1813 2C18.4337 1.99991 17.7166 2.2968 17.1879 2.82538L3.84193 16.1744C3.60975 16.4059 3.43805 16.6909 3.34193 17.0044L2.02093 21.3564C1.99509 21.4429 1.99314 21.5347 2.01529 21.6222C2.03743 21.7097 2.08285 21.7896 2.14673 21.8534C2.21061 21.9172 2.29055 21.9624 2.37809 21.9845C2.46563 22.0065 2.55749 22.0044 2.64393 21.9784L6.99693 20.6584C7.3101 20.5631 7.59511 20.3925 7.82693 20.1614L21.1739 6.81238Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 5L19 9"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgPencil;
