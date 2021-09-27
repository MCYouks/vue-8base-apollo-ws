import fruitSubscription from "@/graphql/subscriptions/fruit.gql";
import { useSubscription } from "@vue/apollo-composable";

export const useFruitSubscription = function(
  variables = () => ({}),
  options = () => ({})
) {
  // Apollo Subscription API
  const { result } = useSubscription(fruitSubscription, variables, options);

  console.log({ result: result.value });

  return {
    result
  };
};