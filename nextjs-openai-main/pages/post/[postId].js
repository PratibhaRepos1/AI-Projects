import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Post() {
  return (
  <div><h1>This is a post Page</h1></div>
);
};

export const getServerSideProps = withPageAuthRequired(
    () => {
    return {
        props: {},
    };
});