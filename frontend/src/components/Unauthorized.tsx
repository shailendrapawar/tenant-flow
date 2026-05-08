import React from "react"

type UnauthorizedProps = {
  message?: string
  onGoBack?: () => void
}
const Unauthorized = ({
  message = "You do not have permission to access this page.",
}) => {
  //TODO: desing later
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">403</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Unauthorized
        </h2>

        <p className="mt-2 text-gray-600">{message}</p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="rounded-xl bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Go Back
          </button>

          <button
            // onClick={onGoBack}
            className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
