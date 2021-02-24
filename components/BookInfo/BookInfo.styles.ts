import styled from "styled-components";

export const Book = styled.div`
  border: 0.3rem solid ${({ theme }) => theme.colors.black};
  padding: 1rem;
  margin: 1rem;
`;

export const BookName = styled.h1`
  padding: 0.5rem;
`;

export const Author = styled.h2`
  padding: 0.5rem;
`;
