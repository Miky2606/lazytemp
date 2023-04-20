export default function Head({ params }: { params: { user: string } }) {
  const user = params.user.split("/");
  return (
    <>
      <title>{user[user.length - 1]}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="A web created fort the templates of the app "
      />
      <meta lang="en" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
