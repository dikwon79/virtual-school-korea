import styled from "styled-components";

const ButtonWrapper = styled.a<{ color?: string; width?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  border: 2px solid white;
  background-color: ${(props) =>
    props.color || "#121117"}; /* Default color is #121117 */
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.color
        ? "#2c2a38"
        : "#2c2a38"}; /* You can customize hover color too */
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
  href: string; // href is required now
  color?: string; // color is an optional prop to change the button color
  width?: string; // width is an optional prop to change the button width
  title: string; // title is the new prop for the button text
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({
  className,
  href,
  color,
  width,
  title, // Destructure title from props
}) => {
  return (
    <ButtonWrapper
      className={className}
      href={href}
      color={color}
      width={width}
    >
      {title} {/* Use the title prop here */}
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
