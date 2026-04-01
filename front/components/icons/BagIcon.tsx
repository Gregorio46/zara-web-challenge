import React from 'react';

interface BagIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const BagIcon: React.FC<BagIconProps> = ({ 
  width = 13, 
  height = 16, 
  fill = 'black' 
}) => (
  <svg width={width} height={height} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.47059 0H3.76471V3.76471H0V16H12.2353V3.76471H8.47059V0ZM7.52941 4.70588V7.05882H8.47059V4.70588H11.2941V15.0588H0.941176V4.70588H3.76471V7.05882H4.70588V4.70588H7.52941ZM7.52941 3.76471V0.941176H4.70588V3.76471H7.52941Z" fill={fill}/>
  </svg>
);

export default BagIcon;
