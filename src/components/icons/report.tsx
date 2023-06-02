export const DouveryReport = ({ size, color }: any) => (
  <svg
    width={size || '10'}
    height="13"
    viewBox="0 0 3 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="1.5" cy="6.5" r="1.5" fill={color || '#3c4048'} />
    <circle cx="1.5" cy="11.5" r="1.5" fill={color || '#3c4048'} />
    <circle cx="1.5" cy="1.5" r="1.5" fill={color || '#3c4048'} />
  </svg>
);
