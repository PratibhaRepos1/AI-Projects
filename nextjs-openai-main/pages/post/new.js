import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function NewPost(props) {
    console.log('New POST PROPS:', props);
    return (
        <div>
            <h1>This is a new post Page</h1>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired(
    () => {
    return {
        props: {},
    };
});