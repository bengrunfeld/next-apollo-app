import { useQuery, useMutation, gql } from "@apollo/client";
import { Book, BookName, Author } from "./BookInfo.styles";

const GET_BOOK_DETAILS = gql`
  query {
    book {
      name
      author
    }
  }
`;

const SET_BOOK_DETAILS = gql`
  mutation UpdateBook($name: String!, $author: String!) {
    updateBook(name: $name, author: $author) {
      name
      author
    }
  }
`;

const BookInfo = () => {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS);

  const updateCache = (cache, { data: { updateBook } }) => {
    const existingBook = cache.readQuery({
      query: GET_BOOK_DETAILS,
    });

    cache.writeQuery({
      query: GET_BOOK_DETAILS,
      data: { book: updateBook },
    });
  };

  const [updateBook] = useMutation(SET_BOOK_DETAILS, { update: updateCache });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const updateBookDetails = () => {
    updateBook({
      variables: { name: "Cosmos", author: "Carl Sagan" },
    });
  };

  return (
    <Book>
      <BookName>{data.book.name}</BookName>
      <Author>{data.book.author}</Author>
      <button onClick={updateBookDetails}>Update Book</button>
    </Book>
  );
};

export default BookInfo;
