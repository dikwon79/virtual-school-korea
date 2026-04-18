"use client";

import styled from "styled-components";

const ButtonWrapper = styled.a<{ $color?: string; $width?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width || "auto"};
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  border: 2px solid white;
  background-color: ${(props) => props.$color || "#121117"};
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #2c2a38;
  }
`;

const Icon = styled.span`
  display: inline-flex;
  margin-left: 8px;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

interface GetStartedButtonProps {
  className?: string;
  href: string;
  color?: string;
  width?: string;
  title: string;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({
  className,
  href,
  color,
  width,
  title,
}) => {
  return (
    <ButtonWrapper
      className={className}
      href={href}
      $color={color}
      $width={width}
    >
      {title}
      <Icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fillRule="evenodd"
            d="M16.086 10.993h-12v2h12l-5.293 5.293 1.414 1.414 7.707-7.707-7.707-7.707L10.793 5.7zm1 1"
            clipRule="evenodd"
          ></path>
        </svg>
      </Icon>
    </ButtonWrapper>
  );
};

export default GetStartedButton;
