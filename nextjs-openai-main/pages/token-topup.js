import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function TokenTopup() {
  return (
  <div><h1>This is a Token topup Page</h1></div>
);
};
export const getServerSideProps = withPageAuthRequired(
    () => {
    return {
        props: {},
    };
});