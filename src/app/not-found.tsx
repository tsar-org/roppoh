export default function NotFound() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <div>
          <h1 className="m-0 mr-5 inline-block border-gray-300 border-r p-0 font-medium text-3xl dark:border-gray-700">
            404
          </h1>
          <div className="inline-block">
            <h2 className="m-0 font-normal text-lg">
              This page could not be found.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
