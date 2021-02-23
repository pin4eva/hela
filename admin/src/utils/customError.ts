export const CustomError = (
  error: { networkError: any; graphQLErrors: any[] } | any
): void => {
  if (error?.networkError) {
    alert("NETWORK ERROR");
  }
  if (error?.graphQLErrors) {
    // Your account is pending activation
    error.graphQLErrors.map((err: { message: any }) => alert(err.message));
  }
};
