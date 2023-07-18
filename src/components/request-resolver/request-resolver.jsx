export const RequestResolver = ({ isLoading, isError, isSuccess, children }) => {
  return (
    <>
      {isLoading ? children[0]: isError ? children[1] : isSuccess ? children[2] : null}
    </>
  )
}