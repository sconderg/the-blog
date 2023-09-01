import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";

export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

const HomePosts = ({ posts }: { posts: Post[] }) => {
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gap={8}
      w="100%"
      py={[6, 30]}
      px={[6, 40]}
      bg="white"
      justifyContent="center"
      alignItems="center"
    >
      {posts.map((post: Post) => (
        <GridItem key={post.id}>
          <Link href={`/post/${post.id}`}>
            <Card maxW="sm" h="300px">
              <CardHeader>
                <Heading as="h2" size="md" fontWeight="bold">
                  {post.title.slice(0, 40)}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="lg" color="gray.700">
                  {post.body.slice(0, 120)}
                </Text>
              </CardBody>
            </Card>
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};

export default HomePosts;
