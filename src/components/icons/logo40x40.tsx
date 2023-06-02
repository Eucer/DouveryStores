//TODO: Logo transpartnt background

export const DouveryLogo40x40 = ({ size }: any) => (
  <svg
    width={size || 40}
    height={size || 40}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 5C0 2.23858 2.23858 0 5 0H43C45.7614 0 48 2.23858 48 5V43C48 45.7614 45.7614 48 43 48H5C2.23858 48 0 45.7614 0 43V5Z"
      fill="#0D47A1"
    />
    <g filter="url(#filter0_b_316_2)">
      <path
        d="M36.2071 15.04L17.293 18.6819C16.9745 18.7432 16.8576 19.1383 17.0915 19.3631L21.6243 23.7195C21.8532 23.9395 21.7468 24.3258 21.4374 24.3975L10.6257 26.9029L4.69827 28.1766C4.22929 28.2773 4.30262 28.9676 4.7823 28.9676H16.5346H35.6016C35.9337 28.9676 36.1211 28.5865 35.9185 28.3235L32.1378 23.4176C31.9351 23.1546 32.1226 22.7734 32.4547 22.7734H43.257C43.6139 22.7734 43.7921 22.3416 43.5392 22.0899L36.5649 15.1493C36.471 15.0559 36.3371 15.015 36.2071 15.04Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_316_2"
        x="-5.61792"
        y="5.03271"
        width="59.2758"
        height="33.9348"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_316_2"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_316_2"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
