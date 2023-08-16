type TRequestResolver = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  children: React.ReactNode[];
};

export const RequestResolver = ({
  isLoading,
  isError,
  isSuccess,
  children,
}: TRequestResolver) => {
  return (
    <>
      {isLoading
        ? children[0]
        : isError
        ? children[1]
        : isSuccess
        ? children[2]
        : null}
    </>
  );
};
