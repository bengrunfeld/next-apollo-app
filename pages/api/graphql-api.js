import { ApolloServer, gql } from "apollo-server-micro";

let book = {
  name: "A Brief History of Time",
  author: "Stephen Hawking",
};

const typeDefs = gql`
  type Book {
    name: String
    author: String
  }
  type Query {
    book: Book
  }
  type Mutation {
    updateBook(name: String!, author: String!): Book
  }
`;

const resolvers = {
  Query: {
    book: () => book,
  },

  Mutation: {
    updateBook: (root, args) => {
      book.name = args.name;
      book.author = args.author;
      return book;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = server.createHandler({ path: "/api/graphql-api" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
