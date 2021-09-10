import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

const StyledPage = styled.div`
  width: 100%;
  margin-top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button<{ danger?: boolean; success?: boolean }>`
  border-radius: 4px;
  padding: 10px 15px;
  border: 0;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${({ danger, success }) =>
    danger ? '#bb2124' : success ? '#22BB33' : '#0047AB'};
  margin: 0 5px;
  box-sizing: border-box;
`;

export function Index() {
  const router = useRouter();
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <Button onClick={() => router.push('/home')}>Continue</Button>
    </StyledPage>
  );
}

export default Index;
