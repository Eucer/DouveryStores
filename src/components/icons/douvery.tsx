export const DouveryIcon = ({ size, color, classs }: any) => (
  <svg
    width={size || '24'}
    height={size || '24'}
    viewBox="0 0 21 7"
    class={classs || 'douvery-icon'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_b_15_3)">
      <path
        d="M17.4146 0L8.28947 1.78635L10.8699 4.30775L5.57724 5.55469L0 7L8.87805 6.51823H17.4146L15.2236 3.62761H21L17.4146 0Z"
        fill={color || 'white'}
      />
    </g>
    <defs>
      <filter
        id="filter0_b_15_3"
        x="-10"
        y="-10"
        width="41"
        height="27"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_15_3"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_15_3"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
