import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";

const typeDefs = importSchema("./schema.graphql");

let _id = 0;
const photos = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto(parent, args) {
      const newPhoto = {
        id: _id++,
        ...args,
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
  Photo: {
    url: (parent) => `http://example.com/${parent.id}.jpg`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`GraphQL service running on ${url}`);
});
