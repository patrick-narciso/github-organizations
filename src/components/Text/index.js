import styled from 'styled-components';

const CustomText = styled.p`
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size};
  font-family: "PT Sans", sans-serif;
`;

const Text = ({ size = '16px', weight = 'bold', as, children }) => {
  return <CustomText size={size} as={as} weight={weight}>{children}</CustomText>
}

export default Text;