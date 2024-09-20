// export const createQuery = {
//     mutation: async ({
//       userId,
//       couponCode,
//       subscriptionPriceId,
//     }: CreateStripeSubscriptionParams) => {
//       const { data } = await publicAPI.post<
//         ServiceResponse<{ subscriptionId: string; clientSecret: string }>
//       >(`/patients/${userId}/create-subscription`, {
//         couponCode,
//         subscriptionPriceId,
//       });
  
//       return data.data;
//     },
//     invalidates: (queryClient: QueryClient) => {
//       void queryClient.invalidateQueries({ queryKey: [DOMAIN] });
//     },
//   };