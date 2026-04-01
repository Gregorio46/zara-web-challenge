import React from 'react';

interface ShoppingBagIconProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

export const ShoppingBagIcon: React.FC<ShoppingBagIconProps> = ({
  width = 24,
  height = 24,
  fill = 'black'
}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.4706 4H9.76471V7.76471H6V20H18.2353V7.76471H14.4706V4ZM13.5294 7.76471V11.0588H14.4706V7.76471H13.5294ZM10.7059 7.76471V11.0588H9.76471V7.76471H10.7059ZM10.7059 7.76471H13.5294V4.94118H10.7059V7.76471Z" fill={fill} />
  </svg>

);

export default ShoppingBagIcon;
